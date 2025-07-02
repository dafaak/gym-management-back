export interface Attendance extends Document {
  readonly branch_id: number;
  readonly member_id: number;
  readonly branch_alias: string;
  readonly member_name: string;
  readonly timestamp: Date;
  readonly membership_active: boolean;
  readonly valid_branch: boolean;
}
