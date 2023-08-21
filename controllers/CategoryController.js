import CategoryRepository from "../repository/CategoryRepo.js"

const categoryRepo = new CategoryRepository()

export const createCategory = async (req, res) => {
    const { category } = req.body
    try {
        const data = await categoryRepo.createCategory(category)
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        if (error.message.includes('Category name is required')) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const data = await categoryRepo.getCategory()
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}

export const getCategoryById = async (req, res) => {
    const id = req.params.id
    try {
        const data = await categoryRepo.getCategoryId(id)
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        if (error.message.includes('not found')) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}

export const updateCategory = async (req, res) => {
    const id = req.params.id
    const { category } = req.body
    try {
        const data = await categoryRepo.updateCategory(category, id)
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        if (error.message.includes('not found')) {
            return res.status(404).json({
                error: error.message
            })
        } else if (error.message.includes('Category name is required')) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}

export const destroyCategory = async (req, res) => {
    const id = req.params.id
    try {
        const data = await categoryRepo.deleteCategory(id)
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        if (error.message.includes('not found')) {
            return res.status(404).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}