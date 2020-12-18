import React from 'react'
import { Meteor } from 'meteor/meteor'
import Container from "@material-ui/core/Container";

const Signout = () => {
  Meteor.logout()
  return (
      <Container style={{width:'100%',maxWidth:400}}>
      <h2 style={{textAlign:"center",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <img src="/images/wireframe/logo.png" style={{maxWidth:100}} />
      <p>{'Volte sempre!!!'}</p>
    </h2>
      </Container>
  )
}


export default Signout
