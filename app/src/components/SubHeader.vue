<template>
  <div class="sub-container">
    <img :class="'secondary-asset ' + animation" :src="subContent" alt="sub-content" />
    <div class="sub-header__margins">
      <div :class="'sub-header__padding ' + padding">
        <div class="sub-header-title">{{ title }}</div>
        <hr class="horizontal-line" />
        <div class="sub-header__caption">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi optio doloribus eaque impedit alias harum eveniet, odio nostrum aut dolorem.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubHeader',
  props: {
    title: String,
    subContent: String,
    padding: String,
    animation: String,
  },
};
</script>

<style lang="scss">
  @import "../css/SubHeader.css";
</style>
