import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  resetPasswordLink?: string;
}

export const ResetPassword = ({
  resetPasswordLink = "https://example.com/reset-password",
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Password untuk Akun Anda</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Reset Password</Heading>
          <Text style={paragraph}>Halo Pengguna SolvedThis,</Text>
          <Text style={paragraph}>
            Kami menerima permintaan untuk mereset password akun Anda. Klik
            tombol di bawah ini untuk membuat password baru. Link ini akan
            kadaluarsa dalam 1 jam.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetPasswordLink}>
              Reset Password
            </Button>
          </Section>
          <Text style={paragraph}>
            Jika Anda tidak meminta reset password, Anda dapat mengabaikan email
            ini. Password Anda tidak akan berubah.
          </Text>
          <Text style={paragraph}>
            Jika Anda mengalami masalah dengan tombol di atas, copy dan paste
            URL berikut ke browser Anda:
          </Text>
          <Link href={resetPasswordLink} style={link}>
            {resetPasswordLink}
          </Link>
          <Text style={footer}>
            Email ini dikirim secara otomatis oleh SolvedThis, mohon jangan
            membalas email ini.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPassword;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "20px 10px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  width: "100%",
};

const heading = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "500",
  textAlign: "center" as const,
  margin: "20px 0",
  [`@media (max-width: 600px)`]: {
    fontSize: "20px",
  },
};

const paragraph = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "16px 0",
  [`@media (max-width: 600px)`]: {
    fontSize: "14px",
    lineHeight: "21px",
  },
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const button = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
  [`@media (max-width: 600px)`]: {
    width: "100%",
    textAlign: "center" as const,
    padding: "16px 24px",
  },
};

const link = {
  color: "#007bff",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginTop: "30px",
};
