import { Request, Response } from "express"
import { BookingStatus } from "@prisma/client"

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { status} = req.body
    const { bookingId } = req.params
    
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        }
    })
    if(!booking) {
        res.status(404).json({
            error: "Booking does not exist.",
        });
        return
    }

    if(!status) {
        res.status(400).json({
            error: "No status provided.",
        });
        return
    }

    if (!Object.values(BookingStatus).includes(status)) {
        res.status(400).json({
          error: `Invalid status type. Valid types are: ${Object.values(BookingStatus).join(", ")}.`,
        });
        return
    }

    const updatedBooking = await prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status
        }
    })
    res.status(200).json({ updatedBooking, message: "Booking's status updated successfully." })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to update booking status: ${error.message}`)
}
}
export default updateBooking