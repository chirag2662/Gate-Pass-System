const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const User = require("./../models/UserModel");
const Request = require("./../models/requestModel");

exports.createRequest = catchAsync(async (req, res, next) => {
  const requestObj = Object.assign(req.body, { bookedby: req.user._id });
  const request = await Request.create(requestObj);

  const user = await User.findByIdAndUpdate(req.user._id, {
    $push: { requests: request._id },
  }).populate("requests");

  if (!user) {
    return next(new AppError("No doc found with that id", 404));
  }

  res.redirect("/user/profile-page");
});

exports.getRequestForm = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("No doc found with that id", 404));
  }
  console.log("user", user);
  res.status(200).render("requestForm", { user: user });
});

exports.deleteRequest = catchAsync(async (req, res) => {
  const request = await Request.findByIdAndDelete(req.params.id);
  if (!request) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.json({ redirect: "/user/profile-page" });
});
