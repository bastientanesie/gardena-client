<template>
  <article>
    <h1>Gardena Monitoring Client</h1>
    <p v-if="isServiceWorkerReady && isNotificationsReady">
      <template v-if="isNotificationsSubscribed">Waiting push notifications</template>
      <template v-else>Subscribing to push notification server&hellip;</template>
    </p>
    <p v-if="!isBrowserSuppored" class="error-msg">This browser is not supported</p>
    <ul>
      <li>
        Service Worker : {{serviceWorkerStatus}}
        <button v-if="isServiceWorkerReady" type="button" @click="$emit('resetState')">
          Reset
        </button>
      </li>
      <li>Push API : {{pushStatus}}</li>
      <li>API : {{isSocketConnected ? 'connected' : 'disconnected'}}</li>
    </ul>
    <DeviceCard v-for="item in devices" v-bind:key="item.id" :device="item"/>
  </article>
</template>

<script>
import DeviceCard from '@/components/DeviceCard.vue';

export default {
  name: 'IndexPage',
  components: {
    DeviceCard,
  },
  props: {
    isServiceWorkerReady: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isNotificationsReady: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isNotificationsSubscribed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isSocketConnected: {
      type: Boolean,
      default() {
        return false;
      },
    },
    devices: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isServiceWorkerSupported: ('serviceWorker' in navigator),
      isPushSupported: ('PushManager' in window),
    };
  },
  computed: {
    serviceWorkerStatus() {
      let status = this.isServiceWorkerSupported === true ? 'supported' : 'not supported';
      if (this.isServiceWorkerReady) {
        status += ' and ready';
      }
      return status;
    },
    pushStatus() {
      let status = this.isPushSupported === true ? 'supported' : 'not supported';
      if (this.isNotificationsReady) {
        status += ' and ready';
      }
      return status;
    },
    isBrowserSuppored() {
      return this.serviceWorkerStatus && this.pushStatus;
    },
  },
};
</script>

<style scoped>
  .error-msg {
    color: #f15922;
    font-weight: 700;
  }
</style>
