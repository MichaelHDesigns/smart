<template>
  <div class="message-background">
    <!--
    <div class="message-line"></div>
    -->
    <div class="message-padding">
      <div class="message-title">{{ donation.username }}</div>
      <div class="message-body">{{ donation.message }}</div>
      <div class="message-value">{{ formattedValue }} ETH</div>
    </div>
  </div>
</template>

<script>
import web3 from "../ethereum/web3";

export default {
  props: {
    donation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedValue() {
      return web3.utils.fromWei(this.donation.value, "ether");
    },
  },
};
</script>

<style lang="scss">
  @import "../css/MessageListContainer.css";
</style>
