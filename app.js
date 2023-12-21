const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Custom middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const currentHour = currentDate.getHours();

  // Check if it's a working day (Monday to Friday) and working hours (9 to 17)
  if (
    dayOfWeek >= 1 &&
    dayOfWeek <= 5 &&
    currentHour >= 9 &&
    currentHour < 17
  ) {
    next(); // Continue with the request
  } else {
    res.send(
      "<h1>Sorry, Our Webpage is only available during working hours (Monday to Friday, from 9 to 17). Check Back Again!</h1>"
    );
  }
};

app.use(express.static("public"));
app.use(workingHoursMiddleware);

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
