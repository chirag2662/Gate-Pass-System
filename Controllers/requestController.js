const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const nodemailer = require("nodemailer");

const User = require("./../models/UserModel");
const Request = require("./../models/requestModel");

exports.createRequest = catchAsync(async (req, res, next) => {
  if (req.user.requestsPerMonth >= parseInt(process.env.requestsPerMonth))
    return next(
      new AppError(
        `You have already made ${parseInt(
          process.env.requestsPerMonth
        )} requests in this month`,
        404
      )
    );
  if (
    req.body.modeOfTravel.trim().length === 0 ||
    req.body.reason.trim().length === 0
  ) {
    let errorMsg = [
      `${
        req.body.modeOfTravel.trim().length === 0 &&
        "Mode of Travel must not be empty"
      }`,
      `${req.body.reason.trim().length === 0 && "Reason must not be empty"}`,
    ];
    const user = await User.findById(req.user._id);
    return res.status(200).render("requestForm", {
      user,
      requestsPerMonth: false,
      path: "/request-form",
      error: errorMsg,
    });
  }

  const requestObj = Object.assign(req.body, { bookedby: req.user._id });
  const request = await Request.create(requestObj);

  const user = await User.findByIdAndUpdate(req.user._id, {
    $push: { requests: request._id },
  }).populate("requests");
  //Send mail to the user that it request is in process

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_ID,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_ID,
    to: user.mailId,
    subject: "GATE-PASS Request",
    text: `${user.name} your Gate Pass request is in process`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else console.log("Mail send successfully");
  });

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
  let requestsPerMonth = false;
  if (user.requestsPerMonth >= parseInt(process.env.requestsPerMonth))
    requestsPerMonth = true;
  res.status(200).render("requestForm", {
    user: user,
    requestsPerMonth,
    path: "/request-form",
    error: false,
  });
});

exports.deleteRequest = catchAsync(async (req, res) => {
  const request = await Request.findByIdAndDelete(req.params.id);
  if (!request) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.json({ redirect: "/user/profile-page" });
});
