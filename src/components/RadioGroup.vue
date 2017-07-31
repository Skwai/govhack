<template>
  <div class="RadioGroup">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="RadioGroup__Option"
      :class="{ '-active': radioValue === option }"
    >
      <input class="RadioGroup__Radio" type="radio" :value="option" v-model="radioValue">
      <span class="RadioGroup__Label">{{option}}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ['options', 'value'],
  data() {
    return {
      radioValue: this.value,
    };
  },
  watch: {
    radioValue() {
      this.$emit('update:value', this.radioValue);
    },
  },
};
</script>

<style scoped lang="stylus">
  .RadioGroup {
    display: flex;
    margin-bottom: 1rem;

    &__Option {
      flex: 1;
      padding: 1rem 2rem;
      box-shadow: inset rgba(0,0,0,.125) 0 -2px 0;
      transition: 0.2s;
      background: rgba(0,0,0,.05);

      &.-active {
        background: rgba(0,0,0,.15);
        box-shadow: inset rgba(0,0,0,.1) 0 2px 10px, inset rgba(0,0,0,.125) 0 -2px 0;
      }

      &:hover:not(.-active) {
        background: rgba(0,0,0,.1);
      }

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }

  &__Radio {
    display: none;
  }

  &__Label {
    display: block;
    font-weight: bold;
  }
}
</style>
