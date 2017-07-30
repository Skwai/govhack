<template>
  <div class="GoogleHeatMap"></div>
</template>

<script>
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

  async mounted() {
    const styles = JSON.parse('[{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#dddddd"},{"saturation":-100},{"lightness":-3},{"visibility":"on"}]}]');

    this.postcodes = await this.loadPostcodeData();
    const map = new window.google.maps.Map(this.$el, {
      zoom: 5,
      center: { lat: -26.610658, lng: 134.542068 },
      mapTypeId: 'roadmap',
      styles,
    });
    const markers = [];


    const icon = new window.google.maps.MarkerImage(
      '/static/marker.png',
      new window.google.maps.Size(76, 94),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Size(76 / 2, 94 / 2),
    );

    StatsService.getPostcodeAverages().forEach((s) => {
      if (this.postcodes[s.postcode]) {
        const { name, longitude, latitude } = this.postcodes[s.postcode];
        const marker = new window.google.maps.Marker({
          position: { lat: longitude, lng: latitude },
          title: name,
          icon,
        });
        markers.push(marker);
        const infowindow = new window.google.maps.InfoWindow({
          content: `<b>${name}</b><br><br>Average Salary is $${s.average.toLocaleString()}<br>Median Salary is $${s.median.toLocaleString()}`,
        });
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      }
    });

    this.clusters = new window.MarkerClusterer(map, markers, { imagePath: '/static/m' });
  },
};
</script>

<style scoped>
.GoogleHeatMap {
  width: 100%;
  height: 100vh;
  margin: -2rem -2rem -2rem -2rem;
}
</style>