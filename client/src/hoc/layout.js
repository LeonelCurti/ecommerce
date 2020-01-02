import React, { Component } from 'react';
import Header from '../components/Header_Footer/Header';
import Footer from '../components/Header_Footer/Footer';

export default class Layout extends Component {
  
  
  render() {
    return (
      <React.Fragment>
        <Header/>        
          {this.props.children}        
        <Footer/>
      </React.Fragment>
    )
  }
}
