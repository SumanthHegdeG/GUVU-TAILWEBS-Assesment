const Student = require('../models/studentModel')
const asyncHandler = require('express-async-handler')

exports.getAllStudent = asyncHandler(async (req, res) => {
  try {
    const name = req.query.name
      ? {
          name: {
            $regex: req.query.name,
            $options: 'i',
          },
        }
      : {}
    const subject = req.query.subject
      ? {
          subject: {
            $regex: req.query.subject,
            $options: 'i',
          },
        }
      : {}

    await Student.find(
      { ...name, ...subject, userId: req.user._id },
      {
        name: 1,
        marks: 1,
        subject: 1,
        userId: 1,
        _id: 1,
      }
    )
      .sort({ createdAt: 'desc' })
      .then((items) => {
        res.status(200).json({
          items,
        })
      })
  } catch (error) {
    res.status(404)
    throw new Error('Something went wrong')
  }
})

exports.addStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findOne({
      name: req.body.name,
      subject: req.body.subject,
      userId: req.user._id,
    })

    if (student == null) {
      const newStudent = new Student({
        name: req.body.name,
        subject: req.body.subject,
        marks: req.body.marks,
        userId: req.user._id,
      })
      await newStudent
        .save()
        .then((item) =>
          res
            .status(200)
            .json({ items: item, message: 'Student Added Successfully' })
        )
    } else {
      try {
        await Student.findByIdAndUpdate(student._id, {
          marks: student.marks + parseInt(req.body.marks),
        }).then((items) => {
          res.status(200).json({ message: 'Marks updated successfully' })
        })
      } catch (error) {
        res.status(404)

        throw new Error('Something went wrong')
      }
    }
  } catch (error) {
    res.status(404)

    throw new Error('Something went wrong')
  }
})

exports.updateStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findOne({
      name: req.body.name,
      subject: req.body.subject,
      userId: req.user._id,
    })

    console.log(student.id, req.params.id)

    if (student.id && req.params.id && student.id !== req.params.id) {
      try {
        await Student.findByIdAndUpdate(student._id, {
          marks: student.marks + parseInt(req.body.marks),
        }).then((items) => {
          res.status(200).json({ message: 'Marks updated successfully' })
        })
        await Student.findByIdAndDelete(req.body.id)
      } catch (error) {
        res.status(404)
        throw new Error('Something went wrong')
      }
    } else {
      try {
        await Student.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          subject: req.body.subject,
          marks: parseInt(req.body.marks),
        }).then((items) => {
          res.status(200).json({ message: 'Marks updated successfully' })
        })
      } catch (error) {
        res.status(404)
        throw new Error('Something went wrong')
      }
    }
  } catch (error) {
    res.status(404)
    throw new Error('Something went wrong')
  }
})

exports.deleteStudent = asyncHandler(async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id).then((items) => {
      res.status(200).json({ message: ' Deleted successfully' })
    })
  } catch (error) {
    res.status(404)
    throw new Error('Data not found')
  }
})
