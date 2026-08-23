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
  // SEMAK ADA OT SAMBUNG
  // =========================================

  const hasExtra =
    extra &&
    (
      String(extra.type ?? "").trim() !== "" ||
      String(extra.hours ?? "").trim() !== ""
    );

  // =========================================
  // WARNA TARIKH + HARI
  // =========================================

  function getDateBoxStyle() {
    // DS
    if (shift === "DS") {
      return "bg-yellow-600 border-yellow-200 text-slate-950";
    }

    // NS
    if (shift === "NS") {
      return "bg-slate-600 border-slate-300 text-white";
    }

    // OD DS
    if (shift === "OD DS") {
      return "bg-yellow-300 border-yellow-200 text-slate-950";
    }

    // OD NS
    if (shift === "OD NS") {
      return "bg-slate-400 border-slate-400 text-white";
    }

    // PH DS
    if (shift === "PH DS") {
      return "bg-purple-500 border-purple-200 text-white";
    }

    // PH NS
    if (shift === "PH NS") {
      return "bg-purple-600 border-purple-300 text-white";
    }

    // CUTI / AL
    if (shift === "CUTI/AL") {
      return "bg-blue-500 border-blue-300 text-white";
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
      return "bg-slate-900 border-slate-800 text-slate-300";
    }

    // KOSONG
    return "bg-slate-900 border-slate-800 text-slate-300";
  }

  // =========================================
  // SAIZ
  // =========================================
  //
  // TARIKH SENTIASA 38px
  //
  // TIADA OT:
  //     SYIF = 38px
  //
  // ADA OT:
  //     OT   = 14px
  //     SYIF = 24px
  //
  // JUMLAH = 38px
  // =========================================

  const shiftHeightClass = hasExtra
    ? "h-[24px]"
    : "h-[38px]";

  // Nilai OT / Elaun perlu turun sedikit
  // apabila terdapat OT Sambung supaya
  // kedudukannya selari dengan SYIF.

  const valuePaddingClass = hasExtra
    ? "pt-[14px]"
    : "pt-[12px]";

  // Button juga ikut tinggi syif.
  const buttonHeightClass = hasExtra
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
        border-b
        border-slate-800
        px-1
        py-0.5
      "
    >

      {/* =====================================
          TARIKH + HARI
          SENTIASA 38px
          ===================================== */}

      <div
        className={`
          flex
          min-h-[38px]
          h-[38px]
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
          JUMLAH TINGGI SENTIASA 38px
          ===================================== */}

      <div
        className="
          min-w-0
          pl-1
        "
      >

        {/* =================================
            OT SAMBUNG
            ================================= */}

        {hasExtra ? (

          <div
            className="
              h-[14px]
              overflow-hidden
              pl-2
            "
          >

            <button
              type="button"
              onClick={() =>
                onOpenOt(day)
              }
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
                extra.type ||
                "OT SAMBUNG"
              )}

              {String(
                extra.hours ?? ""
              ).trim() !== "" && (
                <>
                  {" • "}
                  {String(
                    extra.hours
                  ).trim()}
                  J
                </>
              )}

            </button>

          </div>

        ) : (

          // Tiada OT → tiada ruang tambahan
          <div className="h-0" />

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
        className={`
          text-center
          ${valuePaddingClass}
        `}
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
        className={`
          text-center
          ${valuePaddingClass}
        `}
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
        className={`
          flex
          justify-center
          ${
            hasExtra
              ? "pt-[14px]"
              : ""
          }
        `}
      >

        <button
          type="button"
          onClick={() =>
            onOpenOt(day)
          }
          className={`
            flex
            ${buttonHeightClass}
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
          `}
          title="OT Sambung"
        >
          ⚙️
        </button>

      </div>

    </div>
  );
}