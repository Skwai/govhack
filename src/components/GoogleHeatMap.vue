<template>
  <div class="GoogleHeatMap"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import mapStyles from '../misc/mapStyles';

export default {
  data() {
    return {
      postcodes: {},
    };
  },

  methods: {
    async loadPostcodeData() {
      // Based on https://gist.github.com/randomecho/5020859
      const response = await fetch('/static/postcodes.json');
      return response.json();
    },

    initMap() {
      return new window.google.maps.Map(this.$el, {
        zoom: 4,
        center: { lat: -26.610658, lng: 134.542068 },
        mapTypeId: 'roadmap',
        streetViewControl: false,
        styles: mapStyles,
      });
    },

    getIcon() {
      return new window.google.maps.MarkerImage(
        '/static/marker.png',
        new window.google.maps.Size(76, 94),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Size(76 / 2, 94 / 2),
      );
    },

    addPostcodeToMap(map, postcode) {
      const { name, longitude, latitude, average, median } = postcode;
      const icon = this.getIcon();
      const marker = new window.google.maps.Marker({
        position: { lat: longitude, lng: latitude },
        title: name,
        icon,
      });
      const infowindow = this.addInfowindow(`
        <b>${name}</b>
        <br><br>Average Salary is $${average.toLocaleString()}
        <br>Median Salary is $${median.toLocaleString()}
      `);
      marker.addListener('click', () => infowindow.open(map, marker));
      return marker;
    },

    addInfowindow(content) {
      return new window.google.maps.InfoWindow({
        content,
        pixelOffset: new window.google.maps.Size(-20, 0),
      });
    },

    addClustersToMap(map, markers) {
      return new window.MarkerClusterer(map, markers, { imagePath: '/static/m' });
    },

    addHeatmapToMap(map, data) {
      return new window.google.maps.visualization.HeatmapLayer({
        data,
        map,
        radius: 50,
      });
    },
  },
  computed: {
    ...mapGetters([
      'getPostcodeAverages',
    ]),
  },

  async mounted() {
    const postcodes = await this.loadPostcodeData();
    const map = this.initMap();
    const averages = this.getPostcodeAverages;
    const markers = [];
    const points = [];

    averages.forEach((el) => {
      if (el.postcode in postcodes) {
        const postcode = postcodes[el.postcode];
        const { longitude, latitude } = postcode;
        const { average, median } = el;
        const marker = this.addPostcodeToMap(map, Object.assign({}, postcode, { average, median }));
        markers.push(marker);
        points.push({
          location: new window.google.maps.LatLng(longitude, latitude),
          weight: median / 50000,
        });
      }
    });

    this.addClustersToMap(map, markers);
    this.addHeatmapToMap(map, points);
  },
};
</script>

<style scoped>
.GoogleHeatMap {
  width: 100%;
  height: 100vh;
  position: absolute !important;
  left: 0;
  top: 0;
}
</style>
