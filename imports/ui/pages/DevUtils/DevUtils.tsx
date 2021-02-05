import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";
import TextField from "/imports/ui/components/SimpleFormFields/TextField/TextField";
import Button from "@material-ui/core/Button";
import SelectField from "/imports/ui/components/SimpleFormFields/SelectField/SelectField";
import CheckBoxField from "/imports/ui/components/SimpleFormFields/CheckBoxField/CheckBoxField";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function DevUtils() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [api, setApi] = React.useState(null);
    const [fields, setFields] = React.useState([]);
    const [formResult, setFormResult] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getField = (doc,schema,field,imports,formFields) => {
        if(schema[field].isImage) {
            const importField = "import SimpleImageUploadBase64 from '/imports/ui/components/SimpleFormFields/ImageUpload/SimpleImageUploadBase64';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<SimpleImageUploadBase64 label={'${schema[field].label}'}  name='${field}' />`)
        } else if(schema[field].isAudio) {
            const importField = "import AudioRecorder from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<AudioRecorder label={'${schema[field].label}'}  name='${field}' />`)
        } else if(schema[field].isUpload) {
            const importField = "import UploadFilesCollection from '/imports/ui/components/SimpleFormFields/UploadFiles/uploadFilesCollection';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<UploadFilesCollection label={'${schema[field].label}'}  name='${field}' doc={${doc.api}Doc}/>`)
        } else if(schema[field].isMapLocation) {
            const importField = "import GoogleApiWrapper from '/imports/ui/components/SimpleFormFields/MapsField/MapsField';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<GoogleApiWrapper label={'${schema[field].label}'}  name='${field}'/>`)
        } else if(schema[field].type===String&&schema[field].options) {
            const importField = "import SelectField from '/imports/ui/components/SimpleFormFields/SelectField/SelectField';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<SelectField options={'${schema[field].options}'} label={'${schema[field].label}'}  name='${field}'/>`)
        } else if(schema[field].type===String&&schema[field].mask) {
            const importField = "import TextMaskField from '/imports/ui/components/SimpleFormFields/TextMaskField/TextMaskField';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<TextMaskField mask={'${schema[field].mask}'} label={'${schema[field].label}'}  name='${field}'/>`)
        } else if(schema[field].type===String) {
            const importField = "import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<TextField label={'${schema[field].label}'}  name='${field}'/>`)
        } else if(schema[field].type===Date) {
            const importField = "import DatePickerField from '/imports/ui/components/SimpleFormFields/DatePickerField/DatePickerField';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<DatePickerField label={'${schema[field].label}'}  name='${field}'/>`)
        } else if((schema[field].type).toString()===([String]).toString()) {
            const importField = "import ChipInput from '/imports/ui/components/SimpleFormFields/ChipInput/ChipInput';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<ChipInput label={'${schema[field].label}'}  name='${field}'/>`)
        } else if(schema[field].type===Object) {
            if(schema[field].subSchema) {
                formFields.push(`<FormGroup formType={'subform'} label={'${schema[field].label}'}  name='${field}>`);
                Object.keys(schema[field].subSchema).forEach(subField=>{
                    getField(doc,schema[field].subSchema,subField,imports,formFields)   ;
                })
                formFields.push(`</FormGroup`);
            } else if(schema[field].checksList) {
                const importField = "import CheckBoxField from '/imports/ui/components/SimpleFormFields/CheckBoxField/CheckBoxField';";
                if(imports.indexOf(importField)===-1) {
                    imports.push(importField);
                }
                formFields.push(`<CheckBoxFieldlabel checksList={'${schema[field].checksList}'} label={'${schema[field].label}'} name='${field}'/>`)
            }
        } else if((schema[field].type).toString()===([Object]).toString()) {
            if(schema[field].subSchema) {
                formFields.push(`<FormGroup formType={'subformArray'} label={'${schema[field].label}'}  name='${field}>`);
                Object.keys(schema[field].subSchema).forEach(subField=>{
                    getField(doc,schema[field].subSchema,subField,imports,formFields)   ;
                })
                formFields.push(`</FormGroup`);
            }
        } else if(schema[field].type===Boolean) {
            const importField = "import ToggleSwitchField from '/imports/ui/components/SimpleFormFields/ToggleField/ToggleField';";
            if(imports.indexOf(importField)===-1) {
                imports.push(importField);
            }
            formFields.push(`<ToggleSwitchField label={'${schema[field].label}'}  name='${field}'/>`)
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="JSON: Form Components" {...a11yProps(0)} />
                    <Tab label="..." {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SimpleForm
                onSubmit={(doc)=>{
                    console.log('Doc',doc);
                    const schema = window.['$app'].api[doc.api].getSchema()

                    const imports = [];
                    const formFields = [];

                    Object.keys(doc.fields).forEach(field=>{
                        if(!schema[field]) {
                            return;
                        }
                        getField(doc,schema,field,imports,formFields);

                    })


                    setFormResult({imports,formFields});

                }}
                >
                    <SelectField
                        onChange={(event)=>{
                            const selectedApi = event.target.value;
                            const schema = window.['$app'].api[selectedApi].getSchema()
                            setApi(selectedApi);
                            setFields(Object.keys(schema));
                            console.log(selectedApi,Object.keys(schema));
                        }}
                    name={'api'}
                    options={Object.keys(window.['$app'].api)}
                    />

                    {fields&&fields.length>0?(                        <CheckBoxField
                        label={'Selecione os campos para gerar o formulário'}
                        name='fields'
                        checksList={fields}
                    />):null}

                    <Button key={'gerar'} color={'primary'} variant="contained" submit="true">
                        {'Gerar'}
                    </Button>
                </SimpleForm>
                {formResult?(
                    <div style={{border:'1px solid #fff',padding:10,display:'flex',flexDirection:'column'}}>
                        <h3>Imports</h3>
                        {formResult&&formResult.imports?formResult.imports.map(val=><div style={{width:'100%'}}>{val}</div>):null}

                        <h4>Fields</h4>
                        {formResult&&formResult.formFields?formResult.formFields.map(val=><div style={{width:'100%'}}>{val}</div>):null}
                    </div>
                ):null}


            </TabPanel>
            <TabPanel value={value} index={1}>
                Em Construção
            </TabPanel>
        </div>
    );
}
