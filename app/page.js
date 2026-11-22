"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "../components/Header";
import Calendar from "../components/Calendar";
import OtModal from "../components/OtModal";
import SalaryModal from "../components/SalaryModal";

import { getShiftData } from "../data/shifts";

const STORAGE_KEY = "jadual-syif-data-v4";

const MONTHS = [
  "JANUARI",
  "FEBRUARI",
  "MAC",
  "APRIL",
  "MEI",
  "JUN",
  "JULAI",
  "OGOS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DISEMBER",
];

function toMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function createMonthOptions(currentDate) {
  return Array.from({ length: 13 }, (_, index) => {
    const offset = index - 6;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );

    return {
      key: toMonthKey(date),
      label: `${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });
}

function parseMonthKey(key) {
  const [year, month] = String(key).split("-").map(Number);

  if (!year || !month) return null;

  return {
    year,
    month: month - 1,
  };
}

function createEmptyMonths(monthOptions) {
  return monthOptions.reduce((result, month) => {
    result[month.key] = {
      shifts: {},
      otSambung: {},
    };

    return result;
  }, {});
}

export default function Home() {
  // =========================================
  // TARIKH SEMASA
  // =========================================

  const [currentDate] = useState(() => new Date());

  const monthOptions = useMemo(
    () => createMonthOptions(currentDate),
    [currentDate]
  );

  // =========================================
  // BULAN DIPILIH
  // DEFAULT = BULAN SEMASA
  // =========================================

  const [selectedMonth, setSelectedMonth] =
    useState(() => toMonthKey(new Date()));

  const selectedMonthDetails =
    parseMonthKey(selectedMonth) || {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
    };

  // =========================================
  // DATA 13 BULAN
  // =========================================

  const [monthData, setMonthData] =
    useState(() => createEmptyMonths(createMonthOptions(new Date())));

  const [loaded, setLoaded] = useState(false);

  // =========================================
  // DATA BULAN SEMASA
  // =========================================

  const currentMonthData =
    monthData[selectedMonth] || {
      shifts: {},
      otSambung: {},
    };

  const shifts = currentMonthData.shifts || {};

  const otSambung = currentMonthData.otSambung || {};

  // =========================================
  // MODAL OT
  // =========================================

  const [selectedDay, setSelectedDay] = useState(null);

  const [otType, setOtType] = useState("");

  const [otHours, setOtHours] = useState("");

  // =========================================
  // MODAL KIRA GAJI
  // =========================================

  const [salaryModalOpen, setSalaryModalOpen] = useState(false);

  // =========================================
  // LOAD LOCAL STORAGE
  // =========================================

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("jadual-syif-data-v3");

      if (saved) {
        const parsed = JSON.parse(saved);

        // ==============================
        // LOAD BULAN TERAKHIR DIPILIH
        // ==============================

        if (
          parsed?.selectedMonth !== undefined &&
          parsed?.selectedMonth !== null
        ) {
          const savedKey = String(parsed.selectedMonth);
          const savedDetails = parseMonthKey(savedKey);

          if (savedDetails) {
            setSelectedMonth(savedKey);
          } else {
            const oldMonth = Number(savedKey);

            if (oldMonth >= 0 && oldMonth <= 11) {
              const now = new Date();
              setSelectedMonth(
                toMonthKey(new Date(now.getFullYear(), oldMonth, 1))
              );
            }
          }
        }

        // ==============================
        // LOAD DATA 13 BULAN
        // ==============================

        if (parsed?.months) {
          const emptyMonths = createEmptyMonths(createMonthOptions(new Date()));

          Object.keys(parsed.months).forEach((month) => {
            const monthDetails = parseMonthKey(month);

            if (monthDetails) {
              emptyMonths[month] = parsed.months[month];
            } else {
              const oldMonth = Number(month);

              if (oldMonth >= 0 && oldMonth <= 11) {
                const now = new Date();
                const migratedKey = toMonthKey(
                  new Date(now.getFullYear(), oldMonth, 1)
                );

                emptyMonths[migratedKey] = parsed.months[month];
              }
            }
          });

          setMonthData(emptyMonths);
        }
      }
    } catch (error) {
      console.error("Gagal membaca LocalStorage:", error);
    }

    setLoaded(true);
  }, []);

  // =========================================
  // SAVE LOCAL STORAGE
  // =========================================

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,

        JSON.stringify({
          selectedMonth,

          months: monthData,
        })
      );
    } catch (error) {
      console.error("Gagal menyimpan LocalStorage:", error);
    }
  }, [monthData, selectedMonth, loaded]);

  // =========================================
  // TUKAR BULAN
  // =========================================

  function handleMonthChange(value) {
    setSelectedMonth(value);

    // Tutup modal OT

    setSelectedDay(null);

    setOtType("");

    setOtHours("");
  }

  // =========================================
  // JUMLAH HARI BULAN
  // =========================================

  const daysInMonth = new Date(
    selectedMonthDetails.year,
    selectedMonthDetails.month + 1,
    0
  ).getDate();

  // =========================================
  // SENARAI HARI
  // =========================================

  const days = useMemo(
    () => {
      const weekdays = ["AHAD", "ISNIN", "SELASA", "RABU", "KHAMIS", "JUMAAT", "SABTU"];

      return Array.from(
        {
          length: daysInMonth,
        },

        (_, index) => {
          const day = index + 1;

          const date = new Date(
            selectedMonthDetails.year,
            selectedMonthDetails.month,
            day
          );

          return {
            day,

            weekday: weekdays[date.getDay()],
          };
        }
      );
    },
    [currentDate, selectedMonthDetails, daysInMonth]
  );

  // =========================================
  // KIRAAN
  // =========================================

  const summary = useMemo(() => {
    let normalDays = 0;

    let phDays = 0;

    let otNormal = 0;

    let otPh = 0;

    let elaun = 0;

    Object.entries(shifts).forEach(([day, shift]) => {
      if (!shift) return;

      const data = getShiftData(shift);

      // ==============================
      // HARI NORMAL
      // ==============================

      if (data.type === "NORMAL") {
        normalDays++;
      }

      // ==============================
      // HARI PH
      // ==============================

      if (data.type === "PH") {
        phDays++;
      }

      // ==============================
      // ELAUN
      // ==============================

      elaun += Number(data.elaun) || 0;

      // ==============================
      // OT ASAS
      // ==============================

      const baseOt = Number(data.ot) || 0;

      if (data.type === "PH") {
        otPh += baseOt;
      } else {
        otNormal += baseOt;
      }

      // ==============================
      // OT SAMBUNG
      // ==============================

      const extra = otSambung[day];

      if (!extra) return;

      const rawHours = String(extra.hours ?? "").trim();

      if (rawHours === "") {
        return;
      }

      const numericHours = Number(
        rawHours
          .replace(",", ".")
          .replace(/[jJ]/g, "")
          .trim()
      );

      if (Number.isNaN(numericHours)) {
        return;
      }

      const extraType = String(extra.type ?? "").trim().toUpperCase();

      const isPhDay = data.type === "PH";

      const isPhExtra = extraType.includes("PH");

      if (isPhDay || isPhExtra) {
        otPh += numericHours;
      } else {
        otNormal += numericHours;
      }
    });

    return {
      normalDays,

      phDays,

      otNormal: Number(otNormal.toFixed(1)),

      otPh: Number(otPh.toFixed(1)),

      elaun: Number(elaun.toFixed(2)),
    };
  }, [shifts, otSambung]);

  // =========================================
  // TUKAR SYIF
  // =========================================

  function handleShiftChange(day, value) {
    setMonthData((prev) => ({
      ...prev,

      [selectedMonth]: {
        ...(prev[selectedMonth] || {
          shifts: {},

          otSambung: {},
        }),

        shifts: {
          ...((prev[selectedMonth]?.shifts || {})),

          [day]: value,
        },
      },
    }));
  }

  // =========================================
  // BUKA OT
  // =========================================

  function openOtModal(day) {
    setSelectedDay(day);

    const saved = otSambung[day];

    if (saved) {
      setOtType(String(saved.type ?? ""));

      setOtHours(String(saved.hours ?? ""));
    } else {
      setOtType("");

      setOtHours("");
    }
  }

  // =========================================
  // TUTUP OT
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
    if (selectedDay === null || selectedDay === undefined) {
      return;
    }

    const cleanType = String(otType ?? "").trim();

    const cleanHours = String(otHours ?? "").trim();

    setMonthData((prev) => ({
      ...prev,

      [selectedMonth]: {
        ...(prev[selectedMonth] || {
          shifts: {},

          otSambung: {},
        }),

        otSambung: {
          ...((prev[selectedMonth]?.otSambung || {})),

          [selectedDay]: {
            type: cleanType,

            hours: cleanHours,
          },
        },
      },
    }));

    closeOtModal();
  }

  // =========================================
  // RESET BULAN INI SAHAJA
  // =========================================

  function resetAllData() {
    const confirmReset = window.confirm(
      `RESET DATA BULAN ${
        MONTHS[selectedMonthDetails.month]
      }?

Semua syif dan OT Sambung bulan ini akan dipadam.`
    );

    if (!confirmReset) {
      return;
    }

    setMonthData((prev) => ({
      ...prev,

      [selectedMonth]: {
        shifts: {},

        otSambung: {},
      },
    }));

    setSelectedDay(null);

    setOtType("");

    setOtHours("");

    alert(`Data bulan ${MONTHS[selectedMonthDetails.month]} telah direset.`);
  }

  // =========================================
  // HARI MODAL
  // =========================================

  const selectedWeekday =
    selectedDay !== null
      ? days.find((item) => item.day === selectedDay)?.weekday || ""
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
        onOpenSalary={() => setSalaryModalOpen(true)}
        months={monthOptions}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />

      <Calendar
        currentDate={currentDate}
        selectedMonth={selectedMonth}
        selectedMonthDetails={selectedMonthDetails}
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

      {/* =====================================
          MODAL KIRA GAJI
      ===================================== */}

      <SalaryModal
        open={salaryModalOpen}
        onClose={() => setSalaryModalOpen(false)}
        summary={summary}
      />
    </main>
  );
}