<template>
  <div>
    <div class="banner-background">
      <DonateForm :clickOpen="modalOpen" :onClose="clickOpenModal" />
      <div class="main-banner">
        <div class="squeeze">
          <div class="banner-flex">
            <div class="column__one-third">
              <!-- <div class='banner-caption'>Join the cause and help others in need</div> -->
              <div class="banner-header">Help rebuild communities in need</div>
              <div class="banner-caption__description-amount">
                Our goal is to help impoverished communities. So far {{ charityCount }} people helped raise
                <span> {{ web3.utils.fromWei(balance, 'ether') }} ETH</span>!
              </div>
              <button class="donate-button__banner" @click="clickOpenModal">Contribute</button>
              <button class="info-button__banner">More Info</button>
            </div>
            <div class="column__two-third">
              <img class="iphonex-asset" :src="iphoneX" alt="iPhoneX" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonateForm from './DonateForm.vue';
import iphoneX from '@images/Asset2@2x.png';
import charity from '@ethereum/factory';
import web3 from '@ethereum/web3';

export default {
  name: 'Banner',
  components: {
    DonateForm,
  },
  data() {
    return {
      modalOpen: false,
      balance: '',
      donatorsCount: '',
      charityCount: '',
      iphoneX,
      web3,
      charity,
    };
  },
  async mounted() {
    const summary = await this.charity.methods.getSummary().call();
    this.balance = summary[0];
    this.donatorsCount = summary[1];
    this.charityCount = summary[2];
  },
  methods: {
    clickOpenModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
};
</script>
<style scoped>
@import url('@css/Banner.css');
@import url('@css/App.css');
</style>
