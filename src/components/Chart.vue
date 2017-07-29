<template>
  <div class="Chart">
    <h3 class="Chart__Heading">{{label}}</h3>
    <p class="Chart__Description">{{description}}</p>

    <Bar
      :min="24000"
      :max="92000"
      :labels="labels"
    ></Bar>
  </div>
</template>

<script>
import Bar from './Bar';

export default {
  props: ['label', 'description'],
  data() {
    return {
      labels: [
        {
          name: 'You',
          value: 60123,
          placement: 'top',
        },
        {
          name: 'Avg',
          value: 60123,
          placement: 'bottom',
        },
      ],
    };
  },
  components: {
    Bar,
  },
};
</script>

<style scoped lang="stylus">
.Chart {
  text-align: left;
  margin: 3rem 0;

  &__Heading {
    margin: 0;
    font-size: 20px;
  }

  &__Description {
    margin: 0 0 1rem;
    opacity: .5;
  }
}
</style>
