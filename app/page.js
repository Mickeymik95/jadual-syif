"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "../components/Header";
import Calendar from "../components/Calendar";
import OtModal from "../components/OtModal";

import { getShiftData } from "../data/shifts";

const STORAGE_KEY = "jadual-syif-data-v1";

export default function Home() {
  const [shifts, setShifts] = useState({});
  const [otSambung, setOtSambung] = useState({});

  const [selectedDay, setSelectedDay] = useState(null);

  const [otType, setOtType] = useState("");
  const [otHours, setOtHours] = useState("");

  const [loaded, setLoaded] = useState(false);

  // =========================================
  // TARIKH SEMASA
  // =========================================

  const [currentDate] = useState(() => new Date());

  // =========================================
  // LOAD LOCAL STORAGE
  // =========================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed.shifts) {
          setShifts(parsed.shifts);
        }

        if (parsed.otSambung) {
          setOtSambung(parsed.otSambung);
        }
      }
    } catch (error) {
      console.error("Gagal membaca data:", error);
    }

    setLoaded(true);
  }, []);

  // =========================================
  // AUTO SAVE
  // =========================================

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          shifts,
          otSambung,
        })
      );
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  }, [shifts, otSambung, loaded]);

  // =========================================
  // JUMLAH HARI BULAN
  // =========================================

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // =========================================
  // SENARAI HARI
  // =========================================

  const days = useMemo(() => {
    return Array.from(
      { length: daysInMonth },
      (_, index) => {
        const day = index + 1;

        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        );

        return {
          day,

          weekday: date.toLocaleDateString(
            "ms-MY",
            {
              weekday: "long",
            }
          ),
        };
      }
    );
  }, [currentDate, daysInMonth]);

  // =========================================
  // KIRAAN DATA
  // =========================================

  const summary = useMemo(() => {
    let normalDays = 0;
    let phDays = 0;

    let otNormal = 0;
    let otPh = 0;

    let elaun = 0;

    Object.entries(shifts).forEach(
      ([day, shift]) => {
        if (!shift) return;

        const data = getShiftData(shift);

        // -----------------------------
        // HARI NORMAL
        // -----------------------------

        if (data.type === "NORMAL") {
          normalDays++;
        }

        // -----------------------------
        // HARI PH
        // -----------------------------

        if (data.type === "PH") {
          phDays++;
        }

        // -----------------------------
        // ELAUN
        // -----------------------------

        elaun += Number(data.elaun) || 0;

        // -----------------------------
        // OT ASAS
        // -----------------------------

        const baseOt = Number(data.ot) || 0;

        if (data.type === "PH") {
          otPh += baseOt;
        } else {
          otNormal += baseOt;
        }

       // -----------------------------
// OT SAMBUNG
// -----------------------------

const extra = otSambung[day];

if (extra) {
  const rawHours = String(
    extra.hours ?? ""
  ).trim();

  if (rawHours !== "") {
    const numericHours = Number(
      rawHours.replace(",", ".")
    );

    if (!Number.isNaN(numericHours)) {

      const extraType = String(
        extra.type ?? ""
      )
        .trim()
        .toUpperCase();

      // PH jika:
      // 1. Syif hari tersebut ialah PH
      // ATAU
      // 2. User tulis PH dalam Jenis OT

      const isPhDay =
        data.type === "PH";

      const isPhExtra =
        extraType.includes("PH");

      if (
        isPhDay ||
        isPhExtra
      ) {
        otPh += numericHours;
      } else {
        otNormal += numericHours;
      }
    }
  }
}
      }
    );

    return {
      normalDays,

      phDays,

      otNormal: Number(
        otNormal.toFixed(1)
      ),

      otPh: Number(
        otPh.toFixed(1)
      ),

      elaun,
    };
  }, [shifts, otSambung]);

  // =========================================
  // TUKAR SYIF
  // =========================================

  function handleShiftChange(day, value) {
    setShifts((prev) => ({
      ...prev,
      [day]: value,
    }));
  }

  // =========================================
  // BUKA MODAL OT
  // =========================================

  function openOtModal(day) {
    setSelectedDay(day);

    const saved = otSambung[day];

    if (saved) {
      setOtType(
        String(saved.type ?? "")
      );

      setOtHours(
        String(saved.hours ?? "")
      );
    } else {
      setOtType("");
      setOtHours("");
    }
  }

  // =========================================
  // TUTUP MODAL
  // =========================================

  function closeOtModal() {
    setSelectedDay(null);
    setOtType("");
    setOtHours("");
  }

  // =========================================
  // SIMPAN OT SAMBUNG
  // =========================================

  function saveOtSambung() {
    if (
      selectedDay === null ||
      selectedDay === undefined
    ) {
      return;
    }

    const cleanType = String(
      otType ?? ""
    ).trim();

    const cleanHours = String(
      otHours ?? ""
    ).trim();

    setOtSambung((prev) => ({
      ...prev,

      [selectedDay]: {
        type: cleanType,
        hours: cleanHours,
      },
    }));

    closeOtModal();
  }

  // =========================================
  // RESET SEMUA
  // =========================================

  function resetAllData() {
    const confirmReset = window.confirm(
      "RESET SEMUA DATA?\n\nSemua syif dan OT Sambung akan dipadam."
    );

    if (!confirmReset) return;

    setShifts({});
    setOtSambung({});

    localStorage.removeItem(
      STORAGE_KEY
    );

    alert(
      "Semua data telah direset."
    );
  }

  // =========================================
  // HARI MODAL
  // =========================================

  const selectedWeekday =
    selectedDay !== null
      ? days.find(
          (item) =>
            item.day === selectedDay
        )?.weekday || ""
      : "";

  // =========================================
  // UI
  // =========================================

  return (
    <main
      className="
        min-h-screen
        bg-slate-950
        text-white
      "
    >
      <Header
        summary={summary}
        onReset={resetAllData}
      />

      <Calendar
        currentDate={currentDate}
        days={days}
        shifts={shifts}
        otSambung={otSambung}
        onShiftChange={handleShiftChange}
        onOpenOt={openOtModal}
      />

      <OtModal
        selectedDay={selectedDay}
        weekday={selectedWeekday}
        otType={otType}
        otHours={otHours}
        onTypeChange={setOtType}
        onHoursChange={setOtHours}
        onClose={closeOtModal}
        onSave={saveOtSambung}
      />
    </main>
  );
}