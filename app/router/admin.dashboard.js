const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/adminDashboard.controller');

router.get('/admin/dashboard', DashboardController.dashboard);

module.exports = router;