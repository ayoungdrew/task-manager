<template>
  <div class="hello">
    <task-list></task-list>
  </div>
</template>

<script>

import TaskList from '@/components/TaskList'
import NewCategory from '@/components/NewCategory'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    TaskList,
    NewCategory
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
