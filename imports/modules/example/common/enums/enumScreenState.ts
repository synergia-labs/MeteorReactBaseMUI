enum EnumExampleScreenState {
	VIEW = "view",
	EDIT = "edit",
	CREATE = "create"
}

export const exampleScreenStateValidState: Array<string> = Object.values(EnumExampleScreenState);
export default EnumExampleScreenState;
