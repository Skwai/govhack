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
import { mapGetters } from 'vuex';
import DataSummaryItem from './DataSummaryItem';
import Block from './Block';

export default {
  props: ['profile'],
  components: {
    DataSummaryItem,
    Block,
  },
  computed: {
    ...mapGetters([
      'getDemographicsStats',
      'getPostcodeState',
    ]),
    state() {
      return this.getPostcodeState(this.profile.postcode);
    },
    genderAverage() {
      const { gender } = this.profile;
      const { average } = this.getDemographicsStats({ gender });
      return (this.profile.income / average).toFixed(2);
    },
    ageAverage() {
      const { age } = this.profile;
      const { average } = this.getDemographicsStats({ age });
      return (this.profile.income / average).toFixed(2);
    },
    stateAverage() {
      const { state } = this.profile;
      const { average } = this.getDemographicsStats({ state });
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
