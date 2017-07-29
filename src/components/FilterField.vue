<template>
  <div class="FilterField">
    <div class="FilterField__Label">
      <div class="FilterField__LabelIcon">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scope lang="stylus">
.FilterField {
  border: rgba(0,0,0,.1) solid 1px;
  padding: 0.5rem;
  position: relative;

  &__Label {
    &Icon {
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
