(function exposeStorage(global) {
  const storageKey = 'skybar.finance.entries.v2';

  function readRawEntries() {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return null;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Stored SKYBAR entries were invalid and have been reset.', error);
      return [];
    }
  }

  function persist(entries) {
    const normalized = entries.map(global.SKYBARCalculations.normalizeEntry).sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(storageKey, JSON.stringify(normalized));
    return normalized;
  }

  function loadEntries() {
    return readRawEntries();
  }

  function hasEntry(entries, date, ignoredDate = '') {
    return entries.some((entry) => entry.date === date && entry.date !== ignoredDate);
  }

  function createEntry(entries, entry) {
    const normalized = global.SKYBARCalculations.normalizeEntry(entry);
    if (!normalized.date) return { ok: false, error: 'Date is required.', entries };
    if (hasEntry(entries, normalized.date)) return { ok: false, error: 'An entry already exists for that date.', entries };
    return { ok: true, entries: persist([...entries, normalized]) };
  }

  function updateEntry(entries, originalDate, entry) {
    const normalized = global.SKYBARCalculations.normalizeEntry(entry);
    if (!normalized.date) return { ok: false, error: 'Date is required.', entries };
    if (!entries.some((item) => item.date === originalDate)) return { ok: false, error: 'The entry being edited no longer exists.', entries };
    if (hasEntry(entries, normalized.date, originalDate)) return { ok: false, error: 'An entry already exists for that date.', entries };
    return { ok: true, entries: persist(entries.map((item) => (item.date === originalDate ? normalized : item))) };
  }

  function deleteEntry(entries, date) {
    return persist(entries.filter((entry) => entry.date !== date));
  }

  global.SKYBARStorage = { createEntry, deleteEntry, loadEntries, persist, updateEntry };
})(window);
