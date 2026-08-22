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

  const extraHoursText = String(
    extra?.hours ?? ""
  ).trim();

  const extraTypeText = String(
    extra?.type ?? ""
  ).trim();

  // Hanya nombor dikira sebagai jam
  const numericExtraHours =
    extraHoursText === ""
      ? 0
      : Number(
          extraHoursText.replace(",", ".")
        );

  const validExtraHours =
    Number.isNaN(numericExtraHours)
      ? 0
      : numericExtraHours;

  const totalOt =
    (Number(data.ot) || 0) +
    validExtraHours;

  // =========================================
  // ADA TEKS OT SAMBUNG?
  // =========================================

  const hasExtraText =
    extraTypeText !== "" ||
    extraHoursText !== "";

  // =========================================
  // WARNA TARIKH
  // =========================================

  function getDateBoxStyle() {
    // D/S
    if (
      shift === "KERJA BIASA D/S" ||
      shift === "KERJA OD D/S"
    ) {
      return "bg-yellow-400 border-yellow-200 text-slate-950";
    }

    // N/S
    if (
      shift === "KERJA BIASA N/S" ||
      shift === "KERJA OD N/S"
    ) {
      return "bg-slate-500 border-slate-300 text-white";
    }

    // PH
    if (
      shift === "KERJA PH D/S" ||
      shift === "KERJA PH N/S"
    ) {
      return "bg-purple-500 border-purple-200 text-white";
    }

    // CUTI
    if (shift === "CUTI") {
      return "bg-green-600 border-green-300 text-white";
    }

    // MC
    if (shift === "MC") {
      return "bg-red-600 border-red-300 text-white";
    }

    // OFF / REST
    if (
      shift === "OFF" ||
      shift === "REST"
    ) {
      return "bg-slate-950 border-slate-700 text-slate-200";
    }

    return "bg-slate-900 border-slate-800 text-slate-300";
  }

  return (
    <div
      className="
        grid
        grid-cols-[78px_minmax(0,1fr)_42px_52px_32px]
        items-center
        gap-1
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
          min-h-[34px]
          flex-row
          items-center
          gap-1.5
          rounded-md
          border-l-2
          px-1.5
          ${getDateBoxStyle()}
        `}
      >
        <div className="text-[14px] font-black leading-none">
          {String(day).padStart(2, "0")}
        </div>

        <div className="truncate text-[10px] font-black uppercase leading-none">
          {weekday}
        </div>
      </div>

      {/* =====================================
          SYIF + OT SAMBUNG
          ===================================== */}

      <div className="min-w-0">
        <select
          value={shift}
          onChange={(e) =>
            onShiftChange(
              day,
              e.target.value
            )
          }
          className="
            h-8
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
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}
        </select>

        {/* =================================
            OT SAMBUNG
            HANYA PAPAR JIKA ADA INPUT
            ================================= */}

        {hasExtraText && (
          <button
            type="button"
            onClick={() =>
              onOpenOt(day)
            }
            className="
              mt-0.5
              block
              max-w-full
              truncate
              text-left
              text-[9px]
              font-black
              uppercase
              leading-none
              text-red-500
              hover:text-red-300
            "
            title="Edit OT Sambung"
          >
            {extraTypeText}

            {extraTypeText !== "" &&
              extraHoursText !== "" && (
                <span>
                  {" • "}
                </span>
              )}

            {extraHoursText !== "" && (
  <>
    {extraTypeText !== ""}
    {extraHoursText}
    {!/[jJ]\s*$/.test(extraHoursText) &&
      /[0-9]/.test(extraHoursText) &&
      " Jam"}
  </>
)}
          </button>
        )}
      </div>

      {/* =====================================
          OT
          ===================================== */}

      <div className="text-center">
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
            )}
            J
          </span>
        ) : (
          <span className="text-[10px] text-slate-700">
            —
          </span>
        )}
      </div>

      {/* =====================================
          ELAUN
          ===================================== */}

      <div className="text-center">
        {data.elaun > 0 ? (
          <span className="text-[10px] font-black text-blue-200">
            RM {data.elaun}
          </span>
        ) : (
          <span className="text-[10px] text-slate-700">
            —
          </span>
        )}
      </div>

      {/* =====================================
          BUTTON OT
          ===================================== */}

      <div className="flex justify-center">
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
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}