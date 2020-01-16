<template>
    <div id="register">
        <div class="mb-3" align="center">
            <h2 class="">Register page</h2>
            <div class="">
                <label>Username
                    <input class="form-control" type="text" name="username" v-model="input.username" placeholder="Username" required/>
                </label>
            </div>
            <div class=" ">
                <label>Password (Min 8 marks)
                    <input class="form-control" v-model="input.password" type="password" pattern="[a-z0-9._%+-]" minlength="8" name="password" placeholder="Password" required>
                </label>
            </div>                   
            <div class="">
                <label>Repeat password
                    <input class="form-control" v-model="input.passwordRepeat" type="password" pattern="[a-z0-9._%+-]" minlength="8" name="psw-repeat" placeholder="Password" required>
                </label>
            </div>
            <div class="btn-group btn-group-toggle">
                <button type="button" style="display:inline;margin-right:2px" class="btn" @click="getUserInfo()">Register</button>
            </div>
        </div>    
        <br>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Register',
        data() {
            return {
                verifiedAccount: {
                    username: '',
                    password: ''
                },
                input: {
                    username: '',
                    password: '',
                    passwordRepeat: ''
                }
            }
        },
        methods: {
            // Gets JSON data from the Node backend
            getUserInfo() {
              if (this.input.password != this.input.passwordRepeat) {
                alert('Passwords do not match')
              } else if (this.input.username != "" && this.input.password != "") {
                    axios.get(`http://localhost:8081/api/logindata/?username=${this.input.username}`)
                        .then((response) => {
                            window.console.log(response.data.length)
                          if (response.data.length < 1) {
                            const user = {
                              username: this.input.username,
                              password: this.input.password,
                            }
                            axios.post(`http://localhost:8081/api/register/`, user)
                            alert('Registered successfully, you may now log in using your credentials')
                            window.location.reload()
                          } else {
                            alert('Username aleady in use')
                          }
                        })
                        .catch((error) => {
                            // perus debuggausta
                            alert("Username is allready in use");
                            window.console.log("yhteys ei pelaa tunnuksella: " + this.input.username);
                            window.console.log(error)
                        })
                     

                }
            },
            register() {
               // axios.post(`http://localhost:8081/api/register/?username=${this.input.username}&password=${this.input.password}`)
            }
        }
    }

</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
    .lev {
        padding: 50px;
    }
</style>
