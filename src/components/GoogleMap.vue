<template>
  <div style="width: 900px; height: 500px;"></div>
</template>

<script>
import config from '../config';
import StatsService from '../services/Stats';

export default {
  props: [],
  mounted() {
    window.google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: config.MAPS_API_KEY,
    });

    window.google.charts.setOnLoadCallback(() => {
      const table = [
        ['State', 'Average Salary'],
      ];
      StatsService.getStateStats().forEach(s => table.push([`AU-${s.state}`, s.avg]));
      console.log(table);
      const data = window.google.visualization.arrayToDataTable(table);
      const options = { region: 'AU', resolution: 'provinces' };
      const chart = new window.google.visualization.GeoChart(this.$el);

      chart.draw(data, options);
    });
  },

  methods: {},
};
</script>
