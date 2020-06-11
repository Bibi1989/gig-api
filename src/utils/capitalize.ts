export function capitalizeString(str: string) {
  const splitStr = str
    .split(" ")
    .map((s: string) => `${s[0].toUpperCase()}${s.slice(1)}` + " ")
    .join("");
  return splitStr;
}
