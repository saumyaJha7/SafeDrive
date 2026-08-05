import { useDeviceMotion } from "@/hooks/useDeviceMotion";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateEvent, DrivingEvent } from "../utils/calculateEvent";

export default function DriveScreen() {
  const [isDriving, setIsDriving] = React.useState(true);
  const router = useRouter();

  const motionData = useDeviceMotion(isDriving);
  const [score, setScore] = useState(100);
  const [events, setEvents] = useState<DrivingEvent[]>([]);

  const [startTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!motionData) return;
    const event = calculateEvent(motionData);

    if (!event) return;

    setEvents((prev) => [...prev, event]);
    setScore((prev) => Math.max(0, prev - event.penalty));
  }, [motionData]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.endButton, pressed && styles.pressed]}
        onPress={() => {
          setIsDriving(false);
          router.replace({
            pathname: "/summary",
            params: {
              score: score.toString(),
              duration: formatTime(elapsedTime),
              events: JSON.stringify(events),
            },
          });
        }}
      >
        <Ionicons name="stop-circle-outline" size={22} color="#EF4444" />
        <Text style={styles.endText}>End Drive</Text>
      </Pressable>

      <View style={styles.center}>
        <Ionicons name="car-sport-outline" size={72} color="#FFFFFF" />

        <Text style={styles.status}>Driving</Text>

        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>

        <Text style={styles.scoreLabel}>Safety Score</Text>

        <Text style={styles.score}>{score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Events Detected</Text>

        {events.map((event) => (
          <Row key={event.timestamp} title={event.type!} value="1" />
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sensor Status</Text>

        <View style={styles.sensorRow}>
          <View style={styles.greenDot} />
          <Text style={styles.sensorText}>
            Collecting device motion data...
          </Text>
        </View>
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
  danger: "#EF4444",
  success: "#22C55E",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  endButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  endText: {
    color: COLORS.danger,
    fontWeight: "600",
    fontSize: 16,
  },

  center: {
    alignItems: "center",
    marginVertical: 36,
    gap: 12,
  },

  status: {
    color: COLORS.secondary,
    fontSize: 18,
  },

  timer: {
    color: COLORS.text,
    fontSize: 42,
    fontWeight: "700",
  },

  scoreLabel: {
    color: COLORS.secondary,
    marginTop: 12,
    fontSize: 16,
  },

  score: {
    color: COLORS.text,
    fontSize: 52,
    fontWeight: "700",
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 18,
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

  sensorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },

  sensorText: {
    color: COLORS.text,
    fontSize: 15,
  },

  pressed: {
    opacity: 0.7,
  },
});
