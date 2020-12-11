<template>
  <Login v-if="!isLoggedIn.status" @loggedin="loggedin($event)"/>


  <User v-if="userpageActive.status && isLoggedIn.status" @userpageclosed="setUserPageObj($event)"/>

  
  <Loader v-if="!contentLoaded.status"/>

  <Header v-if="isLoggedIn.status && contentLoaded.status" @userpageactive="setUserPageObj($event)"/>
  <Search v-if="isLoggedIn.status && contentLoaded.status" @newshow="openPlayer($event)"/>
  <Quickbar v-if="isLoggedIn.status" @newshow="openPlayer($event)" @contentloaded="loadContent($event)" :update="updateComponents"/>
  <Selection v-if="isLoggedIn.status && contentLoaded.status" @newshow="openPlayer($event)" :update="updateComponents"/>
  <Player v-if="isLoggedIn.status && contentLoaded.status" :showID="showID" @player-updated="reFetch()"/>
  <Genres v-if="isLoggedIn.status && contentLoaded.status"  @newshow="openPlayer($event)"/>
</template>

<script>

import Header from "./components/Header"
import Player from "./components/Player"
import Genres from './components/Genres'
import Search from "./components/Search"
import Login from "./components/Login"
import Selection from "./components/Selection"
import User from "./components/User"
import Quickbar from "./components/Quickbar"
import Loader from "./components/Loader"

import { reactive } from 'vue'

export default {
  name: 'App',
  components: {
    Login,
    Header,
    User,
    Player,
    Selection,
    Search,
    Genres,
    Quickbar,
    Loader
  },

  setup() {
    const showID = reactive({value: ""})
    const isLoggedIn = reactive({status:localStorage.jwt})
    const userpageActive = reactive({status: false})
    const contentLoaded = reactive({status:false})
    const updateComponents = reactive({value: 0})

    function openPlayer(id) {
      showID.value = id
    }

    function decodeToken(token) {
      let payload = token.replace(/-/g, '+').replace(/_/g, '/').split('.')[1]
      payload = JSON.parse(Buffer.from(payload, 'base64').toString())
      return payload
    }

    function loggedin(token) {
      if(token) {
        isLoggedIn.status = true
        let decoded = decodeToken(token)

        console.log(decoded);
        // decoded token
      }
    }

    loggedin(localStorage.jwt)

    function setUserPageObj(e) {
      userpageActive.status = e.status
    }

    function loadContent(e) {
      contentLoaded.status = true
    }

    function reFetch() {
      console.log("refetching now");
      updateComponents.value = Math.random()
    }

    return {reFetch, updateComponents, loadContent, showID, openPlayer, loggedin, isLoggedIn, setUserPageObj, userpageActive, contentLoaded}
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto;
  border-collapse: collapse;
  transition: ease-in-out .3s;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  color: var(--white);
  outline: none;
}

html {
  width: 100%;
  overflow-x: hidden;
}

:root {
  --dark: #15202b;
  --brightdark: #1a2735;
  --mid: #173750;
  --brightmid: #0099f91e;
  --bright: #009bf9;
  --brightLight:#0099f980;
  --white: #f1faff;
  --shadow: #0d151d;
  --lightshadow: #0f1924d8;
}

/* hide swipers on touch devices */
@media (hover: none) and (pointer: coarse) {
  .swipeWrapper {
    display: none;
  }
}

*::-webkit-scrollbar {
  display: none;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--white);
  opacity: .4; /* Firefox */
  font-weight: 300;
}

body {
  background-color: var(--dark);
}
</style>
