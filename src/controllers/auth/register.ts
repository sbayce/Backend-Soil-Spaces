import { Request, Response } from "express"
import bcrypt from "bcrypt";
import createToken from "../../utils/create-token";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const { prisma } = req.context;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({error: "User already exists."});
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
    });
    const token = createToken(user.id, role);
    res.cookie("accessToken", token.accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    res.cookie("refreshToken", token.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
    res.status(200).json({ token, message: "Registered successfully." })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json(error);
  }
};

export default register;