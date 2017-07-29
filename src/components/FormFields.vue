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
    <label class="FormFields__Field">
      <span class="FormFields__FieldLabel">Your Age</span>
      <input
        type="number"
        class="FormFields__FieldInput"
        required
        min="1"
        max="130"
        maxlength="3"
        v-model="profile.age"
      >
    </label>
    <label class="FormFields__Field">
      <span class="FormFields__FieldLabel">Postcode</span>
      <input
        type="number"
        class="FormFields__FieldInput"
        required
        min="1000"
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
    >Find out</button>
    <p><small>* We don't store any of your details</small></p>
  </form>
</template>

<script>
export default {
  props: ['submitted'],
  data() {
    return {
      profile: {
        // defaults to make testing easier
        income: '60,000',
        postcode: 7000,
        age: '24',
        gender: 'Male',
      },
    };
  },
  methods: {
    submit() {
      this.submitted(this.profile);
    },
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
    box-shadow: inset rgba(0,0,0,.125) 0 -2px 0
    transition: 0.2s;
    background: rgba(0,0,0,.05);

    &.-active {
      background: rgba(0,0,0,.15);
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
}
</style>
