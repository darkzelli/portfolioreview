import React from 'react';
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Link, Button } from '@react-email/components';

const EmailTemplate = () => (
  <Html>
    <Head />
    <Preview>Welcome to Your Portfolio Review</Preview>
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px' }}>
        <Section style={{ marginBottom: '20px' }}>
          <Heading style={{ color: '#A005FF', fontSize: '28px', marginBottom: '20px' }}>Portfolio Review</Heading>
        </Section>
        <Section>
          <Heading style={{ color: '#333333', fontSize: '24px', marginBottom: '20px' }}>Welcome to Portfolio Review!</Heading>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
            Thank you for joining us! We're excited to help you take your portfolio to the next level.
          </Text>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
            Get started by reviewing your portfolio, receiving feedback from experts, and connecting with other professionals in your field.
          </Text>
          <Section style={{ marginTop: '30px' }}>
            <Button href="https://portfolioreview.me" style={{ backgroundColor: '#007BFF', color: '#ffffff', fontSize: '16px', padding: '12px 24px', textDecoration: 'none', borderRadius: '5px' }}>
              Get Started
            </Button>
          </Section>
        </Section>
        <Section style={{ marginTop: '40px', fontSize: '12px', color: '#888888' }}>
          <Text>If you have any questions, feel free to <Link href="mailto:support@portfolioreview.me" style={{ color: '#007BFF' }}>contact our support team</Link>.</Text>
          <Text>© 2024 Portfolio Review. All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;
