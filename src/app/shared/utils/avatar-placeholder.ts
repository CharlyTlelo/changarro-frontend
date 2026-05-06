/** Borradores entre registro → bienvenida/perfil (sin backend aún). */
export const CHANGARRO_PROFILE_AVATAR_DRAFT_KEY = 'changarro_profile_avatar_draft';
export const CHANGARRO_PROFILE_NAME_DRAFT_KEY = 'changarro_profile_name_draft';
export const CHANGARRO_PROFILE_PHONE_DRAFT_KEY = 'changarro_profile_phone_draft';

/** Iniciales para avatar sin foto: primera letra del nombre + primera del apellido (o 2 letras si solo hay una palabra). */
export function initialsFromDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0].charAt(0);
    const b = parts[parts.length - 1].charAt(0);
    return `${a}${b}`.toUpperCase();
  }
  if (parts.length === 1) {
    const w = parts[0];
    return (w.length >= 2 ? w.slice(0, 2) : w.charAt(0)).toUpperCase();
  }
  return '?';
}

/** Degradado estable por nombre (misma persona → mismo color). */
export function gradientFromName(name: string): string {
  const s = name.trim() || '?';
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = s.charCodeAt(i) + ((h << 5) - h);
  }
  const hue = Math.abs(h) % 320;
  const hue2 = (hue + 52) % 360;
  return `linear-gradient(145deg, hsl(${hue}, 70%, 44%) 0%, hsl(${hue2}, 62%, 54%) 100%)`;
}
