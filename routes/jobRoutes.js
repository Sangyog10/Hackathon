const {createJob,getAllJobs,deleteJob,updateJob,getNearbyJobs}=require('../controllers/jobController')
const express = require("express");
const router = express.Router();

router.post("/", createJob);
router.post("/nearby", getNearbyJobs);
router.get("/", getAllJobs);
router.delete('/:id',deleteJob)
router.patch('/:id',updateJob)

module.exports = router;

