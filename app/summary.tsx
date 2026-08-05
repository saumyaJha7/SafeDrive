import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrivingEvent } from "../utils/calculateEvent";

export default function SummaryScreen() {
  const router = useRouter();

  const { score, duration, events } = useLocalSearchParams<{
    score: string;
    duration: string;
    events: string;
  }>();

  const parsedEvents = JSON.parse(events) as DrivingEvent[];

  const getSafetyRating = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    if (score >= 40) return "Poor";

    return "Unsafe";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        onPress={() => router.replace("/")}
      >
        <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <View style={styles.center}>
        <Ionicons name="checkmark-circle" size={72} color="#22C55E" />

        <Text style={styles.title}>Drive Complete</Text>

        <Text style={styles.score}>{score}</Text>

        <Text style={styles.rating}>{getSafetyRating(Number(score))}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary</Text>

        <Row title="Drive Duration" value={duration} />

        <Row title="Total Events" value={String(parsedEvents.length)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Event Breakdown</Text>

        {parsedEvents.map((event: DrivingEvent) => {
          return <Row key={event.timestamp} title={event.type} value="1" />;
        })}
      </View>
    </SafeAreaView>
  );
}

function Row({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const COLORS = {
  background: "#0F172A",
  surface: "#1E293B",
  text: "#FFFFFF",
  secondary: "#94A3B8",
  success: "#22C55E",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },

  backText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
  },

  center: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
    gap: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
  },

  score: {
    fontSize: 64,
    fontWeight: "700",
    color: COLORS.text,
  },

  rating: {
    fontSize: 18,
    color: COLORS.secondary,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 15,
  },

  value: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 15,
  },

  homeButton: {
    marginTop: "auto",
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },

  homeButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.7,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
