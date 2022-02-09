const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const nodemailer = require('nodemailer');

const requestModel = require("./../models/requestModel");

exports.getAllRequestForAdmin = catchAsync(async (req, res, next) => {
  const requests = await requestModel
    .find({ status: "pending" })
    .populate("bookedby")
    .exec();
  if (!requests) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.render("gaurd", { requests: requests });
});

exports.updateRequestStatus = catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;
  const status = req.params.status;

  if (status == "rejected") {

    const rejrequest = await requestModel
      .findByIdAndDelete(requestId)
      .populate("bookedby")
      .exec();
    rejrequest.status = "rejected";
    //Send the mail to user that your request is rejected

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_ID,
        pass: process.env.NODEMAILER_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.NODEMAILER_ID,
      to: rejrequest.bookedby.mailId,
      subject: 'GATE-PASS',
      text: `${rejrequest.bookedby.name} your Gate Pass request is rejected`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {

      }
    });

    return res.redirect("/request/admin");
  }
  const request = await requestModel
    .findById(requestId)
    .populate("bookedby")
    .exec();
  request.status = "confirmed";

  //send a mail to user that request is confirmed

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_ID,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.NODEMAILER_ID,
    to: request.bookedby.mailId,
    subject: 'GATE-PASS',
    text: `${request.bookedby.name} your Gate Pass request is ${request.status}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {

    }
  });


  await request.save();
  if (!request) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.redirect("/request/admin");
});
