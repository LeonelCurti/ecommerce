import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default class Footer extends Component {

  render() {
    return (
      <footer className='bck_b_dark'>
        <div className="container">
          <div className="logo">Waves</div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <FontAwesomeIcon 
                    icon={faCompass}
                    className='icon'/>
                    <div className="nfo">
                      <div>Addres</div>
                      <div>Kramer 2356</div>
                    </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon 
                    icon={faPhone}
                    className='icon'/>
                    <div className="nfo">
                      <div>Phone</div>
                      <div>45645356</div>
                    </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon 
                    icon={faClock}
                    className='icon'/>
                    <div className="nfo">
                      <div>Working hours</div>
                      <div>Mon-Sun/9am-8pm</div>
                    </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon 
                    icon={faEnvelope}
                    className='icon'/>
                    <div className="nfo">
                      <div>Email</div>
                      <div>nfo@waves.com</div>
                    </div>
                </div>
              </div>
            </div>
            <div className="left">
              <h2>Be the first to know</h2>
              <div>Get all the latest infotrmation on events, sales and offers.</div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
