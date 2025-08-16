const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controller/transactionController");

//router object
const router = express.Router();

//routes
//add transaction POST
router.post("/", addTransaction);

//get transactions GET
router.get("/", getAllTransaction);

//edit transaction PUT
router.put("/:id", editTransaction);

//delete transaction DELETE
router.delete("/:id", deleteTransaction);

module.exports = router;
