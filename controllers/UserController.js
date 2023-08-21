import UserRepository from "../repository/UserRepo.js";

const userRepo = new UserRepository()

export const showAll = async (req, res) => {
    try {
        const data = await userRepo.getAll();
        return res.status(200).json({
            result: data
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        });
    }
}

export const createUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        const data = await userRepo.create(email, firstName, lastName, password);
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error);
        if (
            error.message.includes("email is required!") ||
            error.message.includes("password is required!")
        ) {
            return res.status(400).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: error
        });
    }
}

export const getUserById = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await userRepo.getById(id);
        return res.status(200).json({
            result: data
        });
    } catch (error) {
        console.log(error);
        if (error.message.includes('not found')) {
            return res.status(404).json({
                message: error.message
            });
        } else if (error.message.includes('user id must be a valid integer')) {
            return res.status(400).json({
                message: error.message
            })
        }
        return res.status(500).json({
            error: error
        });
    }
}

export const updateUser = async (req, res) => {
    let id = req.params.id;
    const { email, firstName, lastName, password } = req.body;
    try {
        const data = await userRepo.update(id, email, firstName, lastName, password);
        return res.status(200).json({
            result: data
        });
    } catch (error) {
        console.log(error)
        if (
            error.message.includes('email is required!') ||
            error.message.includes('password is required!')
        ) {
            return res.status(400).json({
                message: error.message
            });
        } else if (error.message.includes('not found')) {
            return res.status(404).json({
                message: error.message
            });
        }
        return res.status(500).json({
            error: error
        });
    }
}

export const deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await userRepo.delete(id)
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error);
        if (error.message.includes('not found')) {
            return res.status(404).json({
                message: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}