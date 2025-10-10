let express = require("express");
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate } = require("../../controller/web/enquirycontroller");
let enquiryRoutes = express.Router();

// Remove extra `/api/` because the base route is already "/web/api/enquiry"
enquiryRoutes.post("/insert", enquiryInsert);
enquiryRoutes.get("/list", enquiryList);
enquiryRoutes.delete("/delete/:id", enquiryDelete);
enquiryRoutes.put("/update/:id", enquiryUpdate);

module.exports = enquiryRoutes;
