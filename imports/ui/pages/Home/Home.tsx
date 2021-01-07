import React from 'react'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {homeStyles} from "./HomeStyle";

const Home = () => (
  <>
      <Container>
          <Typography style={homeStyles.title}>{'Material-UI Template'}</Typography>
          <p>This is a basic fixed menu template using fixed size containers.</p>
          <p>
              A text container is used for the main container, which is useful for single column layouts.
          </p>

          <img src='/images/wireframe/media-paragraph.png' style={homeStyles.containerHome} />
          <img src='/images/wireframe/paragraph.png' style={homeStyles.containerHome} />
          <img src='/images/wireframe/paragraph.png' style={homeStyles.containerHome} />
          <img src='/images/wireframe/paragraph.png' style={homeStyles.containerHome} />
          <img src='/images/wireframe/paragraph.png' style={homeStyles.containerHome} />
          <img src='/images/wireframe/paragraph.png' style={homeStyles.containerHome} />
          <img src='/images/wireframe/paragraph.png' style={homeStyles.containerHome} />
      </Container>

  </>
)

export default Home
