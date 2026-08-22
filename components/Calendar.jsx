"use client";

import { useMemo } from "react";
import DayRow from "./DayRow";

export default function Calendar({
  currentDate,
  shifts,
  otSambung,
  onShiftChange,
  onOpenOt,
}) {
  const monthName = currentDate.toLocaleDateString("ms-MY", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();


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
          weekday: date.toLocaleDateString("ms-MY", {
            weekday: "short",
          }),
        };
      }
    );
  }, [currentDate, daysInMonth]);


  return (
    <section className="mx-auto max-w-md px-1 py-1">

      <div className="overflow-hidden rounded-lg border border-blue-900/40 bg-slate-900">

        {/* BULAN */}

        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-2 py-1.5">

          <h2 className="text-[11px] font-black uppercase text-blue-200">
            📅 {monthName} {year}
          </h2>

          <span className="text-[8px] text-slate-600">
            {daysInMonth} HARI
          </span>

        </div>


        {/* HEADER */}

        <div
          className="
            grid
            grid-cols-[56px_minmax(0,1fr)_40px_48px_32px]
            items-center
            gap-1
            border-b
            border-slate-800
            bg-slate-950
            px-1
            py-1
          "
        >

          <div className="text-[7px] font-bold text-slate-600">
            TARIKH
          </div>

          <div className="text-[7px] font-bold text-slate-600">
            SYIF
          </div>

          <div className="text-center text-[7px] font-bold text-slate-600">
            OT
          </div>

          <div className="text-center text-[7px] font-bold text-slate-600">
            ELAUN
          </div>

          <div></div>

        </div>


        {/* SENARAI HARI */}

        <div>

          {days.map((item) => (
            <DayRow
              key={item.day}
              day={item.day}
              weekday={item.weekday}
              shift={shifts[item.day] || ""}
              extra={otSambung[item.day]}
              onShiftChange={onShiftChange}
              onOpenOt={onOpenOt}
            />
          ))}

        </div>

      </div>

    </section>
  );
}