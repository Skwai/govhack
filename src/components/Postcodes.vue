<template>
  <Block>
    <div class="Chart">
      <header class="Chart__Intro">
        <BlockHeading>Your Postcode <small>({{profile.postcode}})</small></BlockHeading>
        <div class="Chart__Filters">
          <FilterField
            :value.sync="compare.state"
            :options="getStates"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-miterlimit="10" transform="translate(.5 .5)"><path d="M17 6.5L23 5v15l-8 2-6-2-8 2V7l6-1.5" data-cap="butt"/><path d="M17 6c0 3.1-5 8.1-5 8.1S7 9.1 7 6c0-3.2 2.6-5 5-5s5 1.8 5 5z" data-color="color-2" stroke-linecap="square"/><circle cx="12" cy="6" r="1" stroke-linecap="square"/></g></svg>
          </FilterField>
        </div>
      </header>

      <Bar
        :tooltipTitle="`Suburbs in ${compare.state ? compare.state : 'Australia'}`"
        :min="min"
        :max="max"
        :labels="labels"
      ></Bar>
    </div>
  </Block>
</template>

<script>
import { mapGetters } from 'vuex';
import Block from './Block';
import BlockHeading from './BlockHeading';
import Bar from './Bar';
import FilterField from './FilterField';

export default {
  props: ['profile'],
  data() {
    return {
      compare: {
        state: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      'getPostcodeStats',
      'getStates',
    ]),
    profileLabel() {
      return {
        name: 'You',
        value: this.profile.income,
        placement: 'top',
      };
    },

    stats() {
      const { postcode } = this.profile;
      const { state } = this.compare;
      return this.getPostcodeStats({ postcode, state });
    },

    min() {
      return this.stats.min || 0;
    },

    max() {
      return this.stats.max || 0;
    },

    postcodeAverageLabel() {
      const { average } = this.stats;
      return {
        name: `${this.profile.postcode} Avg`,
        value: average,
        placement: 'bottom',
      };
    },
    labels() {
      return [
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
    text-align: center;

    @media (min-width: 1024px) {
      display: flex;
      align-items: center;
      text-align: left;
    }
  }

  &__Filters {
    display: flex;
    align-items: center;

    @media (max-width: 1023px) {
      justify-content: center;
      margin-top: 1rem;
    }

    @media (min-width: 1024px) {
      margin: 0.5rem 0 0.5rem auto;
    }

    > * + * {
      margin-left: 1px
    }
  }
}
</style>
