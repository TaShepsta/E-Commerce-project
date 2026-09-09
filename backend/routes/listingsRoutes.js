import { Router } from "express";
import multer from "multer";
import { validateListing } from "../middleware/validateListing.js";
import {
  addListing,
  editListing,
  listListings,
  removeListing,
  showListing,
} from "../controllers/listingsController.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed."));
  },
});

router.get("/", listListings);
router.get("/:id", showListing);
router.post("/", upload.single("image"), validateListing, addListing);
router.put("/:id", upload.single("image"), validateListing, editListing);
router.delete("/:id", removeListing);

export default router;
