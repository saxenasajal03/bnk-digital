/**
 * Bulletproof asset path resolver that automatically prepends Vite's BASE_URL.
 * Works seamlessly on localhost (/), GitHub Pages (/bnk-digital/), and custom domains.
 */
export const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.replace(/^\.?\//, '');
  return `${cleanBase}${cleanPath}`;
};
