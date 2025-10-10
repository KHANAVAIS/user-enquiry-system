const e = require("express");
const enquirymodel = require("../../model/enquiry.model");

let enquiryInsert = (req, res) => {
    let { name, email, phone, message } = req.body;
    let enquiry = new enquirymodel({
      name,
      email,
      phone,
      message,
    });
    enquiry
      .save()
      .then(() => {
        res.send({
          status: 1,
          message: "enquory saved succesfully",
        });
      })
      .catch((err) => {
        res.send({
          status: 0,
          message: "error in saving enquiry data",
          error: err,
        });
      });
  }
  let enquiryList = async (req, res) => {
    let enquirylist = await enquirymodel.find();
    res.send({
      status: 1,
      message: "enquiry list",
      data: enquirylist,
    });
  }
  let enquiryDelete = async (req, res) => {
    let enquiryid = req.params.id;
    let deleteenquiry = await enquirymodel.deleteOne({ _id: enquiryid });
    res.send({
      status: 1,
      message: "enquiry deleted succesfully",
      id: enquiryid,
      delres: deleteenquiry,
    });
  }
 let enquiryUpdate =  async (req, res) => {
    let enquiryid = req.params.id;
    let { sName, sEmail, sPhone, sMessage } = req.body;
    let updateobj = {
      name: sName,
      email: sEmail,
      phone: sPhone,
      message: sMessage,
    };
    let updateenquiry = await enquirymodel.updateOne(
      { _id: enquiryid },
      updateobj
    );
    res.send({
      status: 1,
      message: "enquiry updated succesfully",
      id: enquiryid,
    });
  }

  module.exports={enquiryInsert,enquiryList,enquiryDelete,enquiryUpdate};