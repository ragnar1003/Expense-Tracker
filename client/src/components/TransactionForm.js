import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const TransactionForm = ({
  isModalVisible,
  setIsModalVisible,
  selectedTransaction,
  setSelectedTransaction,
  getTransactions,
}) => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const onFinish = async (values) => {
    try {
      if (selectedTransaction) {
        // Edit transaction
        await axios.put(`/api/v1/transactions/${selectedTransaction._id}`, {
          ...values,
          userid: user._id,
        });
        message.success('Transaction updated successfully!');
      } else {
        // Add new transaction
        await axios.post('/api/v1/transactions', {
          ...values,
          userid: user._id,
        });
        message.success('Transaction added successfully!');
      }
      getTransactions();
      handleCancel();
    } catch (error) {
      message.error('Failed to save transaction.');
    }
  };

  useEffect(() => {
    if (selectedTransaction) {
      form.setFieldsValue({
        ...selectedTransaction,
        date: moment(selectedTransaction.date),
      });
    } else {
      form.resetFields();
    }
  }, [selectedTransaction, form]);

  return (
    <Modal
      title={selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
      open={isModalVisible}
      onCancel={handleCancel}
      onOk={form.submit}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please input the amount!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please select the type!' }]}
        >
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select the category!' }]}
        >
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="transport">Transport</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select the date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionForm;
