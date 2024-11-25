import { Request, Response } from "express"

const getBooking = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { bookingId } = req.params
    const userId = String(req.userId)

    const booking = await prisma.booking.findUnique({ 
        where: { 
            id: bookingId,
            userId
         } 
    });
    if (!booking) {
        res.status(404).json({ error: "Booking does not exist for this user." })
        return
    }

    res.status(200).json({ booking, message: "Booking data retrieved successfully." })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to fetch booking: ${error.message}`)
}
}
export default getBooking