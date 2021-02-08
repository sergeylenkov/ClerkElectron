export interface BemOptions {
  element?: string;
  modificator?: string;
}

export const b = (block: string, options?: BemOptions): string => {
  const el = options?.element ? `__${options.element}` : '';
  const mod = options?.modificator ? `_${options.modificator}` : '';

  return `${block}${el}${mod}`;
}