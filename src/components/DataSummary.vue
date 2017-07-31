<template>
  <Block>
    <div class="DataSummary">
      <div class="DataSummary__Item">
        <DataSummaryItem
          label="Gender"
          :value="genderAverage"
        >Compared to the average <strong>{{profile.gender}}</strong>
        </DataSummaryItem>
      </div>
      <div class="DataSummary__Item">
        <DataSummaryItem
          label="State"
          :value="stateAverage"
        >Compared to others living in <strong>{{state ? state : 'Australia'}}</strong></DataSummaryItem>
      </div>
      <div class="DataSummary__Item">
        <DataSummaryItem
          label="Age"
          :value="ageAverage"
        >Compared to other <strong>{{profile.age}} year olds</strong></DataSummaryItem>
      </div>
    </div>
  </Block>
</template>

<script>
import DataSummaryItem from './DataSummaryItem';
import Block from './Block';
import StatsService from '../services/Stats';

export default {
  props: ['profile'],
  data() {
    return {
      state: StatsService.getState(this.profile.postcode),
    };
  },
  components: {
    DataSummaryItem,
    Block,
  },
  watch: {
    'profile.postcode': function (postcode) {
      this.state = StatsService.getState(postcode);
    },
  },
  computed: {
    genderAverage() {
      const { average } = StatsService.getDemographicsStats({ gender: this.profile.gender });
      return (this.profile.income / average).toFixed(2);
    },
    ageAverage() {
      const { average } = StatsService.getDemographicsStats({ age: this.profile.age });
      return (this.profile.income / average).toFixed(2);
    },
    stateAverage() {
      const { average } = StatsService.getDemographicsStats({
        state: this.state,
      });
      return (this.profile.income / average).toFixed(2);
    },
  },
};
</script>

<style scoped lang="stylus">
.DataSummary {
  display: flex;
  text-align: center;

  @media (max-width: 1023px) {
    flex-direction: column;
  }

  @media (min-width: 1024px) {
    justify-content: center;
  }

  &__Item {
    flex: 1;
    padding: 1.5rem
  }

  &__Item + &__Item {
    @media (max-width: 1023px) {
      border-top: rgba(0,0,0,.075) solid 1px;
    }

    @media (min-width: 1024px) {
      border-left: rgba(0,0,0,.075) solid 2px;
    }
  }
}
</style>
