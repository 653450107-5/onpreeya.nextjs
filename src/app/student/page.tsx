import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import './student.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


export default function AboutMe() {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <div className="profile-image">
        <img src="/DSC_1363.jpg" alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>Onpreeya Jantakote</h2>
        <p>653450107-5</p>
        <p>"Life isn’t perfect but your outfit can be."</p>
      </div>

      <h2>Skills</h2>
      <div className="skill-bar">
        <p>Html/CSS</p>
        <div className="bar">
          <div className="bar-fill" style={{ width: '60%' }}>60%</div>
        </div>
      </div>
      <div className="skill-bar">
        <p>JavaScript</p>
        <div className="bar">
          <div className="bar-fill" style={{ width: '30%' }}>30%</div>
        </div>
      </div>
      <div className="skill-bar">
        <p>React</p>
        <div className="bar">
          <div className="bar-fill" style={{ width: '10%' }}>10%</div>
        </div>
      </div>
      <div className="skill-bar">
        <p>Photoshop</p>
        <div className="bar">
          <div className="bar-fill" style={{ width: '80%' }}>80%</div>
        </div>
      </div>

      <h2>Contact Me</h2>
      <div className="contact-links">
        <a href="https://www.instagram.com/x.ontmz_/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.facebook.com/onpreeya.jantakote.96" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://github.com/653450107-5" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <p>email : onpreeya.ja@kkumail.com</p>
      </div>
    </div>
  );
}
