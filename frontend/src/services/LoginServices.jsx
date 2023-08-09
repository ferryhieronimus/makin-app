import axios from "axios";
import config from "../utils/config";
const baseUrl = config + "/api/login"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
