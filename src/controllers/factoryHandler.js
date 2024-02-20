import apiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let document = await model.findById(id);
    if (!document) {
      return next(apiError.create("No document Found With This Id", 404));
    }
    await model.remove({ _id: id });
    return res.status(200).json({ message: "Deleted Successfully!" });
  });
};

export const updateOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    let document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) return next(apiError.create("No document to update"));
    return res.status(200).json({ message: "Success!", document });
  });
};
export const createOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    let document = new model(req.body);
    if (!document) return next(apiError.create("No document to save"));
    await document.save();
    return res.status(201).json({ message: "Success", document });
  });
};
export const getOne = (model, population) => {
  return asyncHandler(async (req, res, next) => {
    let query = model.findById(req.params.id);
    if (population) query = query.populate(population);
    const document = await query;
    if (!document) {
      return next(apiError.create("No document found with this ID", 404));
    } else return res.status(200).json({ message: "Success!", document });
  });
};
export const getAll = (model, modelName = "") => {
  return asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    let apiFeature = new ApiFeatures(model.find(filter), req.query)
      .paginate()
      .fields()
      .sort()
      .search(modelName)
      .filter();

    const documents = await apiFeature.mongooseQuery;
    if (!documents.length)
      return next(apiError.create("No documents to show", 404));
    return res
      .status(200)
      .json({ message: "Success!", page: apiFeature.page, documents });
  });
};
