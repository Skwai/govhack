<template>
  <article class="DataVisuals">
    <header>
      <h2>Here's how you compare&hellip;</h2>
    </header>

    <DataSummary :profile="profile"></DataSummary>

    <Demographics
      label="Demographics"
      description="Lorem ipsum dolor sit amet"
    >
    </Demographics>

    <Postcodes
      label="Demographics"
      description="Lorem ipsum dolor sit amet"
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

}
</style>
