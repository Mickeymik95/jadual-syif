"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "../components/Header";
import Calendar from "../components/Calendar";
import OtModal from "../components/OtModal";

import { getShiftData } from "../data/shifts";

const STORAGE_KEY = "jadual-syif-data-v3";

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


// =========================================
// DATA KOSONG 12 BULAN
// =========================================

function createEmptyMonths() {
  return MONTHS.reduce((result, _, index) => {
    result[index] = {
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

  const [currentDate] = useState(
    () => new Date()
  );


  // =========================================
  // BULAN DIPILIH
  // DEFAULT = BULAN SEMASA
  // =========================================

  const [selectedMonth, setSelectedMonth] =
    useState(
      () => new Date().getMonth()
    );


  // =========================================
  // DATA 12 BULAN
  // =========================================

  const [monthData, setMonthData] =
    useState(
      () => createEmptyMonths()
    );


  const [loaded, setLoaded] =
    useState(false);


  // =========================================
  // DATA BULAN SEMASA
  // =========================================

  const currentMonthData =
    monthData[selectedMonth] || {
      shifts: {},
      otSambung: {},
    };


  const shifts =
    currentMonthData.shifts || {};


  const otSambung =
    currentMonthData.otSambung || {};


  // =========================================
  // MODAL OT
  // =========================================

  const [selectedDay, setSelectedDay] =
    useState(null);


  const [otType, setOtType] =
    useState("");


  const [otHours, setOtHours] =
    useState("");


  // =========================================
  // LOAD LOCAL STORAGE
  // =========================================

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (saved) {

        const parsed =
          JSON.parse(saved);


        // ==============================
        // LOAD BULAN TERAKHIR DIPILIH
        // ==============================

        if (
          parsed?.selectedMonth !==
            undefined &&
          parsed?.selectedMonth !==
            null
        ) {

          setSelectedMonth(
            Number(
              parsed.selectedMonth
            )
          );

        }


        // ==============================
        // LOAD DATA 12 BULAN
        // ==============================

        if (parsed?.months) {

          const emptyMonths =
            createEmptyMonths();


          Object.keys(
            parsed.months
          ).forEach(
            (month) => {

              emptyMonths[month] =
                parsed.months[month];

            }
          );


          setMonthData(
            emptyMonths
          );

        }

      }

    } catch (error) {

      console.error(
        "Gagal membaca LocalStorage:",
        error
      );

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

          months:
            monthData,

        })
      );

    } catch (error) {

      console.error(
        "Gagal menyimpan LocalStorage:",
        error
      );

    }

  }, [
    monthData,
    selectedMonth,
    loaded,
  ]);


  // =========================================
  // TUKAR BULAN
  // =========================================

  function handleMonthChange(
    value
  ) {

    const newMonth =
      Number(value);


    setSelectedMonth(
      newMonth
    );


    // Tutup modal OT

    setSelectedDay(null);

    setOtType("");

    setOtHours("");

  }


  // =========================================
  // JUMLAH HARI BULAN
  // =========================================

  const daysInMonth =
    new Date(
      currentDate.getFullYear(),
      selectedMonth + 1,
      0
    ).getDate();


  // =========================================
  // SENARAI HARI
  // =========================================

  const days = useMemo(() => {

    const weekdays = [
      "AHD",
      "ISN",
      "SEL",
      "RAB",
      "KHA",
      "JUM",
      "SAB",
    ];


    return Array.from(
      {
        length:
          daysInMonth,
      },

      (_, index) => {

        const day =
          index + 1;


        const date =
          new Date(
            currentDate.getFullYear(),
            selectedMonth,
            day
          );


        return {

          day,

          weekday:
            weekdays[
              date.getDay()
            ],

        };

      }

    );

  }, [
    currentDate,
    selectedMonth,
    daysInMonth,
  ]);


  // =========================================
  // KIRAAN
  // =========================================

  const summary =
    useMemo(() => {

      let normalDays = 0;

      let phDays = 0;

      let otNormal = 0;

      let otPh = 0;

      let elaun = 0;


      Object.entries(
        shifts
      ).forEach(
        ([day, shift]) => {

          if (!shift) return;


          const data =
            getShiftData(
              shift
            );


          // ==============================
          // HARI NORMAL
          // ==============================

          if (
            data.type ===
            "NORMAL"
          ) {

            normalDays++;

          }


          // ==============================
          // HARI PH
          // ==============================

          if (
            data.type ===
            "PH"
          ) {

            phDays++;

          }


          // ==============================
          // ELAUN
          // ==============================

          elaun +=
            Number(
              data.elaun
            ) || 0;


          // ==============================
          // OT ASAS
          // ==============================

          const baseOt =
            Number(
              data.ot
            ) || 0;


          if (
            data.type ===
            "PH"
          ) {

            otPh +=
              baseOt;

          } else {

            otNormal +=
              baseOt;

          }


          // ==============================
          // OT SAMBUNG
          // ==============================

          const extra =
            otSambung[day];


          if (!extra) return;


          const rawHours =
            String(
              extra.hours ?? ""
            ).trim();


          if (
            rawHours === ""
          ) {

            return;

          }


          const numericHours =
            Number(
              rawHours
                .replace(
                  ",",
                  "."
                )
                .replace(
                  /[jJ]/g,
                  ""
                )
                .trim()
            );


          if (
            Number.isNaN(
              numericHours
            )
          ) {

            return;

          }


          const extraType =
            String(
              extra.type ?? ""
            )
              .trim()
              .toUpperCase();


          const isPhDay =
            data.type ===
            "PH";


          const isPhExtra =
            extraType.includes(
              "PH"
            );


          if (
            isPhDay ||
            isPhExtra
          ) {

            otPh +=
              numericHours;

          } else {

            otNormal +=
              numericHours;

          }

        }
      );


      return {

        normalDays,

        phDays,

        otNormal:
          Number(
            otNormal.toFixed(1)
          ),

        otPh:
          Number(
            otPh.toFixed(1)
          ),

        elaun,

      };

    }, [
      shifts,
      otSambung,
    ]);


  // =========================================
  // TUKAR SYIF
  // =========================================

  function handleShiftChange(
    day,
    value
  ) {

    setMonthData(
      (prev) => ({

        ...prev,

        [selectedMonth]: {

          ...(prev[
            selectedMonth
          ] || {

            shifts: {},

            otSambung: {},

          }),


          shifts: {

            ...(
              prev[
                selectedMonth
              ]?.shifts || {}
            ),


            [day]:
              value,

          },

        },

      })
    );

  }


  // =========================================
  // BUKA OT
  // =========================================

  function openOtModal(
    day
  ) {

    setSelectedDay(
      day
    );


    const saved =
      otSambung[day];


    if (saved) {

      setOtType(
        String(
          saved.type ??
          ""
        )
      );


      setOtHours(
        String(
          saved.hours ??
          ""
        )
      );

    } else {

      setOtType("");

      setOtHours("");

    }

  }


  // =========================================
  // TUTUP OT
  // =========================================

  function closeOtModal() {

    setSelectedDay(
      null
    );

    setOtType("");

    setOtHours("");

  }


  // =========================================
  // SIMPAN OT SAMBUNG
  // =========================================

  function saveOtSambung() {

    if (
      selectedDay ===
        null ||
      selectedDay ===
        undefined
    ) {

      return;

    }


    const cleanType =
      String(
        otType ?? ""
      ).trim();


    const cleanHours =
      String(
        otHours ?? ""
      ).trim();


    setMonthData(
      (prev) => ({

        ...prev,


        [selectedMonth]: {

          ...(prev[
            selectedMonth
          ] || {

            shifts: {},

            otSambung: {},

          }),


          otSambung: {

            ...(
              prev[
                selectedMonth
              ]?.otSambung ||
              {}
            ),


            [selectedDay]: {

              type:
                cleanType,

              hours:
                cleanHours,

            },

          },

        },

      })
    );


    closeOtModal();

  }


  // =========================================
  // RESET BULAN INI SAHAJA
  // =========================================

  function resetAllData() {

    const confirmReset =
      window.confirm(

        `RESET DATA BULAN ${
          MONTHS[selectedMonth]
        }?

Semua syif dan OT Sambung bulan ini akan dipadam.`

      );


    if (!confirmReset) {

      return;

    }


    setMonthData(
      (prev) => ({

        ...prev,

        [selectedMonth]: {

          shifts: {},

          otSambung: {},

        },

      })

    );


    setSelectedDay(
      null
    );

    setOtType("");

    setOtHours("");


    alert(
      `Data bulan ${
        MONTHS[selectedMonth]
      } telah direset.`
    );

  }


  // =========================================
  // HARI MODAL
  // =========================================

  const selectedWeekday =
    selectedDay !== null

      ? days.find(
          (item) =>
            item.day ===
            selectedDay
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

        summary={
          summary
        }

        onReset={
          resetAllData
        }

        months={
          MONTHS
        }

        selectedMonth={
          selectedMonth
        }

        onMonthChange={
          handleMonthChange
        }

      />


      <Calendar

        currentDate={
          currentDate
        }

        days={
          days
        }

        shifts={
          shifts
        }

        otSambung={
          otSambung
        }

        onShiftChange={
          handleShiftChange
        }

        onOpenOt={
          openOtModal
        }

      />


      <OtModal

        selectedDay={
          selectedDay
        }

        weekday={
          selectedWeekday
        }

        otType={
          otType
        }

        otHours={
          otHours
        }

        onTypeChange={
          setOtType
        }

        onHoursChange={
          setOtHours
        }

        onClose={
          closeOtModal
        }

        onSave={
          saveOtSambung
        }

      />

    </main>

  );
}