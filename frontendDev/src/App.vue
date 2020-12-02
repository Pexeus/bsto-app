<template>
  <Search/>
  <Genres/>
</template>

<script>
import Genres from './components/Genres'
import Search from "./components/Search"

export default {
  name: 'App',
  components: {
    Search,
    Genres
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
