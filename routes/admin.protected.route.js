const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const isOwnerLoggedIn = require('../middleware/is.owner');
const videoModel = require('../models/video.model');
const { isAdmin } = require('../middleware/auth.middleware')

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Render Dashboard
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('protected/admin.dashboard.ejs', { owner: req.user });
});

// Process both files simultaneously
router.post('/upload', isAdmin, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videoFile', maxCount: 1 } // <-- Added video file field config
]), async (req, res) => {
    try {
        const { title, tag } = req.body;
        
        // Validate both files exist
        if (!req.files || !req.files.thumbnail || !req.files.videoFile) {
            req.flash('error', 'Please upload both a thumbnail image and a video file.');
            return res.redirect('/admin/dashboard');
        }

        // Extract relative file paths for the DB
        const thumbnailPath = `/images/uploads/${req.files.thumbnail[0].filename}`;
        const videoPath = `/images/uploads/${req.files.videoFile[0].filename}`;

        // Save to Database
        await videoModel.create({
            title,
            tag,
            thumbnail: thumbnailPath,
            videoPath: videoPath
        });

        req.flash('success', 'Cohort video asset uploaded successfully!');
        res.redirect('/cohort');
    } catch (err) {
        console.error(err.message);
        req.flash('error', 'Failed to publish video asset.');
        res.redirect('/admin/dashboard');
    }
});

module.exports = router;