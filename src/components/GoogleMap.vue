<template>
  <div class="GoogleMap"></div>
</template>

<script>
import config from '../config';
import StatsService from '../services/Stats';

export default {
  data() {
    return {
      postcodes: {},
    };
  },

  methods: {
    async loadPostcodeData() {
      const response = await fetch('/static/postcodes.json');
      return response.json();
    },
  },

  async created() {
    this.postcodes = await this.loadPostcodeData();
  },

  mounted() {
    window.google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: config.MAPS_API_KEY,
    });
    window.google.charts.setOnLoadCallback(() => {
      const table = [
        ['Longitude', 'Latitude', 'Name', 'Average Salary'],
      ];
      StatsService.getPostcodeAverages()
        .forEach((s) => {
          if (this.postcodes[s.postcode]) {
            const { name, longitude, latitude } = this.postcodes[s.postcode];
            if (longitude !== 0 && latitude !== 0) {
              table.push([longitude, latitude, name, s.average]);
            }
          }
        });

      const data = window.google.visualization.arrayToDataTable(table);
      const options = {
        region: '053',
        explorer: {},
//        resolution: 'provinces',
        displayMode: 'markers',
        colors: ['#499aff'],
        backgroundColor: {
          fill: '#f1f2f3',
        },
        magnifyingGlass: {
          enable: false,
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
