const router = require("express").Router();
const auth = require("../middleware/auth");
const Menu = require("../models/menuModel");

router.get("/allmenu", async (req, res) => {
  const getMenu = await Menu.find();
  res.json(getMenu);
});

router.post("/addmenu", async (req, res) => {
  try {
    const { itemName, quantity, price, totalPrice, imageUrl } = req.body;

    if (!itemName || !price || !imageUrl)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const newMenu = Menu({
      itemName,
      imageUrl,
      quantity,
      price,
      totalPrice,
    });
    const savedMenu = await newMenu.save();
    res.json(savedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
  res.json(deletedMenu);
});
// router.delete("/delete/:id", auth, async (req, res) => {
//   const selectMenu = await Menu.findOne({ mId: req.user, _id: req.params.id });
//   if (!selectMenu)
//     return res.status(400).json({ msg: "No matching data found" });
//   const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
//   res.json(deletedMenu);
// });

router.put("/update/:id", async (req, res) => {
  try {
    const { itemName, quantity, price, totalPrice, imageUrl } = req.body;
    if (!itemName || !price || !imageUrl)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, {
      itemName,
      imageUrl,
      quantity,
      price,
      totalPrice,
    });
    res.json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
