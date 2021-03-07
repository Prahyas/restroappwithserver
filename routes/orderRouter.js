const router = require("express").Router();
const auth = require("../middleware/auth");
const Order = require("../models/orderModel");

router.get("/allorder", async (req, res) => {
  const getOrder = await Order.find();
  res.json(getOrder);
});

router.post("/addorder", async (req, res) => {
  try {
    const {
      userId,
      tId,
      tableName,
      oId,
      displayName,
      customerAddress,
      customerContact,
      date,
      finalPrice,
      totalQuantity,
      cart,
    } = req.body;

    if (!oId)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const newOrder = Order({
      userId,
      tId,
      tableName,
      oId,
      displayName,
      customerAddress,
      customerContact,
      date,
      finalPrice,
      totalQuantity,
      cart,
    });
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  res.json(deletedOrder);
});

router.delete("/delete", async (req, res) => {
  const deletedAllOrder = await Order.deleteMany();
  res.json(deletedAllOrder);
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
    const {
      userId,
      tId,
      tableName,
      oId,
      displayName,
      customerAddress,
      customerContact,
      date,
      finalPrice,
      totalQuantity,
      cart,
    } = req.body;
    if (!oId)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      userId,
      tId,
      tableName,
      oId,
      displayName,
      customerAddress,
      customerContact,
      date,
      finalPrice,
      totalQuantity,
      cart,
    });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
