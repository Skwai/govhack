<template>
  <div class="DataSummary">
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="Gender"
        :value="genderAverage"
        :description="`Compared to the average ${profile.gender}`"
      ></DataSummaryItem>
    </div>
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="State"
        :value="stateAverage"
        :description="`Compared to others living in ${state}`"
      ></DataSummaryItem>
    </div>
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="Age"
        :value="ageAverage"
        :description="`Compared to other ${profile.age} year olds`"
      ></DataSummaryItem>
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
      const { average } = StatsService.getDempgraphicsStats({ gender: this.profile.gender });
      return (((this.profile.income / average) * 100) - 100).toFixed(1);
    },
    ageAverage() {
      const { average } = StatsService.getDempgraphicsStats({ age: this.profile.age });
      return (((this.profile.income / average) * 100) - 100).toFixed(1);
    },
    stateAverage() {
      const { average } = StatsService.getDempgraphicsStats({
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

  &__Item {
    padding: 0 2rem;
  }

  &__Item + &__Item {
    border-left: rgba(0,0,0,.075) solid 2px;
  }
}
</style>
