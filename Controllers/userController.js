const User = require("./../models/UserModel");
const Request = require("./../models/requestModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { request } = require("express");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "rollNo",
    "phoneNo",
    "roomNo",
    "hostel",
    "branch"
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).render("userProfile", { user: updatedUser });
});

exports.getUpdatePage = async (req, res) => {
  res.render("updateForm", { user: req.user });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "rollNo",
    "phoneNo",
    "roomNo",
    "hostel",
    "branch"
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).render("userProfile", { user: updatedUser });
});

exports.getRequestPage = async (req, res) => {
  res.render("requestForm", { user: req.user });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).populate("requests");
  console.log("user", user);
  res.render("userProfile", { user });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
