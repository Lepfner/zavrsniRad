const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require("./config/database");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions")

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Error: " + err));

  app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

app.use(credentials);
app.use(cors(corsOptions));
 
const authsRouter = require("./routes/authRouter");
app.use("/", authsRouter);
const profileRouter = require("./routes/profileRouter");
app.use("/", profileRouter);
const userRouter = require("./routes/userRouter");
app.use("/", userRouter);
app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));

app.get("/", (req, res) => res.send("index"));
