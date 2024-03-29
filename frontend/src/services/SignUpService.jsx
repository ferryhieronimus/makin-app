import axios from "axios";
import config from "../utils/config";
const baseUrl = config + "/api/users"

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { signup };
