import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrivingEvent } from "../utils/calculateEvent";

export default function SummaryScreen() {
  const router = useRouter();

  const { score, duration, events } = useLocalSearchParams<{
    score: string;
    duration: string;
    events: string;
  }>();

  const parsedEvents = JSON.parse(events || "[]") as DrivingEvent[];

  const getSafetyRating = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    if (score >= 40) return "Poor";

    return "Unsafe";
  };

  const getRatingTheme = (score: number) => {
    if (score >= 90) return { color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" }; // Emerald
    if (score >= 75) return { color: "#00F5D4", bg: "rgba(0, 245, 212, 0.1)" }; // Teal
    if (score >= 60) return { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" }; // Amber
    if (score >= 40) return { color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" }; // Red
    return { color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" }; // Red
  };

  const formatEventType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getEventColor = (type: string) => {
    if (type === "PHONE_HANDLING" || type === "HARSH_BRAKE") return COLORS.danger;
    return "#F59E0B"; // Amber for turns, accelerations, etc.
  };

  const scoreNum = Number(score || "0");
  const theme = getRatingTheme(scoreNum);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Ambient background glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={headerTitleStyle(theme.color)}>Drive Analysis</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Center Rating HUD */}
      <View style={styles.center}>
        <View style={[styles.emblemContainer, { borderColor: theme.bg }]}>
          <Ionicons name="checkmark-circle-outline" size={50} color={theme.color} />
        </View>

        <Text style={styles.title}>Drive Complete</Text>
        <Text style={[styles.score, { color: theme.color }]}>{score}</Text>

        <View style={[styles.ratingBadge, { backgroundColor: theme.bg, borderColor: theme.bg }]}>
          <Text style={[styles.ratingText, { color: theme.color }]}>
            {getSafetyRating(scoreNum).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Summary Card */}
      <View style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <Ionicons name="information-circle-outline" size={14} color={COLORS.secondary} />
          <Text style={styles.statsTitle}>DRIVE SUMMARY</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Duration</Text>
            <Text style={styles.gridValue}>{duration}</Text>
          </View>

          <View style={styles.gridDivider} />

          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Total Incidents</Text>
            <Text style={[styles.gridValue, parsedEvents.length > 0 && { color: COLORS.danger }]}>
              {parsedEvents.length}
            </Text>
          </View>
        </View>
      </View>

      {/* Event Breakdown Card */}
      <View style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <Ionicons name="warning-outline" size={14} color={COLORS.secondary} />
          <Text style={styles.statsTitle}>EVENT BREAKDOWN</Text>
        </View>

        <View style={styles.eventsContainer}>
          {parsedEvents.length === 0 ? (
            <View style={styles.emptyEvents}>
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.success} />
              <Text style={styles.emptyEventsText}>Perfect drive. No incidents recorded.</Text>
            </View>
          ) : (
            parsedEvents.map((event: DrivingEvent) => (
              <View key={event.timestamp} style={styles.eventRow}>
                <View style={styles.eventInfo}>
                  <View style={[styles.eventDot, { backgroundColor: getEventColor(event.type) }]} />
                  <Text style={styles.eventText}>{formatEventType(event.type)}</Text>
                </View>
                <Text style={[styles.eventPenalty, { color: getEventColor(event.type) }]}>
                  -{event.penalty} pts
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  background: "#080C14",
  card: "rgba(30, 41, 59, 0.3)",
  cardBorder: "rgba(255, 255, 255, 0.05)",
  text: "#FFFFFF",
  secondary: "#64748B",
  accent: "#00F5D4",
  success: "#10B981",
  successBg: "rgba(16, 185, 129, 0.1)",
  danger: "#EF4444",
};

// Helper style constructor to avoid stylesheet limitations
const headerTitleStyle = (color: string) => ({
  fontSize: 16,
  fontWeight: "700" as const,
  color: COLORS.text,
  letterSpacing: -0.2,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  glowTopRight: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 245, 212, 0.04)",
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -120,
    left: -120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(16, 185, 129, 0.04)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  center: {
    alignItems: "center",
    marginVertical: 24,
    gap: 10,
  },
  emblemContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  score: {
    fontSize: 64,
    fontWeight: "800",
    letterSpacing: -2,
    marginVertical: -4,
  },
  ratingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  statsCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 16,
    marginBottom: 16,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statsTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.secondary,
    letterSpacing: 1.5,
  },
  statsGrid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  gridValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },
  gridDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  eventsContainer: {
    minHeight: 48,
    justifyContent: "center",
  },
  emptyEvents: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
  },
  emptyEventsText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "500",
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eventText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
  eventPenalty: {
    fontSize: 13,
    fontWeight: "700",
  },
});
