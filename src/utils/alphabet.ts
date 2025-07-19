export function firstMissingAlphabetLetter(name: string): string {
  const normalized = name.toLowerCase();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (const letter of alphabet) {
    if (!normalized.includes(letter)) {
      return letter;
    }
  }

  return '_';
}
