<template>
  <div class="Chart">
    <div class="Chart__Intro">
      <div class="Chart__Header">
        <h3 class="Chart__Heading">Postcode</h3>
        <p class="Chart__Description">Lorem ipsum dolor sit amet</p>
      </div>
      <div class="Chart__Filters">
        <FilterField
          :value="compare.state"
          :options="['All', 'TAS']"
        >
          <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#343434" stroke-miterlimit="10" transform="translate(.5 .5)"><path d="M17 6.5L23 5v15l-8 2-6-2-8 2V7l6-1.5" data-cap="butt"/><path d="M17 6c0 3.1-5 8.1-5 8.1S7 9.1 7 6c0-3.2 2.6-5 5-5s5 1.8 5 5z" data-color="color-2" stroke-linecap="square"/><circle cx="12" cy="6" r="1" stroke-linecap="square"/></g></svg>
        </FilterField>
      </div>
    </div>

    <Bar
      :min="24000"
      :max="92000"
      :labels="labels"
    ></Bar>
  </div>
</template>

<script>
import Bar from './Bar';
import FilterField from './FilterField';

export default {
  props: ['label', 'description'],
  data() {
    return {
      compare: {
        state: 'TAS',
      },
      labels: [
        {
          name: 'You',
          value: 32400,
          placement: 'top',
        },
        {
          name: '7000',
          value: 60123,
          placement: 'bottom',
        },
        {
          name: 'TAS',
          value: 42500,
          placement: 'bottom',
        },
      ],
    };
  },
  components: {
    Bar,
    FilterField,
  },
};
</script>

<style scoped lang="stylus">
.Chart {
  text-align: left;
  margin: 20vh 0;

  &__Intro {
    display: flex;
  }

  &__Heading {
    margin: 0;
    font-size: 20px;
  }

  &__Description {
    margin: 0 0 1rem;
    opacity: .5;
  }

  &__Filters {
    display: flex;
    margin-left: auto;
    align-items: center;

    > * + * {
      margin-left: 0.5rem;
    }
  }
}
</style>
