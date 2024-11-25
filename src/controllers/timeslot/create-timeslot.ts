import { Request, Response } from "express"

const createTimeslot = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { startTime, endTime } = req.body
    if (!startTime || !endTime) {
        res.status(400).json({
          error: "Provide start and end times.",
        });
        return
    }
    
    const createdTimeslot = await prisma.timeSlot.create({
        data: {
            startTime,
            endTime
        }
    })
    res.status(201).json({ createdTimeslot, message: "Timeslot successfully created" })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to create timeslot: ${error.message}`)
}
}
export default createTimeslot