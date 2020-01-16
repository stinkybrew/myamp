<template>
  <div class="profile-comment-box">
    <div class="comment-compose">
      <div class="user-info">
        <h3 name="jees">{{ this.passedUsername }}</h3>
      </div>
      <div class="text-input">
        <input v-model="commentInput" type="text">
        <button @click="addComment()">Post comment</button>
      </div>
    </div>
    <table>
      <tr class="comment" v-for="comment in comments" :key="comment.uehtnouhento">
        <td>{{ comment.user }}</td>
        <td>{{ comment.text }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'ProfileCommentBox',
  components: {
  },
  props: ['passedUsername', 'passedId'],
  data: function() {
    return {
      comments: [],
      commentInput: '',
    }
  },
  methods: {
    // TODO: Pass the username from ProfilePage
    // TODO: Get commenter user data
    async getComments() {
      try {
        const response =
          await axios.get(`http://localhost:8081/api/comments/?username=${sessionStorage.getItem('login_id')}`)

        return response.data.reverse()
      } catch (e) {
        window.console.log(e)
      }
    },
    async getCommenterUsername(id) {
      try {
        const response = await axios.get(`http://localhost:8081/api/userdata/?id=${id}`)
        return response.data[0].Username
      } catch (e) {
        window.console.log(e)
      }
    },
    async addComment() {
      const jayson = {
        Comment_text: this.commentInput,
        Commenter_ID: this.passedId,
        User_ID: this.passedId,
      }
      const a = await axios.post('http://localhost:8081/api/comments/', jayson)
      window.console.log(a)

      const response = await this.getComments()

      const res = []
      for (let i = 0; i < response.length; ++i) {
        const text = response[i].Comment_text
        const user = await this.getCommenterUsername(response[i].Commenter_ID)
        res.push({ user, text })
      }

    this.comments = res
    },
  },
  async created() {
    const response = await this.getComments()

    const res = []
    const users = {}
    for (let i = 0; i < response.length; ++i) {
      const id   = response[i].Commenter_ID
      const text = response[i].Comment_text

      let user
      if (users[id]) {
        user = users[id]
      } else {
        user = await this.getCommenterUsername(response[i].Commenter_ID)
        users[id] = user
      }
      res.push({ user, text })
    }

    this.comments = res
  },
  async mounted () {
    await this.$nextTick()
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-compose {
  display: grid;
  /* grid-template-columns: 8em 100%; */
}

.comment {
  display: grid;
  grid-template-columns: 7em 100%;
}

.text-input input {
  size: 1;
  color: black;
}

button {
  color: black;
}
</style>
