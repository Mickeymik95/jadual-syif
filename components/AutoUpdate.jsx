
"use client";

import { useEffect } from "react";

export default function AutoUpdate() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch("/api/version", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();

        if (!data.version || data.version === "local") return;

        const oldVersion = localStorage.getItem("app-version");

        if (!oldVersion) {
          localStorage.setItem("app-version", data.version);
          return;
        }

        if (oldVersion !== data.version) {
          localStorage.setItem("app-version", data.version);
          window.location.reload();
        }

      } catch (error) {
        console.error("AutoUpdate:", error);
      }
    };

    checkVersion();

    const timer = setInterval(checkVersion, 30000);

    return () => clearInterval(timer);
  }, []);

  return null;
}
