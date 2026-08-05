import { useDeviceMotion } from "@/hooks/useDeviceMotion";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
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

  const formatEventType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Ambient background glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      {/* Top Bar / Header */}
      <View style={styles.topBar}>
        <Pressable
          style={({ pressed }) => [
            styles.endButton,
            pressed && styles.endButtonPressed,
          ]}
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
          <Ionicons name="stop-circle" size={16} color={COLORS.danger} />
          <Text style={styles.endText}>END DRIVE</Text>
        </Pressable>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Telemetry HUD Center */}
      <View style={styles.center}>
        <View style={styles.hudOuter}>
          <View style={styles.hudMiddle}>
            <View style={styles.hudInner}>
              <Text style={styles.scoreLabel}>SAFETY SCORE</Text>
              <Text style={styles.score}>{score}</Text>
              <View style={styles.statusIndicatorRow}>
                <View style={styles.statusIndicatorDot} />
                <Text style={styles.statusIndicatorText}>MONITORING</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.timerContainer}>
          <Ionicons name="time-outline" size={18} color={COLORS.secondary} />
          <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
        </View>
      </View>

      {/* Events Detected Card */}
      <View style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <Ionicons name="warning-outline" size={14} color={COLORS.secondary} />
          <Text style={styles.statsTitle}>EVENTS DETECTED</Text>
        </View>

        <View style={styles.eventsContainer}>
          {events.length === 0 ? (
            <View style={styles.emptyEvents}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={COLORS.success}
              />
              <Text style={styles.emptyEventsText}>
                Optimal driving. No incidents.
              </Text>
            </View>
          ) : (
            events.map((event) => (
              <View key={event.timestamp} style={styles.eventRow}>
                <View style={styles.eventInfo}>
                  <View style={styles.eventDot} />
                  <Text style={styles.eventText}>
                    {formatEventType(event.type)}
                  </Text>
                </View>
                <Text style={styles.eventPenalty}>-{event.penalty} pts</Text>
              </View>
            ))
          )}
        </View>
      </View>

      {/* Diagnostics Card */}
      <View style={[styles.statsCard, styles.diagnosticsCard]}>
        <View style={styles.statsHeader}>
          <Ionicons name="pulse" size={14} color={COLORS.secondary} />
          <Text style={styles.statsTitle}>SYSTEM DIAGNOSTICS</Text>
        </View>

        <View style={styles.sensorRow}>
          <View style={styles.pulseContainer}>
            <View style={styles.greenDot} />
            <View style={styles.greenDotPulse} />
          </View>
          <Text style={styles.sensorText}>
            Stream: Collecting device motion data...
          </Text>
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
  dangerBg: "rgba(239, 68, 68, 0.08)",
  dangerBorder: "rgba(239, 68, 68, 0.18)",
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
    backgroundColor: "rgba(239, 68, 68, 0.04)",
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -120,
    left: -120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 245, 212, 0.05)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  endButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.dangerBg,
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  endButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  endText: {
    color: COLORS.danger,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  liveText: {
    color: COLORS.success,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1.2,
    gap: 20,
    marginVertical: 16,
  },
  hudOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    alignItems: "center",
    justifyContent: "center",
  },
  hudMiddle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    alignItems: "center",
    justifyContent: "center",
  },
  hudInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    gap: 2,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.secondary,
    letterSpacing: 1.5,
  },
  score: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.text,
  },
  statusIndicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusIndicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.success,
  },
  statusIndicatorText: {
    color: COLORS.success,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timer: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  statsCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 14,
    marginBottom: 16,
  },
  diagnosticsCard: {
    marginBottom: 32,
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
    paddingVertical: 4,
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
    backgroundColor: COLORS.danger,
  },
  eventText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
  eventPenalty: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: "700",
  },
  sensorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pulseContainer: {
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    zIndex: 2,
  },
  greenDotPulse: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    opacity: 0.25,
    zIndex: 1,
  },
  sensorText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "500",
  },
});
