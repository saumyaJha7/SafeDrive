import { DeviceMotionMeasurement } from "expo-sensors";

export type DrivingEventType =
  | "HARSH_BRAKE"
  | "HARSH_ACCELERATION"
  | "SHARP_TURN"
  | "AGGRESSIVE_STEERING"
  | "EXCESSIVE_DEVICE_MOVEMENT"
  | "PHONE_HANDLING";

export interface DrivingEvent {
  type: DrivingEventType;
  penalty: number;
  timestamp: number;
}

const BRAKE_THRESHOLD = -4;

const ACCELERATION_THRESHOLD = 4;

const SHARP_TURN_THRESHOLD = 2;

const AGGRESSIVE_STEERING_THRESHOLD = 3;

const DEVICE_MOVEMENT_THRESHOLD = 5;

const PHONE_HANDLING_ROTATION = 1.8;
const PHONE_HANDLING_ACCELERATION = 2.5;

export function calculateEvent(
  data: DeviceMotionMeasurement,
): DrivingEvent | null {
  if (!data) return null;

  if (isHarshBrake(data)) {
    return createEvent("HARSH_BRAKE", 5);
  }

  if (isHarshAcceleration(data)) {
    return createEvent("HARSH_ACCELERATION", 5);
  }

  if (isSharpTurn(data)) {
    return createEvent("SHARP_TURN", 3);
  }

  if (isAggressiveSteering(data)) {
    return createEvent("AGGRESSIVE_STEERING", 4);
  }

  if (isExcessiveDeviceMovement(data)) {
    return createEvent("EXCESSIVE_DEVICE_MOVEMENT", 3);
  }

  if (isPhoneHandling(data)) {
    return createEvent("PHONE_HANDLING", 10);
  }

  return null;
}

function isHarshBrake(data: DeviceMotionMeasurement) {
  return (data.acceleration?.y ?? 0) < BRAKE_THRESHOLD;
}

function isHarshAcceleration(data: DeviceMotionMeasurement) {
  return (data.acceleration?.y ?? 0) > ACCELERATION_THRESHOLD;
}

function isSharpTurn(data: DeviceMotionMeasurement) {
  return Math.abs(data.rotation?.gamma ?? 0) > SHARP_TURN_THRESHOLD;
}

function isAggressiveSteering(data: DeviceMotionMeasurement) {
  return Math.abs(data.rotation?.beta ?? 0) > AGGRESSIVE_STEERING_THRESHOLD;
}

function isExcessiveDeviceMovement(data: DeviceMotionMeasurement) {
  const x = data.acceleration?.x ?? 0;
  const y = data.acceleration?.y ?? 0;
  const z = data.acceleration?.z ?? 0;

  const magnitude = Math.sqrt(x * x + y * y + z * z);

  return magnitude > DEVICE_MOVEMENT_THRESHOLD;
}

function isPhoneHandling(data: DeviceMotionMeasurement) {
  const rotation = Math.abs(data.rotation?.beta ?? 0);

  const x = Math.abs(data.acceleration?.x ?? 0);

  const y = Math.abs(data.acceleration?.y ?? 0);

  return (
    rotation > PHONE_HANDLING_ROTATION &&
    (x > PHONE_HANDLING_ACCELERATION || y > PHONE_HANDLING_ACCELERATION)
  );
}

function createEvent(type: DrivingEventType, penalty: number): DrivingEvent {
  return {
    type,
    penalty,
    timestamp: Date.now(),
  };
}
