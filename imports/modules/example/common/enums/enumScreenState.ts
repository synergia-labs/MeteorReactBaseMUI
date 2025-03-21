enum enumExampleScreenState {
	VIEW = "view",
	EDIT = "edit",
	CREATE = "create"
}

export const exampleScreenStateValidState: Array<string> = Object.values(enumExampleScreenState);
export default enumExampleScreenState;
