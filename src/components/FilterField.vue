<template>
  <div class="FilterField" :class="{ '-open': open }">
    <button class="FilterField__Label" @click="toggle">
      <div class="FilterField__LabelIcon">
        <slot name="icon"></slot>
      </div>
      {{value}}
    </button>
    <div class="FilterField__Options">
      <div
        class="FilterField__Option"
        v-for="(option, index) in options"
        @click="select(option)"
        :class="{'-selected': value === option}"
        :key="index"
      >{{option}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'options'],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
    select(value) {
      this.$emit('update:value', value);
      this.close();
    },
    documentClick(ev) {
      if (!this.$el.contains(ev.target)) {
        this.close();
      }
    },
  },
  created() {
    document.addEventListener('click', this.documentClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClick);
  },
};
</script>

<style scope lang="stylus">
.FilterField {
  position: relative;

  &__Label {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.5rem (0.5rem + 1.25rem + 0.75rem) 0.5rem 0.75rem;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 3px;
    font-size: 0.875rem;
    opacity: .8;

    &:hover,
    &:active,
    &:focus {
      box-shadow: rgba(0,0,0,.2) 0 1px 2px, rgba(0,0,0,.125) 0 2px 1rem;
      background: #fff;
      outline: 0;
      opacity: 1;
    }

    &::after {
      content: "";
      background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M7.41%207.84L12%2012.42l4.59-4.58L18%209.25l-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E') no-repeat center center;
      background-size: contain;
      width: 1.25rem;
      height: 1.25rem;
      right: 0.5rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &Icon {
      margin-right: 1rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  &__Options {
    background: #fff;
    width: 100%;
    position: absolute;
    transition: 0.2s;
    transform: scale(0,0);
    opacity: 0;
    max-height: 30vh;
    border-radius: 2px;
    top: 0;
    left: 0;
    box-shadow: rgba(0,0,0,.2) 0 1px 2px, rgba(0,0,0,.125) 0 2px 1rem;
    z-index: 2;
    max-width: 100%;
    font-size: 0.875rem;

    .-open & {
      transform: scale(1,1)
      opacity: 1;
    }
  }

  &__Option {
    cursor: pointer;
    padding: 0.5rem 0.75rem;
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
