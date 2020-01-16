<template>
<div id="app" @update:juttu="updateUsername">
    <div id="backwall">
        <div class="wrapper">
            <nav id="sidebar" class="bshadow">
                <div class="sidebar">
                    <div id="logo" >
                        <a href="#"><img src="./assets/logo_pieni.png" v-on:click="resetLogREg()" style="width:150px" alt="Logo"></a>
                    </div>
                    <ul class="list-unstyled components" id="navigation">
                        <li class="active">
                            <a href="#" v-on:click="resetLogREg()"><i class="fa fa-home"></i> Home </a>
                        </li>
                        <li>
                            <a href="#" @click="showSearchPage()"><i class="fa fa-search"></i> Search</a>
                        </li>
                        <li>
                            <a href="#" @click="showAboutPage"><i class="fa fa-info-circle"></i> About</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-comments"></i> Comments</a>
                        </li>
                        <li>
                            <a href="#" v-show="authenticated" @click="toggleProfilePage()"><i class="fa fa-user"></i> Profile</a>
                        </li>
                        <li>
                            <a href="#" v-show="authenticated" @click="logout()"><i class="fa fa-sign-out"></i> Logout</a>
                        </li>
                        <br><br>
                        <div v-show="authenticated==''">
                            <div v-show="register==false">
                                <li>
                                    <a href="#" v-show="loggingin==false" v-on:click="logginginPervent; showLoginPage()"><i class="fa fa-user" ></i> Login</a>
                                </li>
                                <li>
                                    <p class="h4" v-show="loggingin==false"><font color="#fff1c1">or</font></p>
                                </li>
                                <li>
                                    <a href="#" v-show="loggingin==false" v-on:click="registerPervent; showRegisterPage();"><i class="fa fa-register"></i> Register</a>
                                </li>
                            </div>
                        </div>
            
                        <br>
                        <div class="w3-section alert alert-secondary h4">
                            <select name="mood">
                                <option class="list-group-item list-group-item-danger" value="">Your Mood</option>
                                <option class="list-group-item" value="man">happy</option>
                                <option class="list-group-item" value="man">flat</option>
                                <option class="list-group-item" value="man">sad</option>
                                <option class="list-group-item" value="man">Dunno</option>
                            </select>
                        </div>

                    </ul>
                </div>
            </nav>
        
            <div id="page-content">
            <!--
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">

                    </div>
                    </nav> -->

                <div id="top-info" >
                    <button type="button" id="toggleSidebar" class=" btn floatLeft" style="background-color: transparent;margin-top:5px">
                        <i style='font-size:32px' class="fa fa-list"></i>
                    </button>
                    <p>Simply for your liking</p>
                    <div v-show="authenticated!=''">
                        <h3 style="margin-right:40px" id="top-user">{{ authenticated }}</h3><a id="top-user" @click="toggleProfilePage()" href="#"> <i class="fa fa-user"></i></a>
                    </div>
                    <div class="dropdown">
                        <a id="top-five" href="#"><i class="fa fa-html5"></i></a>
                        <div class="dropdown-content">
                            <p class="biggertext">Top 5 songs</p>
                            <p>1.Song</p>
                            <p>2.Song</p>
                            <p>3.Song</p>
                            <p>4.Song</p>
                            <p>5.Song</p>
                        </div>
                    </div>
                </div>

                <section id="home">
                <div v-if="authenticated!=''"><component :is="homeComponent"></component></div>
                <div v-show="authenticated==''"><component :is="homeComponent"></component></div>
                </section>
                <section id="tracklist">
                    <p id="biggertext">Top 5 songs</p>
                    <carousel/>
                    <!--<p>1.Song</p>
                    <p>2.Song</p>
                    <p>3.Song</p>
                    <p>4.Song</p>
                    <p>5.Song</p> -->
                </section>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ProfilePage from './components/ProfilePage.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import HomePage from './components/HomePage.vue'
import carousel from './components/carousel.vue'
import FindProfile from './components/FindProfile.vue'
import AboutPage from './components/AboutPage.vue'

export default {
  name: 'app',
  components: {
    AboutPage,
    ProfilePage,
    login,
    register,
    HomePage,
    carousel,
    FindProfile,
  },
  data() {
    return {
      homeComponent: 'HomePage',
      authenticated: '',
      loggingin: false,
      register: false,
      pPage: false,
      findPage: false,
      username: '',
    }
  },
/*  async mounted() {
      if (sessionStorage.getItem("authenticated")) {
          this.authenticated = sessionStorage.getItem("authenticated");
          window.console.log(this.authenticated);
      }
  }, */
  methods: {
       /* update: async function () {
            if (sessionStorage.getItem("authenticated")) {
                this.authenticated = sessionStorage.getItem("authenticated");
                window.console.log(this.authenticated);
                this.$nextTick(function () {window.console.log(this.authenticated);})
            }
        },*/
      setAuth() {
        if (sessionStorage.getItem("authenticated")) {
            this.authenticated = sessionStorage.getItem("authenticated");
            window.console.log(this.authenticated);
        }
      },
      logginginPervent(event) {
        event.preventDefault()
        this.loggingin = this.loggingin ? false : true;
        },
      registerPervent(event) {
        event.preventDefault()
        this.register = this.register ? false : true;
        },
      resetLogREg() {
        this.homeComponent = 'HomePage'
        this.loggingin = false;
        this.register = false;
        this.pPage = false;
        },
      showSearchPage() {
        this.homeComponent = 'FindProfile'
        this.findPage = true
      },
      showRegisterPage() {
        this.homeComponent = 'register'
      },
      updateUsername: function (newUsername) {
        window.console.log(newUsername)
        this.username = newUsername
      },
    showLoginPage() {
      this.homeComponent = 'login'
    },
    showAboutPage() {
      this.homeComponent = 'AboutPage'
    },
      toggleProfilePage() {
        /* if (this.pPage) { */
        /*   this.pPage = false */
        /* } else { */
        /*   this.pPage = true */
        /* } */
        this.homeComponent = 'ProfilePage'
      },
      logout() {
        this.authenticated = '';
        sessionStorage.clear();
        this.homeComponent = 'HomePage'
        window.console.log("authenticated = empty!" + this.authenticated);
    },
  },
  mounted() {
      if (sessionStorage.getItem("authenticated")) {
          this.authenticated = sessionStorage.getItem("authenticated");
          window.console.log(this.authenticated);
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: auto;
  /* margin-top: 60px; */
}
body{
    font-family: 'Calistoga', cursive;
}
/*
Navigation bar
 */
.wrapper{
    display: flex;
    align-items: stretch;
}

.sidebar{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}

#sidebar{
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
    background-color: #293462;
}

#sidebar.active{
    margin-left: -250px;
}

li a{
    display: block;
    color: #fff1c1;
    padding: 8px 16px;
    text-decoration: none;
    text-align: center;
    font-size: 25px;
}

li a:hover{
    background-color: #293462;
    color: #EE5757;
}

#logo{
    padding: 30px;
}

#ex1 {
    display: inline;
}

@media (max-width: 768px){
    #sidebar{
        margin-left: -250px;
    }
    #sidebar.active{
        margin-left: 0;
    }
    #ex1 {
        display: disabled;
    }
}

@media only screen and (max-width: 768px){

    #sidebar{
        padding-top: 185px;
    }
    #toggleSidebar{
        display: block!important;
    }
}

@media screen and (max-width:485px){
    #sidebar{
        padding-top: 247px;
    }
}

@media screen and (max-width: 505px) {
    .values{
        height: 350px;
    }
}

@media screen and (min-width: 505px) {
    .values{
        height: 250px;
        padding-top: 20px;
    }
}

@media screen and (max-width:1065px){
    #tracklist{
        display: none;
    }
    #top-five{
        display: block!important;
    }
    #home{
        width: auto;
        float: right;
        margin: 40px;
    }
}

@media screen and (min-width: 1065px){
    #home{
        width: 70%;
        float: left;
        margin: 40px 0 40px 40px;
    }
}

/**
Home page content
*/
#home{
    font-size: 15px;
    border: 1px #EE5757;
    border-radius: 25px;
    background: #EE5757;
    color: white;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.61), 0 6px 20px 0 rgba(0, 0, 0, 0.68);
}

#tracklist{
    font-size: 20px;
    border: 1px #EE5757;
    width: 20%;
    border-radius: 25px;
    background: #EE5757;
    color: white;
    float: right;
    margin: 40px 20px 40px 20px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.61), 0 6px 20px 0 rgba(0, 0, 0, 0.68);
    text-align: center;
}

#biggertext{
    font-size: 30px;
    text-transform: uppercase;
}

#top-info{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #293462;
    color: white;
    font-size: 40px;
    padding: 40px 40px 40px 40px;
}

#top-user{
    position: absolute;
    right: 60px;
    bottom: 0;
    padding-left: 30px;
    color: white;
}

#top-five{
    position: absolute;
    right: 0;
    bottom: 0;
    color: white;
    display: none;
}

.dropdown-content{
    display: none;
    position: absolute;
    right: 0;
    font-size: 20px;
    border: 1px #EE5757;
    border-radius: 20px;
    background: #EE5757;
    color: white;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.61), 0 6px 20px 0 rgba(0, 0, 0, 0.68);
    text-align: center;
    overflow: hidden;
}

.dropdown:hover .dropdown-content{
    display: block;
}

#top-info a:hover{
    color: #EE5757;
}

#toggleSidebar{
    display: none;
    color: #fff1c1;
}
#toggleSidebar i:hover {
    background-color: #293462;
    color: #EE5757;
}

#centeredtext{
    text-align: center;
    font-size: 25px;
}

#value1{
    border-bottom: 1px solid white;
    border-right: 1px solid white;
}

#value2{
    border-left: 1px solid white;
    border-bottom: 1px solid white;
}

#value3{
    border-top: 1px solid white;
    border-right: 1px  solid white;
}

#value4{
    border-top: 1px solid white;
    border-left: 1px solid white;
}

.values{
    width: 48%;
    text-align: center;
    font-size: 20px;
    float: left;
    padding: 20px 10px 10px;
    white-space: normal;
    overflow: hidden;
}

#backwall {
    background: linear-gradient(to bottom, #293462 0%, #216583 45%, #f76262 75%, #fff1c1 100%)
}

#page-content {
    width: 100%;
}
.bshadow {
    box-shadow: 8px 18px 25px -9px rgba(0,0,0,0.75);
}
.bshadowIn {
    box-shadow: inset 0px -12px 18px -10px rgba(0,0,0,0.75)
}
.floatLeft {
    float: left;
}
</style>
