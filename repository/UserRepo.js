import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
class UserRepo {
  async getAll() {
    try {
      const data = await prisma.users.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          role: {
            select: {
              id: true,
              roleName: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(email, name, password, role) {
    const hash = await bcrypt.hash(password, 10);
    if (!email) {
      throw new Error("email is required!");
    }
    if (!name) {
      throw new Error("name is required!");
    }
    if (!password) {
      throw new Error("password is required!");
    }
    try {
      await prisma.users.create({
        data: {
          email: email,
          name: name,
          password: hash,
          roleId: role,
        },
      });
      return "success create user";
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger) {
      throw new Error("user id must be a valid integer");
    }
    try {
      const data = await prisma.users.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`user id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, email, name, password, role) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger) {
      throw new Error("user id must be a valid integer");
    }
    if (!email) {
      throw new Error("email is required!");
    }
    if (!name) {
      throw new Error("name is required!");
    }
    try {
      const data = await prisma.users.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`user id ${id} not found`);
      } else {
        if (!password) {
          await prisma.users.update({
            where: {
              id: isNumber,
            },
            data: {
              email: email,
              name: name,
              roleId: role,
            },
          });
        } else {
          const hash = await bcrypt.hash(password, 10);
          await prisma.users.update({
            where: {
              id: isNumber,
            },
            data: {
              email: email,
              name: name,
              password: hash,
              roleId: role,
            },
          });
        }
        return "update success";
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger) {
      throw new Error("user id must be a valid integer");
    }
    try {
      const data = await prisma.users.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`user id ${id} not found`);
      } else {
        await prisma.users.delete({
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

export default UserRepo;
