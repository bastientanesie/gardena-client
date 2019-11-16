/**
 * urlB64ToUint8Array is a magic function that will encode the base64 public key
 * to Array buffer which is needed by the subscription option
 *
 * @param {String} base64String
 * @returns {Uint8Array}
 */
export function urlBase64ToUint8Array(base64String) {
  /* eslint-disable no-mixed-operators */
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  /* eslint-disable no-plusplus */
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const VAPID_PUBLIC_KEY = 'BBXc8YZnd_Wh556lBFazyOydQct2LgPgwaE7_R7D5UKy1UCKCGTjBzH50BTQv1tQjXEVNWVlhJeVh_EYz3qBKzg';
