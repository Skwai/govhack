<template>
  <div class="BarLabel" :style="{ left: `${label.position * 100}%` }">
    <span class="BarLabel__Label">{{label.name}}</span>
    <span class="BarLabel__Value">{{formattedValue}}</span>
  </div>
</template>

<script>
export default {
  props: ['label'],

  computed: {
    formattedValue() {
      // TODO: abbreviate this number
      return `$${this.label.value.toLocaleString()}`;
    },
  },
};
</script>

<style scoped lang="stylus">
.BarLabel {
  background: #fff;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 3px;
  box-shadow: rgba(0,0,0,.1) 0 2px 5px;
  position: absolute;
  text-align: center;
  bottom: 100%;
  transform: translate(-50%, -0.5rem)

  &__Label,
  &__Value {
    display: block;
  }

  &__Label {
    text-transform: uppercase;
    font-weight: 700;
  }

  &__Value {

  }
}
</style>
