import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

/**
 * Returns a data-URI SVG avatar for a given seed string.
 * Uses the "thumbs" style — clean, minimal, works great at small sizes.
 */
export function getAvatarUrl(seed: string): string {
  const avatar = createAvatar(thumbs, {
    seed,
    size: 80,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
    backgroundType: ["solid"],
  });
  return avatar.toDataUri();
}
