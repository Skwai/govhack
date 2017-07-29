<template>
  <div class="BarLabel">
    <span class="BarLabel__Label">{{label}}</span>
    <span class="BarLabel__Value">{{formattedValue}}</span>
  </div>
</template>

<script>
export default {
  props: ['label', 'value'],

  computed: {
    formattedValue() {
      // TODO: abbreviate this number
      return this.value;
    },
  },
};
</script>

<style scoped lang="stylus">
.BarLabel {
  background: #fff;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 4px;
  box-shadow: rgba(0,0,0,.1) 0 2px 5px;

  &__Label {

  }

  &__Value {

  }
}
</style>
