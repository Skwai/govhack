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

  @media (min-width: 640px) {
    margin: 0;
    left: 20rem;
    position: fixed;
    top: 0;
    right: 0;
    width: auto;
  }


}
</style>
