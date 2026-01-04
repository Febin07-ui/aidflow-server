// import express
const express =require('express')
const userController = require('../controller/userController')
const requestController = require('../controller/requestController')
const taskController = require('../controller/taskController')
// create Router object
const router = new express.Router()

// define path for client api request

// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)

// create request
router.post('/request/create',requestController.createRequestController)
// get all request 
router.get('/admin/requests',requestController.getAllRequestsController)

// admin approve / reject request
router.put('/admin/update/:id',requestController.updateRequestStatusController)

// get approved request(volunteer)
router.get('/volunteer/request/approved',requestController.getApprovedRequestController)

// volunteer accept task
router.post('/volunteer/accept-task',taskController.acceptTaskController)

module.exports = router