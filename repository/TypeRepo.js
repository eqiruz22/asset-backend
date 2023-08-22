import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TypeRepository {
  async create(name, product) {
    const isNumber = Number(product);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("product id must be a valid integer");
    }
    if (!name) {
      throw new Error("type name is required!");
    }
    try {
      await prisma.type.create({
        data: {
          name: name,
          productId: product,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await prisma.type.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          product: {
            select: {
              id: true,
              manufacture: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("type id must be a valid integer");
    }
    try {
      const data = await prisma.type.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`type id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, name, product) {
    const isNumber = Number(id);
    const isProduct = Number(product);
    if (!isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("type id must be a valid integer");
    }
    if (!isNaN(isProduct) || !Number.isInteger(isProduct)) {
      throw new Error("product id must be a valid integer");
    }
    if (!name) {
      throw new Error("type name is required!");
    }
    if (!product) {
      throw new Error("product id is required!");
    }
    try {
      const data = await prisma.type.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`type id ${id} not found`);
      }
      await prisma.type.update({
        where: {
          id: isNumber,
        },
        data: {
          name: name,
          productId: product,
        },
      });
      return `update success`;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("type id must be a valid integer");
    }
    try {
      const data = await prisma.type.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`type id ${id} not found`);
      }
      await prisma.type.delete({
        where: {
          id: isNumber,
        },
      });
      return `delete success`;
    } catch (error) {
      throw error;
    }
  }
}

export default TypeRepository;
