import DivisiRepository from "../repository/DivisiRepo.js";

const divisiRepo = new DivisiRepository();

export const showAllDivisi = async (req, res) => {
  try {
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

export const showDivisiById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await divisiRepo.findById(id);
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

export const createDivisi = async (req, res) => {
  const { name, sbu } = req.body;
  try {
    const data = await divisiRepo.create(name, sbu);
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

export const updateDivisi = async (req, res) => {
  const { name, sbu } = req.body;
  const id = req.params.id;
  try {
    const data = await divisiRepo.update(id, name, sbu);
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
    return res.status(500).json({
      error: error,
    });
  }
};

export const destroyDivisi = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await divisiRepo.delete(id);
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
