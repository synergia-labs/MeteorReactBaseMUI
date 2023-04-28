import React from 'react';
// @ts-ignore
import FileInputComponent from 'react-file-input-previews-base64';
import { hasValue } from '../../../../libs/hasValue';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import * as appStyle from '/imports/materialui/styles';

export default ({
    name,
    label,
    value,
    onChange,
    readOnly,
    error,
    schema,

    ...otherProps
}: IBaseSimpleFormComponent) => {
    const isAvatar = (schema && schema.isAvatar) || otherProps.isAvatar || false;

    const onFileSelect = (fileData: any) => {
        let imgValue;
        if (fileData) {
            if (Array.isArray(fileData)) {
                imgValue = fileData[0].base64;
            } else {
                imgValue = fileData.base64;
            }
            onChange({ name, target: { name, value: imgValue } }, { name, value: imgValue });
        }
    };

    const deleteImageCompact = () => {
        onChange({ target: { value: '' } }, { name, value: '' });
    };

    if (readOnly) {
        return (
            <Box
                src={value}
                key={name}
                sx={
                    isAvatar
                        ? { width: '120px', justifyContent: 'center', alignItems: 'center' }
                        : { width: '100%', justifyContent: 'center', alignItems: 'center' }
                }
                component={'img'}
            />
        );
    }

    return (
        <Box
            sx={
                !!isAvatar
                    ? {
                          display: 'flex',
                          flexDirection: 'column',

                          width: '120px',
                          marginRight: '0.5rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }
                    : {
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }
            }
        >
            <FileInputComponent
                defaultFiles={hasValue(value) ? [value] : undefined}
                labelText={''}
                name={name}
                parentStyle={
                    !!isAvatar
                        ? { width: '88px' }
                        : {
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                          }
                }
                imageContainerStyle={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
                multiple={false}
                callbackFunction={onFileSelect}
                accept="image/*"
                buttonComponent={
                    !hasValue(value) ? (
                        <Box
                            id="Selecionar imagem"
                            sx={
                                !!isAvatar
                                    ? {
                                          display: 'flex',
                                          width: '120px',
                                          height: '120px',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          cursor: 'pointer',
                                          border: '1px dashed #BDBDBD',
                                          color: '#BDBDBD',
                                          flexWrap: 'wrap',
                                      }
                                    : {
                                          display: 'flex',
                                          minWidth: '100%',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          cursor: 'pointer',
                                          border: '1px dashed #BDBDBD',
                                          padding: '3rem',
                                          color: '#BDBDBD',
                                      }
                            }
                        >
                            {isAvatar ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption2"
                                        sx={{ color: appStyle.primariaEscura }}
                                    >
                                        {'+'}
                                    </Typography>
                                    <Typography
                                        variant="caption2"
                                        sx={{
                                            color: appStyle.primariaEscura,
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {'Adicionar'}
                                    </Typography>
                                    <Typography
                                        variant="caption2"
                                        sx={{
                                            color: appStyle.primariaEscura,
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {'imagem'}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography
                                    variant="corpo1"
                                    sx={{
                                        color: appStyle.primariaEscura,
                                        textAlign: 'center',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {'+ Adicionar imagem'}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <div />
                    )
                }
            />
            {!readOnly && hasValue(value) ? (
                <Box
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={deleteImageCompact}
                    >
                        Deletar
                    </Button>
                </Box>
            ) : null}
        </Box>
    );
};
