
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

const FooterContainer = styled.footer`
  background-color: #333;
  padding: 20px;
  text-align: center;
 border-radius: 10px;
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
  const location = useLocation();

  // Check if the current path is the first page ("/")
  const isFirstPage = location.pathname === '/';

  // Render the footer only on the first page
  if (!isFirstPage) {
    return null;
  }

  return (
    <FooterContainer>
      <div className="container">
        <FooterText>
        &copy; 2024 kemboibrian. All rights reserved.
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
