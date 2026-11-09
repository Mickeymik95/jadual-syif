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
     <div className="flex flex-row items-center justify-center gap-4 p-2">
  <img 
    src="https://i.postimg.cc/nh56Vk3n/IMG-20261109-110540.jpg" 
    alt="🤣" 
    className="w-18 h-18 rounded-full object-cover shadow-md" 
  />
  <img 
    src="https://i.postimg.cc/0Q1FDNRw/IMG-20261109-145419-edit-448384884397078.jpg" 
    alt="🤣" 
    className="w-18 h-18 rounded-full object-cover shadow-md" 
  />
  <img 
    src="https://i.postimg.cc/L5NbcBqm/Screenshot-20261109-145230.jpg" 
    alt="🤣" 
    className="w-18 h-18 rounded-full object-cover shadow-md" 
  />
</div>

      <h1
        className="
          mb-1
          text-center
          text-base
          font-black
          tracking-[0.1em]
          text-green-400
          drop-shadow-[0_0_5px_rgba(10,130,246,0.35)]
        "
      >
  📞📱 <a 
      href="https://wa.link/x4v2da" 
      target="_blank" 
      rel="noopener noreferrer"
    >
    By NAZMI-M!k
    </a> 🤗🤣
      </h1>
      <div className="mb-1">

       <select
  value={selectedMonth}
  onChange={(e) => onMonthChange(e.target.value)}
  className="
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
    shadow-[0_0_8px_rgba(34,211,238,0.5)]
    focus:border-cyan-300
    focus:shadow-[0_0_12px_rgba(34,211,238,0.8)]
  "
>
  {months.map((month, index) => (
    <option
      key={month}
      value={index}
      className="bg-slate-900 text-white-300"
    >
      {month}
    </option>
  ))}
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

            <div className="text-[7px] font-bold text-white-500">
              KERJA NORMAL
            </div>

            <div className="text-[11px] font-black text-blue-300">
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

            <div className="text-[7px] font-bold text-white-500">
              KERJA PH
            </div>

            <div className="text-[11px] font-black text-blue-300">
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

            <div className="text-[7px] font-bold text-white-500">
              OT NORMAL
            </div>

            <div className="text-[11px] font-black text-blue-300">
              {summary.otNormal} Jam
            </div>
              {/* AMARAN */}

              {otLebih104 && (
                <div
                  className="
                    animate-pulse
                    whitespace-nowrap
                    text-[10px]
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

            <div className="text-[7px] font-bold text-white-500">
              OT PH
            </div>

            <div className="text-[11px] font-black text-blue-300">
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

            <div className="text-[7px] font-bold text-white-400">
              JUMLAH OT NORMAL + OT PH
            </div>

            <div className="flex items-center justify-between gap-1">

              <div
                className="
                  whitespace-nowrap
                  text-l
                  font-black
                  text-yellow-300
                "
              >
                {jumlahOt} Jam
              </div>

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

            <div className="text-[7px] font-bold text-white-500">
              ELAUN SYIF
            </div>

            <div className="text-[11px] font-black text-blue-300">
              RM {Number(summary.elaun || 0).toFixed(2)}
            </div>

          </div>

        </div>


        {/* =====================================
            BUTANG KIRA GAJI + RESET
            ===================================== */}

        <div
          className="
            mt-1
            gap-1
          "
        >

          {/* KIRA GAJI */}

          <button
            type="button"
            onClick={onOpenSalary}
            className="
              h-7
              w-full
              rounded-md
              border
              border-emerald-800
              bg-emerald-950/50
              text-[11px]
              font-black
              uppercase
              tracking-wide
              text-emerald-400
              transition
              hover:bg-emerald-900/60
              hover:text-emerald-200
            "
          >
            💰 ANGGARAN GAJI
          </button>

        </div>

      </div>

    </section>
  );
}