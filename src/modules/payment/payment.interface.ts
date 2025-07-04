import { Document } from 'mongoose';

export interface Payment extends Document {
  readonly member_id: number;
  readonly member_name: string;
  readonly branch_id: number;
  readonly branch_name: string;
  readonly payment_date: Date;
  readonly late_payment: boolean;
  readonly total_amount: number;
  readonly amount_paid: number;
  readonly discount_applied: number;
  readonly details: string;
  readonly previous_debt: number;
  readonly new_debt: number;
  readonly is_debt_payment: boolean;
}
