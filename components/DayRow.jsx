"use client";

import {
  getShiftData,
  SHIFT_OPTIONS,
} from "../data/shifts";

export default function DayRow({
  day,
  weekday,
  shift,
  extra,
  onShiftChange,
  onOpenOt,
}) {
  const data = getShiftData(shift);

  // =========================================
  // OT SAMBUNG
  // =========================================

  const rawExtraHours = String(
    extra?.hours ?? ""
  ).trim();

  const numericExtraHours =
    rawExtraHours === ""
      ? 0
      : Number(
          rawExtraHours
            .replace(",", ".")
            .replace(/[jJ]/g, "")
            .trim()
        );

  const validExtraHours =
    Number.isNaN(numericExtraHours)
      ? 0
      : numericExtraHours;

  const totalOt =
    (Number(data.ot) || 0) +
    validExtraHours;


  // =========================================
  // WARNA TARIKH + HARI
  // =========================================

 function getDateBoxStyle() {

  // DS
  if (
    shift === "DS" ||
    shift === "KERJA BIASA D/S" ||
    shift === "KERJA OD D/S"
  ) {
    return "bg-yellow-400 border-yellow-200 text-slate-950";
  }

  // NS
  if (
    shift === "NS" ||
    shift === "KERJA BIASA N/S" ||
    shift === "KERJA OD N/S"
  ) {
    return "bg-slate-500 border-slate-300 text-white";
  }

  // PH DS / PH NS
  if (
    shift === "PH DS" ||
    shift === "PH NS" ||
    shift === "KERJA PH D/S" ||
    shift === "KERJA PH N/S"
  ) {
    return "bg-purple-500 border-purple-200 text-white";
  }

  // CUTI / AL = BIRU
  if (
    shift === "CUTI" ||
    shift === "AL" ||
    shift === "CUTI/AL"
  ) {
    return "bg-blue-500 border-blue-300 text-white";
  }

  // MC = MERAH
  if (shift === "MC") {
    return "bg-red-600 border-red-300 text-white";
  }

  // OFF / REST = TIADA WARNA KHAS
  if (
    shift === "OFF" ||
    shift === "REST"
  ) {
    return "bg-slate-900 border-slate-800 text-slate-300";
  }

  // KOSONG
  return "bg-slate-900 border-slate-800 text-slate-300";
}


  // =========================================
  // UI
  // =========================================

  return (
    <div
      className="
        grid
        grid-cols-[88px_minmax(0,1fr)_42px_52px_32px]
        items-center
        gap-1
        min-h-[44px]
        border-b
        border-slate-800
        px-1
        py-0.5
      "
    >

      {/* =====================================
          TARIKH + HARI
          ===================================== */}

      <div
        className={`
          flex
          min-h-[38px]
          flex-row
          items-center
          gap-1.5
          rounded-md
          border-l-2
          px-2
          ${getDateBoxStyle()}
        `}
      >

        {/* TARIKH */}

        <div
          className="
            text-[14px]
            font-black
            leading-none
          "
        >
          {String(day).padStart(2, "0")}
        </div>


        {/* HARI */}

        <div
          className="
            truncate
            text-[10px]
            font-black
            uppercase
            leading-none
          "
        >
          {weekday}
        </div>

      </div>


      {/* =====================================
          SYIF + OT SAMBUNG
          ===================================== */}

      <div className="min-w-0 pl-1">

        {/* SYIF */}

        <select
          value={shift}
          onChange={(e) =>
            onShiftChange(
              day,
              e.target.value
            )
          }
          className="
  h-6
  w-full
  min-w-0
  rounded-md
  border
  border-slate-700
  bg-slate-950
  px-1
  text-[9px]
  font-bold
  text-slate-200
  outline-none
  focus:border-blue-500
"
        >

          <option value="">
            PILIH SYIF
          </option>

          {SHIFT_OPTIONS.map(
            (option, index) => {

              /*
               * SUPPORT:
               *
               * "DS"
               *
               * ATAU
               *
               * {
               *   value: "DS",
               *   label: "DS"
               * }
               */

              const optionValue =
                typeof option === "object"
                  ? option.value
                  : option;

              const optionLabel =
                typeof option === "object"
                  ? option.label
                  : option;

              return (
                <option
                  key={
                    optionValue ??
                    `shift-${index}`
                  }
                  value={
                    optionValue ?? ""
                  }
                >
                  {optionLabel}
                </option>
              );
            }
          )}

        </select>


        {/* =====================================
            RUANG TETAP OT SAMBUNG
            ===================================== */}

        <div
          className="
            h-4
            overflow-hidden
          "
        >

          {extra && (
            <button
              type="button"
              onClick={() =>
                onOpenOt(day)
              }
              className="
                block
                max-w-full
                truncate
                pl-1
                text-left
                text-[9px]
                font-black
                uppercase
                leading-4
                text-red-500
                hover:text-red-300
              "
              title="Edit OT Sambung"
            >

              {extra.type ||
                "OT SAMBUNG"}

              {String(
                extra.hours ?? ""
              ).trim() !== "" && (
                <>
                  {" • "}
                  {extra.hours}J
                </>
              )}

            </button>
          )}

        </div>

      </div>


      {/* =====================================
          JUMLAH OT
          ===================================== */}

      <div
        className="
          text-center
        "
      >

        {totalOt !== 0 ? (

          <span
            className={`
              text-[10px]
              font-black
              ${
                totalOt < 0
                  ? "text-red-400"
                  : "text-blue-200"
              }
            `}
          >
            {Number(
              totalOt.toFixed(1)
            )}J
          </span>

        ) : (

          <span
            className="
              text-[10px]
              text-slate-700
            "
          >
            —
          </span>

        )}

      </div>


      {/* =====================================
          ELAUN
          ===================================== */}

      <div
        className="
          text-center
        "
      >

        {data.elaun > 0 ? (

          <span
            className="
              text-[10px]
              font-black
              text-blue-200
            "
          >
            RM{data.elaun}
          </span>

        ) : (

          <span
            className="
              text-[10px]
              text-slate-700
            "
          >
            —
          </span>

        )}

      </div>


      {/* =====================================
          BUTTON OT SAMBUNG
          ===================================== */}

      <div
        className="
          flex
          justify-center
        "
      >

        <button
          type="button"
          onClick={() =>
            onOpenOt(day)
          }
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-md
            border
            border-blue-800
            bg-blue-950
            text-[12px]
            font-black
            text-blue-200
            hover:bg-blue-800
          "
          title="OT Sambung"
        >
          ⚙️
        </button>

      </div>

    </div>
  );
}