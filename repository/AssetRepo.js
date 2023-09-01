import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AssetRepository {
  async findAll() {
    try {
      const data = await prisma.asset.findMany({
        select: {
          id: true,
          usedBy: true,
          serialNumber: true,
          spesification: true,
          createdAt: true,
          updatedAt: true,
          category: {
            select: {
              categoryName: true,
            },
          },
          type: {
            select: {
              name: true,
            },
          },
          status: {
            select: {
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

  async create(used, tag, serialNumber, spesification, category, type, status) {
    const isType = Number(type);
    const isStatus = Number(status);
    const isCategory = Number(category);
    if (isNaN(isType) || !Number.isInteger(isType)) {
      throw new Error("type id must be a valid integer");
    }
    if (isNaN(isStatus) || !Number.isInteger(isStatus)) {
      throw new Error("status id must be a valid integer");
    }
    if (isNaN(isCategory) || !Number.isInteger(isCategory)) {
      throw new Error("category id must be a valid integer");
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
    if (!category) {
      throw new Error("category id is required!");
    }
    if (!type) {
      throw new Error("type id is required!");
    }
    if (!status) {
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
          typeId: type,
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

  async update(
    used,
    tag,
    serialNumber,
    spesification,
    category,
    type,
    status,
    id
  ) {
    const isType = Number(type);
    const isStatus = Number(status);
    const isNumber = Number(id);
    const isCategory = Number(category);
    if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
      throw new Error("asset id must be a valid integer");
    }
    if (isNaN(isCategory) || !Number.isInteger(isCategory)) {
      throw new Error("category id must be a valid integer");
    }
    if (isNaN(isType) || !Number.isInteger(isType)) {
      throw new Error("type id must be a valid integer");
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
    if (!category) {
      throw new Error("category id is required!");
    }
    if (!type) {
      throw new Error("type id is required!");
    }
    if (!type) {
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
          typeId: type,
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
