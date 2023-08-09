const config = {
  local: "http://localhost:3000",
};

export default config[process.env.REACT_APP_NODE_ENV || "local"];
