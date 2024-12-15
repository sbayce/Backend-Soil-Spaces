import { Request, Response } from "express"

const createInterest = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { name } = req.body

    const existingInterest = await prisma.interest.findUnique({
        where: {
            name
        }
    })
    if(existingInterest) {
        res.status(409).json({ error: "Interest name already exists" })
        return
    }
    const createdInterest = await prisma.interest.create({
        data: {
            name
        }
    })
    res.status(201).json({ createdInterest, message: "Interest successfully created" })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to create interest: ${error.message}`)
}
}
export default createInterest