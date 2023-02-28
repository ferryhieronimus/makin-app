import axios from "axios";
const baseUrl = "https://makin-app.up.railway.app/api/users";

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { signup };
 