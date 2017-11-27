<template>
  <div class="card">
    <img class="pic" :src="pic">
    <h3>{{name}}</h3>
    <p>{{bio}}</p>

    <div class="controls">
      <button class="dislike" @click="dislike">
        Burn to ashes!
      </button>

      <button class="like" @click="like">
        Lights my fire!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['pic', 'name', 'bio'],
  methods: {
    like () {
      this.$emit('like', this.id)
    },
    dislike () {
      this.$emit('dislike', this.id)
    }
  }
}
</script>

<style scoped>
.card {
  box-sizing: border-box;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 400px 30px 1fr 60px;
  background: #fff;
  margin: 10px;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px;
  overflow: hidden;
  height: calc(100vh - 100px);
}
img {
  box-sizing: border-box;
  width: calc(100% + 20px);
  max-height: 400px;
  min-height: 200px;
  margin: -10px -10px 0;
  object-fit: contain;
  display: block;
  pointer-events: none;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.like, .dislike {
  border: 1px solid;
  border-radius: 8px;
  padding: 12px 8px;
  background: #fff;
  font-size: 1em;
  font-weight: lighter;
}
</style>
