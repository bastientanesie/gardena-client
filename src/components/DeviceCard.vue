<template>
  <article>
    <h2 class="device-name">
      {{device.name}}
      <span class="device-name-model">({{device.model}})</span>
    </h2>
    <ul>
      <li v-if="device.lastError">
        <b>Last Error</b>&nbsp;: {{device.lastError}}
      </li>
      <li><b>State</b>&nbsp;: {{device.state}}</li>
      <li><b>Activity</b>&nbsp;: {{device.activity}}</li>
      <li><b>Battery</b>&nbsp;: {{device.batteryState}}, {{device.batteryLevel}}%</li>
      <li><b>RF link</b>&nbsp;: {{device.rfLinkState}}, {{device.rfLinkLevel}}%</li>
    </ul>
  </article>
</template>

<script>
import Device from '@/classes/Device';

export default {
  name: 'DeviceCard',
  props: {
    device: {
      type: Device,
      required: true,
    },
  },
};
</script>

<style scoped>
article {
  border: solid 3px rgba(80,68,58,0.25);
  padding: 12px;
  text-align: left;
}
.device-name {
  font-size: 1.2em;
  line-height: 24px;
  margin: 0 0 24px 0;
}
.device-name-model {
  font-style: italic;
  font-size: 0.8em;
  line-height: 24px;
}
</style>
