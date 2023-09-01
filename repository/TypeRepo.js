import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TypeRepository {
  async create(name, product, category) {
    const isNumber = Number(product);
    const isCategory = Number(category);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("product id must be a valid integer");
    }
    if (isNaN(isCategory) || !Number.isInteger(isCategory)) {
      throw new Error("category id must be a valid integer");
    }
    if (!name) {
      throw new Error("type name is required!");
    }
    if (!product) {
      throw new Error("product id is required!");
    }
    if (!category) {
      throw new Error("category id is required!");
    }
    try {
      await prisma.type.create({
        data: {
          name: name,
          productId: product,
          categoryId: category,
        },
      });
      return `success create`;
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
              manufacture: true,
            },
          },
          category: {
            select: {
              categoryName: true,
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
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          product: {
            select: {
              manufacture: true,
            },
          },
          category: {
            select: {
              categoryName: true,
            },
          },
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

  async update(id, name, product, category) {
    const isNumber = Number(id);
    const isProduct = Number(product);
    const isCategory = Number(category);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("type id must be a valid integer");
    }
    if (isNaN(isProduct) || !Number.isInteger(isProduct)) {
      throw new Error("product id must be a valid integer");
    }
    if (isNaN(isCategory) || !Number.isInteger(isCategory)) {
      throw new Error("category id must be a valid integer");
    }
    if (!name) {
      throw new Error("type name is required!");
    }
    if (!product) {
      throw new Error("product id is required!");
    }
    if (!category) {
      throw new Error("category id is required!");
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
          categroyId: category,
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
