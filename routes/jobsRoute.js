import express from "express";
import {
  createJobs,
  deleteAllJobs,
  deleteJob,
  getAllJobs,
  getJob,
  updateJobs,
} from "../controllers/jobs.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJobs).delete(deleteAllJobs);
router.route("/:id").get(getJob).patch(updateJobs).delete(deleteJob);

export default router;
