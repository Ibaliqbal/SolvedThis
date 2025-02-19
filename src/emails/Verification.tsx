import { Button, Heading, Html } from "@react-email/components";
import * as React from "react";

type Props = {
  fullName: string;
};

export default function Verification({ fullName }: Props) {
  return (
    <Html>
      <Heading>Welcome to Our Community {fullName}</Heading>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
