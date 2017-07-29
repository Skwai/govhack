<template>
  <div class="Bar">
    <div class="Bar__MinMax" :style="{ left: `${offsetMin}%`, right: `${offsetMax}%` }"></div>
    <BarLabel
      v-for="(label, index) in positionedLabels"
      :key="index"
      :label="label"
    ></BarLabel>
  </div>
</template>

<script>
import BarLabel from './BarLabel';

const BAR_MAX = 200000;

export default {
  props: ['min', 'max', 'labels'],
  computed: {
    offsetMin() {
      return (this.min / BAR_MAX) * 100;
    },
    offsetMax() {
      return 100 - ((this.max / BAR_MAX) * 100);
    },
    positionedLabels() {
      return this.labels.map((label) => {
        const { value } = this;
        /* eslint-disable no-param-reassign */
        label.placement = value >= BAR_MAX ? 1 : value / BAR_MAX;
        return label;
      });
    },
  },
  components: {
    BarLabel,
  },
};
</script>

<style scoped lang="stylus">
.Bar {
  background: rgba(0,0,0,.05);
  height: 2rem;
  border-radius: 3px;
  position: relative;
  margin: 4rem 0;

  &__MinMax {
    background: #499aff;
    height: 2rem;
    border-radius: 3px;
    position: absolute;
  }
}
</style>
