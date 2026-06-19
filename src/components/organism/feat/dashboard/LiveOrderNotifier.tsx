"use client";

import Button from "@/components/atom/Button";
import { useGetAllOrdersForAdmin } from "@/hooks/services/orders/useGetAllOrdersForAdmin";
import { Bell, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const POLLING_INTERVAL_MS = 10000;
const SOUND_ENABLED_KEY = "admin_live_order_sound_enabled";

export default function LiveOrderNotifier() {
  const router = useRouter();
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >(() => {
    if (typeof window === "undefined") {
      return "default";
    }

    if (!("Notification" in window)) {
      return "unsupported";
    }

    return window.Notification.permission;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.localStorage.getItem(SOUND_ENABLED_KEY) !== "0";
  });
  const knownOrderIdsRef = useRef<Set<string>>(new Set());

  const { data, refetch } = useGetAllOrdersForAdmin({
    page: 1,
    limit: 20,
    search: undefined,
    status: undefined,
    orderGroupId: undefined,
    userId: undefined,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(SOUND_ENABLED_KEY, soundEnabled ? "1" : "0");
  }, [soundEnabled]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void refetch();
    }, POLLING_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [refetch]);

  const playNewOrderSound = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") {
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (
        window as Window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const audioContext = new AudioContextClass();
    const now = audioContext.currentTime;

    // Create gong/bell sound with multiple harmonics
    const createGongTone = (atTime: number) => {
      const harmonics = [
        { freq: 200, decay: 2.5 }, // fundamental
        { freq: 320, decay: 2.2 }, // second harmonic
        { freq: 540, decay: 1.8 }, // third harmonic
        { freq: 800, decay: 1.4 }, // fourth harmonic
      ];

      harmonics.forEach(({ freq, decay }) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, atTime);

        gain.gain.setValueAtTime(0.08, atTime);
        gain.gain.exponentialRampToValueAtTime(0.001, atTime + decay);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(atTime);
        osc.stop(atTime + decay);
      });
    };

    createGongTone(now);
  }, [soundEnabled]);

  useEffect(() => {
    const orders = data?.data ?? [];
    const currentIds = new Set(orders.map((order) => order.id));

    if (knownOrderIdsRef.current.size === 0) {
      knownOrderIdsRef.current = currentIds;
      return;
    }

    const newOrders = orders.filter(
      (order) => !knownOrderIdsRef.current.has(order.id),
    );

    if (newOrders.length === 0) {
      knownOrderIdsRef.current = currentIds;
      return;
    }

    const label =
      newOrders.length === 1
        ? "1 new order received"
        : `${newOrders.length} new orders received`;

    toast.success(label, {
      duration: 10000,
      action: {
        label: "Go to Orders",
        onClick: () => {
          router.push("/admin/orders");
        },
      },
    });

    if (
      notificationPermission === "granted" &&
      typeof window !== "undefined" &&
      document.visibilityState !== "visible"
    ) {
      new window.Notification("Tuffani live order", {
        body: label,
      });
    }

    playNewOrderSound();
    knownOrderIdsRef.current = currentIds;
  }, [data?.data, notificationPermission, playNewOrderSound, router]);

  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      toast.error("Browser notifications are not supported here.");
      return;
    }

    const permission = await window.Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === "granted") {
      toast.success("Live order notifications enabled");
      return;
    }

    toast.error("Notification permission was not granted");
  };

  return (
    <div className="group fixed right-6 top-1/2 z-30 -translate-y-1/2 ">
      {/* Circular Icon Button */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-200 bg-white shadow-md transition-all group-hover:bg-emerald-50">
        <Bell className="h-6 w-6 text-emerald-600" />
      </div>

      {/* Hover Card - appears on group hover */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <div className="rounded-xl border border-slate-200 bg-white/98 p-3 shadow-lg backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
            <Bell className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">Live Orders</span>
          </div>

          <div className="flex flex-col gap-2">
            {notificationPermission !== "granted" ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  void requestNotificationPermission();
                }}
                disabled={notificationPermission === "unsupported"}
                className="w-full"
              >
                {notificationPermission === "unsupported"
                  ? "Notif N/A"
                  : "Enable Notif"}
              </Button>
            ) : (
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-700 text-center">
                Notif On
              </span>
            )}

            <Button
              size="sm"
              variant={soundEnabled ? "default" : "outline"}
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="w-full"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-4 w-4" /> Sound On
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4" /> Sound Off
                </>
              )}
            </Button>

            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="/admin/orders">Go to Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
