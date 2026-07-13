export interface IDoc {
	_id?: string | undefined;
	createdAt?: Date;
	updatedby?: string | null;
	createdBy?: string | null;
	lastupdate?: Date;
	sincronizadoEm?: Date;
	needSync?: boolean;
}
