/* eslint-disable no-restricted-globals */
/* eslint-disable console */

self.addEventListener('push', (event) => {
  console.log('event:Push', event);
  if (event.data) {
    self.registration.showNotification(
      'Yolo',
      {
        body: event.data.text(),
        // here you can add more properties like icon, image, vibrate, etc.
      },
    );
  } else {
    console.log('Push event but no data');
  }
});
