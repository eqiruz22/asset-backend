import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();
class UserRepo {
    async getAll() {
        try {
            const data = await prisma.users.findMany();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async create(email, first, last, password) {
        const hash = await bcrypt.hash(password, 10)
        if (!email) {
            throw new Error('email is required!');
        }
        if (!password) {
            throw new Error('password is required!');
        }
        try {
            await prisma.users.create({
                data: {
                    email: email,
                    firstName: first,
                    lastName: last,
                    password: hash
                }
            });
            return 'success create user';
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const isNumber = Number(id);
        if (isNaN(isNumber) || !Number.isInteger) {
            throw new Error('user id must be a valid integer');
        }
        try {
            const data = await prisma.users.findUnique({
                where: {
                    id: isNumber
                }
            })
            if (!data) {
                throw new Error(`user id ${id} not found`)
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async update(id, email, first, last, password) {
        const isNumber = Number(id);
        const hash = await bcrypt.hash(password, 10)
        if (isNaN(isNumber) || !Number.isInteger) {
            throw new Error('user id must be a valid integer');
        }
        if (!email) {
            throw new Error('email is required!')
        }
        if (!password) {
            throw new Error('password is required!')
        }
        try {
            const data = await prisma.users.findUnique({
                where: {
                    id: isNumber
                }
            });
            if (!data) {
                throw new Error(`user id ${id} not found`)
            } else {
                await prisma.users.update({
                    where: {
                        id: isNumber
                    },
                    data: {
                        email: email,
                        firstName: first,
                        lastName: last,
                        password: hash
                    }
                })
                return 'update success';
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const isNumber = Number(id);
        if (isNaN(isNumber) || !Number.isInteger) {
            throw new Error('user id must be a valid integer');
        }
        try {
            const data = await prisma.users.findUnique({
                where: {
                    id: isNumber
                }
            })
            if (!data) {
                throw new Error(`user id ${id} not found`);
            } else {
                await prisma.users.delete({
                    where: {
                        id: isNumber
                    }
                });
                return 'delete success';
            }
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepo;