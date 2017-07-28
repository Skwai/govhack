<template>

  <form class="FormFields" @submit.prevent="submit">
    <header class="FormFields__Header">
      <!--
      <svg class="FormFields__Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#333" stroke-width="0.5" stroke-miterlimit="10"><path d="M12 17.3c-.7.4-1.8.7-3 .7-2.2 0-4-.9-4-2 0-.6.5-1.1 1.4-1.5" data-cap="butt"/><path d="M12 14.3c-.7.4-1.8.7-3 .7-2.2 0-4-.9-4-2 0-.6.5-1.1 1.3-1.5" data-cap="butt"/><path d="M12 11.3c-.7.4-1.8.7-3 .7-2.2 0-4-.9-4-2 0-.6.5-1.1 1.4-1.5m5.2-3c.9.4 1.4.9 1.4 1.5 0 1.1-1.8 2-4 2s-4-.9-4-2c0-.6.5-1.1 1.4-1.5" data-cap="butt"/><ellipse cx="9" cy="4" stroke-linecap="square" rx="4" ry="2"/><path d="M17.6 17.5c.8.4 1.4.9 1.4 1.5 0 1.1-1.8 2-4 2s-4-.9-4-2c0-.6.5-1.1 1.4-1.5" data-cap="butt"FormFields__/><path d="M17.7 14.5c.8.4 1.3.9 1.3 1.5 0 1.1-1.8 2-4 2s-4-.9-4-2c0-.6.5-1.1 1.4-1.5" data-cap="butt"FormFields__/><path d="M17.6 11.5c.8.4 1.4.9 1.4 1.5 0 1.1-1.8 2-4 2s-4-.9-4-2c0-.6.5-1.1 1.4-1.5" data-cap="butt"FormFields__/><ellipse cx="15" cy="10"FormFields__ stroke-linecap="square" rx="4" ry="2"/></g></svg>
      -->
      <svg class="FormFields__Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#A67C52" d="M43 11c0-1.105-.895-2-2-2H6C4.346 9 3 7.654 3 6c0-.552-.448-1-1-1s-1 .448-1 1v32c0 3.866 3.134 7 7 7h33c1.105 0 2-.895 2-2V11z"/><path fill="#87613E" d="M46 22H36c-2.757 0-5 2.243-5 5s2.243 5 5 5h10c.552 0 1-.448 1-1v-8c0-.552-.448-1-1-1zM4 3h28c1.105 0 2 .895 2 2v4H4C2.343 9 1 7.657 1 6s1.343-3 3-3z"/><circle cx="36" cy="27" r="2" fill="#EFD358"/></svg>
      <h1 class="FormFields__Heading">PoorScore</h1>
    </header>
    <p class="FormFields__Lead">Find out how your income compares to others.</p>
    <label class="FormFields__Field">
      <span class="FormFields__FieldLabel">Your Yearly Income</span>
      <span class="FormFields__FieldMask">$</span>
      <input
        type="number"
        class="FormFields__FieldInput"
        required
        maxlength="10"
        v-model="income"
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
        v-model="age"
      >
    </label>
    <label class="FormFields__Field">
      <span class="FormFields__FieldLabel">Postcode</span>
      <input
        type="text"
        class="FormFields__FieldInput"
        required
        minlength="4"
        maxlength="4"
        v-model="postcode"
      >
    </label>
    <div class="FormFields__RadioGroup">
      <label class="FormFields__Radio" :class="{ '-active': gender === 'Male' }">
        <input class="FormFields__RadioInput" type="radio" value="Male" v-model="gender">
        <span class="FormFields__RadioLabel">Male</span>
      </label>
      <label class="FormFields__Radio" :class="{ '-active': gender === 'Female' }">
        <input class="FormFields__RadioInput" type="radio" value="Female" v-model="gender">
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
.FormFields {
  background: #fff;
  padding: 2rem;
  box-shadow: rgba(0,0,0,.05) 0 0 0 1px, rgba(0,0,0,.05) 0 0 10px

  @media (min-width: 640px) {
    flex: 0 0 24rem;
    min-height: 100vh;
  }

  &__Lead {
    opacity: .7;
    margin: 0 0 2rem;
  }

  &__Header {
    margin-bottom: 1rem;
  }

  &__Heading {
    margin: 0;
    letter-spacing: -0.035em
    font-size: 1.75rem;
  }

  &__Logo {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 0.5rem;
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
