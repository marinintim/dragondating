<template>
  <div class="screen">
    <h1>Your Matches</h1>

    <ol v-if="matches.length">
      <li v-for="match in matches" class="match">
        <img class="match__pic" :src="match.pic">
        <span class="match__name">{{match.name}}</span>
      </li>
    </ol>
    <div v-else>
      You have no matches... yet. Keep trying!
    </div>
  </div>
</template>

<script>
export default {
  name: 'Matches',
  props: ['matches']
}
</script>

<style scoped>
.screen {
  margin: 0 auto;
}
ol {
  list-style: none;
  padding-left: 0;
  margin: 0 auto;
}
.match {
  box-sizing: border-box;
  display: grid;
  padding-left: 10px;
  padding-right: 10px;

  grid-template-columns: 50px 1fr auto;
  vertical-align: middle;
  grid-gap: 30px;
}

.match__chat {
  padding-top: 14px;
}

.match + .match {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 20px;
}
.match__name {
  padding-top: 14px;
}

.match__pic {
  width: 50px;
  object-fit: contain;
}
.match * {
  display: inline-block;
  text-align: left;
}


</style>
