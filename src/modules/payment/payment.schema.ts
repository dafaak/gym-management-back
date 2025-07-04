import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  branch_id: Number,
  branch_name: String,
  member_id: Number,
  member_name: String,
  payment_date: Date,
  late_payment: Boolean,
  total_amount: Number,
  amount_paid: Number,
  discount_applied: Number,
  details: String,
  previous_debt: Number,
  new_debt: Number,
  is_debt_payment: Boolean,
});
