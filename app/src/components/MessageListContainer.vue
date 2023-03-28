<template>
  <div class="message-flex">
    <MessageList
      v-for="(donation, index) in messageList"
      :key="index"
      :donation="donation"
    />
  </div>
</template>

<script>
import { Component } from "react";
import charity from "@ethereum/factory";
import MessageList from "./MessageList";

export default class MessageListContainer extends Component {
  state = {
    loading: false,
    errorMessage: "",
    messageList: [],
  };

  async componentDidMount() {
    const charityCount = await charity.methods.charityCount().call();
    const messageRequests = await Promise.all(
      Array(parseInt(charityCount, 0))
        .fill()
        .map((element, index) => {
          return charity.methods.donators(index).call();
        })
    );
    this.setState({
      messageList: messageRequests,
    });
  }

  renderMessages() {
    return this.state.messageList.map((donation, index) => {
      return <MessageList key={index} donation={donation} />;
    });
  }

  render() {
    return <div class="message-flex">{this.renderMessages()}</div>;
  }
}
</script>

<style scoped>

@import url('@css/MessageListContainer.css');

</style>
