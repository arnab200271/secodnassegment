require("dotenv").config();
const Databaseconection = require("./app/config/db");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const ejs = require("ejs");
const path = require("path");
const app = express();
Databaseconection();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");

// // session setup
// app.use(
//   session({
//     secret: "secretkey",
//     resave: false,
//     saveUninitialized: true,
//   }),
// );

// // flash setup
// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("uploads"));

//Router
const categoryRouter = require("./app/router/category.Route");
const adminproductRoute = require("./app/router/adminproduct.Router");
const adminDashboardRute = require("./app/router/admin.dashboard");
app.use(categoryRouter);
app.use(adminproductRoute);
app.use(adminDashboardRute);
const PORT = 7272;
app.listen(PORT, () => {
  console.log("server running on ", PORT);
});
