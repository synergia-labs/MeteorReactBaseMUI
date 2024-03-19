import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { exampleSch } from "/imports/modules/example/api/exampleSch";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";

const SysFormTestsPage: React.FC = () => {

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '750px',
                margin: '0 auto',
                padding: '10px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >

            <SysForm
                schema={exampleSch}
                doc={{}}
                mode="create"
                onSubmit={(doc) => {}}
            >
                <Typography variant="h5">SysForm Tests</Typography>
                <SysTextField name="type" />
                <SysTextField name="title" />
                <SysTextField name="typeMulti"/>

                <SysFormButton sx={{alignSelf: 'flex-end'}}>Submit</SysFormButton>

            </SysForm>
        </Box>
    );
};

export default SysFormTestsPage;