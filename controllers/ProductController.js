import ProductRepository from "../repository/ProductRepo.js";

const productRepo = new ProductRepository();
export const getProduct = async (req, res) => {
  try {
    const data = await productRepo.getAll();
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getProductId = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await productRepo.getById(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const createProduct = async (req, res) => {
  const { manufacture, user } = req.body;
  try {
    const data = await productRepo.create(manufacture, user);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("is required!")) {
      return res.status(400).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { manufacture, user } = req.body;
  try {
    const data = await productRepo.updateProduct(id, manufacture, user);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message.includes("a valid integer") ||
      error.message.includes("is required!")
    ) {
      return res.status(400).json({
        error: error.message,
      });
    } else if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await productRepo.deleteProduct(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};
