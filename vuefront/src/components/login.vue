<template>
    <div id="login">

        <!-- show if not logged in/not authenticated -->
        <div align="center" v-show="authenticated==''">
            <div class="mb-3" align="center">
                <div class="">
                    <label>Username
                        <input class="form-control" type="text" name="username" v-model="input.username" placeholder="Username" required/>
                    </label>
                </div>
                <div class="">
                    <label>Password
                        <input class="form-control" type="password" name="password" v-model="input.password" placeholder="Password" required/>
                    </label>
                </div>
            </div>
            <div class="btn-group btn-group-toggle">
                <button id="LoginButton" type="button" style="display:inline;margin-right:2px" class="btn" v-on:click="getUserInfo">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * @vue-data {string} authenticated - value that shows if user is logged in
     * @vue-data {string} username - user's verified username
     * @vue-data {string} password - user's verified password
     * @vue-methods {string} getUserInfo - gets username and password to be compaird with input data.
     */

    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                authenticated: '',
                verifiedAccount: {
                    username: '',
                    password: ''
                },
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        async mounted() {
            if (sessionStorage.getItem("authenticated")) {
                this.authenticated = sessionStorage.getItem("authenticated");
                window.console.log(this.authenticated);
            }
        },
        methods: {
            /**
            * Just a test function
            * @function
            */
            async getUserInfo() {
                if(this.input.username != "" && this.input.password != "") {
                    axios.get(`http://localhost:8081/api/logindata/?username=${this.input.username}&password=${this.input.password}`)
                        .then((response) => { 
                            window.console.log(response)
                            this.verifiedAccount.username = response.data[0].Username;
                            this.verifiedAccount.password = response.data[0].Password;
                            this.authenticated = this.input.username;
                            sessionStorage.setItem("authenticated", this.authenticated);
                            sessionStorage.setItem("login_id", response.data[0].User_ID);
                            this.emitTheThing()
                            window.console.log(response.data[0])
                            window.location.reload()
                        })
                        .catch((error) => {
                            // perus debuggausta
                            if(this.input.username != this.verifiedAccount.username || this.input.password != this.verifiedAccount.password) {
                                alert("The username and / or password is incorrect")
                            }
                            window.console.log("yhteys ei pelaa tunnuksella: " + this.input.username);
                            window.console.log(error)
                        })
                }
                else {
                    alert("A username and password must be present")
                }
            },
            logout() {
                this.authenticated = '';
                sessionStorage.clear();
                window.console.log("auntehnticated = empty!" + this.authenticated);
            },
            emitTheThing() {
                this.$emit('update:juttu', 'Jorma')
            },
            
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
</style>
