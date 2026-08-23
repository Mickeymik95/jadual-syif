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

  const jumlahOtDisplay = Number(
    jumlahOt.toFixed(1)
  );

  const otLebih104 = jumlahOt > 104;

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

      {/* =====================================
          TAJUK
          ===================================== */}

      <h1
        className="
          mb-1
          text-center
          text-base
          font-black
          tracking-[0.1em]
          text-blue-400
          drop-shadow-[0_0_5px_rgba(59,130,246,0.35)]
        "
      >
        ROSTER/SYIF by PB NAZMI
      </h1>


      {/* =====================================
          PILIH BULAN
          ===================================== */}

      <div className="mb-1">

        <select
          value={selectedMonth}
          onChange={(e) =>
            onMonthChange(e.target.value)
          }
          className="
            h-7
            w-full
            rounded-md
            border
            border-blue-800
            bg-slate-900
            px-2
            text-[11px]
            font-black
            uppercase
            tracking-wide
            text-blue-200
            outline-none
            focus:border-blue-400
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

            <div className="text-[6px] font-bold text-slate-500">
              KERJA NORMAL
            </div>

            <div className="text-[11px] font-black text-white">
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

            <div className="text-[6px] font-bold text-slate-500">
              KERJA PH
            </div>

            <div className="text-[11px] font-black text-white">
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

            <div className="text-[6px] font-bold text-slate-500">
              OT NORMAL
            </div>

            <div className="text-[11px] font-black text-blue-300">
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
              px-1.5
              py-0.5
            "
          >

            <div className="text-[6px] font-bold text-slate-500">
              OT PH
            </div>

            <div className="text-[11px] font-black text-purple-300">
              {summary.otPh} Jam
            </div>

          </div>


          {/* =================================
              JUMLAH OT
              ================================= */}

          <div
            className="
              col-span-2
              rounded-md
              border
              border-slate-800
              bg-slate-950
              px-1.5
              py-0.5
              sm:col-span-2
            "
          >

            <div className="text-[6px] font-bold text-slate-400">
              JUMLAH OT
            </div>

            <div className="flex items-center justify-between gap-1">

              <div
                className="
                  whitespace-nowrap
                  text-xs
                  font-black
                  text-blue-200
                "
              >
                {jumlahOtDisplay} Jam
              </div>


              {/* AMARAN */}

              {otLebih104 && (
                <div
                  className="
                    animate-pulse
                    whitespace-nowrap
                    text-[11px]
                    font-black
                    uppercase
                    text-red-400
                  "
                >
                  ⚠️ OT MELEBIHI 104 JAM
                </div>
              )}

            </div>

          </div>


          {/* =================================
              ELAUN SYIF
              ================================= */}

          <div
            className="
              col-span-2
              rounded-md
              border
              border-blue-900/40
              bg-slate-950
              px-1.5
              py-0.5
              sm:col-span-1
            "
          >

            <div className="text-[6px] font-bold text-slate-500">
              ELAUN SYIF
            </div>

            <div className="text-[11px] font-black">
              RM {summary.elaun}
            </div>

          </div>

        </div>


        {/* =====================================
            RESET BULAN INI
            ===================================== */}

        <button
          type="button"
          onClick={onReset}
          className="
            mt-1
            h-7
            w-full
            rounded-md
            border
            border-red-900/60
            bg-red-950/40
            text-[12px]
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