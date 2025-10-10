let express = require('express');
var mongoose = require('mongoose');
require("dotenv").config();
let cors = require('cors');
let enquirymodel = require("./app/model/enquiry.model");
const enquiryRoutes = require("./app/route/web/enquiryRoutes");




let app = express();//app init
app.use(express.json());
app.use(cors());

//routes
app.use("/api/website/enquiry",enquiryRoutes);




//connect to mongoose
mongoose.connect(process.env.DBURL).then(() => {
    console.log("connected to mongoDB");
    app.listen(process.env.PORT, () => {
      console.log("server is running on port" + process.env.PORT);
    });
  });

