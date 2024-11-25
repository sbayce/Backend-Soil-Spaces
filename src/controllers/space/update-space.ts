import { Request, Response } from "express"
import { SpaceType } from "@prisma/client"

const updateSpace = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { name, type, capacity, pricePerHour, availability } = req.body
    const { spaceId } = req.params
    
    const space = await prisma.space.findUnique({
        where: {
            id: spaceId
        }
    })
    if(!space) {
        res.status(404).json({
            error: "Space does not exist.",
        });
        return
    }
    if(!name && !type && !capacity && !pricePerHour && !availability) {
        res.status(400).json({
            error: "Provide at least 1 property to update",
        });
        return
    }

    if (type && !Object.values(SpaceType).includes(type)) {
        res.status(400).json({
          error: `Invalid space type. Valid types are: ${Object.values(SpaceType).join(", ")}.`,
        });
        return
    }

    const updatedSpace = await prisma.space.update({
        where: {
            id: spaceId
        },
        data: {
            name,
            type,
            capacity,
            pricePerHour,
            availability
        }
    })
    res.status(200).json({ updatedSpace, message: "Space updated successfully." })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to update space: ${error.message}`)
}
}
export default updateSpace