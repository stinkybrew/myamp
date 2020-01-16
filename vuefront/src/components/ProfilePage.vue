<template>
  <div class="profile-page">
      <img id="profile-picture" :src="updateProfilePicture()" alt="">
      <h3>{{ this.username }}</h3>
      <UserListenList :key="componentKey2" :passedId="userId" :passedUsername="username"/>
      <ProfileCommentBox :key="componentKey" style="display:grid" :passedId="userId" 
        :passedUsername="passedUsername"/>
  </div>
</template>

<script>
import UserListenList from './UserListenList.vue'
import ProfileCommentBox from './ProfileCommentBox.vue'

import axios from 'axios'
export default {
  name: 'ProfilePage',
  components: {
    UserListenList,
    ProfileCommentBox,
  },
  props: ['passedUsername'],
  data: function() {
    return {
      username: '',
      componentKey: 9,
      componentKey2: 0,
      userId: Number,
      profilePicture: '',   //
      nowPlaying: '',       //
    }
  },
  methods: {
    // Gets JSON data from the Node backend
    async getUserInfo() {
      axios.get(`http://localhost:8081/api/userdata/?username=${sessionStorage.getItem('authenticated')}`)
        .then((response) => {
          this.profilePicture = response.data[0].Profile_picture
          this.userId = response.data[0].User_ID
          this.username = sessionStorage.getItem('authenticated')
          this.componentKey2 += 1
          window.console.log('---------------')
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
      /* const DEF_DELAY = 1000; */

      /* function sleep(ms) { */
      /*   return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY)); */
      /* } */

      /* await sleep(100); */
      this.getUserInfo()
    }
  },
  async created() {
    this.redoTheThing()
  },
  async mounted () {
    this.componentKey += 1
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

</style>
