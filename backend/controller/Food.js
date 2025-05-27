import Food from "../models/Food.js";

export const createFood = async (req, res) => {
  const { CategoryName, name, img, options, desc } = req.body;
  const newFood = new Food({
    CategoryName,
    name,
    img,
    options,
    desc,
  });

  try {
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    console.error("Cannot process the request", error);
    res.status(500).json({ message: "Failed to post" , error: error.message});
  }
};

export const getAllFood = async (req, res) => {
  try {
    const getfood = await Food.find();
    if (getfood.length === 0) {
      return res.status(404).json({ message: "No food found !!" });
    }

    const categoryNames = [
      ...new Set(getfood.map((item) => item.CategoryName)),
    ];

    res.status(200).json([getfood, categoryNames]);
  } catch (error) {
    console.error("failed to fetch", error);
    res.status(500).json({ message: "Failed to fetch food items" });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { options } = req.body;
    if(!options){
      return res.status(400).send("request cannot be empty !!")
    }

    const result = await Food.findByIdAndUpdate(id, {
      options
    },
  {new: true}
);
res.status(200).json(result)
  } catch (error) {
    console.error("error occured !!", error);
  }
};
