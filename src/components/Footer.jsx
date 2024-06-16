import React from 'react';
import styled from 'styled-components';
import { MdEmail } from 'react-icons/md';

// Styled component for the footer
const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
`;

const ContactLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const IconWrapper = styled.span`
  margin-right: 8px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterText>
          Contact Us: 
          <ContactLink href="mailto:contact@briankitchen.com">
            <IconWrapper><MdEmail /></IconWrapper>
            recipes@briankitchen.com
          </ContactLink>
        </FooterText>
      </div>
    </FooterContainer>
  );
};

export default Footer;
