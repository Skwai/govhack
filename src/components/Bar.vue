<template>
  <div class="Bar">
    <div
      class="Bar__MinMax"
      :style="{ left: `${offsetMin}%`, right: `${offsetMax}%` }"
      @mouseenter="showBarLabel"
      @mouseout="hideBarLabel"
    >
      <div class="Bar__Label" :class="{ '-shown': barLabelShown }">
        <div class="Bar__LabelMin"><strong>Min:</strong> ${{min.toLocaleString()}}</div>
        <div class="Bar__LabelMin"><strong>Max:</strong> ${{max.toLocaleString()}}</div>
      </div>
    </div>
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
      const offset = 100 - ((this.max / BAR_MAX) * 100);
      return offset < 0 ? 0 : offset;
    },
    positionedLabels() {
      const labels = this.labels.map((label) => {
        const { value } = label;
        /* eslint-disable no-param-reassign */
        label.position = value >= BAR_MAX ? 1 : value / BAR_MAX;
        return label;
      });
      return labels;
    },
  },
  data() {
    return {
      barLabelShown: false,
    };
  },
  methods: {
    showBarLabel() {
      this.barLabelShown = true;
    },
    hideBarLabel() {
      this.barLabelShown = false;
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
    transform: translateY(-50%);
  }

  &::before {
    left: 0.5rem;
    content: "$0";
    z-index: 2;
  }

  &::after {
    right: 0.5rem;
    content: "$200k+";
    z-index: 2;
  }

  &__MinMax {
    background: #499aff;
    height: 100%;
    border-radius: 3px;
    position: absolute;
    transition: 0.5s ease-in-out;
  }

  &__Label {
    transform: translate(-50%, 0rem) scale(0,0) ;
    background: #fff;
    border-radius: 3px;
    background: #fff;
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    border-radius: 3px;
    box-shadow: rgba(0,0,0,.15) 0 0 0 1px, rgba(0,0,0,.1) 0 2px 5px;
    position: absolute;
    text-align: left;
    bottom: 100%;
    transition: 0.25s ease-in-out;
    left: 50%;
    z-index: 5;

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
    }

    &.-shown {
      transform: translate(-50%, -0.5rem) scale(1,1);
    }
  }
}
</style>
