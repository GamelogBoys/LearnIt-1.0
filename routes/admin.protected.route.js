const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const isOwnerLoggedIn = require('../middleware/is.owner');
const videoModel = require('../models/video.model');
const { isAdmin } = require('../middleware/auth.middleware')
const mongoose = require('mongoose');

// Multer Storage Configuration
// 1. Use standard memory storage instead of the buggy gridfs engine
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 150 * 1024 * 1024 // 150 MB limit
    }
});

// Helper function to manually stream a memory buffer into a GridFS Bucket
const uploadToGridFS = (buffer, originalname, fieldname) => {
    return new Promise((resolve, reject) => {
        const db = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'uploads'
        });

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${fieldname}-${uniqueSuffix}${path.extname(originalname)}`;

        // Create the open database stream channel
        const uploadStream = bucket.openUploadStream(filename);
        
        // Write the file buffer and close the stream channel cleanly
        uploadStream.end(buffer);

        uploadStream.on('finish', () => {
            resolve(filename); // Resolves the final generated filename string
        });

        uploadStream.on('error', (err) => {
            reject(err);
        });
    });
};

// 2. POST Route using pure memory storage + manual streaming hooks
router.post('/upload', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videoFile', maxCount: 1 }
]), async (req, res) => {
    try {
        if (!req.files || !req.files.thumbnail || !req.files.videoFile) {
            return res.status(400).send('Missing files.');
        }

        // Process buffers sequentially safely!
        const thumbnailFilename = await uploadToGridFS(req.files.thumbnail[0].buffer, req.files.thumbnail[0].originalname, 'thumbnail');
        const videoFilename = await uploadToGridFS(req.files.videoFile[0].buffer, req.files.videoFile[0].originalname, 'videoFile');

        await videoModel.create({
            title: req.body.title,
            tag: req.body.tag,
            thumbnail: thumbnailFilename,
            videoPath: videoFilename
        });

        res.redirect('/cohort');
    } catch (err) {
        console.error(err);
        res.status(500).send('Upload failed.');
    }
});

// Render Dashboard
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('protected/admin.dashboard.ejs', { owner: req.user });
});

module.exports = router;