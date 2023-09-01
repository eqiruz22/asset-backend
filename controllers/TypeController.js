import TypeRepository from "../repository/TypeRepo.js";

const typeRepo = new TypeRepository();

export const getAllType = async (req, res) => {
  try {
    const data = await typeRepo.findAll();
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

export const getTypeById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await typeRepo.findById(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    } else if (error.message.includes("valid integer")) {
      return res.status(400).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const insertType = async (req, res) => {
  const { name, product, category } = req.body;
  try {
    const data = await typeRepo.create(name, product, category);
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

export const updateType = async (req, res) => {
  const { name, product, category } = req.body;
  try {
    const data = await typeRepo.update(id, name, product, category);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message.includes("is required!") ||
      error.message.includes("valid integer")
    ) {
      return res.status(400).json({
        error: error.message,
      });
    } else if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
  }
};

export const destroyType = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await typeRepo.delete(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("valid integer")) {
      return res.status(400).json({
        error: error.message,
      });
    } else if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};
