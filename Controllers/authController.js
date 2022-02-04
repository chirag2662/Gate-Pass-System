const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

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
    await requestModel.findByIdAndDelete(requestId); //Send the mail to user that your request is rejected
    return res.redirect("/request/admin");
  }
  const request = await requestModel
    .findById(requestId)
    .populate("bookedby")
    .exec();
  request.status = "confirmed";
  //send a mail to user that request is confirmed
  await request.save();
  if (!request) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.redirect("/request/admin");
});
