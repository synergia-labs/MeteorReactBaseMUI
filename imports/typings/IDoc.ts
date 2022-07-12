export interface IDoc {
  _id: string | undefined;
  createdat?: Date;
  updatedat?: Date;
  updatedby?: string | null;
  createdby?: string | null;
  lastupdate?: Date;
  needSync?: boolean;
}
