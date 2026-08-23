export const SHIFT_OPTIONS = [
  {
    value: "DS",
    label: "DS",
  },
  {
    value: "NS",
    label: "NS",
  },
  {
    value: "OD DS",
    label: "OD DS",
  },
  {
    value: "OD NS",
    label: "OD NS",
  },
  {
    value: "PH DS",
    label: "PH DS",
  },
  {
    value: "PH NS",
    label: "PH NS",
  },
  {
    value: "CUTI/AL",
    label: "CUTI / AL",
  },
  {
    value: "MC",
    label: "MC",
  },
  {
    value: "OFF",
    label: "OFF",
  },
  {
    value: "REST",
    label: "REST",
  },
];


export function getShiftData(shift) {

  switch (shift) {

    // ==============================
    // DS
    // ==============================

    case "DS":
      return {
        type: "NORMAL",
        ot: 3.5,
        elaun: 15,
      };


    // ==============================
    // NS
    // ==============================

    case "NS":
      return {
        type: "NORMAL",
        ot: 3.5,
        elaun: 20,
      };


    // ==============================
    // OD DS
    // ==============================

    case "OD DS":
      return {
        type: "NORMAL",
        ot: 11.5,
        elaun: 15,
      };


    // ==============================
    // OD NS
    // ==============================

    case "OD NS":
      return {
        type: "NORMAL",
        ot: 11.5,
        elaun: 20,
      };


    // ==============================
    // PH DS
    // ==============================

    case "PH DS":
      return {
        type: "PH",
        ot: 3.5,
        elaun: 15,
      };


    // ==============================
    // PH NS
    // ==============================

    case "PH NS":
      return {
        type: "PH",
        ot: 3.5,
        elaun: 20,
      };


    // ==============================
    // CUTI / AL
    // ==============================

    case "CUTI/AL":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };


    // ==============================
    // MC
    // ==============================

    case "MC":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };


    // ==============================
    // OFF
    // ==============================

    case "OFF":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };


    // ==============================
    // REST
    // ==============================

    case "REST":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };


    // ==============================
    // DEFAULT
    // ==============================

    default:
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };
  }
}