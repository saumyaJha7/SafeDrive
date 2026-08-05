import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View />

        <Pressable
          style={({ pressed }) => [
            styles.profileButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-circle-outline" size={34} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Ionicons name="car-sport-outline" size={72} color="#FFFFFF" />

        <Text style={styles.title}>SafeDrive</Text>

        <Text style={styles.subtitle}>Ready for your next drive</Text>

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/drive")}
        >
          <Text style={styles.startButtonText}>START DRIVE</Text>
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last Drive</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Score</Text>
            <Text style={styles.value}>92</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>18 min</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Rating</Text>
            <Text style={styles.value}>Good</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  background: "#0F172A",
  card: "#1E293B",
  text: "#FFFFFF",
  secondary: "#94A3B8",
  button: "#FFFFFF",
  buttonText: "#0F172A",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  profileButton: {
    padding: 4,
    borderRadius: 20,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
  },

  startButton: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: COLORS.button,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  startButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.buttonText,
    letterSpacing: 0.5,
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    gap: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 15,
    color: COLORS.secondary,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  pressed: {
    opacity: 0.7,
  },
});
