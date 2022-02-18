import React from "react";
import { View } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";

function ContactUs(props) {
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <Text category="h4">Contact Us</Text>
      <Text category="p1" style={{ marginVertical: 10 }}></Text>
    </Layout>
  );
}

export default ContactUs;
