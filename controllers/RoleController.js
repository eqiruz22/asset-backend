import RoleRepository from "../repository/RoleRepo.js";

const roleRepo = new RoleRepository();

export const createRepo = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await roleRepo.create(name);
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

export const showAllRole = async (req, res) => {
  try {
    const data = await roleRepo.findAll();
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

export const showRoleById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await roleRepo.findId(id);
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

export const updateRole = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const data = await roleRepo.update(id, name);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    } else if (
      error.message.includes("valid integer") ||
      error.message.includes("is required!")
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

export const destroyRole = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await roleRepo.delete(id);
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
