<template>
  <div class="InputField" :class="{ '-empty': !value, '-disabled': disabled }">
    <label class="InputField__Wrap">
      <input
        class="InputField__Input"
        type="number"
        required
        v-model="inputValue"
        :disabled="disabled"
      >
      <span class="InputField__Label">{{label}}</span>
    </label>
  </div>
</template>

<script>

export default {
  props: ['options', 'label', 'disabled', 'value', 'type', 'errorMessage'],
  data() {
    return {
      error: null,
      inputValue: this.value,
    };
  },
  watch: {
    inputValue() {
      this.$emit('update:value', this.inputValue);
    },
  },
};
</script>

<style scope lang="stylus">
.InputField {
  margin-bottom: 1rem;

  &__Wrap {
    position: relative;
    display: block;
    position: relative;

    .-error & {
      border-bottom-color: #d0021b;
    }

    .-disabled & {
      cursor: not-allowed;
      opacity: .5;
    }
  }

  &__Input {
    display: block;
    width: 100%;
    padding: 1.75rem 0.75rem .5rem;
    background: transparent;
    border: rgba(0,0,0,.1) solid 1px;
    line-height: 1rem;
    font-size: 1rem;
    font-weight: bold;

    &:invalid {
      box-shadow: none;
    }

    &:focus,
    &:hover {
      outline: 0;
      border-color: #499aff;
    }
  }

  &__Label {
    cursor: text;
    top: 0.5rem;
    left: 0.75rem;
    position: absolute;
    display: block;
    opacity: .5;
    transform: translate3d(0,0,0) scale(0.8125);
    transform-origin: top left;
    transition: transform .25s;
    cursor: text;
    z-index: -1;

    .-empty & {
      transform: translate3d(0, 0.5rem, 0) scale(1);
    }
  }
}
</style>
