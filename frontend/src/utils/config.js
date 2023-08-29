const config = {
  local: "http://localhost:3000",
  prod: "https://api-makin.hieronimusferry.com"
};

export default config[process.env.REACT_APP_NODE_ENV || "local"];
