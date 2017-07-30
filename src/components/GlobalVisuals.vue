<template>
  <article class="GlobalVisuals">
    <GoogleHeatMap />
  </article>
</template>

<script>
import StatsService from '../services/Stats';
import GoogleHeatMap from './GoogleHeatMap';

export default {
  props: [],
  data() {
    const { average, min, max } = StatsService.getDemographicsStats({});
    return {
      average,
      min,
      max,
      topTen: StatsService.getTopPostcodes(10),
      bottomTen: StatsService.getBottomPostcodes(10),
    };
  },
  components: {
    GoogleHeatMap,
  },
};
</script>

<style scoped lang="stylus">
.GlobalVisuals {
    width: 100%;
    height: 100vh;
    margin: -2rem -2rem -2rem -2rem;
}
</style>
