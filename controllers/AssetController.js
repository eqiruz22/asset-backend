import AssetRepository from "../repository/AssetRepo.js";

const assetRepo = new AssetRepository();

export const showAllAsset = async (req, res) => {
  try {
    const data = await assetRepo.findAll();
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

export const showAssetById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await assetRepo.findById(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.include("valid integer")) {
      return res.status(400).json({
        error: error.message,
      });
    }
    if (error.message.include("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const createAsset = async (req, res) => {
  const { used, tag, serialNumber, spesification, category, type, status } =
    req.body;
  try {
    const data = await assetRepo.create(
      used,
      tag,
      serialNumber,
      spesification,
      category,
      type,
      status
    );
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message.include("is required!") ||
      error.message.include("valid integer")
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

export const updateAsset = async (req, res) => {
  const id = req.params.id;
  const { used, tag, serialNumber, spesification, category, type, status } =
    req.body;
  try {
    const data = await assetRepo.update(
      used,
      tag,
      serialNumber,
      spesification,
      category,
      type,
      status,
      id
    );
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message.include("is required!") ||
      error.message.include("valid integer")
    ) {
      return res.status(400).json({
        error: error.message,
      });
    } else if (error.message.include("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};

export const destroyAsset = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await assetRepo.delete(id);
    return res.status(200).json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.include("valid integer")) {
      return res.status(400).json({
        error: error.message,
      });
    } else if (error.message.include("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
};
