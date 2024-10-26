import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

export const deleteItem = async (req, res) => {
  await Item.deleteOne({ _id: req.params.id });
  res.status(200).send("OK");
};

export const filterItems = async (req, res) => {
  const { filterName, lowerPrice, upperPrice } = req.body;
  console.log(filterName, lowerPrice, upperPrice);
  let items = [];
  if (filterName == "ทั้งหมด") {
    items = await Item.where(`price`).gte(lowerPrice).lte(upperPrice);
  } else {
    items = await Item.find({ name: filterName })
      .where(`price`)
      .gte(lowerPrice)
      .lte(upperPrice);
  }
  res.status(200).json(items);
};
