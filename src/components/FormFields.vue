<template>
  <form class="FormFields" @submit.prevent="submit">
    <p class="FormFields__Lead">Find out how your income compares to others.</p>
    <label class="FormFields__Field">
      <span class="FormFields__FieldLabel">Your Yearly Income</span>
      <span class="FormFields__FieldMask">$</span>
      <input
        type="number"
        class="FormFields__FieldInput"
        required
        min="0"
        max="100000000"
        maxlength="9"
        v-model="profile.income"
      >
    </label>
    <div class="FormFields__Field" ref="ageField" @click="toggleAgeOptions">
      <span class="FormFields__FieldLabel">Your Age</span>
      <button class="FormFields__OptionsToggle">{{profile.age}}</button>
      <div class="FormFields__Options" :class="{'-open': showAgeOptions}">
        <div
          class="FormFields__Option"
          v-for="(age, index) in ages"
          @click="selectAge"
          :class="{'-selected': profile.age === age}"
          :key="index"
        >{{age}}</div>
      </div>
    </div>
    <label class="FormFields__Field">
      <span class="FormFields__FieldLabel">Postcode</span>
      <input
        type="number"
        class="FormFields__FieldInput"
        required
        min="100"
        max="9999"
        maxlength="4"
        v-model="profile.postcode"
      >
    </label>
    <div class="FormFields__RadioGroup">
      <label class="FormFields__Radio" :class="{ '-active': profile.gender === 'Male' }">
        <input class="FormFields__RadioInput" type="radio" value="Male" v-model="profile.gender">
        <span class="FormFields__RadioLabel">Male</span>
      </label>
      <label class="FormFields__Radio" :class="{ '-active': profile.gender === 'Female' }">
        <input class="FormFields__RadioInput" type="radio" value="Female" v-model="profile.gender">
        <span class="FormFields__RadioLabel">Female</span>
      </label>
    </div>
    <button
      class="FormFields__Btn"
      type="submit"
      :disabled="disabled"
    >{{isSubmitted ? 'Update' : 'Find out'}}</button>
    <p><small>We don't store any of your details.</small></p>
    <p><small>Data sourced from ATO income data.</small></p>
  </form>
</template>

<script>
import config from '../config';

export default {
  props: ['submitted', 'disabled'],
  data() {
    return {
      isSubmitted: false,
      showAgeOptions: false,
      profile: {
        income: '',
        postcode: '',
        age: '',
        gender: '',
      },
      ages: config.AGES,
    };
  },
  methods: {
    selectAge(ev) {
      this.profile.age = ev.target.textContent;
      ev.stopPropagation();
      this.hideAgeOptions();
    },
    hideAgeOptions() {
      this.showAgeOptions = false;
    },
    toggleAgeOptions() {
      this.showAgeOptions = !this.showAgeOptions;
    },
    submit() {
      this.isSubmitted = true;
      this.submitted(this.profile);
    },
    documentClick(ev) {
      const el = this.$refs.ageField;
      if (!el.contains(ev.target)) {
        this.hideAgeOptions();
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

<style scoped lang="stylus">
.FormFields {
  &__Lead {
    opacity: .7;
    margin: 0 0 2rem;
  }

  &__Field {
    margin: 1rem 0;
    border: rgba(0,0,0,.1) solid 1px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  &__FieldMask {
    padding: 0.25rem 0 0.5rem 0.75rem;
    font-weight: bold;
    opacity: .5
  }

  &__FieldLabel {
    display: block;
    text-align: left;
    padding: 0.5rem 0 0 0.75rem
    font-size: 0.875rem;
    opacity: .5;
    width: 100%;
  }

  &__FieldInput {
    display: block;
    width: 100%;
    padding: 0.25rem 0.75rem 0.5rem;
    border: 0;
    background: transparent;
    appearance: none;
    font-weight: bold;
    flex: 1;

    .FormFields__FieldMask + & {
      padding-left: 0.35rem;
    }

    &:focus {
      outline: 0;
      box-shadow: none;
    }
  }

  &__Btn {
    border-radius: 99px;
    background: #499aff;
    padding: 1rem 2rem;
    color: #fff;
    border: 0;
    box-shadow: inset rgba(0,0,0,.15) 0 -2px 0;
    font-size: 0.875rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    width: 100%;
    margin: 1rem 0;

    &[disabled] {
      opacity: .5;
      cursor: not-allowed;
    }

    &:hover,
    &:active,
    &:focus {
      outline: 0;
      box-shadow: inset rgba(0,0,0,.15) 0 -2px 0, rgba(0,0,0,.125) 0 2px 1rem;
    }
  }

  &__RadioGroup {
    display: flex;
    margin-bottom: 1rem;
  }

  &__Radio {
    flex: 1;
    padding: 1rem 2rem;
    box-shadow: inset rgba(0,0,0,.125) 0 -2px 0;
    transition: 0.2s;
    background: rgba(0,0,0,.05);

    &.-active {
      background: rgba(0,0,0,.15);
      box-shadow: inset rgba(0,0,0,.1) 0 2px 10px, inset rgba(0,0,0,.125) 0 -2px 0;
    }

    &:hover:not(.-active) {
      background: rgba(0,0,0,.1);
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  &__RadioInput {
    display: none;
  }

  &__RadioLabel {
    display: block;
    font-weight: bold;
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
    overflow-y: auto;
    text-align: left;

    &.-open {
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

  &__OptionsToggle {
    background: none;
    border: 0;
    padding: 0.25rem 0.75rem 0.5rem;
    display: block;
    appearance: none;
    font-weight: bold;
    width: 100%;
    text-align: left;
    position: relative;

    &::after {
      content: "";
      background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M7.41%207.84L12%2012.42l4.59-4.58L18%209.25l-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E') no-repeat center center;
      background-size: contain;
      width: 1.5rem;
      height: 1.5rem;
      right: 0.5rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &:focus {
      outline: 0;
    }
  }
}
</style>
