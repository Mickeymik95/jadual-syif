"use client";

export default function Header({
  summary,
  onReset,
  onOpenSalary,
  months,
  selectedMonth,
  onMonthChange,
}) {
  const jumlahOt =
    Number(summary.otNormal || 0) +
    Number(summary.otPh || 0);

  const jumlahOtDisplay = Number(
    jumlahOt.toFixed(1)
  );

  const otLebih104 = Number(summary.otNormal || 0) > 104;

  return (
    <section
      className="
        sticky
        top-0
        z-[100]
        border-b
        border-blue-900/40
        bg-slate-950
        px-1
        pb-0.5
        pt-0.5
      "
    >
     <div className="flex flex-row items-center justify-center gap-1 p-1">

<h1
        className="
  text-center
  text-base
  font-black
  tracking-[0.1em]
  text-pink-700
  drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]
  animate-pulse
"

      >
🐅🦑MENANTI TARIKH 22 @ 20🗓️🤣

</h1>

</div>

      <h1
  className="
    inline-block
    width-auto
    w-full
    py-1
    rounded-md
    text-center
    text-base
    font-black
    tracking-[0.1em]
    text-green-400
    drop-shadow-[0_0_5px_rgba(10,130,246,0.35)]
  "
>
  <a
    href="https://wa.link/x4v2da"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
  >
  
    <svg
      xmlns="http://w3.org"
      viewBox="0 0 448 512"
      className="w-5 h-5 fill-current shrink-0"
      aria-hidden="true"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>

    <span className="mb-0
          text-center
          text-base
          font-black
          tracking-[0.1em]
          text-slate-300">
   ☎️ WHATSAPP - ADMIN 📱
    </span>

    {/* Logo WhatsApp Kanan */}
    <svg
      xmlns="http://w3.org"
      viewBox="0 0 448 512"
      className="w-5 h-5 fill-current shrink-0"
      aria-hidden="true"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  </a>
</h1>

      {/* =====================================
          DATA
          ===================================== */}

    <div
  className="
    rounded-lg
    border
    border-blue-900/50
    bg-slate-900
    p-1
  "
>

  <div
    className="
      grid
      grid-cols-2
      gap-1
      sm:grid-cols-3
    "
  >
    {/* KERJA NORMAL */}
    <div
      className="
        rounded-md
        border
        border-slate-800
        bg-slate-950
        px-1.5
        py-0.5
      "
    >
      <div className="text-[10px] font-bold text-white-500">
        KERJA NORMAL
      </div>
      <div className="text-[10px] font-black text-cyan-400">
        {summary.normalDays} Hari
      </div>
    </div>

    {/* KERJA PH */}
    <div
      className="
        rounded-md
        border
        border-slate-800
        bg-slate-950
        px-1.5
        py-0.5
      "
    >
      <div className="text-[10px] font-bold text-white-500">
        KERJA PH
      </div>
      <div className="text-[10px] font-black text-cyan-400">
        {summary.phDays} Hari
      </div>
    </div>

    {/* OT NORMAL */}
    <div
      className="
        rounded-md
        border
        border-slate-800
        bg-slate-950
        px-1.5
        py-0.5
      "
    >
      <div className="text-[10px] font-bold text-white-500">
        OT NORMAL
      </div>
      <div className="text-[10px] font-black text-cyan-400">
        {summary.otNormal} Jam
      </div>
      {/* AMARAN */}
      {otLebih104 && (
        <div
          className="
            animate-pulse
            whitespace-nowrap
            text-[9px]
            font-black
            uppercase
            text-red-400
          "
        >
          ⚠️ OT NORMAL LEBIH 104 JAM
        </div>
      )}
    </div>

    {/* OT PH */}
    <div
      className="
        rounded-md
        border
        border-slate-800
        bg-slate-950
        px-1.5
        py-0.5
      "
    >
      <div className="text-[10px] font-bold text-white-500">
        OT PH
      </div>
      <div className="text-[10px] font-black text-cyan-400">
        {summary.otPh} Jam
      </div>
    </div>

    {/* =================================
        JUMLAH OT (BERSEBELAHAN KIRI)
        ================================= */}
    <div
      className="
        rounded-md
        border
        border-slate-800
        bg-slate-950
        px-1.5
        py-0.5
        sm:col-span-2
      "
    >
      <div className="text-[10px] font-bold text-white-400">
        JUMLAH OT NORMAL + OT PH
      </div>
      <div className="flex items-center justify-between gap-1">
        <div
          className="
            whitespace-nowrap
            text-[12px]
            font-black
            text-cyan-400
          "
        >
          {jumlahOt} Jam
        </div>
      </div>
    </div>

    {/* =================================
        ELAUN SYIF (BERSEBELAHAN KANAN)
        ================================= */}
    <div
      className="
        rounded-md
        border
        border-blue-900/40
        bg-slate-950
        px-1.5
        py-0.5
        sm:col-span-1
      "
    >
      <div className="text-[10px] font-bold text-white-500">
        ELAUN SYIF
      </div>
      <div className="text-[10px] font-black text-cyan-400">
        RM {Number(summary.elaun || 0).toFixed(2)}
      </div>
    </div>
  </div>

  {/* =====================================
      BUTANG KIRA GAJI + RESET
      ===================================== */}
  <div
    className="
      gap-1
      mt-1
    "
  >
    {/* KIRA GAJI */}
    <button
      type="button"
      onClick={onOpenSalary}
      className="
        mb-1
        h-9
        w-full
        rounded-md
        border
        border-blue-400
        text-[11px]
        font-black
        uppercase
        tracking-wide
        text-yellow-500
        transition
        hover:bg-emerald-900/60
        hover:text-emerald-200
      "
    >
      🪙💶 KLIK SINI UNTUK ANGGARAN GAJI 💸💰
    </button>
  </div>

{/* =====================================
      BUTANG PILIHAN BULAN
      ===================================== */}

  <div className="">

       <select
  value={selectedMonth}
  onChange={(e) => onMonthChange(e.target.value)}
  className="
    mb-1
    h-9
    w-full
    rounded-md
    border
    border-blue-400
    bg-slate-900
    px-2
    text-[14px]
    font-black
    uppercase
    tracking-wide
    text-cyan-300
    outline-none
    animate-pulse
    shadow-[0_0_10px_rgba(34,211,238,0.5)]
    focus:border-cyan-300
    focus:shadow-[0_0_9px_rgba(34,211,238,0.8)]
  "
>
  {months.map((month) => (
    <option
      key={month.key}
      value={month.key}
      className="bg-slate-900 text-white-300"
    >
      {month.label}
    </option>
  ))}
</select>

<div
    className="
      grid
      grid-cols-[89px_147px_33px_36px_33px]
      rounded-md
      items-start
      gap-1
      border-b
      border-slate-800
      bg-slate-950
      px-1
      py-1
      "
  >
    <div className="text-[9px] font-black uppercase text-blue-200">
      TARIKH
    </div>

    <div className="text-[9px] font-black uppercase text-blue-200">
      SYIF
    </div>

    <div className="text-center text-[9px] font-black uppercase text-blue-200">
      OT
    </div>

    <div className="text-center text-[9px] font-black uppercase text-blue-200">
      ELAUN
    </div>
    <div className="text-center text-[9px] font-black uppercase text-blue-200">
      OT +
    </div>
  </div>

      </div>
</div>

    </section>
  );
}