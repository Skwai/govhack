<template>
  <article class="DataVisuals">
    <header>
      <h2>Here's how you compare&hellip;</h2>
    </header>

    <DataSummary></DataSummary>

    <Chart
      label="Demographics"
      description="Lorem ipsum dolor sit amet"
    >
    </Chart>

  </article>
</template>

<script>
import DataSummary from './DataSummary';
import Chart from './Chart';

export default {
  components: {
    DataSummary,
    Chart,
  },
};
</script>

<style scoped lang="stylus">
.DataVisuals {

}
</style>
