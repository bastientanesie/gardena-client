/* eslint-disable no-restricted-globals */
/* eslint-disable console */

self.addEventListener('push', (event) => {
  console.log('event:Push', event);
  if (event.data) {
    const message = event.data.json();
    self.registration.showNotification(
      'Gardena Monitoring',
      {
        body: message.data,
        lang: 'fr_FR',
        vibrate: [250, 250, 500],
        badge: './assets/gardena-badge.png',
        icon: './assets/gardena-icon-colored.png',
        timestamp: message.times,
        // image: 'http://',
        // data: {
        //   mixed: 'coucou'
        // },
      },
    );
  } else {
    console.log('Push event but no data');
  }
});
