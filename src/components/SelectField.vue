<template>
  <div class="SelectField" :class="{ '-empty': !displayValue, '-expanded': expanded, '-disabled': disabled }">
    <span class="SelectField__Toggle" @click="toggle">
      <span class="SelectField__Label">{{label}}</span>
      <span class="SelectField__Value">{{displayValue}}</span>
    </span>

    <div class="SelectField__Options" :aria-expanded="expanded">
      <div
        v-for="(option, index) in options"
        class="SelectField__Option"
        :class="{ '-selected': value === option }"
        :key="index"
        @click="select(option)"
      >{{option}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['options', 'label', 'disabled', 'value', 'update'],
  methods: {
    select(value) {
      this.$emit('update:value', value);
      this.toggle();
    },
    toggle() {
      if (!this.disabled) {
        this.expanded = !this.expanded;
      }
    },
    close() {
      this.expanded = false;
    },
    documentClick(ev) {
      if (!this.$el.contains(ev.target)) {
        this.close();
      }
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    displayValue() {
      return this.value;
    },
  },
  created() {
    document.addEventListener('click', this.documentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.documentClick);
  },
};
</script>

<style scope lang="stylus">
.SelectField {
  background: transparent;
  border: rgba(0,0,0,.1) solid 1px;
  position: relative;
  display: block;
  margin-bottom: 16px;
  transition: 0.2s;
  text-align: left;

  &:hover:not(.-disabled) {
    border-color: #499aff;
  }

  &.-disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  &__Value {
    display: block;
    height: 1.5rem;
    width: 100%;
    font-weight: 700;
  }

  &__Option {
    cursor: pointer;
    padding: 0.75rem 0.75rem;
    transition: 0.2s;

    &.-selected {
      color: #499aff;
    }

    &:hover {
      background: rgba(0,0,0,.05);
    }
  }

  &__Toggle {
    padding: 1.75rem 0.75rem .35rem;
    display: block;
    line-height: 1;

    &::after {
      position: absolute;
      top: 50%;
      right: 0.75rem;
      transform: translate(0, -50%);
      content: "";
      background: url("data:image/svg+xml,%0A%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M7.41%207.84L12%2012.42l4.59-4.58L18%209.25l-6%206-6-6z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0-.75h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E") no-repeat center center;
      background-size: contain;
      width: (1.25 * 16px);
      height: (1.25 * 16px);
      opacity: .5;
      transition: 0.2s;
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &__Label {
    top: 0.75rem;
    left: 0.75rem;
    position: absolute;
    display: block;
    opacity: .5;
    transform: translate3d(0,0,0) scale(0.8125);
    transform-origin: top left;
    transition: transform .25s;
    cursor: text;

    .-empty & {
      transform: translate3d(0, 0.5rem, 0) scale(1);
    }
  }

  &__Options {
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    width: 100%;
    position: absolute;
    transition: 0.2s;
    transform: scale(0,0);
    opacity: 0;
    max-height: 30vh;
    border-radius: 2px;
    box-shadow: rgba(0,0,0,.2) 0 1px 2px, rgba(0,0,0,.125) 0 2px 1rem;
    z-index: 2;
    max-width: 100%;
    font-size: 0.875rem;
    overflow-y: auto;
    text-align: left;

    .-expanded & {
      transform: scale(1,1)
      opacity: 1;
    }
  }

  &__Option {
    cursor: pointer;
    padding: 0.75rem 0.75rem;
    transition: 0.2s;

    &.-selected {
      color: #499aff;
    }

    &:hover {
      background: rgba(0,0,0,.05);
    }
  }
}
</style>
