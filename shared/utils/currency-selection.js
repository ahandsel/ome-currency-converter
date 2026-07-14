// Pure helpers for the currency-wall home/travel selection state machine.

function isEmpty(slot) {
  return slot == null || slot === '';
}

function normalizeSlot(slot) {
  return isEmpty(slot) ? null : slot;
}

/**
 * Apply one currency-wall tap and return the next home/travel pair.
 * Slots are currency codes or null. Inputs are not mutated.
 *
 * @param {{ home: string | null, travel: string | null }} state
 * @param {string} code
 * @returns {{ home: string | null, travel: string | null }}
 */
export function applyCurrencyTap({ home, travel }, code) {
  const currentHome = normalizeSlot(home);
  const currentTravel = normalizeSlot(travel);

  if (currentHome === code && currentTravel == null) {
    return { home: null, travel: null };
  }

  if (currentTravel === code && currentHome == null) {
    return { home: null, travel: null };
  }

  if (currentHome != null && currentTravel != null && code === currentHome) {
    return { home: null, travel: currentTravel };
  }

  if (currentHome != null && currentTravel != null && code === currentTravel) {
    return { home: currentHome, travel: null };
  }

  if (
    currentHome != null &&
    currentTravel != null &&
    code !== currentHome &&
    code !== currentTravel
  ) {
    return { home: currentTravel, travel: code };
  }

  if (currentHome == null && currentTravel == null) {
    return { home: code, travel: null };
  }

  if (currentHome != null && currentTravel == null && code !== currentHome) {
    return { home: currentHome, travel: code };
  }

  if (currentHome == null && currentTravel != null && code !== currentTravel) {
    return { home: code, travel: currentTravel };
  }

  return { home: currentHome, travel: currentTravel };
}
