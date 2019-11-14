/* eslint-disable no-console */

import { register } from 'register-service-worker';

/*
 * @ee https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679
 * @see https://www.npmjs.com/package/web-push
 */

const VAPID_PUBLIC_KEY = 'BBXc8YZnd_Wh556lBFazyOydQct2LgPgwaE7_R7D5UKy1UCKCGTjBzH50BTQv1tQjXEVNWVlhJeVh_EYz3qBKzg';
const SERVER_URL = 'http://localhost:4000/subscribe';

/**
 * urlB64ToUint8Array is a magic function that will encode the base64 public key
 * to Array buffer which is needed by the subscription option
 *
 * @param {String} base64String
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String) {
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

// saveSubscription saves the subscription to the backend
async function subscribe(subscription) {
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
}

if (process.env.NODE_ENV === 'production') {
  // register(`${process.env.BASE_URL}service-worker.js`, {
  register('./service-worker.js', {
    registrationOptions: {
      scope: './',
    },
    async ready(registration) {
      try {
        const subscription = await registration.pushManager.subscribe({
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          userVisibleOnly: true,
        });
        console.log('subscription', JSON.stringify(subscription));
        const response = await subscribe(subscription);
        console.log('response', response);
      } catch (error) {
        console.error(error);
      }
    },
    registered(/* registration */) {
      console.log('Service worker has been registered.');
    },
    cached(/* registration */) {
      console.log('Content has been cached for offline use.');
    },
    updatefound(/* registration */) {
      console.log('New content is downloading.');
    },
    updated(/* registration */) {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
