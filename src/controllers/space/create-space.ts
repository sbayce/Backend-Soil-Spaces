import { Request, Response } from "express"
import { SpaceType } from "@prisma/client"

const createSpace = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { name, type, capacity, pricePerHour, availability } = req.body
    if (!Object.values(SpaceType).includes(type)) {
        res.status(400).json({
          error: `Invalid space type. Valid types are: ${Object.values(SpaceType).join(", ")}.`,
        });
        return
    }
    
    const createdSpace = await prisma.space.create({
        data: {
            name,
            type,
            capacity,
            pricePerHour,
            availability
        }
    })
    res.status(201).json({ createdSpace, message: "Space successfully created" })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to create space: ${error.message}`)
}
}
export default createSpace