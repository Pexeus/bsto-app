<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Expires" content="-1">
  </head>

  <Login v-if="!isLoggedIn.status" @loggedin="loggedin($event)"/>

  <Header v-if="isLoggedIn.status"/>
  <Search v-if="isLoggedIn.status" @newshow="openPlayer($event)"/>
  <Selection v-if="isLoggedIn.status" @newshow="openPlayer($event)"/>
  <Player v-if="isLoggedIn.status" :showID="showID"/>
  <Genres v-if="isLoggedIn.status"  @newshow="openPlayer($event)"/>
</template>

<script>

import Header from "./components/Header"
import Player from "./components/Player"
import Genres from './components/Genres'
import Search from "./components/Search"
import Login from "./components/Login"
import Selection from "./components/Selection"

import { reactive } from 'vue'

export default {
  name: 'App',
  components: {
    Login,
    Header,
    Player,
    Selection,
    Search,
    Genres
  },

  setup() {
    const showID = reactive({value: ""})
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

        console.log(decoded);
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
  --brightdark: #1a2735;
  --mid: #173750;
  --brightmid: #0099f91e;
  --bright: #009bf9;
  --white: #f1faff;
  --shadow: #0d151d;
  --lightshadow: #0f1924d8;
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


/* ICONS */
.gg-play-list-add {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1.2));
    width: 12px;
    height: 6px;
    border-top: 0 solid transparent;
    border-bottom: 2px solid transparent;
    box-shadow:
        inset 0 -2px 0,
        -2px 4px 0 -2px,
        0 -2px 0 0
}
.gg-play-list-add::after,
.gg-play-list-add::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 2px;
    background: currentColor;
    top: 6px;
    right: -8px
}
.gg-play-list-add::before {
    width: 2px;
    height: 10px;
    top: 2px;
    right: -4px
}

.gg-play-list-check {
    color: var(--bright);
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1.2));
    width: 12px;
    height: 6px;
    border-top: 0 solid transparent;
    border-bottom: 2px solid transparent;
    box-shadow:
        inset 0 -2px 0,
        -2px 4px 0 -2px,
        0 -2px 0 0
}
.gg-play-list-check::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 5px;
    height: 8px;
    border-right: 2px solid;
    border-bottom: 2px solid;
    transform: rotate(45deg);
    top: 2px;
    right: -4px
}

.gg-eye-alt {
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 24px;
    height: 18px;
    border-bottom-right-radius: 100px;
    border-bottom-left-radius: 100px;
    overflow: hidden;
    box-sizing: border-box
}
.gg-eye-alt::after,
.gg-eye-alt::before {
    content: "";
    display: block;
    border-radius: 100px;
    position: absolute;
    box-sizing: border-box
}
.gg-eye-alt::after {
    top: 2px;
    box-shadow:
        inset 0 -8px 0 2px,
        inset 0 0 0 2px;
    width: 24px;
    height: 24px
}
.gg-eye-alt::before {
    width: 8px;
    height: 8px;
    border: 2px solid transparent;
    box-shadow:
        inset 0 0 0 6px,
        0 0 0 4px,
        6px 0 0 0,
        -6px 0 0 0 ;
    bottom: 4px;
    left: 8px
}

.gg-smile-sad {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 20px;
    height: 20px;
    border: 2px solid;
    border-radius: 100px
}
.gg-smile-sad::after,
.gg-smile-sad::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 4px
}
.gg-smile-sad::before {
    background: currentColor;
    box-shadow: 6px 0 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    top: 5px
}
.gg-smile-sad::after {
    width: 8px;
    height: 4px;
    border-radius: 150px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: 2px solid;
    border-top-color: transparent;
    top: 9px;
    transform: scaleY(-1)
}

</style>
