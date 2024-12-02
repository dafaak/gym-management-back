import { Document } from 'mongoose';
export interface Payment extends Document {
  readonly member_id: number;
  readonly membership_id: number;
  readonly payment_date: Date;
  readonly amount_paid: number;
  readonly discount_applied: number;
  readonly details: string;
}
