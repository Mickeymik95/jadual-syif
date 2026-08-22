"use client";

export default function Header({
  summary,
  onReset,
}) {

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
    text-white
    drop-shadow-[0_0_8px_rgba(59,130,246,0.35)]
  "
>
  <span className="text-blue-400">ROSTER / JADUAL SYIF</span>
</h1>


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

        <h2
          className="
            mb-2
            text-xs
            font-black
            uppercase
            tracking-wide
            text-blue-200
          "
        >
          DATA
        </h2>


        {/* =================================
            BARIS DATA
            ================================= */}

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

            <div className="text-[8px] text-slate-500">
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

            <div className="text-[8px] text-slate-500">
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

            <div className="text-[8px] text-slate-500">
              OT NORMAL
            </div>

            <div className="text-sm font-black">
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

            <div className="text-[8px] text-slate-500">
              OT PH
            </div>

            <div className="text-sm font-black">
              {summary.otPh}  Jam
            </div>

          </div>


          {/* ELAUN SYIF */}

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

            <div className="text-[8px] text-slate-500">
              ELAUN SYIF
            </div>

            <div className="text-sm font-black">
              RM {summary.elaun}
            </div>

          </div>

        </div>


        {/* =================================
            RESET
            ================================= */}

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
          🗑 RESET SEMUA DATA
        </button>

      </div>

    </section>

  );
}