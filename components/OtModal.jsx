"use client";

export default function OtModal({
  selectedDay,
  weekday,
  otType,
  otHours,
  onTypeChange,
  onHoursChange,
  onClose,
  onSave,
}) {
  if (
    selectedDay === null ||
    selectedDay === undefined
  ) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/75
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-sm
          rounded-2xl
          border
          border-blue-800
          bg-slate-900
          p-4
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wide text-red-400">
              OT Sambung / Tolak OT
            </h2>

            <p className="mt-1 text-xs font-bold uppercase text-slate-300">
              {String(selectedDay).padStart(
                2,
                "0"
              )}{" "}
              {weekday}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              text-lg
              text-slate-500
              hover:bg-slate-800
              hover:text-white
            "
          >
            ×
          </button>
        </div>

        {/* JENIS OT */}

        <div className="mb-4">
          <label className="mb-1 block text-[10px] font-bold uppercase text-slate-400">
            Jenis OT / Perkara
          </label>

          <input
            type="text"
            name="ot-type-manual"
            value={otType}
            onChange={(e) =>
              onTypeChange(
                e.target.value
              )
            }
            placeholder="Boleh kosong / tulis apa sahaja"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="
              h-10
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-950
              px-3
              text-sm
              text-white
              outline-none
              placeholder:text-slate-600
              focus:border-red-500
            "
          />
        </div>

        {/* JUMLAH JAM */}

        <div className="mb-2">
          <label className="mb-1 block text-[10px] font-bold uppercase text-slate-400">
            Jumlah Jam
          </label>

          <input
            type="text"
            name="ot-hours-manual"
            inputMode="decimal"
            value={otHours}
            onChange={(e) =>
              onHoursChange(
                e.target.value
              )
            }
            placeholder="Kosong / 2.3 / -0.5 / tulisan"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="
              h-10
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-950
              px-3
              text-sm
              font-bold
              text-white
              outline-none
              placeholder:text-slate-600
              focus:border-red-500
            "
          />
        </div>

        <p className="mb-5 text-[9px] text-slate-500">
          Semua input dibenarkan. Contoh:
          <span className="ml-1 font-bold text-red-400">
            -0.5
          </span>
        </p>

        {/* BUTTON */}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="
              h-10
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              text-xs
              font-bold
              text-slate-300
              transition
              hover:bg-slate-700
            "
          >
            BATAL
          </button>

          <button
            type="button"
            onClick={onSave}
            className="
              h-10
              rounded-lg
              bg-red-700
              text-xs
              font-black
              text-white
              transition
              hover:bg-red-600
            "
          >
            SIMPAN
          </button>
        </div>
      </div>
    </div>
  );
}