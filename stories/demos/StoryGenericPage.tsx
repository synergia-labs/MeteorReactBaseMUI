import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


/** Essa página é apenas demonstrativa, sua função é ser usada para exemplificar os componentes do StotyBook */

function StoryGenericPage({
    sx
}: { sx?: SxProps<Theme> }) {
    return (
        <Box sx={sx ?? { margin: '20px', gap: '20px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h2" gutterBottom>
                Título da Página
            </Typography>

            <Typography variant="h5" gutterBottom>
                Subtítulo da Seção 1
            </Typography>
            <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.
            </Typography>
            <Button variant="contained" color="primary">
                Botão de Ação
            </Button>

            <Typography variant="h5" style={{ marginTop: '20px' }} gutterBottom>
                Subtítulo da Seção 2
            </Typography>
            <Grid container spacing={3}>
                {[1, 2, 3].map((value) => (
                    <Grid item xs={12} sm={4} key={value}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Card {value}</Typography>
                                <Typography>
                                    Card content goes here. Describe the feature or element.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default StoryGenericPage;
