const mongoose = require("mongoose");
//Write missing code 
mongoose
  .connect(
   
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
