const transactionModel = require("../model/TransactionModel");
const TransactionModel = require("../model/TransactionModel");
const moment = require("moment");
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectDate, type } = req.body;
    const transaction = await TransactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d"),
            },
          }
        : {
            date: {
              $gte: selectDate[0],
              $lte: selectDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(201).json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send('Transaction Deleted Successfully')
  } catch (error) {
    res.status(500).json(error);
  }
};
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
