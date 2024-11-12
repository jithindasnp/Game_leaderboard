import authenticationServices from "../services/authenticationServices.js";

const login = async (req, res) => {
  try {
    const loginResponse = await authenticationServices.loginService(
      req.body,
      res
    );
    return loginResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const adminLoginResponse = await authenticationServices.adminLoginService(
      req.body,
      res
    );
    return adminLoginResponse;
  } catch (error) {
    console.log("error", error);
  }
};
const adminRegister = async (req, res) => {
  try {
    const adminRegisterResponse =
      await authenticationServices.adminRegisterService(req.body, res);
    return adminRegisterResponse;
  } catch (error) {
    console.log("error", error);
  }
};

const playerRegister = async (req, res) => {
  try {
    const playerRegisterResponse =
      await authenticationServices.playerRegisterService(req.body, res);
    return playerRegisterResponse;
  } catch (error) {
    console.log("error", error);
  }
};

export default { login, adminLogin, adminRegister, playerRegister };
