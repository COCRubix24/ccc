import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  invoiceID: String,
  branch: String,
  city: String,
  customerType: String,
  gender: String,
  productLine: String,
  unitPrice: Number,
  quantity: Number,
  tax: Number,
  total: Number,
  date: Date,
  time: String,
  payment: String,
  cogs: Number,
  grossMarginPercentage: Number,
  grossIncome: Number,
  rating: Number,
  createdBy: String
});

export default mongoose.model("Sales", salesSchema);
