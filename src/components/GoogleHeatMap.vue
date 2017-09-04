<template>
  <div class="GoogleHeatMap">
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mapStyles from '../misc/mapStyles';
import mapIcon from '../misc/mapIcon';
import Loading from './Loading';

export default {
  data() {
    return {
      loading: true,
      locations: {},
    };
  },

  components: {
    Loading,
  },

  methods: {
    async loadPostcodeLocations() {
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
      const width = 51;
      const height = 64;

      return {
        url: mapIcon,
        size: new window.google.maps.Size(width, height),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(0, 0),
        scaledSize: new window.google.maps.Size(width, height),
      };
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
      return new window.MarkerClusterer(map, markers, {
        styles: [{
          url: mapIcon,
          width: 53,
          height: 66,
          textSize: 12,
          fontFamily: 'Roboto',
          anchorText: [-7, 0],
        }],
      });
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
    ...mapGetters(['getPostcodeAverages']),
  },

  async mounted() {
    let locations;
    try {
      locations = await this.loadPostcodeLocations();
    } finally {
      this.loading = false;
    }
    const map = this.initMap();
    const averages = this.getPostcodeAverages;
    const markers = [];
    const points = [];

    averages.forEach((el) => {
      if (el.postcode in locations) {
        const postcode = locations[el.postcode];
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
