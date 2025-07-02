import mongoose from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
  branch_id: Number,
  member_id: Number,
  branch_alias: String,
  member_name: String,
  timestamp: Date,
  membership_active: Boolean,
  valid_branch: Boolean,
});
