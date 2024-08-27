import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { BookOpenIcon } from "lucide-react";
import * as React from "react";

interface ValidateEmailType {
  resetPasswordLink?: string;
}

const baseUrl = process.env.BASE_URL;

export const ValidateEmail = ({ resetPasswordLink }: ValidateEmailType) => {
  return (
    <Html>
      <Head />
      <Preview>IMRAD Analyser Email Validation.</Preview>
      <Body style={main}>
        <Container style={container}>
          <BookOpenIcon className="h-6 w-6 text-primary" />
          <Section>
            <Text style={text}>
              Hello there. We are excited to have you on board. Please validate
              your email address by clicking the link below.
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Validate Your Email.
            </Button>
            <Text style={text}>Happy Analysis!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ValidateEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
};

export default ValidateEmailType;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
