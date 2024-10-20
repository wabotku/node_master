const logger = require("../utils/logger");
const generalResp = require("../utils/httpResp");
const { v4: uuidv4 } = require("uuid");
const main = require("../models/main");

exports.getData = async (req, res, next) => {
  let response;
  
  try {
    let result = await main.findAll();

    response = {
      rc: result.rc,
      rd: result.rd,
      data: result.data,
    };

    res.locals.response = JSON.stringify(response);
  } catch (error) {
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      data: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
    logger.error(JSON.stringify(res.locals));
  }

  next();
};

exports.postData = async (req, res, next) => {
  let response;
  try {
    response = {
      rc: generalResp.HTTP_OK,
      rd: "POST",
      data: [],
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      result: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
    logger.error(JSON.stringify(res.locals));
  }

  next();
};

exports.putData = async (req, res, next) => {
  let response;
  try {
    response = {
      rc: generalResp.HTTP_OK,
      rd: "PUT",
      data: [],
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      result: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
    logger.error(JSON.stringify(res.locals));
  }

  next();
};

exports.deleteData = async (req, res, next) => {
  let response;
  try {
    response = {
      rc: generalResp.HTTP_OK,
      rd: "DELETE",
      data: [],
    };
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    response = {
      rc: error.rc || 500,
      rd: error.rd || "Some error occurred while retrieving data.",
      result: null,
    };

    res.locals.status = error.rc || 500;
    res.locals.response = JSON.stringify(response);
    logger.error(JSON.stringify(res.locals));
  }

  next();
};
