import mongoose from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
  branch_id: Number,
  member_id: Number,
  timestamp: Date,
  membership_active: Boolean,
  valid_branch: Boolean,
});
