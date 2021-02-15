const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.MONGO_URL}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  function (err) {
    if (err) {
      return console.log("error connecting database", err);
    }
    console.log("database connection success");
  }
);
