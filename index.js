const logger = require("./utils/logger");
const constant = require("./utils/constant");
const middleware = require("./utils/middleware");
const routes = require("./routes/init");

const cors = require("cors");
const express = require("express");
const app = express();

logger.verbose("=========KICK START=========");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  constant.AVAILABLE_PATH,
  routes.main,
  middleware.recordHit,
  middleware.printForwardRequestResponse
);

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.verbose(`Listening at ${host}:${port}`);
  logger.verbose("=========KICK END=========");
});
