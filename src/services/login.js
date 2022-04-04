import axios from "axios";
const loginUrl = "/api/login";
const signUpUrl="/api/users"

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const signUp=async(credentials) =>{
  console.log("signUp:",credentials)
  const response = await axios.post(signUpUrl, credentials);
  return response.data;
}
export default { login, signUp };
