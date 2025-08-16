const transactionModel = require("../model/TransactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectDate, type, userid } = req.query;
    const query = {
      userid: userid,
    };
    if (frequency !== "custom") {
      query.date = {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      };
    } else {
      query.date = {
        $gte: selectDate[0],
        $lte: selectDate[1],
      };
    }
    if (type !== "all") {
      query.type = type;
    }
    const transactions = await transactionModel.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
