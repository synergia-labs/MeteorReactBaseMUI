import React from 'react';

import Container from '@mui/material/Container';
import * as appStyle from '/imports/materialui/styles';
import {Button} from '@mui/material';
import { BaseButton } from '../../components/SimpleFormFields/Button/baseButton';

const Home = () => (
    <>
        <Container>
            <h1>Material-UI Template</h1>
            <p>This is a basic fixed menu template using fixed size containers.</p>
            <p>
                A text container is used for the main container, which is useful for single column
                layouts.
            </p>

            <img src="/images/wireframe/media-paragraph.png" style={appStyle.containerHome} />
            <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
            <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
            <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
            <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
            <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
            <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
        </Container>
    </>
);

export default Home;
