import ProductRepository from "../repository/ProductRepo.js";

const productRepo = new ProductRepository();
export const getProduct = async (req, res) => {
    try {
        const data = await productRepo.getAll()
        res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}

export const getProductId = async (req, res) => {
    let id = req.params.id
    try {
        const data = await productRepo.getById(id)
        return res.status(200).json({
            result: data
        })
    } catch (error) {
        console.log(error)
        if (error.message.includes("not found")) {
            return res.status(404).json({
                message: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}

export const createProduct = async (req, res) => {
    const { name, price, user } = req.body;
    try {
        const data = await productRepo.createProduct(name, price, user);
        return res.status(200).json({
            message: 'success created',
            result: data
        });
    } catch (error) {
        console.log(error)
        if (
            error.message.includes('product name is required!') ||
            error.message.includes('product price is required!') ||
            error.message.includes('user id is required') ||
            error.message.includes('product price must be a valid integer')
        ) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: error
        })
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;
    try {
        const result = await productRepo.updateProduct(id, name, price);
        return res.status(200).json({
            message: 'update success',
            result: result,
        });
    } catch (error) {
        console.log(error);
        if (
            error.message.includes("id product must be a valid integer") ||
            error.message.includes("product name is required!") ||
            error.message.includes("product price is required!")
        ) {
            return res.status(400).json({
                message: error.message,
            });
        } else if (error.message.includes("not found")) {
            return res.status(404).json({
                message: error.message,
                result: null
            })
        }
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

export const deleteProduct = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await productRepo.deleteProduct(id)
        return res.status(200).json({
            message: 'deleted',
            result: data
        })
    } catch (error) {
        console.log(error)
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