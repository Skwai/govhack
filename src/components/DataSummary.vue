<template>
  <div class="DataSummary">
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="Gender"
        trend="up"
        value="22"
        description="Compared to the average woman"
      ></DataSummaryItem>
    </div>
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="Postcode"
        trend="down"
        value="13"
        description="Compared to others living in 7000"
      ></DataSummaryItem>
    </div>
    <div class="DataSummary__Item">
      <DataSummaryItem
        label="Age"
        trend="up"
        value="17"
        description="Compared to other 18-24 year olds"
      ></DataSummaryItem>
    </div>
  </div>
</template>

<script>
import DataSummaryItem from './DataSummaryItem';

export default {
  components: {
    DataSummaryItem,
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
