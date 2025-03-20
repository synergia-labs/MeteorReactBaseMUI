import React, { useEffect } from "react";
import HomeSection from "../components/section";
import { Button, Menu, TextField } from "@mui/material";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { styled } from "@mui/material/styles";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysUploadFile from "/imports/ui/components/sysFormFields/sysUploadFile/sysUploadFile";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import storageApi from "/imports/base/services/storage/storage.api";
import { enumFileType } from "/imports/base/services/storage/common/types/file.type";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import securityApi from "/imports/base/services/security/security.api";
import { ParamUploadArchiveType } from "/imports/base/services/storage/common/types/uploadArchive";
import { useTracker } from "meteor/react-meteor-data";
import { enumStorageMethods } from "/imports/base/services/storage/common/enums/methods.enum";
import { RenderWithPermission } from "/imports/base/services/security/frontend/components/renderWithPermission";

type storageType = "Image" | "Audio" | "Video" | "Document";
const HomeSectionComponents: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [imageId, setImageId] = React.useState<string>();
	const [fileUrl, setFileUrl] = React.useState<string>();
	const [fileOptions, setFileOptions] = React.useState<storageType>("Image");

	useTracker(() => {
		const methodshandle = securityApi.getAllRolesPublication({});
		const documents = methodshandle.ready() ? securityApi.mongoRole.find().fetch() : [];
		return {
			tasks: documents,
			isLoading: false
		};
	});

	const open = Boolean(anchorEl);
	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const ElementRow = styled(Box)({
		display: "flex",
		flexDirection: "row",
		gap: "2rem",
		flexWrap: "wrap",
		marginTop: "24px"
	});

	const uploadSchema = {
		file: {
			type: "file",
			label: "File",
			required: true,
			accept: ["image/*", "application/pdf"]
		}
	};
	const selectField = {
		options: [
			{ value: "Image", label: "Imagem" },
			{ value: "Audio", label: "Áudio" },
			{ value: "Video", label: "Vídeo" },
			{ value: "Document", label: "Documento" }
		]
	};

	async function handleUploadFile(data: any) {
		const doc: ParamUploadArchiveType = {
			archive: await data.file,
			isRestricted: true
		};
		storageApi[`upload${fileOptions}`](doc, (error, result) => {
			if (error) return;
			setImageId(result._id);
			setFileUrl(result.path);
			// window.open(result.path, '_blank');
		});
	}

	async function handleDeleteImage() {
		storageApi[`delete${fileOptions}`]({ _id: imageId as string }, (error, _) => {
			if (error) return;
			setImageId(undefined);
			setFileUrl(undefined);
		});
	}

	return (
		<HomeSection title="Teste dos componentes">
			<ElementRow>
				<Button startIcon={<SysIcon name={"add"} />}> Contained M </Button>
				<Button startIcon={<SysIcon name={"add"} />} disabled>
					{" "}
					Contained M{" "}
				</Button>
				<Button startIcon={<SysIcon name={"add"} />} size={"small"}>
					{" "}
					Contained S{" "}
				</Button>
				<Button startIcon={<SysIcon name={"add"} />} disabled size={"small"}>
					{" "}
					Contained S{" "}
				</Button>
			</ElementRow>
			<ElementRow>
				<Button variant={"outlined"} startIcon={<SysIcon name={"add"} />}>
					{" "}
					Outlined M{" "}
				</Button>
				<Button variant={"outlined"} startIcon={<SysIcon name={"add"} />} disabled>
					{" "}
					Outlined M{" "}
				</Button>
				<Button variant={"outlined"} startIcon={<SysIcon name={"add"} />} size={"small"}>
					{" "}
					Outlined S{" "}
				</Button>
				<Button variant={"outlined"} startIcon={<SysIcon name={"add"} />} disabled size={"small"}>
					{" "}
					Outlined S{" "}
				</Button>
			</ElementRow>
			<ElementRow sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
				<Button variant={"text"} startIcon={<SysIcon name={"add"} />}>
					{" "}
					Text M{" "}
				</Button>
				<Button variant={"text"} startIcon={<SysIcon name={"add"} />} disabled>
					{" "}
					Text M{" "}
				</Button>
				<Button variant={"text"} startIcon={<SysIcon name={"add"} />} size={"small"}>
					{" "}
					Text S{" "}
				</Button>
				<Button variant={"text"} startIcon={<SysIcon name={"add"} />} disabled size={"small"}>
					{" "}
					Text S{" "}
				</Button>
			</ElementRow>
			<ElementRow>
				<Radio />
				<Radio />
				<Radio checked disabled />
			</ElementRow>
			<ElementRow>
				<Checkbox />
				<Checkbox disabled />
				<Checkbox disabled checked />
			</ElementRow>
			<ElementRow>
				<Fab>
					<SysIcon name={"add"} /> Action
				</Fab>
				<Fab disabled>
					<SysIcon name={"add"} /> Action
				</Fab>
			</ElementRow>
			<ElementRow>
				<Tooltip title={"Teste tooltip"}>
					<IconButton>
						<SysIcon name={"add"} />
					</IconButton>
				</Tooltip>
				<IconButton id={"basic-button"} onClick={handleMenuOpen}>
					<SysIcon name={"moreVert"} />
				</IconButton>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleMenuClose}
					MenuListProps={{
						"aria-labelledby": "basic-button"
					}}>
					<MenuItem onClick={handleMenuClose} disabled>
						<SysIcon name={"person"} color={"primary"} />
						Profile
					</MenuItem>
					<MenuItem onClick={handleMenuClose} selected>
						<SysIcon name={"settings"} /> My account
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
				</Menu>
				<IconButton id={"basic-button"} disabled>
					<SysIcon name={"add"} />
				</IconButton>
			</ElementRow>
			<ElementRow>
				<Slider defaultValue={0} min={0} max={100} step={10} marks />
				<Slider defaultValue={0} min={0} max={100} step={10} />
				<Slider defaultValue={40} min={0} max={100} step={10} disabled />
			</ElementRow>
			<ElementRow>
				<Switch />
				<Switch disabled />
				<Switch disabled checked />
			</ElementRow>
			<ElementRow>
				<TextField placeholder={"Placeholder"} />
				<TextField placeholder={"Placeholder"} error />
				<TextField placeholder={"Placeholder"} disabled />
				<TextField placeholder={"Placeholder"} defaultValue={"Some value"} disabled />
			</ElementRow>
			<ElementRow>
				<Select placeholder={"Placeholder"} value={20}>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
				<Select error value={20}>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
				<Select disabled value={20}>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</ElementRow>
			<Tabs value={"Aba 1"}>
				<Tab label="Aba 1" value={"Aba 1"} />
				<Tab label="Aba 2" />
				<Tab label="Aba 3" disabled />
			</Tabs>
			<ElementRow>
				<SysLoading label="Carregando..." size={"small"} />
				<SysLoading label="Carregando..." />
				<SysLoading label="Carregando..." size={"large"} />
			</ElementRow>
			<ElementRow>
				<SysSelectField
					name="storage"
					options={selectField.options}
					value={fileOptions}
					onChange={(e) => setFileOptions(e.target.value as storageType)}
					placeholder="Selecione o tipo de arquivo que será enviado"
					label="Tipo de arquivo"
				/>
				<RenderWithPermission functionalities={[enumStorageMethods.uploadImage, enumStorageMethods.deleteImage]}>
					<SysForm schema={uploadSchema} onSubmit={handleUploadFile}>
						<SysUploadFile name="file" />
						<SysFormButton>Submit</SysFormButton>
						<SysFormButton disabled={!imageId} onClick={handleDeleteImage}>
							Delete
						</SysFormButton>
					</SysForm>

					{fileUrl?.includes(enumFileType.enum.IMAGE) ? (
						<img src={fileUrl ?? ""} alt="Uploaded file" style={{ maxWidth: "80%" }} />
					) : fileUrl?.includes(enumFileType.enum.AUDIO) ? (
						<audio src={fileUrl ?? ""} controls />
					) : fileUrl?.includes(enumFileType.enum.VIDEO) ? (
						<video src={fileUrl ?? ""} controls />
					) : fileUrl?.includes(enumFileType.enum.DOCUMENT) ? (
						<iframe src={fileUrl ?? ""} style={{ width: "100%", height: "500px" }} />
					) : null}
				</RenderWithPermission>
			</ElementRow>
		</HomeSection>
	);
};

export default HomeSectionComponents;
