const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    tutor: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    subject: { type: mongoose.Types.ObjectId, ref: 'Subject', required: true },
  },
  { timestamps: true }
);

// prevent user from booking the same lesson twice
lessonSchema.index({ student: 1, tutor: 1, subject: 1 }, { unique: true });

lessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'student',
    select: 'firstName lastName email',
  }).populate({ path: 'tutor', select: 'firstName lastName email subjects' });
  next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
