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
  isToday,
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
  // SEMAK ADA OT SAMBUNG
  // =========================================

  const hasExtra =
    !!extra &&
    (
      String(extra.type ?? "").trim() !== "" ||
      String(extra.hours ?? "").trim() !== ""
    );


  // =========================================
  // WARNA TARIKH + HARI
  // =========================================

  function getDateBoxStyle() {

    if (shift === "DS") {
      return "bg-yellow-600 border-yellow-200 text-slate-950";
    }

    if (shift === "NS") {
      return "bg-slate-600 border-slate-300 text-white";
    }

    if (shift === "OD DS") {
      return "bg-yellow-300 border-yellow-200 text-slate-950";
    }

    if (shift === "OD NS") {
      return "bg-slate-400 border-slate-400 text-white";
    }

    if (shift === "PH DS") {
      return "bg-purple-500 border-purple-200 text-white";
    }

    if (shift === "PH NS") {
      return "bg-purple-600 border-purple-300 text-white";
    }

    if (shift === "CUTI/AL") {
      return "bg-blue-500 border-blue-300 text-white";
    }

    if (shift === "MC") {
      return "bg-red-600 border-red-300 text-white";
    }

    if (
      shift === "OFF" ||
      shift === "REST"
    ) {
      return "bg-green-800 border-green-900 text-slate-300";
    }

    return "bg-slate-900 border-slate-800 text-slate-300";
  }


  // =========================================
  // SAIZ
  // =========================================

  const shiftHeightClass = hasExtra
    ? "h-[24px]"
    : "h-[38px]";


  // =========================================
  // UI
  // =========================================

  return (
    <div
      className="
        grid
        grid-cols-[88px_minmax(0,1fr)_42px_52px_32px]
        items-start
        gap-1
        h-[38px]
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
          h-[38px]
          min-h-[38px]
          flex-row
          items-center
          gap-1.5
          rounded-md
          border-l-2
          px-2
          ${getDateBoxStyle()}
          ${
            isToday
              ? "animate-pulse ring-2 ring-whitenpm-400 ring-offset-1 ring-offset-slate-600"
              : ""
          }
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
          JUMLAH RUANG = 38px
          ===================================== */}

      <div
        className="
          relative
          min-w-0
          h-[38px]
        "
      >

        {/* =================================
            OT SAMBUNG
            ================================= */}

        {hasExtra && (
          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-[14px]
              overflow-hidden
              pl-2
            "
          >

            <button
              type="button"
              onClick={() => onOpenOt(day)}
              className="
                block
                max-w-full
                truncate
                text-left
                text-[8px]
                font-black
                uppercase
                leading-[14px]
                text-red-500
                hover:text-red-300
              "
              title="Edit OT Sambung"
            >

              {String(
                extra.type || "OT SAMBUNG"
              )}

              {String(
                extra.hours ?? ""
              ).trim() !== "" && (
                <>
                  {" • "}
                  {String(extra.hours).trim()}
                  J
                </>
              )}

            </button>

          </div>
        )}


        {/* =================================
            SYIF
            ================================= */}

        <select
          value={shift}
          onChange={(e) =>
            onShiftChange(
              day,
              e.target.value
            )
          }
          className={`
            absolute
            left-0
            right-0
            ${hasExtra ? "top-[14px]" : "top-0"}
            ${shiftHeightClass}
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
          `}
        >

          <option value="">
            PILIH SYIF
          </option>

          {SHIFT_OPTIONS.map(
            (option, index) => {

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

      </div>


      {/* =====================================
          JUMLAH OT
          ===================================== */}

      <div
        className="
          flex
          h-[38px]
          items-center
          justify-center
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
            {Number(totalOt.toFixed(1))}J
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
          flex
          h-[38px]
          items-center
          justify-center
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
          h-[38px]
          items-center
          justify-center
        "
      >

        <button
          type="button"
          onClick={() => onOpenOt(day)}
          className="
            flex
            h-[38px]
            w-full
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