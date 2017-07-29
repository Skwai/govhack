<template>
  <div class="DataSummaryItem">
    <h3 class="DataSummaryItem__Heading">{{label}}</h3>
    <div class="DataSummaryItem__Content" :class="{ '-up': value >= 0, '-down': value < 0 }">
      <svg class="DataSummaryItem__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" d="M2.5 7.5l10 10 10-10" stroke-linecap="square"/></svg>
      <span class="DataSummaryItem__Value">{{Math.abs(value)}}<small>%</small></span>
    </div>
    <div class="DataSummaryItem__Description">{{description}}</div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'description'],


};
</script>

<style scoped lang="stylus">
.DataSummaryItem {

  &__Heading {
    margin: 0;
  }

  &__Content {
    display: flex;
    align-items: center;
    justify-content: center;

    &.-up {
      color: #499AFF;
    }

    &.-down {
      color: #D0021B;
    }
  }

  &__Icon {
    width: 1.25rem
    height: 1.25rem;

    .-up & {
      transform: rotate(180deg);
    }
  }

  &__Value {
    font-size: 3rem;
    font-weight: 700;
    margin-left: 0.5rem;

    small {
      font-size: 50%;
    }
  }

  &__Description {
    opacity: .5;
  }
}

</style>
