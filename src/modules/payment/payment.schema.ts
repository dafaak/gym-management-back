import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  branch_id: Number,
  member_id: Number,
  membership_id: Number,
  payment_date: Date,
  late_payment: Boolean,
  amount_paid: Number,
  discount_applied: Number,
  details: String,
});
