import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  branch_id: Number,
  branch_name: String,
  member_id: Number,
  member_name: String,
  membership_id: Number,
  membership_name: String,
  payment_date: Date,
  late_payment: Boolean,
  amount_paid: Number,
  discount_applied: Number,
  details: String,
});
