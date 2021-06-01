"use strict";

const mongoose = require("mongoose");

const DBConnection = () => {
  mongoose.connect(
    process.env.DATABASE_CREDENTIALS,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log("Database connected");
    }
  );
};

module.exports = DBConnection;
