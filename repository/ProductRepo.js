import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductRepository {
  async getAll() {
    try {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          manufacture: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("id product must be a valid integer");
    }
    try {
      const data = await prisma.product.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`product id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(manufacture, user) {
    const isNumber = Number(user);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("user id must be a valid integer");
    }
    if (!manufacture) {
      throw new Error("product manufacture is required!");
    }
    if (!user) {
      throw new Error("user id is required!");
    }
    try {
      await prisma.product.create({
        data: {
          manufacture: manufacture,
          userId: isNumber,
        },
      });
      return "success create product";
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, manufacture, user) {
    const isNumber = Number(id);
    const userNumber = Number(user);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("id product must be a valid integer");
    }
    if (isNaN(userNumber) || !Number.isInteger(userNumber)) {
      throw new Error("user id must be a valid integer");
    }
    if (!manufacture) {
      throw new Error("product manufacture is required!");
    }
    if (!user) {
      throw new Error("user id is required!");
    }
    try {
      const data = await prisma.product.findUnique({
        where: {
          id: isNumber,
        },
      });

      if (!data) {
        throw new Error(`product with id ${id} not found`);
      } else {
        await prisma.product.update({
          where: {
            id: isNumber,
          },
          data: {
            manufacture: manufacture,
            userId: userNumber,
          },
        });
        return "update success";
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("id product must be a valid integer");
    }
    try {
      const data = await prisma.product.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`product with id ${id} not found`);
      } else {
        await prisma.product.delete({
          where: {
            id: isNumber,
          },
        });
        return "delete success";
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;
