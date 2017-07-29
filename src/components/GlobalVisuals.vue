<template>
  <article class="GlobalVisuals">
    <header>
      <h2>Some global things go here</h2>
    </header>
    <GoogleMap />
    The average wage is ${{average.toFixed(0)}}<br>

    The top 10 richest suburbs
    <ol>
      <li v-for="top in topTen">{{top.median}} Postcode: {{top.postcode}}, {{top.state}}</li>
    </ol>

    The top 10 poorest suburbs
    <ol>
      <li v-for="bot in bottomTen">{{bot.median}} Postcode: {{bot.postcode}}, {{bot.state}}</li>
    </ol>


  </article>
</template>

<script>
import StatsService from '../services/Stats';
import GoogleMap from './GoogleMap';

export default {
  props: [],
  data() {
    const { average, min, max } = StatsService.getDempgraphicsStats({});
    return {
      average,
      min,
      max,
      topTen: StatsService.getTopPostcodes(10),
      bottomTen: StatsService.getBottomPostcodes(10),
    };
  },
  components: {
    GoogleMap,
  },
};
</script>

<style scoped lang="stylus">
.GlobalVisuals {

}
</style>
