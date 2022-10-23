const express = require('express')
const {
  getAllStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController')
const { protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').get(protect, getAllStudent).post(protect, addStudent)

router.route('/:id').put(protect, updateStudent).delete(protect, deleteStudent)
module.exports = router
