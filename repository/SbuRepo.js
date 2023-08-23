import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SbuRepo {
  async findAll() {
    try {
      const data = await prisma.sbu.findMany({
        select: {
          id: true,
          sbuName: true,
          createdAt: true,
          updatedAt: true,
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

  async create(name, user) {
    const isNumber = Number(user);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("user id must be a valid integer");
    }
    if (!name) {
      throw new Error("SBU name is required!");
    }
    if (!user) {
      throw new Error("user id is required!");
    }
    try {
      await prisma.sbu.create({
        data: {
          sbuName: name,
          createdBy: user,
        },
      });
      return "success create new SBU";
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("SBU id must be a valid integer");
    }
    try {
      const data = await prisma.sbu.findUnique({
        where: {
          id: isNumber,
        },
        select: {
          id: true,
          sbuName: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });
      if (!data) {
        throw new Error(`SBU id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(name, user, id) {
    const isNumber = Number(id);
    const isUser = Number(user);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("SBU id must be a valid integer");
    }
    if (isNaN(isUser) || !Number.isInteger(isUser)) {
      throw new Error("user id must be a valid integer");
    }
    if (!name) {
      throw new Error("SBU name is required!");
    }
    if (!user) {
      throw new Error("user id is required!");
    }
    try {
      const data = await prisma.sbu.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`SBU id ${id} not found`);
      }
      await prisma.sbu.update({
        where: {
          id: isNumber,
        },
        data: {
          sbuName: name,
          createdBy: user,
          updatedAt: new Date(),
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
      throw new Error("SBU id must be a valid integer");
    }
    try {
      const data = await prisma.sbu.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`SBU id ${id} not found`);
      }
      await prisma.sbu.delete({
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

export default SbuRepo;
