import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { hasValue } from "/imports/libs/hasValue";

/**
 * Converte uma estrutura de recursos hierárquicos em um formato compatível com o TreeView do MUI.
 *
 * @param resources - Um objeto que contém recursos organizados por namespaces
 * @returns Uma estrutura de árvore hierárquica para uso com o componente TreeView
 *
 * @example
 * ```typescript
 * const resources = {
 *   "module1": {
 *     "default": {
 *       "key1": "value1",
 *       "key2": "value2"
 *     }
 *   }
 * };
 * const treeItems = convertResourceToTreeViewBase(resources);
 * ```
 */
function convertResourceToTreeViewBase(resources: Record<string, any>): TreeViewBaseItem[] {
	const treeViewBaseItems: TreeViewBaseItem[] = [];

	for (const moduleNamespace in resources) {
		if (!Object.prototype.hasOwnProperty.call(resources, moduleNamespace)) continue;

		const children: Array<TreeViewBaseItem | undefined> = Object.entries(resources[moduleNamespace]).map(
			([defaultNamespace, _value]) => {
				const absolutePath = `${moduleNamespace}.${defaultNamespace}`;

				if (!hasValue(_value)) return undefined;

				return {
					id: absolutePath,
					label: defaultNamespace
				};
			}
		);

		treeViewBaseItems.push({
			id: moduleNamespace,
			label: moduleNamespace,
			children: children.filter((child) => child !== undefined) as Array<TreeViewBaseItem>
		});
	}

	return treeViewBaseItems;
}

export default convertResourceToTreeViewBase;
