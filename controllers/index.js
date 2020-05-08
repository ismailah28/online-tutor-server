const home = (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Online Tutor API' });
};

module.exports = home;
