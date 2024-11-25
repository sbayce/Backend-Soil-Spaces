import { Request, Response } from "express"

const bookSpace = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { spaceId } = req.params
    const userId = String(req.userId)
    const { timeSlotId, date } = req.body
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            name: true,
            email: true
        }
    })

    if (!user) {
        res.status(404).json({ error: "User not found" })
        return
    }

    if (!spaceId || !date || !timeSlotId) {
        res.status(400).json({ error: "All fields are required." })
        return
    }
    const space = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!space) {
        res.status(404).json({ error: "Space not found." })
        return
    }
    const timeSlot = await prisma.timeSlot.findUnique({ where: { id: Number(timeSlotId) } });
    if (!timeSlot) {
        res.status(404).json({ error: "Time slot does not exist." })
        return
    }
    const dateObject = new Date(date);
    const existingBooking = await prisma.booking.findFirst({
        where: {
            spaceId,
            date: dateObject,
            timeSlotId
        }
    })
    if (existingBooking) {
        res.status(409).json({ error: "This time slot is already booked for the selected date." })
        return
    }
    const booking = await prisma.booking.create({
        data: {
            userId: userId,
            userName: user.name,
            userEmail: user.email,
            date: dateObject,
            spaceId,
            timeSlotId,
        }
    })
    res.status(201).json({ booking, message: "Space booked successfully." })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to book space: ${error.message}`)
}
}
export default bookSpace