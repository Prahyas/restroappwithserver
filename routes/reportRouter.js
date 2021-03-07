const router = require("express").Router();
const auth = require("../middleware/auth");
const Report = require("../models/reportModel");

router.get("/allreport", async (req, res) => {
  const getReport = await Report.find();
  res.json(getReport);
});

router.post("/addreport", async (req, res) => {
  try {
    const {
      userId,
      tId,
      tableName,
      oId,
      orderId,
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
    const newReport = Report({
      userId,
      tId,
      tableName,
      oId,
      orderId,
      displayName,
      customerAddress,
      customerContact,
      date,
      finalPrice,
      totalQuantity,
      cart,
    });
    const savedReport = await newReport.save();
    res.json(savedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const deletedReport = await Report.findByIdAndDelete(req.params.id);
  res.json(deletedReport);
});

router.delete("/delete", async (req, res) => {
  const deletedAllReport = await Report.deleteMany();
  res.json(deletedAllReport);
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
      orderId,
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
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, {
      userId,
      tId,
      tableName,
      oId,
      orderId,
      displayName,
      customerAddress,
      customerContact,
      date,
      finalPrice,
      totalQuantity,
      cart,
    });
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
