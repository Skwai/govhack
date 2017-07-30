<template>
  <Block>
    <div class="Chart">
      <header class="Chart__Intro">
        <BlockHeading>Your Postcode</BlockHeading>
        <div class="Chart__Filters">
          <FilterField
            :value.sync="compare.state"
            :options="stateOptions"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#343434" stroke-miterlimit="10" transform="translate(.5 .5)"><path d="M17 6.5L23 5v15l-8 2-6-2-8 2V7l6-1.5" data-cap="butt"/><path d="M17 6c0 3.1-5 8.1-5 8.1S7 9.1 7 6c0-3.2 2.6-5 5-5s5 1.8 5 5z" data-color="color-2" stroke-linecap="square"/><circle cx="12" cy="6" r="1" stroke-linecap="square"/></g></svg>
          </FilterField>
        </div>
      </header>

      <Bar
        :min="min"
        :max="max"
        :labels="labels"
      ></Bar>
    </div>
  </Block>
</template>

<script>
import Block from './Block';
import BlockHeading from './BlockHeading';
import Bar from './Bar';
import FilterField from './FilterField';
import config from '../config';
import StatsService from '../services/Stats';

export default {
  props: ['profile'],
  data() {
    return {
      min: 0,
      max: 0,
      stateOptions: config.STATES,
      compare: {
        state: 'TAS',
      },
    };
  },
  computed: {
    profileLabel() {
      return {
        name: 'You',
        value: this.profile.income,
        placement: 'top',
      };
    },
    postcodeAverageLabel() {
      const { postcode } = this.profile;
      const { state } = this.compare;
      const { average, min, max } = StatsService.getPostcodeStats({
        postcode,
        state,
      });

      this.min = min;
      this.max = max;

      return {
        name: this.profile.postcode,
        value: average,
        placement: 'bottom',
      };
    },
    stateAverageLabel() {
      const average = StatsService.getAverageforState(this.compare.state);
      return {
        name: 'TAS',
        value: average,
        placement: 'bottom',
      };
    },
    labels() {
      return [
        this.stateAverageLabel,
        this.profileLabel,
        this.postcodeAverageLabel,
      ];
    },
  },
  components: {
    Bar,
    FilterField,
    Block,
    BlockHeading,
  },
};
</script>

<style scoped lang="stylus">
.Chart {
  &__Intro {
    display: flex;
  }

  &__Filters {
    display: flex;
    margin-left: auto;
    align-items: center;

    > * + * {
      margin-left: 0.5rem;
    }
  }
}
</style>
