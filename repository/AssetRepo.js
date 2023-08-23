import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AssetRepository {
  async findAll() {
    try {
      const data = await prisma.asset.findMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(used, tag, serialNumber, spesification, category, status) {
    const isCategory = Number(category);
    const isStatus = Number(status);
    if (isNaN(isCategory) || !Number.isInteger(isCategory)) {
      throw new Error("category id must be a valid integer");
    }
    if (isNaN(isStatus) || !Number.isInteger(isStatus)) {
      throw new Error("status id must be a valid integer");
    }
    if (!used) {
      throw new Error("used by user is required!");
    }
    if (!tag) {
      throw new Error("tag name is required!");
    }
    if (!serialNumber) {
      throw new Error("serial number is required!");
    }
    if (!spesification) {
      throw new Error("spesification is required!");
    }
    if (!isCategory) {
      throw new Error("category id is required!");
    }
    if (!isStatus) {
      throw new Error("status id is required!");
    }
    try {
      await prisma.asset.create({
        data: {
          usedBy: used,
          tagName: tag,
          serialNumber: serialNumber,
          spesification: spesification,
          categoryId: category,
          statusId: status,
        },
      });
      return `success create new asset`;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("asset id must be a valid integer");
    }
    try {
      const data = await prisma.asset.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`asset id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(used, tag, serialNumber, spesification, category, status, id) {
    const isCategory = Number(category);
    const isStatus = Number(status);
    const isNumber = Number(id);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("asset id must be a valid integer");
    }
    if (isNaN(isCategory) || !Number.isInteger(isCategory)) {
      throw new Error("category id must be a valid integer");
    }
    if (isNaN(isStatus) || !Number.isInteger(isStatus)) {
      throw new Error("status id must be a valid integer");
    }
    if (!used) {
      throw new Error("used by user is required!");
    }
    if (!tag) {
      throw new Error("tag name is required!");
    }
    if (!serialNumber) {
      throw new Error("serial number is required!");
    }
    if (!spesification) {
      throw new Error("spesification is required!");
    }
    if (!isCategory) {
      throw new Error("category id is required!");
    }
    if (!isStatus) {
      throw new Error("status id is required!");
    }
    try {
      const data = await prisma.asset.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`asset id ${id} not found`);
      }
      await prisma.asset.update({
        where: {
          id: isNumber,
        },
        data: {
          usedBy: used,
          tagName: tag,
          serialNumber: serialNumber,
          spesification: spesification,
          categoryId: category,
          statusId: status,
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
      throw new Error("asset id must be a valid integer");
    }
    try {
      const data = await prisma.asset.findUnique({
        where: {
          id: isNumber,
        },
      });
      if (!data) {
        throw new Error(`asset id ${id} not found`);
      }
      await prisma.asset.delete({
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

export default AssetRepository;
