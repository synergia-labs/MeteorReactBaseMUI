import React, { useContext, useEffect, useRef } from "react";
import Style from "./sysSearchSelector.styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Collapse, FormControl, IconButton } from "@mui/material";
import { hasValue } from "/imports/libs/hasValue";
import { SysLoading } from "../../sysLoading/sysLoading";
import SysLabelView from "../../sysLabelView/sysLabelView";
import { useTranslation } from "react-i18next";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import SysSearchSelectorItem from "./item";
import { RenderWithPermission } from "/imports/services/security/frontend/components/renderWithPermission";
import { enumSearchConfig } from "../../../enums/searchConfig";
import { debounce } from "lodash";

interface ISearchFunctionParams {
	search: string;
	limit?: number;
	start?: number;
	[key: string]: any;
}
interface ISearchFunctionReturn {
	[key: string]: any;
	// photo?: string;
}

interface IProps {
	config: {
		valueField: string;
		labelField: string;
		photoField?: string;
	};
	searchFunction: (
		param: ISearchFunctionParams,
		callback: (error: Meteor.Error, result: Array<ISearchFunctionReturn>) => void
	) => void;

	create?: {
		function: () => void;
		label: string;
		functionalities?: string[];
	};
	option?: {
		function: ({}: ISearchFunctionReturn) => void;
		icon: React.ReactNode;
	};
	multiple?:
		| {
				max: number;
				label?: string;
		  }
		| boolean;
	minimumSearchLength?: number;
	limit?: number;
	label?: string;
	placeholder?: string;
	values?: Array<ISearchFunctionReturn>;
	onChange?: (values: Array<ISearchFunctionReturn | any>) => void;
	disabled?: boolean;
	tooltipMessage?: string;
	step?: number;
	viewMultiple?: (items: Array<ISearchFunctionReturn | any>, remove: (item: any) => void) => React.ReactNode;
	emptyText?: string;
	error?: string;
}

// TODO: (Gabriel) - O onCreate deve agora retornar o objeto criado (caso seja) e adiciona-lo automaticamente na lista caso seja multiple
export function SysSearchSelector({
	config,
	searchFunction,
	create,
	option,
	multiple,
	minimumSearchLength = enumSearchConfig.MINIMUM_LENGTH,
	limit = enumSearchConfig.LIMIT,
	label,
	placeholder,
	values,
	onChange,
	disabled,
	tooltipMessage,
	step = enumSearchConfig.STEP,
	viewMultiple,
	emptyText,
	error
}: IProps) {
	const [search, setSearch] = React.useState<string>("");
	const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
	const [items, setItems] = React.useState<Array<ISearchFunctionReturn>>([]);
	const [selectedItems, setSelectedItems] = React.useState<Array<ISearchFunctionReturn>>(values ?? []);
	const [totalItems, setTotalItems] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [subLoading, setSubLoading] = React.useState<boolean>(false);
	const { t } = useTranslation("common");
	const { showNotification } = useContext(AppLayoutContext);

	useEffect(() => {
		setSelectedItems(values ? (Array.isArray(values) ? values : [values]) : []);
	}, [values]);

	function canSearch(text?: string) {
		if (
			disabled ||
			(!text && search?.length < minimumSearchLength) ||
			(text != undefined && text?.length < minimumSearchLength)
		)
			return false;
		return true;
	}

	const debouncedSearch = useRef(
		debounce((text: string) => {
			searchFunction({ search: text, limit }, (err, response: ISearchFunctionReturn) => {
				setLoading(false);
				if (err) showNotification({ type: "error", error: err });
				setItems(response.items);
				setTotalItems(response.count);
			});
		}, 500)
	).current;

	function handleSearch(text: string) {
		setSearch(text);
		if (!canSearch(text)) {
			setIsListOpen(false);
			return;
		}
		setLoading(true);
		setIsListOpen(true);
		debouncedSearch(text);
	}

	function handleCheckbox(item: ISearchFunctionReturn) {
		let newSelectedItems: Array<any> = [];
		if (selectedItems.some((selectedItem) => selectedItem?.[config.valueField] == item?.[config.valueField])) {
			newSelectedItems = selectedItems.filter(
				(selectedItem) => selectedItem?.[config.valueField] != item?.[config.valueField]
			);
		} else {
			if (
				(multiple && typeof multiple != "boolean" && selectedItems?.length >= multiple.max) ||
				(!multiple && selectedItems?.length > 0)
			)
				return;

			newSelectedItems = [...selectedItems, item];
		}
		if (
			(multiple && typeof multiple != "boolean" && newSelectedItems?.length >= multiple.max) ||
			(!multiple && newSelectedItems?.length > 0)
		)
			setIsListOpen(false);

		onChange?.(newSelectedItems);
		setSelectedItems(newSelectedItems);
	}

	function handleLoadMore() {
		setSubLoading(true);
		searchFunction({ start: items?.length, search, limit: step }, (err, response: ISearchFunctionReturn) => {
			setSubLoading(false);
			if (err) showNotification({ type: "error", error: err });
			const newItems = response.items.filter(
				(item: any) => !items?.some((i) => i?.[config.valueField] === item?.[config.valueField])
			);
			setItems([...items, ...newItems]);
		});
	}

	return (
		<ClickAwayListener onClickAway={() => setIsListOpen(false)}>
			<FormControl error={hasValue(error)}>
				<SysLabelView
					label={label}
					tooltipMessage={tooltipMessage}
					disabled={disabled}
					tooltipPosition={"top"}
					helperText={error}>
					<Style.container>
						{hasValue(multiple) || selectedItems?.length == 0 ? (
							<Style.input.textField
								disabled={disabled}
								variant="filled"
								value={search}
								placeholder={placeholder}
								onChange={(e) => handleSearch(e.target.value)}
								onFocus={() => canSearch() && setIsListOpen(true)}
								InputProps={{
									endAdornment: (
										<IconButton
											sx={{ p: 0, m: 0 }}
											disableRipple
											disabled={disabled}
											onClick={() => search?.length > 0 && handleSearch("")}>
											{search?.length == 0 ? <Style.input.searchIcon /> : <Style.input.cleanIcon />}
										</IconButton>
									)
								}}
							/>
						) : (
							<Style.input.box>
								<SysSearchSelectorItem
									key={selectedItems?.[0]?.[config.valueField]}
									item={selectedItems?.[0]}
									config={config}
									multiple={multiple}
									option={option}
									isChecked={false}
									disabled={disabled}
									handleCheckbox={handleCheckbox}
									mode="view"
								/>
							</Style.input.box>
						)}
						<Collapse in={isListOpen && !disabled} unmountOnExit sx={{ width: "100%" }}>
							<Style.list.container>
								{multiple &&
									typeof multiple != "boolean" &&
									items?.length > 0 &&
									!loading &&
									hasValue(multiple?.label) && (
										<>
											<Style.list.header.container>
												<Style.list.header.text variant="body1">
													{multiple?.label + " " + selectedItems?.length + "/" + multiple.max}
												</Style.list.header.text>
											</Style.list.header.container>
											<Style.list.divider />
										</>
									)}
								{loading ? (
									<SysLoading size="medium" withLabel={true} />
								) : items?.length > 0 ? (
									<Style.list.body.container>
										{items.map((item, _) => {
											const isChecked = selectedItems.some(
												(selectedItem) =>
													hasValue(selectedItem) && selectedItem?.[config.valueField] === item?.[config.valueField]
											);
											return (
												<SysSearchSelectorItem
													key={item?.[config.valueField] + "sysSearchSelectorView"}
													item={item}
													config={config}
													multiple={multiple}
													option={option}
													isChecked={isChecked}
													handleCheckbox={handleCheckbox}
													isBright={true}
												/>
											);
										})}
										{items?.length < totalItems && (
											<Style.list.body.footer.container>
												<Style.list.body.footer.button
													variant="text"
													size="small"
													onClick={handleLoadMore}
													startIcon={subLoading ? <SysLoading size="small" /> : <Style.list.body.footer.icon />}>
													{t("generics.action.loadMore")}
												</Style.list.body.footer.button>
											</Style.list.body.footer.container>
										)}
									</Style.list.body.container>
								) : (
									<Style.list.body.emptyText>
										{hasValue(emptyText) ? emptyText : t("generics.callbacks.empty")}
									</Style.list.body.emptyText>
								)}
							</Style.list.container>
						</Collapse>
					</Style.container>
					{hasValue(create) && !disabled && (
						<RenderWithPermission functionalities={create?.functionalities ?? []}>
							<Style.create.button
								size="small"
								startIcon={<Style.create.icon />}
								variant="text"
								onClick={create!.function}>
								{create!.label}
							</Style.create.button>
						</RenderWithPermission>
					)}
					{hasValue(viewMultiple) && selectedItems.length > 0
						? viewMultiple!(selectedItems, handleCheckbox)
						: hasValue(multiple) &&
							selectedItems.length > 0 && (
								<Style.footer>
									{selectedItems.map((item, _) => {
										return (
											<Style.input.box key={item?.[config.valueField] + "sysSeachSelector"}>
												<SysSearchSelectorItem
													item={item}
													config={config}
													multiple={multiple}
													option={option}
													isChecked={true}
													handleCheckbox={handleCheckbox}
													mode="view"
													disabled={disabled}
												/>
											</Style.input.box>
										);
									})}
								</Style.footer>
							)}
				</SysLabelView>
			</FormControl>
		</ClickAwayListener>
	);
}
