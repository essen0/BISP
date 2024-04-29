import React from 'react';
import styled from 'styled-components';

import mainPageImage from './images/1imgHomePage.jpeg'; // Update the path accordingly

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  color: #333;
  background: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const SignUpButton = styled.button`
  padding: 20px 40px;
  background-color: orange;
  color: #333;
  font-weight: bold;
  border: none;
  border-radius: 20px; // Rounded edges
  cursor: pointer;
  position: absolute; // Position the button absolutely within the ImageContainer
  bottom: -20px; // Half of the button's height to make it centered at the bottom of the image
  left: 50%; // Start at the center
  transform: translateX(-50%); // Adjust for exact centering
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Light shadow for depth

  &:hover {
    background-color: #cc0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative; // Set position to relative to contain the absolute button
  margin-bottom: 2rem;
`;
const Image = styled.img`
  max-width: 100%; // Ensures image is responsive and does not overflow
  height: 40rem; // Keeps the aspect ratio of the image
`;


const Heading = styled.h1`
  color: #0d6efd; // Bootstrap primary blue
  margin: 0.5rem 0;
`;

const Paragraph = styled.p`
  max-width: 800px;
  line-height: 2;
  margin: 1rem auto;
  font-size:1.4rem;
`;

const List = styled.ul`
  text-align: left;
  list-style-type: none;
  padding: 0;
  margin: 1rem auto;
`;

const ListItem = styled.li`
  background: #e9ecef;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size:1.2rem;
`;

const ContactSection = styled.div`
  padding: 2rem;
  background: #f1f1f1; // Slightly different background to distinguish the section
  border-top: 1px solid #ccc; // Visual separation from previous content
  width: 100%;
  text-align: center; // Center align the content
`;

const ContactHeading = styled.h3`
  color: #0d6efd;
  margin: 0.5rem 0;
`;

const ContactInfo = styled.p`
  color: #333;
  font-size: 16px; // Slightly larger font for readability
  margin: 10px 0; // Space out the lines
`;

const HomePage: React.FC = () => {
  return (
    <Section id="homepage">
      <Heading>Welcome to TelemedicineUz</Heading>
      <Heading as="h2">Innovating Healthcare Across Uzbekistan</Heading>
      <Paragraph>
        At TelemedicineUz, we are pioneering the integration of technology and 
        healthcare to bring advanced medical services to every corner of Uzbekistan. 
        Our mission is to connect patients with top medical professionals regardless 
        of geographical barriers.
      </Paragraph>
      <ImageContainer>
        <Image src={mainPageImage} alt="TelemedicineUz Main Page" />
        {/* <SignUpButton>Sign Up</SignUpButton> Place the Sign Up button inside the ImageContainer */}
      </ImageContainer>
      
      <Heading as="h3">Our Mission</Heading>
      <Paragraph>
        To revolutionize the healthcare landscape of Uzbekistan through telemedicine 
        by providing immediate access to quality healthcare services, minimizing the 
        need for travel and waiting times, and fostering a network of medical expertise 
        that reaches you, wherever you are.
      </Paragraph>
      
      <Heading as="h3">Our Vision</Heading>
      <Paragraph>
        We envision a future where every individual in Uzbekistan has the opportunity 
        to experience the best of healthcare within the comfort and safety of their home. 
        TelemedicineUz aims to bridge the urban-rural divide, ensuring that innovative 
        medical care is not a privilege but a right accessible to all.
      </Paragraph>
      
      <Heading as="h3">Plans for Expansion</Heading>
      <List>
        <ListItem>Nationwide Connectivity: Expanding our telecommunications infrastructure for remote consultations.</ListItem>
        <ListItem>Local Medical Hubs: Establishing equipped local hubs as nodes for our telemedicine network.</ListItem>
        <ListItem>Partnerships: Collaborating to continuously improve our services.</ListItem>
        <ListItem>Training and Development: Investing in our healthcare providers to stay ahead in telehealth technologies.</ListItem>
        <ListItem>Community Outreach: Conducting programs to educate on telemedicine benefits.</ListItem>
      </List>
      <Paragraph>
        Join us on our journey to make healthcare accessible, reliable, and efficient 
        for every citizen of Uzbekistan with TelemedicineUz – Your Health, Our Technology, 
        One Nation Connected.
      </Paragraph>
      <ContactSection>
        <ContactHeading>Contact Us</ContactHeading>
        <ContactInfo>Telephone Number: +998 99 999 99 99</ContactInfo>
        <ContactInfo>Address: Istiqbol ko'chasi 12, 100047, Toshkent, Toshkent, Узбекистан</ContactInfo>
      </ContactSection>
    </Section>
  );
}

export default HomePage;
