export function validateIn(
  obj: Object,
  keys: string[],
  or: boolean = false,
): boolean {
  const keysObj = Object.keys(obj);
  if (or) {
    for (const key of keys) if (keysObj.includes(key)) return true;
    return false;
  } else {
    for (const key of keys) if (!keysObj.includes(key)) return false;
    return true;
  }
}
