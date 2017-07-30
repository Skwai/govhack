<template>
  <div class="GoogleMap"></div>
</template>

<script>
import config from '../config';
import StatsService from '../services/Stats';

export default {
  mounted() {
    window.google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: config.MAPS_API_KEY,
    });
    window.google.charts.setOnLoadCallback(() => {
      const table = [
        ['State', 'Average Salary'],
      ];
      StatsService.getStateStats()
        .forEach(s => table.push([`AU-${s.state}`, Number(s.average.toFixed())]));
      console.log(table);
      const data = window.google.visualization.arrayToDataTable(table);
      const options = {
        region: 'AU',
        resolution: 'provinces',
        colors: ['#499aff'],
        backgroundColor: {
          fill: '#f1f2f3',
        },
      };
      const chart = new window.google.visualization.GeoChart(this.$el);

      chart.draw(data, options);
    });
  },
};
</script>

<style scoped>
.GoogleMap {
  width: 100%;
  height: 100vh;
  margin: -2rem -2rem -2rem -2rem;
}
</style>
