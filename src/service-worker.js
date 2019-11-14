/* eslint-disable no-restricted-globals */

function showLocalNotification(title, body, swRegistration) {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
}

console.log('Hello form Service Worker!');

self.addEventListener('push', (event) => {
  console.log('event:Push', event);
  if (event.data) {
    showLocalNotification(
      'Yolo',
      event.data.text(),
      self.registration,
    );
  } else {
    console.log('Push event but no data');
  }
});
