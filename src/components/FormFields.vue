<template>
  <form class="Form" @submit.prevent="submit">
    <h2 class="Form__Heading">About You</h2>
    <p class="Form__Lead">Lorem ipsum dolor sit amet consectuor</p>
    <div class="Form__Field">
      <label>
        <span class="Form__FieldLabel">Your Income</span>
        <input
          type="number"
          class="Form__FieldInput"
          required
          maxlength="10"
          v-model="income"
        >
      </label>
    </div>
    <div class="Form__Field">
      <label>
        <span class="Form__FieldLabel">Postcode</span>
        <input
          type="number"
          class="Form__FieldInput"
          required
          minlength="4"
          maxlength="4"
          v-model="postcode"
        >
      </label>
    </div>
    <div class="Form__RadioGroup">
      <label class="Form__Radio" :class="{ '-active': gender === 'Male' }">
        <input class="Form__RadioInput" type="radio" value="Male" v-model="gender">
        <span class="Form__RadioLabel">Male</span>
      </label>
      <label class="Form__Radio" :class="{ '-active': gender === 'Female' }">
        <input class="Form__RadioInput" type="radio" value="Female" v-model="gender">
        <span class="Form__RadioLabel">Female</span>
      </label>
    </div>
    <button
      class="Form__Btn"
      type="submit"
    >Find out</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      income: null,
      postcode: null,
      gender: 'Male',
      industry: null,
    };
  },
  methods: {
    submit() {
      console.log(this.data);
    },
  },
};
</script>

<style scoped lang="stylus">
.Form {
  background: #fff;
  padding: 2rem;

  &__Heading {
    margin: 0 0 0.5rem;
  }

  @media (min-width: 640px) {
    flex: 0 0 24rem;
    min-height: 100vh;
  }

  &__Lead {
    opacity: .7;
    margin: 0 0 1rem;
  }

  &__Field {
    margin: 1rem 0;
  }

  &__FieldLabel {
    display: block;
    text-align: left;
  }

  &__FieldInput {
    display: block;
    width: 100%;
    padding: 1rem;
    border: rgba(0,0,0,.1) solid 1px;
    appearance: none;

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
    box-shadow: inset rgba(0,0,0,.15) 0 -3px 0;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &:hover,
    &:active,
    &:focus {
      box-shadow: rgba(0,0,0,.125) 0 2px 1rem;
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
  }
}
</style>
