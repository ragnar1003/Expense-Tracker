import React, { useState, useEffect } from 'react';
import { Table, Card, message, Row, Col, Statistic, Button, Space } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import AppLayout from '../components/Layout';
import TransactionForm from '../components/TransactionForm';

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const getTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/transactions?userid=${user._id}`);
      setTransactions(data);
    } catch (error) {
      message.error('Failed to fetch transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(`/api/v1/transactions/${record._id}`);
      message.success('Transaction deleted successfully!');
      getTransactions();
    } catch (error) {
      message.error('Failed to delete transaction.');
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedTransaction(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      if (acc[t.category]) {
        acc[t.category] += t.amount;
      } else {
        acc[t.category] = t.amount;
      }
      return acc;
    }, {});

  const expenseChartData = Object.keys(expenseData).map((key) => ({
    name: key,
    value: expenseData[key],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

  return (
    <AppLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Dashboard</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedTransaction(null);
            setIsModalVisible(true);
          }}
        >
          Add New
        </Button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic title="Total Income" value={totalIncome} precision={2} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Expense" value={totalExpense} precision={2} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Balance" value={balance} precision={2} />
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Card title="Expense Breakdown">
          <PieChart width={400} height={400}>
            <Pie
              data={expenseChartData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>
      </div>
      <Table
        columns={columns}
        dataSource={transactions}
        loading={loading}
        rowKey="_id"
      />
      <TransactionForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        getTransactions={getTransactions}
      />
    </AppLayout>
  );
};

export default HomePage;
