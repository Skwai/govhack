<template>
  <div
    class="BarLabel"
    :class="placementClassName"
    :style="{ left: positionPercent }"
  >
    <span class="BarLabel__Label">{{label.name}}</span>:
    <span class="BarLabel__Value">{{formattedValue}}</span>
  </div>
</template>

<script>
export default {
  props: ['label'],

  computed: {
    placementClassName() {
      return this.label.placement === 'top' ? '-top' : '-bottom';
    },
    positionPercent() {
      return `${this.label.position * 100}%`;
    },
    formattedValue() {
      // TODO: abbreviate this number
      return `$${Number(this.label.value.toFixed()).toLocaleString()}`;
    },
  },
};
</script>

<style scoped lang="stylus">
.BarLabel {
  background: #fff;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  border-radius: 3px;
  box-shadow: rgba(0,0,0,.15) 0 0 0 1px, rgba(0,0,0,.1) 0 2px 5px;
  position: absolute;
  text-align: center;
  bottom: 100%;
  transform: translate(-50%, -0.5rem);
  transition: 0.2s;

  &:hover {
    z-index: 2;
  }

  &.-bottom {
    top: 100%;
    bottom: auto;
    transform: translate(-50%, 0.5rem);

    &::before,
    &::after {
      bottom: 100%;
      top: 0;
    }

    &::before {
      border-top: 0;
      border-bottom: rgba(0,0,0,.15) solid 6px;
      transform: translate(-50%, -100%);
      margin-top: -1px;
    }

    &::after {
      border-top: 0;
      border-bottom: #fff solid 6px;
      transform: translate(-50%, -100%);
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 50%;
    top: 100%;
    width: 0;
    height: 0;
    border-top: rgba(0,0,0,.15) solid 6px;
    border-left: transparent solid 6px;
    border-right: transparent solid 6px;
  }

  &::before {
    transform: translate(-50%, 1px);
  }

  &::after {
    transform: translateX(-50%);
    border-top: #fff solid 6px;

    .-bottom & {
      border-top: 0;
      border-bottom: #fff solid 6px;
      transform: translate(-50%, 0);
    }
  }

  &__Label {
    text-transform: uppercase;
    font-weight: 700;
  }

  &__Value {

  }
}
</style>
