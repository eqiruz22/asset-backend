import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductRepository {
    async getAll() {
        try {
            const data = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    createdAt: true,
                    user: {
                        select: {
                            email: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const isNumber = Number(id);
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error('id product must be a valid integer');
        }
        try {
            const data = await prisma.product.findUnique({
                where: {
                    id: isNumber
                }
            })
            if (!data) {
                throw new Error(`product id ${id} not found`)
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(name, price, user) {
        const isNumber = Number(price)

        if (!name) {
            throw new Error('product name is required!');
        }
        if (!price) {
            throw new Error('product price is required!');
        }
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error('product price must be a valid integer')
        }
        if (!user) {
            throw new Error('user is required!');
        }
        try {
            await prisma.product.create({
                data: {
                    name: name,
                    price: price,
                    userId: user
                }
            });
            return 'success create product'
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, name, price) {
        const isNumber = Number(id);
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error("id product must be a valid integer");
        }
        if (!name) {
            throw new Error("product name is required!");
        }
        if (!price) {
            throw new Error("product price is required!");
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
                        name: name,
                        price: price,
                    },
                });
                return "update success";
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        const isNumber = Number(id)
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error("id product must be a valid integer")
        }
        try {
            const data = await prisma.product.findUnique({
                where: {
                    id: isNumber
                }
            })
            if (!data) {
                throw new Error(`product with id ${id} not found`)
            } else {
                await prisma.product.delete({
                    where: {
                        id: isNumber
                    }
                })
                return 'delete success'
            }
        } catch (error) {
            throw error;
        }
    }

}

export default ProductRepository;