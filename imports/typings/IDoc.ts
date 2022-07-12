export interface IDoc {
  _id: string | null;
  createdat?: Date;
  updatedat?: Date;
  updatedby?: string | null;
  createdby?: string;
  lastupdate?: Date;
  needSync?: boolean;
}
