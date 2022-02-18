import React from "react";
import { View } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";

function AboutUs(props) {
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <Text category="h4">About Us</Text>
      <Text category="p1" style={{ marginVertical: 10 }}>
        Airbnb was born in 2007 when two Hosts welcomed three guests to their
        San Francisco home, and has since grown to 4 million Hosts who have
        welcomed more than 1 billion guest arrivals in almost every country
        across the globe. Every day, Hosts offer unique stays and one-of-a-kind
        activities that make it possible for guests to experience the world in a
        more authentic, connected way.
      </Text>
    </Layout>
  );
}

export default AboutUs;
