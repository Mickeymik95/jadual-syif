"use client";

import { useEffect, useState } from "react";

const ELAUN_DOBI = 60;

function money(value) {
  return `RM ${Number(value || 0).toFixed(2)}`;
}

export default function SalaryModal({
  open,
  onClose,
  summary,
}) {
  const [basic, setBasic] = useState("");

  // ==============================
  // AMBIL BASIC YANG DISIMPAN
  // ==============================
  useEffect(() => {
    if (!open) return;

    const savedBasic =
      localStorage.getItem("jadual-syif-basic");

    if (savedBasic !== null) {
      setBasic(savedBasic);
    }
  }, [open]);

  if (!open) return null;

  // ==============================
  // BASIC
  // ==============================
  const basicValue =
    Number(
      String(basic)
        .replace(",", ".")
        .trim()
    ) || 0;

  // ==============================
  // DATA DARIPADA JADUAL
  // ==============================
  const elaunSyif =
    Number(summary?.elaun) || 0;

  const jumlahOtNormal =
    Number(summary?.otNormal) || 0;

  const jumlahOtPh =
    Number(summary?.otPh) || 0;

  const jumlahHariPh =
    Number(summary?.phDays) || 0;

  // ==============================
  // ASAS GAJI OT
  // (Basic + Elaun Syif) / 26 / 8
  // ==============================
  const asasGaji =
    (basicValue + elaunSyif) / 26 / 8;

  // ==============================
  // RATE OT NORMAL
  // /26 /8 × 1.5
  // ==============================
  const rateOtNormal =
    asasGaji * 1.5;

  // ==============================
  // RATE KERJA PH
  // /26 × 2
  // TIADA /8
  // ==============================
  const rateKerjaPh =
    ((basicValue + elaunSyif) / 26) * 2;

  // ==============================
  // RATE OT PH
  // /26 /8 × 3
  // ==============================
  const rateOtPh =
    asasGaji * 3;

  // ==============================
  // JUMLAH OT NORMAL
  // ==============================
  const otNormal =
    rateOtNormal * jumlahOtNormal;

  // ==============================
  // JUMLAH KERJA PH
  // ==============================
  const kerjaPh =
    rateKerjaPh * jumlahHariPh;

  // ==============================
  // JUMLAH OT PH
  // ==============================
  const otPh =
    rateOtPh * jumlahOtPh;

  // ==============================
  // GAJI KASAR
  // ==============================
  const gajiKasar =
    basicValue +
    elaunSyif +
    ELAUN_DOBI +
    otNormal +
    kerjaPh +
    otPh;

  // ==============================
  // INPUT BASIC
  // ==============================
  function handleBasicChange(e) {
    const value = e.target.value;

    setBasic(value);

    localStorage.setItem(
      "jadual-syif-basic",
      value
    );
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        h-screen
        w-screen
        bg-slate-900
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          flex-col
          bg-slate-900
        "
      >

        {/* =========================
            HEADER
        ========================== */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-blue-900/50
            bg-slate-950
            px-4
            py-3
          "
        >
          <div>
            <h2
              className="
                text-base
                font-black
                uppercase
                tracking-wide
                text-blue-300
              "
            >
              ANGGARAN GAJI KASAR
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              text-sm
              font-black
              text-slate-300
              hover:bg-red-900
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div
          className="
            flex
            flex-1
            flex-col
            justify-center
            px-3
            py-2
          "
        >

          {/* =========================
              BASIC
          ========================== */}
          <div
            className="
              mb-2
              rounded-xl
              border
              border-blue-600
              bg-slate-950
              p-3
            "
          >
            <label
              htmlFor="basic-gaji"
              className="
                mb-1
                block
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-blue-300
              "
            >
              MASUKKAN GAJI BASIC
            </label>

            <div className="relative">
              <span
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-sm
                  font-black
                  text-slate-400
                "
              >
                RM
              </span>

              <input
                id="basic-gaji"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={basic}
                onChange={handleBasicChange}
                placeholder="Masukkan Basic"
                autoFocus
                className="
                  block
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-slate-600
                  bg-slate-900
                  pl-11
                  pr-3
                  text-base
                  font-black
                  text-white
                  outline-none
                  placeholder:text-slate-600
                  focus:border-blue-400
                  focus:ring-1
                  focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* =========================
              PECAHAN GAJI
          ========================== */}
          <div
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-950
              p-3
            "
          >
            <div
              className="
                mb-2
                border-b
                border-slate-800
                pb-2
                text-[9px]
                font-black
                uppercase
                tracking-widest
                text-blue-300
              "
            >
              PECAHAN GAJI
            </div>

            {/* BASIC */}
            <div
              className="
                mb-1.5
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[11px]
                  font-bold
                  text-slate-400
                "
              >
                Basic
              </span>

              <span
                className="
                  text-[11px]
                  font-black
                  text-white
                "
              >
                {money(basicValue)}
              </span>
            </div>

            {/* ELAUN SYIF */}
            <div
              className="
                mb-1.5
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[11px]
                  font-bold
                  text-slate-400
                "
              >
                Elaun Syif
              </span>

              <span
                className="
                  text-[11px]
                  font-black
                  text-white
                "
              >
                {money(elaunSyif)}
              </span>
            </div>

            {/* ELAUN DOBI */}
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[11px]
                  font-bold
                  text-slate-400
                "
              >
                Elaun Dobi
              </span>

              <span
                className="
                  text-[11px]
                  font-black
                  text-white
                "
              >
                {money(ELAUN_DOBI)}
              </span>
            </div>

            {/* =====================
                OT NORMAL
            ====================== */}
            <div
              className="
                mb-1.5
                rounded-lg
                border
                border-slate-800
                bg-slate-900
                px-3
                py-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    text-blue-300
                  "
                >
                  OT NORMAL
                </span>

                <span
                  className="
                    text-[11px]
                    font-black
                    text-white
                  "
                >
                  {money(otNormal)}
                </span>
              </div>

              <div
                className="
                  mt-0.5
                  text-[9px]
                  font-bold
                  text-slate-500
                "
              >
                Rate {money(rateOtNormal)} × {jumlahOtNormal} J
              </div>
            </div>

            {/* =====================
                KERJA PH
            ====================== */}
            <div
              className="
                mb-1.5
                rounded-lg
                border
                border-slate-800
                bg-slate-900
                px-3
                py-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    text-purple-300
                  "
                >
                  KERJA PH
                </span>

                <span
                  className="
                    text-[11px]
                    font-black
                    text-white
                  "
                >
                  {money(kerjaPh)}
                </span>
              </div>

              <div
                className="
                  mt-0.5
                  text-[9px]
                  font-bold
                  text-slate-500
                "
              >
                Rate {money(rateKerjaPh)} × {jumlahHariPh} HARI
              </div>
            </div>

            {/* =====================
                OT PH
            ====================== */}
            <div
              className="
                rounded-lg
                border
                border-purple-900/60
                bg-purple-950/20
                px-3
                py-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    text-purple-300
                  "
                >
                  OT PH
                </span>

                <span
                  className="
                    text-[11px]
                    font-black
                    text-white
                  "
                >
                  {money(otPh)}
                </span>
              </div>

              <div
                className="
                  mt-0.5
                  text-[9px]
                  font-bold
                  text-slate-500
                "
              >
                Rate {money(rateOtPh)} × {jumlahOtPh} J
              </div>
            </div>
          </div>

          {/* =========================
              GAJI KASAR
          ========================== */}
          <div
            className="
              mt-2
              rounded-xl
              border
              border-blue-500
              bg-blue-950/40
              px-4
              py-3
              text-center
            "
          >
            <div
              className="
                text-[9px]
                font-black
                uppercase
                tracking-widest
                text-red-300
              "
            >
              GAJI KASAR
            </div>

            <div
              className="
                mt-0.5
                text-2xl
                font-black
                text-white
              "
            >
              {money(gajiKasar)}
            </div>
          </div>

        </div>

        {/* =========================
            FOOTER
        ========================== */}
        <div
          className="
            shrink-0
            border-t
            border-slate-800
            bg-slate-950
            p-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-blue-700
              bg-blue-900
              py-2.5
              text-xs
              font-black
              uppercase
              text-white
              hover:bg-blue-800
            "
          >
            TUTUP
          </button>
        </div>

      </div>
    </div>
  );
}