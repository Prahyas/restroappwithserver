const router = require("express").Router();
const auth = require("../middleware/auth");
const Table = require("../models/tableModel");

router.get("/alltable", async (req, res) => {
  const getTable = await Table.find();
  res.json(getTable);
});

router.post("/addtable", async (req, res) => {
  try {
    const { tId, tableName, reserved } = req.body;

    if (!tableName)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const existingTable = await Table.findOne({ tableName: tableName });
    console.log(existingTable);
    if (existingTable)
      return res.status(400).json({ msg: "Table Name already exist." });

    const newTable = Table({
      tId,
      tableName,
      reserved,
    });
    const savedTable = await newTable.save();
    res.json(savedTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const deletedTable = await Table.findByIdAndDelete(req.params.id);
  res.json(deletedTable);
});

router.delete("/delete", async (req, res) => {
  const deletedAllTable = await Table.deleteMany();
  res.json(deletedAllTable);
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { reserved } = req.body;
    if (!reserved)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, {
      reserved,
    });
    res.json(updatedTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
