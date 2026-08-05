import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Ambient background glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      {/* Header / Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandTitle}>SafeDrive</Text>
          <Text style={styles.brandSubtitle}>TELEMATICS DASHBOARD</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.profileButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/profile")}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </Pressable>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Status Hero Section */}
        <View style={styles.statusHero}>
          <View style={styles.ringOuter}>
            <View style={styles.ringMiddle}>
              <View style={styles.ringInner}>
                <Ionicons name="car-sport" size={48} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.statusTextContainer}>
            <View style={styles.statusIndicatorRow}>
              <View style={styles.statusIndicatorDot} />
              <Text style={styles.statusIndicatorText}>SYSTEM ACTIVE</Text>
            </View>
            <Text style={styles.subtitle}>Ready for your next drive</Text>
          </View>
        </View>

        {/* Start Button */}
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/drive")}
        >
          <Text style={styles.startButtonText}>START DRIVE</Text>
          <Ionicons name="arrow-forward" size={16} color="#080C14" />
        </Pressable>

        {/* Last Drive Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Ionicons name="stats-chart" size={14} color="#64748B" />
            <Text style={styles.statsTitle}>LAST DRIVE ANALYSIS</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Safety Score</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreValue}>92</Text>
                <Text style={styles.scoreMax}>/100</Text>
              </View>
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Duration</Text>
              <Text style={styles.gridValue}>
                18 <Text style={styles.gridUnit}>min</Text>
              </Text>
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Rating</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>Good</Text>
              </View>
            </View>
          </View>
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
  button: "#FFFFFF",
  buttonText: "#080C14",
};

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
    backgroundColor: "rgba(0, 245, 212, 0.08)",
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -120,
    left: -120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(16, 185, 129, 0.06)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.secondary,
    letterSpacing: 2,
    marginTop: 2,
  },
  profileButton: {
    borderRadius: 20,
  },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 32,
  },
  statusHero: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 28,
  },
  ringOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    alignItems: "center",
    justifyContent: "center",
  },
  ringMiddle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    alignItems: "center",
    justifyContent: "center",
  },
  ringInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  statusTextContainer: {
    alignItems: "center",
    gap: 10,
  },
  statusIndicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.15)",
  },
  statusIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  statusIndicatorText: {
    color: COLORS.success,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: "500",
  },
  startButton: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: COLORS.button,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: COLORS.button,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 24,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.buttonText,
    letterSpacing: 2,
  },
  statsCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 16,
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
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.success,
  },
  scoreMax: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  gridValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },
  gridUnit: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  ratingBadge: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.15)",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.success,
  },
  gridDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  pressed: {
    opacity: 0.7,
  },
});
