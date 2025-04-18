export const capitalize = (text: string) =>
  text
    .trim()
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join(' ')
