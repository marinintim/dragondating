<template>
  <div class="set-gender">
    <h2>First, tell me what you seek</h2>

    <div class="alternatives">
      <button @click="seekMale">
        Male
      </button>
      <button @click="seekAnyone">
        Anyone
      </button>
      <button @click="seekFemale">
        Female
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SetGender',
    methods: {
      seekMale () {
        console.log('setting gender male')
        this.$emit('setGender', 'boy')
      },
      seekAnyone () {
        this.$emit('setGender', 'anyone')
      },
      seekFemale () {
        console.log('setting gender female')
        this.$emit('setGender', 'girl')
      }
    }
  }
</script>

<style scoped>
  .alternatives {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    height: 80px;
  }
  .alternatives button {
    background: #fff;
    font-size: 1.3em;
    border: 1px solid #eee;
    border-radius: 6px;
  }

</style>
