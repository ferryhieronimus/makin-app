const config = {
  local: "http://localhost:3000",
  prod: process.env.REACT_APP_PROD_URL
};

export default config[process.env.REACT_APP_NODE_ENV || "local"];
