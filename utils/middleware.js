const { v4: uuidv4 } = require("uuid");
const logger = require("./logger");

async function checkGrants(req, res, next) {
  let tokenHeader = req.headers.authorization;

  req.originalUrl = req.originalUrl.replace(
    /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/gi,
    ""
  );
  req.originalUrl = req.originalUrl.replace(/\d+|\?.*/gm, "");
  req.originalUrl = req.originalUrl.replace(/\/+$/, "");
  if (constant.AVAILABLE_PATH.indexOf(req.originalUrl) > -1) {
    tokenHeader = req.headers.authorization;
    if (typeof tokenHeader !== "undefined") {
      let token = tokenHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: "Error",
            errors: err,
          });
        }
        req.privilege = decoded.roles;
        req.email = decoded.email;
      });
    }

    return next();
  } else {
    tokenHeader = req.headers.authorization;

    if (typeof tokenHeader !== "undefined") {
      if (tokenHeader.split(" ")[0] !== "Bearer") {
        return res.status(500).send({
          auth: false,
          message: "Error",
          errors: "Incorrect token format",
        });
      }

      let token = tokenHeader.split(" ")[1];
      if (!token) {
        return res.status(403).send({
          auth: false,
          message: "Error",
          errors: "No token provided",
        });
      }

      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: "Error",
            errors: err,
          });
        }
        req.privilege = decoded.roles;
        req.email = decoded.email;
      });

      if (
        req.privilege === "AS_SUPERADMIN" &&
        constant.ALLOW_SUPERADMIN.indexOf(req.originalUrl) > -1
      ) {
        return next();
      }

      if (
        req.privilege === "AS_USER" &&
        constant.ALLOW_USER.indexOf(req.originalUrl) > -1
      ) {
        return next();
      }

      if (
        req.privilege === "AS_BITESHIP" &&
        constant.ALLOW_CLIENT_CREDENTIAL.indexOf(req.originalUrl) > -1
      ) {
        return next();
      }
    }

    logger.info("Invalid Grants #1");

    return res;
  }
}

async function printForwardRequestResponse(req, res, next) {
  res.set("Content-Type", "application/json");
  const { response, status } = res.locals;

  res.status(status || 200);
  res.send(response);

  next();
}

async function recordHit(req, res, next) {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const mid = uuidv4();

  res.locals.mid = mid;
  res.locals.clientIp = clientIp;

  logger.http(req.originalUrl, {
    service: "USER API",
    mid,
    ip: clientIp || "",
  });

  next();
}

module.exports = {
  checkGrants,
  printForwardRequestResponse,
  recordHit,
};
