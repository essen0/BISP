import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 110vh;
  padding: 2rem;
  text-align: center;
  color: #333;
  background: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  color: #0d6efd; // Bootstrap primary blue
  margin: 0.5rem 0;
`;

const Paragraph = styled.p`
  max-width: 600px;
  line-height: 1.6;
  margin: 1rem auto;
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
    </Section>
  );
}

export default HomePage;
