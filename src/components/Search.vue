<template>
  <div class="search">
    <div class="card-holder">
      <div class="loading" v-if="profiles.length === 0">loading profiles</div>
      <transition-group :name="animateAs">
        <Card v-for="profile in profiles"
              v-bind="profile"
              :withControls="true"
              :key="profile.id"
              @like="like(profile)"
              @dislike="loseCard(profile)"></Card>
      </transition-group>
   </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Search',
  props: ['seekGender', 'profiles'],
  mounted () {
    console.log(this, arguments)
    if (!this.seekGender) {
      console.log('no this seekGender, redirect')
      this.$router.push('/setgender')
    }
  },
  data: () => {
    return {
      animateAs: 'like'
    }
  },
  methods: {
    askProfiles () {
      this.$emit('loadMoreProfiles')
    },
    like (profile) {
      if (profile.likesYou) {
        this.animateAs = 'match'
        this.$emit('match', profile)
      } else {
        this.animateAs = 'like'
        console.log('doesnt like you, move on')
      }
      this.showNextCard(profile.id)
    },
    loseCard (profile) {
      this.animateAs = 'dislike'
      this.showNextCard(profile.id)
    },
    showNextCard (id) {
      console.log('next card!')
      this.$emit('nextProfile', id)
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.card-holder {
  position: relative;
}

.card-holder .card:not(:last-of-type) {
  z-index: -1;
  position: absolute;
  top: 0;
}

.card-holder .card:last-of-type {
  z-index: 1;
  position: absolute;
  top: 0px;
}

.card-holder .card {
  box-sizing: border-box;
  width: calc(100% - 20px);
}

.dislike-leave-active {
  animation: to-left 0.6s;
}

.like-leave-active {
  animation: to-right 0.6s;
}

.match-leave-active {
  animation: to-top 0.6s;
}


@keyframes to-left {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-300px, -200px) rotate(-45deg) scale(0.3);
    opacity: 0.3;
  }
}

@keyframes to-top {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0px, -800px) scale(0.3);
    opacity: 0.3;
  }
}


@keyframes to-right {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(300px, -200px) rotate(45deg) scale(0.3);
    opacity: 0.3;
  }
}
</style>
