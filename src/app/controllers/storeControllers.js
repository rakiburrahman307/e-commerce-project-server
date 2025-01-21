const { default: status } = require("http-status");
const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");
const storeService = require("../service/storeService");

const createStore = catchAsync(async (req, res) => {
  const result = await storeService.createStore(req?.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Store created successfully",
    data: result,
  });
});

const storeControllers = {
  createStore,
};
module.exports = storeControllers;
