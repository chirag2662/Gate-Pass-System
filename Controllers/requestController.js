const User = require("./../models/UserModel");
const Request = require("./../models/requestModel");

const getRequest = async (req, res) => {
  const user = User.findById(req.user.id).populate(requests);
  res.render("request");
};
const deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.request.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
