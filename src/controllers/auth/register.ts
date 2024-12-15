import { Request, Response } from "express"
import bcrypt from "bcrypt";
import createToken from "../../utils/create-token";

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, occupation, email, password, confirmPassword, role, interests } = req.body;
    const { prisma } = req.context

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      res.status(400).json({error: "User already exists."});
      return
    }
    if(password !== confirmPassword) {
      res.status(400).json({ error: "Passwords don't match." })
      return
    }

    const validInterests = await prisma.interest.findMany({
      where: {
        id: {
          in: interests,
        },
      },
    })

    if (validInterests.length !== interests.length) {
      res.status(400).json({ error: "Some interests are invalid" })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        occupation: occupation || undefined,
        email,
        password: hashedPassword,
        role,
        interests: {
          connect: interests.map((interestId: number) => ({ id: interestId }))
        }
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