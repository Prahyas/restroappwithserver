const router = require("express").Router();
const auth = require("../middleware/auth");
const Detail = require("../models/detailModel");

router.get("/alldetail", async (req, res) => {
  const getDetail = await Detail.find();
  res.json(getDetail);
});

router.post("/adddetail", async (req, res) => {
  try {
    const {
      restaurantName,
      address,
      contactNumber,
      serviceCharge,
      vat,
    } = req.body;

    if (!restaurantName || !address || !contactNumber || !serviceCharge || !vat)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const newDetail = Detail({
      restaurantName,
      address,
      contactNumber,
      serviceCharge,
      vat,
    });
    const savedDetail = await newDetail.save();
    res.json(savedDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const deletedDetail = await Detail.findByIdAndDelete(req.params.id);
  res.json(deletedDetail);
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
      restaurantName,
      address,
      contactNumber,
      serviceCharge,
      vat,
    } = req.body;
    if (!restaurantName || !address)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const updatedDetail = await Detail.findByIdAndUpdate(req.params.id, {
      restaurantName,
      address,
      contactNumber,
      serviceCharge,
      vat,
    });
    res.json(updatedDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
