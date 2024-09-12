const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction
} = require("../controller/transactionController");

//router object
const router = express.Router();
//routes
//add transaction POST ME
router.post("/add-transaction", addTransaction);

//edit transaction POST ME
router.post("/edit-transaction", editTransaction);

//delete transaction POST ME
router.post("/delete-transaction", deleteTransaction);

//get transaction GET ME
router.post("/get-transaction", getAllTransaction);

module.exports = router;
