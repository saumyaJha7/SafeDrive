import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { useEffect, useState } from "react";

export function useDeviceMotion(enabled: boolean) {
  const [motionData, setMotionData] = useState<DeviceMotionMeasurement | null>(
    null,
  );

  useEffect(() => {
    if (!enabled) return;

    let subscription: { remove: () => void } | null = null;

    const subscribe = async () => {
      const isAvailable = await DeviceMotion.isAvailableAsync();

      if (!isAvailable) {
        console.warn("Device Motion is not available on this device.");
        return;
      }

      DeviceMotion.setUpdateInterval(500);

      subscription = DeviceMotion.addListener((data) => {
        setMotionData(data);
      });
    };

    subscribe();

    return () => {
      subscription?.remove();
    };
  }, [enabled]);

  return motionData;
}
