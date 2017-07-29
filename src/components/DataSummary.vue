<template>
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
      >Compared to others living in <strong>{{state}}</strong></DataSummaryItem>
    </div>
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="Age"
        :value="ageAverage"
      >Compared to other <strong>{{profile.age}}</strong> year olds</DataSummaryItem>
    </div>
  </div>
</template>

<script>
import DataSummaryItem from './DataSummaryItem';
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
  },
  watch: {
    'profile.postcode': function (postcode) {
      this.state = StatsService.getState(postcode);
    },
  },
  computed: {
    genderAverage() {
      const { average } = StatsService.getDemographicsStats({ gender: this.profile.gender });
      return (((this.profile.income / average) * 100) - 100).toFixed(1);
    },
    ageAverage() {
      const { average } = StatsService.getDemographicsStats({ age: this.profile.age });
      return (((this.profile.income / average) * 100) - 100).toFixed(1);
    },
    stateAverage() {
      const { average } = StatsService.getDemographicsStats({
        state: this.state,
      });
      return (((this.profile.income / average) * 100) - 100).toFixed(1);
    },
  },
};
</script>

<style scoped lang="stylus">
.DataSummary {
  display: flex;
  padding: 2rem 0;
  background: #fff;
  border-radius: 3px;
  box-shadow: rgba(0,0,0,0.05) 0 0 0 1px, rgba(0,0,0,0.05) 0 2px 10px;

  &__Item {
    padding: 0 2rem;
  }

  &__Item + &__Item {
    border-left: rgba(0,0,0,.075) solid 2px;
  }
}
</style>
