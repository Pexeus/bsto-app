<template>
  <Login v-if="!isLoggedIn.status" @loggedin="loggedin($event)"/>

  <Header v-if="isLoggedIn.status"/>
  <Player v-if="isLoggedIn.status" :showID="showID"/>
  <Search v-if="isLoggedIn.status" @newshow="openPlayer($event)"/>
  <Genres v-if="isLoggedIn.status"  @newshow="openPlayer($event)"/>
</template>

<script>

import Header from "./components/Header"
import Player from "./components/Player"
import Genres from './components/Genres'
import Search from "./components/Search"
import Login from "./components/Login"

import { reactive } from 'vue'

export default {
  name: 'App',
  components: {
    Login,
    Header,
    Player,
    Search,
    Genres
  },

  setup() {
    const showID = reactive({value: "ddd"})
    const isLoggedIn = reactive({status:localStorage.jwt})

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
        // decoded token
      }
    }
    

    return {showID, openPlayer, loggedin, isLoggedIn}
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

:root {
  --dark: #15202b;
  --mid: #173750;
  --bright: #009bf9;
  --white: #f1faff;
  --shadow: #0d151d;
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
