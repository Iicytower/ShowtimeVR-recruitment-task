/**
 * function was taken from stackoverflow topic
 * https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
 */
export function filterFalsyValues<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function isJsonStringCorrect(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
