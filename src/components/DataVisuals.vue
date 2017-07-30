<template>
  <article class="DataVisuals">
    <DataSummary :profile="profile"></DataSummary>

    <Demographics
      label="Demographics"
      description="Lorem ipsum dolor sit amet"
      :profile="profile"
    >
    </Demographics>

    <Postcodes
      label="Demographics"
      description="Lorem ipsum dolor sit amet"
      :profile="profile"
    >
    </Postcodes>

  </article>
</template>

<script>
import DataSummary from './DataSummary';
import Demographics from './Demographics';
import Postcodes from './Postcodes';

export default {
  props: ['profile'],
  components: {
    DataSummary,
    Demographics,
    Postcodes,
  },
};
</script>

<style scoped lang="stylus">
.DataVisuals {
  width: 100%;
}
</style>
