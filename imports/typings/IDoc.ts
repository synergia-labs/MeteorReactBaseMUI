export interface IDoc {
	_id?: string | undefined;
	createdat?: Date;
	updatedby?: string | null;
	createdby?: string | null;
	lastupdate?: Date;
	sincronizadoEm?: Date;
	needSync?: boolean;
}
