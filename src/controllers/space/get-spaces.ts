import { Request, Response } from "express"

const getSpaces = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { type, minCapacity, maxCapacity, minPrice, maxPrice } = req.query;

    const filters: any = {};
    filters.availability = true;

    if (type) {
      filters.type = type;
    }

    if (minCapacity || maxCapacity) {
      filters.capacity = {};
      if (minCapacity) filters.capacity.gte = Number(minCapacity);
      if (maxCapacity) filters.capacity.lte = Number(maxCapacity);
    }

    if (minPrice || maxPrice) {
      filters.pricePerHour = {};
      if (minPrice) filters.pricePerHour.gte = Number(minPrice);
      if (maxPrice) filters.pricePerHour.lte = Number(maxPrice);
    }
  
    const spaces = await prisma.space.findMany({
      where: filters
    })
    res.status(200).json({ spaces, message: "Spaces successfully retrieved" })
  }catch(error: any){
    console.log(error.message)
    res.status(500).json(`Failed to fetch spaces: ${error.message}`)
}
}
export default getSpaces