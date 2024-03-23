import React from "react";
import CodeViewSysFormStyles from "./codeViewSysFormStyles";
import { Box, IconButton, Typography } from "@mui/material";
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface ICodeViewSysFormStyles {
    type: 'schema' | 'docValues';
    document: { [key: string]: any };
}

const CodeViewSysForm: React.FC<ICodeViewSysFormStyles> = ({ type, document }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <Box sx={{ display: open ? 'block' : 'none' }} />
            <CodeViewSysFormStyles.container expanded={open}>
                <CodeViewSysFormStyles.header type={type}>
                    <Typography variant="h6">{type === 'schema' ? 'Schema' : 'DocValues'}</Typography>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <CloseOutlinedIcon/> :<OpenWithOutlinedIcon />}
                    </IconButton>
                </CodeViewSysFormStyles.header>
                <CodeViewSysFormStyles.body>
                    <pre>
                        {JSON.stringify(document, null, 2)}
                    </pre>
                </CodeViewSysFormStyles.body>
            </CodeViewSysFormStyles.container>
        </>
    );
};

export default CodeViewSysForm;