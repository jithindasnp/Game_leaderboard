import admin from "../../../models/adminModel.js";
import playerModel from "../../../models/playerModel.js";
import { generateTokens } from "../../../utilities/token.js";
import bcrypt from "bcryptjs";

const loginService = async (credentials, res) => {
  try {
    let { email, password } = credentials;
    let userData = await playerModel.findOne({ email }, "password");
    if (!userData) {
      return res.status(404).json({
        message: "Please check the email",
        statusCode: 404,
        data: {},
      });
    }
    let passwordCheck = await comparePasswords(password, userData.password);
    if (!passwordCheck)
      return res.status(404).json({
        message: "Please check the password",
        statusCode: 404,
        data: {},
      });
    let tokens = await generateTokens(userData.email, userData.id);
    return res.status(200).json({
      message: "Please check the email",
      statusCode: 200,
      message: "Successfully signed in.",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userType: 1, // 1 for player
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

const adminLoginService = async (credentials, res) => {
  try {
    let { email, password } = credentials;
    let userData = await playerModel.findOne({ email }, "password");
    if (!userData) {
      return res.status(404).json({
        message: "Please check the email",
        statusCode: 404,
        data: {},
      });
    }
    let passwordCheck = await bcrypt.compare(password, userData.password);
    if (!passwordCheck) {
      return res.status(404).json({
        message: "Please check the password",
        statusCode: 404,
        data: {},
      });
    }
    let tokens = await generateTokens(userData.email, userData.id);
    return res.status(200).json({
      message: "Successfully signed in.",
      statusCode: 200,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userType: 0, // 0 for admin
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

const adminRegisterService = async (body, res) => {
  const { name, email, password } = body;

  try {
    const isExists = await admin.findOne({ email });
    if (isExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email already exists!",
        data: {},
      });
    }
    const adminId = uuidv4().slice(0, 6);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new admin({
      name,
      id: adminId,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Admin successfully registered",
      data: { id: adminId, name, email },
    });
  } catch (err) {
    console.error("Error registering admin:", err);
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

const playerRegisterService = async (body, res) => {
  const { name, email, password, score } = body;

  try {
    const isExists = await admin.findOne({ email });
    if (isExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email already exists!",
        data: {},
      });
    }
    const playerId = uuidv4().slice(0, 6);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPlayer = new player({
      name,
      id: playerId,
      score,
      email,
      password: hashedPassword,
    });

    await newPlayer.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Player successfully registered",
      data: { id: playerId, name, score, email },
    });
  } catch (err) {
    console.error("Error registering player:", err);
    return res.status(500).json({ statusCode: 500, message: "Internal error" });
  }
};

export default {
  loginService,
  adminLoginService,
  adminRegisterService,
  playerRegisterService,
};
