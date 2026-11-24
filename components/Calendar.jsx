"use client";

import DayRow from "./DayRow";

export default function Calendar({
  currentDate,
  selectedMonth,
  selectedMonthDetails,
  days,
  shifts,
  otSambung,
  onShiftChange,
  onOpenOt,
}) {
  const monthName = new Date(
    selectedMonthDetails.year,
    selectedMonthDetails.month,
    1
  ).toLocaleDateString("ms-MY", {
    month: "long",
  });

  const year = selectedMonthDetails.year;

  const daysInMonth = days.length;

  // =========================================
  // TARIKH HARI INI
  // =========================================

  const today = new Date();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  return (
   <section className="mx-auto max-w-md px-1 py-1">
  <div
    className="
      overflow-hidden
      rounded-lg
      border
      border-blue-900/40
      bg-slate-900
    "
  >
    {/* SENARAI HARI */}
    <div>
      {days.map((item) => {
        const isToday =
          todayYear === selectedMonthDetails.year &&
          todayMonth === selectedMonthDetails.month &&
          todayDay === item.day;

        return (
          <DayRow
            key={item.day}
            day={item.day}
            weekday={item.weekday}
            shift={shifts[item.day] || ""}
            extra={otSambung[item.day]}
            isToday={isToday}
            onShiftChange={onShiftChange}
            onOpenOt={onOpenOt}
          />
        );
      })}
    </div>
  </div>

</section>
  );
}