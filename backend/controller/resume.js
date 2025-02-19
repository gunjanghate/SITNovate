import multer from "multer";
import path from "path";
import fs from "fs";
import Resume from "./model/resume.js"; 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File Filter (Accepts only PDF, JPG, and JPEG)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF, JPG, and JPEG are allowed."), false);
    }
};

const upload = multer({ storage, fileFilter });


export const handleResumeUpload = async (req, res) => {
    upload.single("file")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded or invalid file type" });
        }

        try {
            const { filename, mimetype, size, path } = req.file;

            
            const newResume = new Resume({ filename, mimetype, size, path });
            await newResume.save();

            res.status(201).json({ message: "Resume uploaded successfully", file: req.file });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: "Failed to save resume" });
        }
    });
};
