# 🎓 LearnIt - Cohort Learning & Streaming Portal

LearnIt is a robust, responsive, administrative-supported video streaming and management platform designed specifically for cohorts. The platform leverages a hybrid multi-model authentication architecture to seamlessly separate student workspaces from powerful administrative media management panels.

---

## 🚀 Features

### 🛡️ Core Authentication & Security
* **Dual-Collection Authentication Pipeline:** Zero reliance on flat boolean flags. Normal students and administrators live in separate database collections (`users` and `owners`), processed gracefully by a unified dynamic login engine.
* **Secure Cookie-Based Sessions:** Employs cryptographically signed JSON Web Tokens (JWT) inside HTTP-only cookies to eliminate front-end token tampering.
* **Hybrid Route Guardians:** Route protection middleware dynamically scans database layers to authorize page requests securely.

### 🎬 Theater-Style Video Engine
* **YouTube-Like Media Player:** Features a responsive, native HTML5 streaming viewport designed with cinematic dark canvas borders.
* **Dynamic Cohort Sidebar:** Intelligently recommends parallel learning tracks under the main playback workspace.
* **Interactive Engagement Triggers:**
    * **Persistent Likes:** Real-time, toggleable liking system that logs unique user associations.
    * **Dynamic Share Tool:** Writes the target video URL directly to the user's system clipboard utilizing modern Web API triggers.

### ⚙️ Administrative Command Center
* **Multi-File Asset Pipeline:** Enabled by customized `Multer` disk storage systems, allowing admins to upload heavy video formats (MP4/WebM) along with custom image covers simultaneously.
* **Dynamic Categorization:** Admins can tag assets dynamically (e.g., *Frontend*, *Backend*, *DevOps*, *UI/UX*) to keep the cohort dashboard highly organized.

### 👤 Profile Customizer Settings
* **Live DP Previewing:** Drag-and-drop or select new profile photos with immediate local file preview generation.
* **Account Controls:** Seamlessly update profile displays, update passwords, and clear sessions via modular forms.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Backend Runtime** | Node.js / Express.js | Event-driven server framework |
| **Database Engine** | MongoDB / Mongoose | Scalable, document-oriented object modeling |
| **Media Handling** | Multer | Highly optimized multi-part form-data file storage |
| **Encryption/Sec** | JWT & Bcrypt | Session signatures & salted password hashing |
| **View Engine** | EJS (Embedded JS) | Server-side HTML templating engine |
| **CSS Framework** | Tailwind CSS | Utility-first, responsive interface design |

---

## 📂 Project Architecture

```text
LearnIt/
├── config/
│   └── mongoose.connection.js   # Database connection pool settings
├── controllers/
│   └── auth.user.js             # Hybrid login & registration logic
├── middleware/
│   ├── is.loggedIn.js           # Student session route-guard
│   └── is.owner.js              # Admin clearance route-guard
├── models/
│   ├── user.model.js            # Student profile schema
│   ├── owner.model.js           # Admin credentials schema
│   └── video.model.js           # Cohort video and metadata schema
├── public/
│   └── images/
│       └── uploads/             # target directory for Multer assets
├── routes/
│   ├── admin.route.js           # Admin dashboards and media upload routes
│   ├── auth.route.js            # Login, Registration, and Session routers
│   └── cohort.protected.route.js# Secure streaming, interactive likes, and user settings
├── views/
│   ├── auth.ejs                 # Gateway portal interface
│   └── protected/
│       ├── cohort.user.ejs      # Core learning feed dashboard
│       ├── admin.dashboard.ejs  # Asset upload panel workspace
│       ├── watch.ejs            # Cinematic playback theater
│       └── settings.ejs         # Password changes & DP customizer
└── app.js                       # Server setup and engine execution