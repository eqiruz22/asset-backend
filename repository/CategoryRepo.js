import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class CategoryRepository {

    async createCategory(category) {
        if (!category) {
            throw new Error('Category name is required')
        }
        try {
            await prisma.category.create({
                data: {
                    categoryName: category,
                }
            })
            return `success create new category`
        } catch (error) {
            throw error
        }
    }

    async getCategory() {
        try {
            const data = await prisma.category.findMany()
            return data
        } catch (error) {
            throw error
        }
    }

    async getCategoryId(id) {
        const isNumber = Number(id);
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error('id category must be a valid integer');
        }
        try {
            const data = await prisma.category.findUnique({
                where: {
                    id: isNumber
                }
            })

            if (!data) {
                throw new Error(`category id ${id} not found`)
            }
            return data
        } catch (error) {
            throw error
        }
    }

    async updateCategory(category, id) {
        const isNumber = Number(id)
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error('id category must be a valid integer');
        }
        if (!category) {
            throw new Error('Category name is required')
        }
        try {
            const data = await prisma.category.findUnique({
                where: {
                    id: isNumber
                }
            })
            if (data) {
                await prisma.category.update({
                    where: {
                        id: isNumber
                    },
                    data: {
                        categoryName: category,
                        updatedAt: new Date()
                    }
                })
                return `update success`
            } else {
                throw new Error(`category id ${id} not found`)
            }
        } catch (error) {
            throw error
        }
    }

    async deleteCategory(id) {
        const isNumber = Number(id)
        if (isNaN(isNumber) || !Number.isInteger(isNumber)) {
            throw new Error('id category must be a valid integer');
        }
        try {
            const data = await prisma.category.findUnique({
                where: {
                    id: isNumber
                }
            })
            if (data) {
                await prisma.category.delete({
                    where: {
                        id: isNumber
                    }
                })
                return `delete success`
            } else {
                throw new Error(`category id ${id} not found`)
            }
        } catch (error) {
            throw error
        }
    }
}

export default CategoryRepository