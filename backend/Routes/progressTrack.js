const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const progressTrack = require('../controllers/progressTrackController');

// * get Project to track progress:
router.get(
  '/api/showClickProject/:id',
  authenticate,
  progressTrack.showParticularproject
);
// !! get Tasks of Given Project to track progress:
router.get('/api/showClickTask/:project_id', progressTrack.showTask);

module.exports = router;
