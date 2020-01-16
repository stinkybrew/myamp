<template>
  <div class="user-listen-list">
    <table>
      <tr>
        <th>Title</th>
        <th>Album</th>
        <th>Artist</th>
        <th>Timestamp</th>
      </tr>
      <tr v-for="song in songs" :key="song.Listen_ID">
        <td>{{ song.Title }}</td>
        <td>{{ song.Album }}</td>
        <td>{{ song.Artist }}</td>
        <td>{{ formatDate(song.Listen_timestamp) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'FindProfileListenList',
  props: 
    ['passedUsername', 'passedId'],
  data: function() {
    return {
      username: '',     // Userame to inject in to the GET request URL
      songs: [],        // List of songs returned by the GET request
      searchquery: '',  // Query text from the test input field, to be removed later
      listen: {
        artist: '',
        album: '',
        title: '',
        userId: Number,
      }
    }
  },
  methods: {
    // Gets JSON data from the Node backend
    async getListens() {
      axios.get(`http://localhost:8081/api/?username=${this.passedUsername}`)
        .then((response) => {
          window.console.log(response)
          this.songs = response.data.reverse()
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    // To be used elsewhere, working base for post requests. Uses the Axios framework to simplify
    // writing HTTP requests.
    async addListen() {
        window.console.log(this.listen)
        axios.post('http://localhost:8081/api/addlisten/', this.listen)
        .then((response) => {
          this.getListens()
          window.console.log(response)
        }).catch((error) => {
          window.console.log(error)
        })
    },
    async deleteListen(id) {
      window.console.log(id)
      axios.delete(`http://localhost:8081/api/deletelisten/?listenId=${id}`)
        .then((response) => {
          this.getListens()
          window.console.log(response)
        }).catch((error) => {
          window.console.log(error)
        })
    },
    formatDate(datestring) {
      let tempDate = new Date(datestring)
      let options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit',
        minute: '2-digit', second: '2-digit'}
      return tempDate.toLocaleDateString('fi-FI', options)
    },
  },
  created() {
    this.listen.userId = sessionStorage.getItem('login_id')
    window.console.log(this.listen.userId)
    this.getListens()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-listen-list table {
  width: 100%;
  table-layout: fixed;
}

input {
  size: auto;
}

button {
  color: black;
}
</style>
