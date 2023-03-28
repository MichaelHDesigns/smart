<template>
  <div v-if="clickOpen" class="modal-background">
    <div class="form-background">
      <div v-if="loading" class="form-header">The nodes are now noding</div>
      <div v-else class="form-header">Help Our Communities <br/>Grow</div>
      <div @click="onClose" class="modal-close">x</div>
      <div v-if="loading" class="loading-form">
        <PeriodLoader />
      </div>
      <div v-else class="flex-forms">
        <div class="form-align"></div>
        <div class="form-caption">Name</div>
        <input
          :type="errorMessage === 'Empty fields' ? 'text' : ''"
          maxlength="24"
          v-model="name"
        />
        <div class="form-caption">Message</div>
        <input
          :type="errorMessage === 'Empty fields' ? 'text' : ''"
          maxlength="180"
          v-model="description"
        />
        <div class="form-caption">Amount of eth</div>
        <input
          :type="errorMessage ? 'text' : ''"
          v-model="value"
        />
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <button type="button" class="donate-button" @click="onDonateMessageSend">Donate</button>
      </div>
    </div>
  </div>
</template>

<script>
import charity from './ethereum/factory';
import web3 from './ethereum/web3';
import PeriodLoader from './PeriodLoader';

export default {
  components: { PeriodLoader },
  props: {
    clickOpen: Boolean,
    onClose: Function
  },
  data() {
    return {
      name: '',
      description: '',
      value: '',
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async onDonateMessageSend() {
      try {
        const { description, name, value } = this;
        if(value === '' || value === 0) {
          return this.errorMessage = "You didn't put in an amount!!";
        }
        if(value === '' && description === '' && name === '') {
          return this.errorMessage = "Empty fields";
        }
        const accounts = await web3.eth.getAccounts();
        this.loading = true;
        this.errorMessage = '';
        await charity.methods.contributeMessage(description, name, web3.utils.toWei(value, 'ether'))
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.value, 'ether')
        });
        window.location.reload();
        this.loading = false;
        this.value = '';
        this.name = '';
        this.description = '';
      } catch(err) {
        console.log(err.message);
        if(err.message.replace(/ .*/,'') === 'while') {
          this.errorMessage = "Numbers are only allowed";
          this.value = '';
          this.loading = false;
        } else if(err.message.replace(/ .*/,'') === 'Returned') {
          this.errorMessage = "Oops you rejected it! Did you mean to do that?";
          this.value = '';
          this.loading = false;
        }
        if(err.message.replace(/ .*/,'') === 'No') {
          this.errorMessage = "Oops! You're probably not logged in MetaMask";
          this.value = '';
          this.loading = false;
        }
      }
    },
    onClose(e) {
      this.onClose && this.onClose(e);
    }
  }
}
</script>
<style lang="scss">
  @import "../css/DonateForm.css";
</style>
