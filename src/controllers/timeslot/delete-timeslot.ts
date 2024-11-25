import { Request, Response } from "express"

const deleteTimeslot = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { timeslotId } = req.params
    const id = Number(timeslotId)
    const timeslot = await prisma.timeSlot.findUnique({
        where: {
            id
        }
    })
    if (!timeslot) {
        res.status(404).json({
          error: "Timeslot does not exist.",
        });
        return
    }
    
    const deletedTimeslot = await prisma.timeSlot.delete({
        where: {
            id
        }
    })
    res.status(200).json({ deletedTimeslot, message: "Timeslot deleted successfully." })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to delete timeslot: ${error.message}`)
}
}
export default deleteTimeslot