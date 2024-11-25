import { Request, Response } from "express"

const deleteSpace = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
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
    
    const deletedSpace = await prisma.space.delete({
        where: {
            id: spaceId
        }
    })
    res.status(200).json({ deletedSpace, message: "Spaces deleted successfully" })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to delete space: ${error.message}`)
}
}
export default deleteSpace