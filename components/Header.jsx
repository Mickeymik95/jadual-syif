"use client";

export default function Header({
  summary,
  onReset,
  months,
  selectedMonth,
  onMonthChange,
}) {
  const jumlahOt =
    Number(summary.otNormal || 0) +
    Number(summary.otPh || 0);

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
        pb-1
        pt-1
      "
    >

      {/* TAJUK */}

      <h1
        className="
          mb-1
          text-center
          text-lg
          font-black
          uppercase
          tracking-[0.14em]
          text-blue-400
          drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]
        "
      >
        ROSTER / JADUAL SYIF
      </h1>


      {/* PILIH BULAN */}

      <div className="mb-1.5">

        <select
          value={selectedMonth}
          onChange={(e) =>
            onMonthChange(e.target.value)
          }
          className="
            h-8
            w-full
            rounded-lg
            border
            border-blue-800
            bg-slate-900
            px-2
            text-xs
            font-black
            uppercase
            tracking-wide
            text-blue-200
            outline-none
            focus:border-blue-400
            focus:ring-1
            focus:ring-blue-500
          "
        >

          {months.map(
            (month, index) => (
              <option
                key={month}
                value={index}
              >
                {month}
              </option>
            )
          )}

        </select>

      </div>


      {/* DATA */}

      <div
        className="
          rounded-lg
          border
          border-blue-900/50
          bg-slate-900
          p-1.5
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
              px-2
              py-1
            "
          >
            <div className="text-[7px] font-bold text-slate-500">
              KERJA NORMAL
            </div>

            <div className="text-xs font-black text-white">
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
              px-2
              py-1
            "
          >
            <div className="text-[7px] font-bold text-slate-500">
              KERJA PH
            </div>

            <div className="text-xs font-black text-white">
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
              px-2
              py-1
            "
          >
            <div className="text-[7px] font-bold text-slate-500">
              OT NORMAL
            </div>

            <div className="text-xs font-black text-blue-300">
              {summary.otNormal} Jam
            </div>
          </div>


          {/* OT PH */}

          <div
            className="
              rounded-md
              border
              border-slate-800
              bg-slate-950
              px-2
              py-1
            "
          >
            <div className="text-[7px] font-bold text-slate-500">
              OT PH
            </div>

            <div className="text-xs font-black text-purple-300">
              {summary.otPh} Jam
            </div>
          </div>


          {/* JUMLAH OT */}

<div
  className="
    col-span-2
    rounded-lg
    border
    border-blue-800
    bg-blue-950/30
    px-2
    py-1
    sm:col-span-2
  "
>
  <div className="text-[8px] font-bold text-slate-400">
    JUMLAH OT
  </div>

  <div className="flex items-center justify-between gap-2">

    {/* JUMLAH OT */}
    <div className="text-base font-black text-blue-200">
      {Number(
        (
          Number(summary.otNormal) +
          Number(summary.otPh)
        ).toFixed(1)
      )} Jam
    </div>

    {/* AMARAN > 104 JAM */}
    {(
      Number(summary.otNormal) +
      Number(summary.otPh)
    ) > 104 && (
      <div
        className="
          animate-pulse
          whitespace-nowrap
          text-[12px]
          font-black
          uppercase
          text-orange-400
        "
      >
        ⚠️ OT MELEBIHI 104 JAM
      </div>
    )}

  </div>
</div>


          {/* ELAUN SYIF */}

          <div
            className="
              col-span-2
              rounded-md
              border
              border-blue-900/40
              bg-slate-950
              px-2
              py-1
              sm:col-span-1
            "
          >

            <div className="text-[7px] font-bold text-slate-500">
              ELAUN SYIF
            </div>

            <div className="text-xs font-black text-yellow-300">
              RM {summary.elaun}
            </div>

          </div>

        </div>


        {/* RESET */}

        <button
          type="button"
          onClick={onReset}
          className="
            mt-1.5
            h-7
            w-full
            rounded-md
            border
            border-red-900/60
            bg-red-950/40
            text-[14px]
            font-black
            uppercase
            tracking-wide
            text-red-400
            transition
            hover:bg-red-900/50
            hover:text-red-200
          "
        >
          🗑 RESET BULAN INI
        </button>

      </div>

    </section>
  );
}