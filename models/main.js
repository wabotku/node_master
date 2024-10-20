const db = require("./init")("development");
const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");

exports.findAll = async (req, res) => {
  let response;
  try {
    let users = await db("users").select("*");

    response = {
      rc: generalResp.HTTP_OK,
      rd: "SUCCESS",
      data: users,
    };
  } catch (error) {
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    logger.error(JSON.stringify(res.locals));
  }
  return response;
};

