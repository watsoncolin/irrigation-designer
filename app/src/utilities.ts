export const degToRadians = (deg: number) => {
  return deg * 0.017453;
};
export const radiansToDeg = (deg: number) => {
  return deg / 0.017453;
};

const componentToHex = (c: any) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (r: string, g: string, b: string) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
