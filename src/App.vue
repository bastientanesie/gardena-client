<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/gardena-icon-colored.png">
    <IndexPage
      v-bind:is-service-worker-ready="isServiceWorkerReady"
      v-bind:is-notifications-ready="isNotificationsReady"
      v-bind:is-notifications-subscribed="isNotificationsSubscribed"
      :is-socket-connected="socket.connected"
      :devices="devices"
      @resetState="resetState()"
    ></IndexPage>
  </div>
</template>

<script>
import io from 'socket.io-client';
import IndexPage from '@/components/IndexPage.vue';
import { register, unregister } from '@/registerServiceWorker';
import { urlBase64ToUint8Array, VAPID_PUBLIC_KEY } from '@/utils/sw-helpers';
import Device from '@/classes/Device';

/* eslint-disable no-console */

const API_URL = (process.env.NODE_ENV === 'production')
  ? '//api.gardena.cloud.maevis.fr'
  : 'http://localhost:5555';

export default {
  name: 'app',
  data() {
    return {
      isServiceWorkerReady: false,
      isNotificationsReady: false,
      isNotificationsSubscribed: false,
      socket: io(`${API_URL}`),
      devices: [],
    };
  },
  components: {
    IndexPage,
  },
  methods: {
    /**
     * @param {ServiceWorkerRegistration} registration
     * @returns {Promise<PushSubscription>}
     */
    async subscribeToPushNotifications(registration) {
      const subscription = await registration.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        userVisibleOnly: true,
      });
      console.log('subscription', subscription);
      const response = await fetch(`${API_URL}/subscribe`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
      console.log('push subscribe response', response, response.json());
      return subscription;
    },
    /**
     * @returns {Promise<void>}
     */
    async resetState() {
      if (await unregister()) {
        this.isServiceWorkerReady = false;
        window.localStorage.removeItem('push_subscription');
      }
    },
    /**
     *
     */
    setupSocket() {
      this.socket.on('error', (error) => {
        console.error(error);
      });

      this.socket.on('update', (devices) => {
        this.devices = devices.filter(device => device.name !== null).map(Device.fromJson);
        console.log('updated devices : %O', this.devices);
      });
    },
  },
  async created() {
    register(`${process.env.BASE_URL}service-worker.js`, {
      ready: async (registration) => {
        console.log('sw:ready');
        this.isServiceWorkerReady = true;
        if (window.localStorage.getItem('push_subscription') === null) {
          const subscription = await this.subscribeToPushNotifications(registration);
          window.localStorage.setItem('push_subscription', subscription.endpoint);
          this.isNotificationsSubscribed = true;
        } else {
          this.isNotificationsSubscribed = true;
        }
      },
      registered: (/* registration */) => {
        console.log('sw:registered');
      },
      cached: (/* registration */) => {
        console.log('sw:cached');
      },
      updatefound: (/* registration */) => {
        console.log('sw:updatefound');
      },
      updated: (/* registration */) => {
        console.log('sw:updated');
      },
      offline: () => {
        console.log('sw:offline');
      },
      error: (error) => {
        console.error('sw:error', error);
      },
    });

    if (await window.Notification.requestPermission() === 'granted') {
      this.isNotificationsReady = true;
    } else {
      throw new Error('Permission not granted for Notification');
    }

    this.setupSocket();
  },
  beforeDestroy() {
    this.socket.close();
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50443a;
  margin-top: 60px;
}
</style>
