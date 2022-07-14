<template>
  <div class="container">
    <img src="https://i.imgur.com/xH3BMT6.png?1" class="h-12 w-12 m-auto"/>
    <Header title="log-log" /> 
    <!-- <Sales /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
// import Sales from './components/Sales'
export default {
  name: 'App',
  components: {
    Header,
    // Sales
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 85%;
  max-height: 85%;
  margin: 30px auto;
  overflow: auto;
  min-height: auto;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: rgb(1, 68, 149);
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
