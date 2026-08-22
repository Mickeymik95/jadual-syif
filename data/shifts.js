export const SHIFT_OPTIONS = [
  "KERJA BIASA D/S",
  "KERJA BIASA N/S",
  "KERJA OD D/S",
  "KERJA OD N/S",
  "KERJA PH D/S",
  "KERJA PH N/S",
  "OFF",
  "REST",
  "CUTI",
  "MC",
];

export function getShiftData(shift) {
  switch (shift) {
    case "KERJA BIASA D/S":
      return {
        type: "NORMAL",
        ot: 3.5,
        elaun: 15,
      };

    case "KERJA BIASA N/S":
      return {
        type: "NORMAL",
        ot: 3.5,
        elaun: 20,
      };

    case "KERJA OD D/S":
      return {
        type: "NORMAL",
        ot: 11.5,
        elaun: 15,
      };

    case "KERJA OD N/S":
      return {
        type: "NORMAL",
        ot: 11.5,
        elaun: 20,
      };

    case "KERJA PH D/S":
      return {
        type: "PH",
        ot: 3.5,
        elaun: 15,
      };

    case "KERJA PH N/S":
      return {
        type: "PH",
        ot: 3.5,
        elaun: 20,
      };

    case "CUTI":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };

    case "MC":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };

    case "OFF":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };

    case "REST":
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };

    default:
      return {
        type: "OFF",
        ot: 0,
        elaun: 0,
      };
  }
}