const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter Name'],
    },
    subject: {
      type: String,
      required: [true, 'Enter Name'],
    },
    marks: {
      type: Number,
      required: [true, 'Enter Marks'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

module.exports = Student = mongoose.model('Student', studentSchema)
