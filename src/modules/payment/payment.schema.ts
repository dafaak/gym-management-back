import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  member_id: Number,
  membership_id: Number,
  payment_date: Date,
  amount_paid: Number,
  discount_applied: Number,
  details: String,
});
