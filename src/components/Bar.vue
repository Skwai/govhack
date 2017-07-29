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

const BAR_MAX = 150000;

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
      const labels = this.labels.map((label) => {
        const { value } = label;
        /* eslint-disable no-param-reassign */
        label.position = value >= BAR_MAX ? 1 : value / BAR_MAX;
        return label;
      });
      console.log(labels);
      return labels;
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
  margin: 3rem 0;
  border-radius: 3px;
  position: relative;

  &::before,
  &::after {
    position: absolute;
    opacity: .3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%)
  }

  &::before {
    left: 0.5rem;
    content: "$0"
  }

  &::after {
    right: 0.5rem;
    content: "$150k";
  }

  &__MinMax {
    background: #499aff;
    height: 100%;
    border-radius: 3px;
    position: absolute;
    transition: 0.2s;
  }
}
</style>
