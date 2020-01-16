<template>
  <div class="profile-page">
      <input v-model="username_input" type="text">
      <button @click="findUser">Find user</button>
      <div v-if="userFound">
        <img id="profile-picture" :src="updateProfilePicture()" alt="">
        <h3>{{ this.username }}</h3>
        <FindProfileListenList :key="componentKey2" :passedId="userId" :passedUsername="username"/>
        <FindProfileCommentBox :key="componentKey" style="display:grid" :passedId="userId" 
          :passedUsername="username"/>
      </div>
  </div>
</template>

<script>
import FindProfileListenList from './FindProfileListenList.vue'
import FindProfileCommentBox from './FindProfileCommentBox.vue'

import axios from 'axios'
export default {
  name: 'FindProfile',
  components: {
    FindProfileListenList,
    FindProfileCommentBox,
  },
  props: ['passedUsername'],
  data: function() {
    return {
      username_input: '',
      username: '',
      componentKey: 0,
      componentKey2: 0,
      userId: Number,
      profilePicture: '',   //
      nowPlaying: '',       //
      userFound: false,
    }
  },
  methods: {
    // Gets JSON data from the Node backend
    async findUser() {
      this.username = this.username_input
      axios.get(`http://localhost:8081/api/logindata/?username=${this.username}`)
          .then((response) => {
            window.console.log(response.data)
            if (!response.data.length < 1) {
              this.userId = response.data.User_ID
              sessionStorage.setItem('IdToFind', response.data[0].User_ID)
              this.userFound = true
              this.getUserInfo()
              this.componentKey += 1
              this.componentKey2 += 1
            } else {
              alert('User not found')
            }
          })
          .catch((error) => {
              // perus debuggausta
              alert("Username is allready in use");
              window.console.log("yhteys ei pelaa tunnuksella: " + this.input.username);
              window.console.log(error)
          })
    },
    async getUserInfo() {
      axios.get(`http://localhost:8081/api/userdata/?username=${this.username}`)
        .then((response) => {
          this.profilePicture = response.data[0].Profile_picture
          this.userId = response.data[0].User_ID
          // TODO: Emit latest song to nowPlaying
          window.console.log(response.data[0])
        })
        .catch((error) => {
          window.console.log(error)
        })
      this.nowPlaying = '-'
      window.console.log(this.profilePicture)
    },
    updateProfilePicture() {
      /* return require('./res/' + this.profilePicture) */
      /* const pathToFile = './res/' + this.profilePicture */
      // Webpack(?) is not able to use a string made up from an expression (above), 
      // so we are forced to use a hardcoded string instead.
      const pathToFile = './res/Portrait_placeholder.png'
      return require(`${pathToFile}`)
    },
    async redoTheThing() {
      const DEF_DELAY = 1000;

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
      }

      await sleep(100);
      /* this.getUserInfo() */
    }
  },
  async created() {
    this.redoTheThing()
  },
  async mounted () {
    this.componentKey += 1
    this.userFound = false
    await this.$nextTick()
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#profile-picture {
  height: 6em;
  width: auto;
}
button {
  color: black;
}

input {
  color: black;
}

</style>
