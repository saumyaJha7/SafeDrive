import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={22} color="#FFF" />

        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <View style={styles.profileContainer}>
        <Ionicons name="person-circle" size={70} color="#FFFFFF" />

        <Text style={styles.name}>Saumya</Text>
      </View>

      <Text style={styles.sectionTitle}>Driving Sessions</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <Text style={styles.sessionTitle}>Session #{index + 1}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Score</Text>
              <Text style={styles.value}>{item.score}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{item.duration}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Rating</Text>
              <Text style={styles.value}>{item.rating}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const COLORS = {
  background: "#0F172A",
  surface: "#1E293B",
  text: "#FFFFFF",
  secondary: "#94A3B8",
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
    fontSize: 18,
    fontWeight: "600",
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
    gap: 10,
  },

  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "700",
  },

  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 15,
    marginBottom: 18,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  sessionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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

  pressed: {
    opacity: 0.7,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.85,
  },
});
