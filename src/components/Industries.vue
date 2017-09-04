<template>
  <Block>
    <div class="Chart">
      <header class="Chart__Intro">
        <BlockHeading>Industries</BlockHeading>
        <div class="Chart__Filters">
          <FilterField
            :value.sync="compare.industry"
            :options="getIndustryTypes"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-miterlimit="10"><path d="M6.5 12.3v6.2c0 1.7 2.7 3 6 3s6-1.3 6-3v-6.2" data-cap="butt" data-color="color-2"/><path d="M21.5 10.2v7.3" data-cap="butt"/><path d="M12.5 16.5l-10-7 10-6 10 6z" stroke-linecap="square"/></g></svg>
          </FilterField>
          <FilterField
            :value.sync="compare.gender"
            :options="genderOptions"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-miterlimit="10" stroke-linecap="square"><path d="M5.5 6.5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm2 16h-4v-5h-2v-6c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v6h-2v5z"/><path d="M17.5 6.5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm2 16h-4v-4h-3l3-9h4l3 9h-3z"/></g></svg>
          </FilterField>
          <FilterField
            :value.sync="compare.state"
            :options="stateOptions"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-miterlimit="10" transform="translate(.5 .5)"><path d="M17 6.5L23 5v15l-8 2-6-2-8 2V7l6-1.5" data-cap="butt"/><path d="M17 6c0 3.1-5 8.1-5 8.1S7 9.1 7 6c0-3.2 2.6-5 5-5s5 1.8 5 5z" data-color="color-2" stroke-linecap="square"/><circle cx="12" cy="6" r="1" stroke-linecap="square"/></g></svg>
          </FilterField>
        </div>
      </header>

      <Bar
        tooltipTitle="Selected segments"
        :min="min"
        :max="max"
        :labels="labels"
      ></Bar>
    </div>
  </Block>
</template>

<script>
import { mapGetters } from 'vuex';
import Bar from './Bar';
import Block from './Block';
import BlockHeading from './BlockHeading';
import FilterField from './FilterField';
import config from '../config';

export default {
  props: ['profile'],
  data() {
    return {
      genderOptions: config.GENDERS,
      stateOptions: config.STATES,
      compare: {
        state: null,
        gender: null,
        industry: null,
      },
    };
  },
  components: {
    Bar,
    FilterField,
    Block,
    BlockHeading,
  },
  computed: {
    ...mapGetters([
      'getIndustryStats',
      'getIndustryTypes',
    ]),
    averageLabel() {
      return {
        name: 'You',
        value: Number(this.profile.income),
        placement: 'top',
      };
    },
    stats() {
      return this.getIndustryStats(this.compare);
    },
    min() {
      return this.stats.min || 0;
    },
    max() {
      return this.stats.max || 0;
    },
    profileLabel() {
      const { average } = this.stats;
      return {
        name: 'Avg',
        value: average,
        placement: 'bottom',
      };
    },
    labels() {
      return [
        this.profileLabel,
        this.averageLabel,
      ];
    },
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
