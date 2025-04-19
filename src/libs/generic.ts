export const capitalize = (text: string) =>
  text
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

export const title = (text: string) => {
  const [first, ...rest] = text.trim().split(' ')
  return [
    first.charAt(0).toUpperCase() + first.slice(1).toLowerCase(),
    ...rest,
  ].join(' ')
}

console.log(title('Hello, Wold'))
console.log(title('hello, Wold'))
console.log(title('HELLO, WOLRD'))
