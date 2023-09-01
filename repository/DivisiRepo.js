import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DivisiRepository {
  async findAll() {
    try {
      const data = await prisma.divisi.findMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error("id must be a valid integer");
    }
    try {
      const data = await prisma.divisi.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(name, sbu) {
    const sbuId = Number(sbu);
    if (isNaN(sbuId) || !Number.isInteger(sbuId)) {
      throw new Error("sbu id must be a valid integer");
    }
    if (!name) {
      throw new Error("divisi name is required!");
    }
    if (!sbu) {
      throw new Error("sbu id is required!");
    }
    try {
      await prisma.divisi.create({
        data: {
          divisiName: name,
          sbuId: sbuId,
        },
      });
      return `success create new divisi`;
    } catch (error) {
      throw error;
    }
  }

  async update(id, name, sbu) {
    const isId = Number(id);
    const isSbu = Number(sbu);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error("id must be a valid integer");
    }
    if (isNaN(isSbu) || !Number.isInteger(isSbu)) {
      throw new Error("sbu id must be a valid integer");
    }
    if (!name) {
      throw new Error("divisi name is required!");
    }
    if (!sbu) {
      throw new Error("sbu id is required!");
    }
    try {
      const data = await prisma.divisi.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`divisi id ${id} not found`);
      }
      await prisma.divisi.update({
        where: {
          id: isId,
        },
        data: {
          divisiName: name,
          sbuId: isSbu,
        },
      });
      return `update success`;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const isId = Number(id);
    if (isNaN(isId) || !Number.isInteger(isId)) {
      throw new Error("id must be a valid integer");
    }
    try {
      const data = await prisma.divisi.findUnique({
        where: {
          id: isId,
        },
      });
      if (!data) {
        throw new Error(`divisi id ${id} not found`);
      }
      await prisma.divisi.delete({
        where: {
          id: isId,
        },
      });
      return `delete success`;
    } catch (error) {
      throw error;
    }
  }
}

export default DivisiRepository;
