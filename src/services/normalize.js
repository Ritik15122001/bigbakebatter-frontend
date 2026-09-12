/**
 * The backend returns Mongo's `_id`; the whole frontend (cart line keys,
 * product links, admin-style lookups ported from the mock build) was written
 * against a plain `id` field. Normalizing here means no component needs to
 * change just because the data now comes from a real API.
 */
export function withId(doc) {
  if (!doc) return doc;
  return { ...doc, id: doc._id };
}

export function withIds(docs) {
  return (docs || []).map(withId);
}
