const { default: status } = require("http-status");
const AppError = require("../errors/AppError");
const Store = require("../schema/storeSchema");
const User = require("../schema/userSchema");

const createStore = async (payload) => {
  // Simulating the creation of a store
  const user = await Store.findOne({ userId: payload.userId });
  if (user) {
    throw new AppError(
      status.CONFLICT,
      "This user is already created as a store"
    );
  }
  const result = await Store.create(payload);
  return result;
};

const storeService = {
  createStore,
};
module.exports = storeService;
