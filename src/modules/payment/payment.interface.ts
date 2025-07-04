import { Document } from 'mongoose';

export interface Payment extends Document {
  readonly member_id: number;
  readonly member_name: string;
  readonly branch_id: number;
  readonly branch_name: string;
  readonly membership_id: number;
  readonly membership_name: number;
  readonly payment_date: Date;
  readonly late_payment: boolean;
  readonly amount_paid: number;
  readonly discount_applied: number;
  readonly details: string;
  readonly previous_debt: number;
  readonly new_debt: number;
}
