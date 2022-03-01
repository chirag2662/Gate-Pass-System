const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const nodemailer = require("nodemailer");

const requestModel = require("./../models/requestModel");

exports.getAllRequestForAdmin = catchAsync(async (req, res, next) => {
  const requests = await requestModel
    .find({ status: "pending" })
    .populate("bookedby")
    .exec();
  if (!requests) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.status(200).json(requests);
});

exports.updateRequestStatus = catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;
  const status = req.params.status;

  const request = await requestModel
    .findById(requestId)
    .populate("bookedby")
    .exec();

  if (!request) {
    return next(new AppError("No doc found with that id", 404));
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_ID,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  if (status == "rejected") {
    await requestModel.findByIdAndDelete(requestId);

    var mailOptions = {
      from: process.env.NODEMAILER_ID,
      to: request.bookedby.mailId,
      subject: "GATE-PASS Request",
      text: `${request.bookedby.name} your Gate Pass request is rejected`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else console.log("Mail send successfully");
    });
    res.status(200).send('Request is rejected');
  }

  else {
    request.status = "confirmed";
  //send a mail to user that request is confirmed
  var mailOptions = {
    from: process.env.NODEMAILER_ID,
    to: request.bookedby.mailId,
    subject: "GATE-PASS Request",
    text: `${request.bookedby.name} your Gate Pass request is ${request.status}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else console.log("Mail send successfully");
  });

  await request.save();
  res.status(200).send('Request is Confirmed');
  }
});
