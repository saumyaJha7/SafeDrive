import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sessions = [
  {
    id: "1",
    score: 94,
    duration: "18 min",
    rating: "Excellent",
  },
  {
    id: "2",
    score: 87,
    duration: "22 min",
    rating: "Good",
  },
  {
    id: "3",
    score: 71,
    duration: "15 min",
    rating: "Average",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const getRatingTheme = (score: number) => {
    if (score >= 90) return { color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" }; // Emerald
    if (score >= 75) return { color: "#00F5D4", bg: "rgba(0, 245, 212, 0.1)" }; // Teal
    if (score >= 60) return { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" }; // Amber
    return { color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" }; // Red
  };

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
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Driver Profile</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Profile Avatar Banner */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarRingOuter}>
          <View style={styles.avatarRingMiddle}>
            <View style={styles.avatarRingInner}>
              <Text style={styles.avatarText}>S</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.name}>Saumya</Text>
        <View style={styles.driverBadge}>
          <Text style={styles.driverBadgeText}>PLATINUM DRIVER</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Driving History</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => {
          const ratingTheme = getRatingTheme(item.score);
          return (
            <Pressable
              style={({ pressed }) => [
                styles.sessionCard,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.sessionTitle}>Session #{index + 1}</Text>
                <View style={[styles.ratingBadge, { backgroundColor: ratingTheme.bg }]}>
                  <Text style={[styles.ratingText, { color: ratingTheme.color }]}>
                    {item.rating.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.cardGrid}>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Safety Score</Text>
                  <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreValue, { color: ratingTheme.color }]}>{item.score}</Text>
                    <Text style={styles.scoreMax}>/100</Text>
                  </View>
                </View>

                <View style={styles.gridDivider} />

                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Duration</Text>
                  <Text style={styles.gridValue}>{item.duration}</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
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
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
    gap: 12,
  },
  avatarRingOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRingMiddle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRingInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: "rgba(0, 245, 212, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00F5D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  driverBadge: {
    backgroundColor: "rgba(0, 245, 212, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 245, 212, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  driverBadgeText: {
    color: COLORS.accent,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 14,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },
  ratingBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  cardGrid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
  },
  gridItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  gridLabel: {
    fontSize: 10,
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
    fontSize: 18,
    fontWeight: "800",
  },
  scoreMax: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  gridDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});
