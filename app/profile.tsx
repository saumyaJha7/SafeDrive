import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const profile = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>profile</Text>

      <Button title="Go to home" onPress={() => router.push("/")} />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
