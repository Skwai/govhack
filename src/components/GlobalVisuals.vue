<template>
  <article class="GlobalVisuals">
    <GoogleHeatMap />
  </article>
</template>

<script>
import GoogleHeatMap from './GoogleHeatMap';

export default {
  props: [],
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
