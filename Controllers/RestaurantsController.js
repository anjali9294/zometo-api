const RestaurantMode = require("../Models/RestaurantModel");
module.exports.Home = (request, response) => {
  try {
    response.status(200).send({
      status: true,
    });
  } catch (error) {
    response.status(500).send({
      status: true,
      error,
    });
  }
};
module.exports.getRestaurantList = async (request, response) => {
  try {
    let result = await RestaurantMode.find();
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(500).send({
      status: true,
      error,
    });
  }
};

module.exports.getRestaurantListByLocId = async (request, response) => {
  let loc_id = request.params.loc_id;
  try {
    let result = await RestaurantMode.findOne({ location_id: loc_id });
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(500).send({
      status: true,
      error,
    });
  }
};

module.exports.getRestaurantDetailById = async (request, response) => {
  let rest_id = request.params.id;
  try {
    let result = await RestaurantMode.findOne({ _id: rest_id });
    if (result) {
      response.status(200).send({
        status: true,
        result,
      });
    } else {
      response.status(200).send({
        status: true,
        message: "restaurent not found",
      });
    }
  } catch (error) {
    response.status(500).send({
      status: true,
      error,
    });
  }
};

module.exports.filterData = async (request, response) => {
  let { meal_type, location, cuisine, lcost, hcost, sort, page } = request.body;

  page = page === undefined ? 1 : page;

  let perPage = 2;
  let startIndex = page * perPage - perPage;
  let endIndex = page * perPage;

  sort = sort === undefined ? 1 : sort;
  let filter = {};

  if (location !== undefined) filter["location_id"] = location;
  if (meal_type !== undefined) filter["mealtype_id"] = meal_type;
  if (cuisine !== undefined) filter["cuisine_id"] = { $in: cuisine };
  if (hcost !== undefined && lcost !== undefined)
    filter["min_price"] = { $gte: lcost, $lte: hcost };
  console.log(filter);
  let preResult = await RestaurantMode.find(filter, {
    name: 1,
    city: 1,
    locality: 1,
    min_price: 1,
    cuisine: 1,
    image: 1,
  }).sort({
    min_price: sort,
  });
  let result = preResult.slice(startIndex, endIndex);
  response.status(200).send({
    status: true,
    result,
  });
};
