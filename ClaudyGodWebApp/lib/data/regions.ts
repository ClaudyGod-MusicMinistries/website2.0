export interface RegionOption {
  name: string;
  code: string;
}

export function normalizeRegions(
  source: Array<{ name?: string; state_code?: string }>
): RegionOption[] {
  const seen = new Set<string>();
  return source
    .flatMap((region) => {
      const name = region.name?.trim();
      const identity = name?.toLocaleLowerCase();
      if (!name || !identity || seen.has(identity)) return [];
      seen.add(identity);
      return [{ name, code: region.state_code?.trim() || name }];
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
