import React from "react";
import { Image } from "react-native";
import * as eva from "@eva-design/eva";
import { Layout, Text, Button, Input } from "@ui-kitten/components";

function SignUp() {
  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ padding: 20 }}>
        <Text category="h2" style={{ padding: 10, fontSize: 36 }}>
          Sign Up
        </Text>
        <Input placeholder="Enter you username .." style={{ marginTop: 20 }} />
        <Input placeholder="Enter you password .." style={{ marginTop: 20 }} />
        <Input placeholder="Enter you email .." style={{ marginTop: 20 }} />
        <Button style={{ marginTop: 20 }}>Register</Button>
      </Layout>
    </Layout>
  );
}

export default SignUp;
