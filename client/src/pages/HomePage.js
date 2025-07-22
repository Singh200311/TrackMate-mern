import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // New States for Budget
  const [budget, setBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => { setEditable(record); setShowModal(true); }} />
          <DeleteOutlined className="mx-2" onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  // Fetch all transactions and calculate total expense
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransaction(res.data);

        const expense = res.data
          .filter((txn) => txn.type === "expense")
          .reduce((acc, txn) => acc + txn.amount, 0);
        setTotalExpense(expense);
      } catch (error) {
        console.log(error);
        message.error("Fetch issue with transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // Fetch budget from backend
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.post("/api/v1/budget/get-budget", { userid: user._id });
        if (res.data.success) {
          setBudget(res.data.budget);
        }
      } catch (error) {
        console.log("Failed to fetch budget", error);
      }
    };
    fetchBudget();
  }, []);

  // Delete transaction
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      message.error("Unable to delete");
    }
  };

  // Add/Edit transaction
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: { ...values, userId: user._id },
          transactionId: editable._id,
        });
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction Added Successfully");
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Budget Alert */}
      {budget > 0 && (
        <div className={`alert ${totalExpense > budget ? 'alert-danger' : 'alert-success'} text-center`}>
          Monthly Budget: ₹{budget} | Spent: ₹{totalExpense}
          {totalExpense > budget && <strong> (Over Budget!)</strong>}
        </div>
      )}

      {/* Budget Form */}
      <Form
        layout="inline"
        onFinish={async (values) => {
          try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post("/api/v1/budget/set-budget", {
              userid: user._id,
              budget: values.budget,
            });
            if (res.data.success) {
              message.success("Budget set successfully");
              setBudget(values.budget);
            }
          } catch (err) {
            message.error("Failed to set budget");
          }
        }}
        className="mb-3"
      >
        <Form.Item name="budget">
          <Input type="number" placeholder="Set Monthly Budget (₹)" />
        </Form.Item>
        <Form.Item>
          <button type="submit" className="btn btn-primary">Set Budget</button>
        </Form.Item>
      </Form>

      {/* Filters */}
      <div className="filters d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />
          )}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>

        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"}`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"}`}
            onClick={() => setViewData("analytics")}
          />
        </div>

        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      {/* Data Table / Analytics */}
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
