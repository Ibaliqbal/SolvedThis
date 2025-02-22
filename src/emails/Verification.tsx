import type React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailVerificationProps {
  verificationLink: string;
  username: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  verificationLink,
  username,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Heading style={{ color: "#333", textAlign: "center" }}>
            Email Verification
          </Heading>
          <Text style={{ color: "#555" }}>Hello {username},</Text>
          <Text style={{ color: "#555" }}>
            Thank you for signing up! Please verify your email address by
            clicking the button below:
          </Text>
          <Section style={{ textAlign: "center" }}>
            <Button
              style={{
                backgroundColor: "#007bff",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
              href={verificationLink}
            >
              Verify Email
            </Button>
          </Section>
          <Text style={{ color: "#555" }}>
            If you didn&apos;t create an account, you can safely ignore this
            email.
          </Text>
          <Text
            style={{
              color: "#8898aa",
              fontSize: "12px",
              marginTop: "30px",
            }}
          >
            This email was sent by SolvedThis. Please do not reply to this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailVerification;
