const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** Spells out 0–10 ("three"); larger or non-integer numbers stay as digits. */
export function numberWord(n: number): string {
  return Number.isInteger(n) && n >= 0 && n < NUMBER_WORDS.length ? NUMBER_WORDS[n] : String(n);
}
