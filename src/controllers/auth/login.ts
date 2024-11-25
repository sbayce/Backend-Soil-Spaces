import { Request, Response } from "express"
import bcrypt from "bcrypt";
import createToken from "../../utils/create-token";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { prisma } = req.context;
    const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(400).json("User not found.");
        return;
      }
      if ((await bcrypt.compare(password, user.password)) === false) {
        res.status(400).json("Invalid password.");
        return;
      }
    const token = createToken(user.id, user.role);
    res.cookie("accessToken", token.accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.cookie("refreshToken", token.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    })
    res.status(200).json({ token, message: "Logged in successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default login;