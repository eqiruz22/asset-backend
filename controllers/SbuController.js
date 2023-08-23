import SbuRepository from "../repository/SbuRepo.js";

const sbuRepo = new SbuRepository();
export const getAllSbu = async (req, res) => {
  try {
    const data = await sbuRepo.findAll();
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

export const createSbu = async (req, res) => {
  const { name, user } = req.body;
  try {
    const data = await sbuRepo.create(name, user);
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
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const getSbuById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await sbuRepo.findById(id);
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

export const updateSbu = async (req, res) => {
  const { name, user } = req.body;
  const id = req.params.id;
  try {
    const data = await sbuRepo.update(name, user, id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message.includes("valid integer") ||
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
      error: error,
    });
  }
};

export const destroySbu = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await sbuRepo.delete(id);
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
