import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RoleRepository {
  async create(name) {
    if (!name) {
      throw new Error("role name is required!");
    }
    try {
      await prisma.role.create({
        data: {
          roleName: name,
        },
      });
      return `success create new role`;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await prisma.role.findMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findId(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("role id must be a valid integer");
    }
    try {
      const data = await prisma.role.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`role id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, name) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("role id must be a valid integer");
    }
    if (!name) {
      throw new Error("role name is required!");
    }
    try {
      const data = await prisma.role.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`role id ${id} not found`);
      }
      await prisma.role.update({
        where: {
          id: isNumber,
        },
        data: {
          roleName: name,
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
      throw new Error("role id must be a valid integer");
    }
    try {
      const data = await prisma.role.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`role id ${id} not found`);
      }
      await prisma.role.delete({
        where: {
          id: isNumber,
        },
      });
      return "delete success";
    } catch (error) {
      throw error;
    }
  }
}

export default RoleRepository;
