<template>
  <div id="app">
    <router-link class="logo" to="/"><img src="./assets/logo.png"></router-link>
    <div class="topnav" v-if="seekGender">
      <router-link to="/">search</router-link>
      <router-link to="/matches">matches</router-link>
      <router-link to="/setgender">settings</router-link>
    </div>
    <router-view
      @setGender="setGender"
      v-bind:seekGender="seekGender"
      :profiles="profilesQueue"
      @nextProfile="dropProfile"
      @match="saveMatch"
      :matches="matches"
      @loadMoreProfiles="fetchMoreProfiles"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    console.log('data creation in App')
    let gender = localStorage.getItem('seekGender') || null
    return {
      seekGender: gender,
      profilesToReact: {},
      profilesQueue: [],
      matches: []
    }
  },
  created () {
    this.fetchMoreProfiles(10)
  },
  methods: {
    setGender (gender) {
      console.log('App/setGender', gender)
      localStorage.setItem('seekGender', gender)
      this.seekGender = gender
      if (this.profilesQueue.length) {
        this.profilesQueue.splice(0)
        this.fetchMoreProfiles(3)
      }
      this.$router.push('/')
    },
    saveMatch (match) {
      this.matches.unshift(match)
    },
    dropProfile (id) {
      console.log('delete profile', id)
      this.$delete(this.profilesToReact, id)
      this.profilesQueue.pop()
      if (this.profilesQueue.length < 5) {
        this.fetchMoreProfiles(3)
      }
    },
    fetchMoreProfiles (howMany = 1) {
      let gender = ''
      if (this.seekGender) {
        gender = `gender=${this.seekGender}`
      }
      let url = `http://www.dragonsofmugloar.com/dating/api/profile/random?${gender}`
      console.log('url is', url)
      window.fetch(url)
        .then(r => r.json())
        .catch(e => console.log('network error', e))
        .then(server => {
          let profile = this.mapServerProfile(server)
          this.$set(this.profilesToReact, profile.id, profile)
          this.profilesQueue.unshift(profile)
        }).catch(e => console.error(e))
        .then(() => {
          if (howMany > 1) {
            this.fetchMoreProfiles(howMany - 1)
          }
        })
    },

    mapServerProfile (profile) {
      return {
        id: profile.id,
        pic: profile.image,
        name: profile.name,
        bio: profile.description,
        likesYou: profile.likesYou
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 10px;
}
.logo {
  display: block;
  text-align: center;
  margin-bottom: 5px;
}
.logo img {
  width: 32px;
  display: inline-block;
}
.loading {
  text-align: center;
  font-size: 3em;
  padding-top: 2em;
  animation: scale-a-little .5s infinite;
}

@keyframes scale-a-little {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  90% {
    transform: scale(1);
  }
}

.topnav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.topnav a {
  display: block;
  text-align: center;
  text-decoration: none;
}
</style>
