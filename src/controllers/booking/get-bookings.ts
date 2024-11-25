import { Request, Response } from "express"

const getBookings = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context

    const bookings = await prisma.booking.findMany({});

    res.status(200).json({ bookings, message: "All bookings retrieved successfully." })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to fetch bookings: ${error.message}`)
}
}
export default getBookings