<template>
  <Block>
    <div class="Chart">
      <header class="Chart__Intro">
        <BlockHeading>Demographics</BlockHeading>
        <div class="Chart__Filters">
          <FilterField
            :value.sync="compare.gender"
            :options="genderOptions"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#343434" stroke-miterlimit="10" stroke-linecap="square"><path d="M5.5 6.5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm2 16h-4v-5h-2v-6c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v6h-2v5z"/><path d="M17.5 6.5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm2 16h-4v-4h-3l3-9h4l3 9h-3z"/></g></svg>
          </FilterField>
          <FilterField
            :value.sync="compare.state"
            :options="stateOptions"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#343434" stroke-miterlimit="10" transform="translate(.5 .5)"><path d="M17 6.5L23 5v15l-8 2-6-2-8 2V7l6-1.5" data-cap="butt"/><path d="M17 6c0 3.1-5 8.1-5 8.1S7 9.1 7 6c0-3.2 2.6-5 5-5s5 1.8 5 5z" data-color="color-2" stroke-linecap="square"/><circle cx="12" cy="6" r="1" stroke-linecap="square"/></g></svg>
          </FilterField>
          <FilterField
            :value.sync="compare.age"
            :options="ageOptions"
            nullLabel="All"
          >
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#343434" stroke-miterlimit="10" stroke-linecap="square"><path d="M12.5 8.5c1.1 0 2-.9 2-2s-2-4-2-4-2 2.9-2 4 .9 2 2 2zm0 0v3" data-color="color-2"/><path d="M1.5 15.5h22v8h-22z"/><path d="M23.5 15.5c0 2.2-1.8 4-4 4-1.5 0-2.8-.9-3.5-2.1-.7 1.2-2 2.1-3.5 2.1s-2.8-.9-3.5-2.1c-.7 1.2-2 2.1-3.5 2.1-2.2 0-4-1.8-4-4m19 0v-4h-16v4"/></g></svg>
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
import Bar from './Bar';
import Block from './Block';
import BlockHeading from './BlockHeading';
import FilterField from './FilterField';
import config from '../config';
import StatsService from '../services/Stats';

export default {
  props: ['profile', 'label', 'description'],
  data() {
    return {
      genderOptions: config.GENDERS,
      ageOptions: config.AGES,
      stateOptions: config.STATES,
      compare: {
        age: null,
        state: null,
        gender: null,
      },
      min: 0,
      max: 0,
    };
  },
  components: {
    Bar,
    FilterField,
    Block,
    BlockHeading,
  },
  computed: {
    averageLabel() {
      return {
        name: 'You',
        value: Number(this.profile.income),
        placement: 'top',
      };
    },
    profileLabel() {
      const { average, min, max } = StatsService.getDemographicsStats(this.compare);
      this.min = min;
      this.max = max;
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
    @media (min-width: 1024px) {
      display: flex;
      align-items: center;
    }
  }

  &__Filters {
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0.5rem auto;

    > * + * {
      margin-left: 0.5rem;
    }
  }
}
</style>
