// import express
const express =require('express')
const userController = require('../controller/userController')
const requestController = require('../controller/requestController')
const taskController = require('../controller/taskController')
const adminController = require('../controller/adminController')
// create Router object
const router = new express.Router()

// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// google login
router.post('/google/sign-in',userController.googleLoginController)


// create request
router.post('/request/create',requestController.createRequestController)
// get all victim request for victim
router.get('/request/my-requests',requestController.getVictimRequestController)



// get all request 
router.get('/admin/requests',requestController.getAllRequestsController)
// admin approve / reject request
router.put('/admin/update/:id',requestController.updateRequestStatusController)
// get all user for admin
router.get('/admin/users',adminController.getAllUsersController)
// block user
router.put('/admin/block/:userId',adminController.blockUserController)
// unblock user
router.put('/admin/unblock/:userId',adminController.unblockUserController)
// get dashboard data
router.get('/admin/dashboard-stats',adminController.getAdminDashBoardStatsController)



// get approved request(volunteer)
router.get('/volunteer/request/approved',requestController.getApprovedRequestController)
// volunteer accept task
router.post('/volunteer/accept-task',taskController.acceptTaskController)
// voluteer my tasks
router.get('/volunteer/my-tasks/:volunteerId',taskController.getMyTasksController)
// voluteer mark delivered
router.put('/volunteer/mark-delivered',taskController.markDeliveredController)
// volunteer stats
router.get('/volunteer/stats',taskController.getVolunteerDashboardController)



module.exports = router