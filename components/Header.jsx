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
        pb-1
        pt-1
      "
    >

      {/* =====================================
          TAJUK
          ===================================== */}

      <h1
        className="
          mb-2
          text-center
          text-xl
          font-black
          uppercase
          tracking-[0.18em]
          text-blue-400
          drop-shadow-[0_0_8px_rgba(59,130,246,0.35)]
        "
      >
        ROSTER / JADUAL SYIF
      </h1>


      {/* =====================================
          PILIH BULAN
          ===================================== */}

      <div className="mb-2">

        <select
          value={selectedMonth}
          onChange={(e) =>
            onMonthChange(e.target.value)
          }
          className="
            h-9
            w-full
            rounded-lg
            border
            border-blue-800
            bg-slate-900
            px-3
            text-sm
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


      {/* =====================================
          DATA
          ===================================== */}

      <div
        className="
          rounded-xl
          border
          border-blue-900/50
          bg-slate-900
          p-2
        "
      >

        <div
          className="
            grid
            grid-cols-2
            gap-1.5
            sm:grid-cols-3
          "
        >

          {/* KERJA NORMAL */}

          <div
            className="
              rounded-lg
              border
              border-slate-800
              bg-slate-950
              px-2
              py-1.5
            "
          >

            <div className="text-[8px] font-bold text-slate-500">
              KERJA NORMAL
            </div>

            <div className="text-sm font-black text-white">
              {summary.normalDays} Hari
            </div>

          </div>


          {/* KERJA PH */}

          <div
            className="
              rounded-lg
              border
              border-slate-800
              bg-slate-950
              px-2
              py-1.5
            "
          >

            <div className="text-[8px] font-bold text-slate-500">
              KERJA PH
            </div>

            <div className="text-sm font-black text-white">
              {summary.phDays} Hari
            </div>

          </div>


          {/* OT NORMAL */}

          <div
            className="
              rounded-lg
              border
              border-slate-800
              bg-slate-950
              px-2
              py-1.5
            "
          >

            <div className="text-[8px] font-bold text-slate-500">
              OT NORMAL
            </div>

            <div className="text-sm font-black text-blue-300">
              {summary.otNormal} Jam
            </div>

          </div>


          {/* OT PH */}

          <div
            className="
              rounded-lg
              border
              border-slate-800
              bg-slate-950
              px-2
              py-1.5
            "
          >

            <div className="text-[8px] font-bold text-slate-500">
              OT PH
            </div>

            <div className="text-sm font-black text-purple-300">
              {summary.otPh} Jam
            </div>

          </div>


          {/* =================================
              JUMLAH OT
              ================================= */}

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

              {/* JUMLAH */}

              <div
                className="
                  whitespace-nowrap
                  text-base
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
                    text-[8px]
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
              rounded-lg
              border
              border-blue-900/40
              bg-slate-950
              px-2
              py-1.5
              sm:col-span-1
            "
          >

            <div className="text-[8px] font-bold text-slate-500">
              ELAUN SYIF
            </div>

            <div className="text-sm font-black text-yellow-300">
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
            mt-2
            h-8
            w-full
            rounded-lg
            border
            border-red-900/60
            bg-red-950/40
            text-[9px]
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