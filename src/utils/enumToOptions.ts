export const enumToOptions = (enumObj: object) =>
  Object.entries(enumObj)
    .filter(([key]) => isNaN(Number(key)))
    .map(([label, id]) => ({ id: Number(id), label }));

export const objectEnumToOptions = (
  enumObj: Record<string, { id: number; name: string }>
) => {
  return Object.values(enumObj).map((entry) => ({
    id: entry.id,
    label: entry.name,
  }));
};
