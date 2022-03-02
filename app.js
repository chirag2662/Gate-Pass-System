const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const requestRouter = require("./routes/requestRoutes");
const globalErrorHandler = require("./controllers/errorController");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

require("./config/passport")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Session
app.use(
  session({
    secret: "gate-pass-system",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

//Passwort Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.user) return next();
  if (req.user.mailId === "20cs01029@iitbbs.ac.in") req.session.isAdmin = true;
  else req.session.isAdmin = false;
  next();
});

const PORT = process.env.PORT || 9000;

// app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/error", (req, res, next) => res.render);
app.use("/user", userRouter);
app.use("/request", requestRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); //if cant find url

app.use(globalErrorHandler);

app.listen(PORT, console.log(`Server running at ${PORT}`));

process.on("unhandledRejection", (err) => {
  // unhandled promise rejection
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
