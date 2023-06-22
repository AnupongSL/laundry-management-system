const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

app.use("/images", express.static("./images"));
app.use(express.json());

app.use(cors());

app.use(require("./src/routes/route"));

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";

if (env !== 'staging' && env !== 'production') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./src/configs/swagger');
  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  console.log("Press Ctrl + C to quit.");
  console.log(`ENV on: ${env}`);
});