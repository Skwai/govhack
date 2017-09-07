<template>
  <article class="DataVisuals">
    <DataSummary :profile="profile"></DataSummary>

    <Demographics
      label="Demographics"
      :profile="profile"
    ></Demographics>

    <Postcodes
      label="Demographics"
      :profile="profile"
    ></Postcodes>

    <Industries
      label="Industries"
      :profile="profile"
    ></Industries>

  </article>
</template>

<script>
import DataSummary from './DataSummary';
import Demographics from './Demographics';
import Industries from './Industries';
import Postcodes from './Postcodes';

export default {
  props: ['profile'],
  components: {
    DataSummary,
    Demographics,
    Industries,
    Postcodes,
  },
};
</script>

<style scoped lang="stylus">
.DataVisuals {
  width: 100%;
  max-width: 60rem;
  align-self: flex-start;
}
</style>
