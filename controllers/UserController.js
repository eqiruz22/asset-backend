import UserRepository from "../repository/UserRepo.js";

const userRepo = new UserRepository();

export const showAll = async (req, res) => {
  try {
    const data = await userRepo.getAll();
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

export const createUser = async (req, res) => {
  const { email, name, password, role } = req.body;
  try {
    const data = await userRepo.create(email, name, password, role);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    // const errorShow = error.message;
    // const matchWord =
    //   /Unique constraint failed on the constraint: `Users_email_key`/i;
    // const match = errorShow.match(matchWord);
    // if (match) {
    //   console.log(match[0]);
    // } else {
    //   console.log(match);
    // }
    console.log(error.message);
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

export const getUserById = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await userRepo.getById(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        message: error.message,
      });
    } else if (error.message.includes("a valid integer")) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const updateUser = async (req, res) => {
  let id = req.params.id;
  const { email, name, password, role } = req.body;
  try {
    const data = await userRepo.update(id, email, name, password, role);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("is required!")) {
      return res.status(400).json({
        message: error.message,
      });
    } else if (error.message.includes("not found")) {
      return res.status(404).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await userRepo.delete(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};
