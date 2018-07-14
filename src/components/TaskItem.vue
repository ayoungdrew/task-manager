<template>
  <div class="hello">
    <h2>I'm a task item</h2>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TaskItem',
  props: ['id', 'name', 'category_id'],
  data() {
    return {
      categories: '',
      tasks: '',
      msg: 'This is the task list component',
    };
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

/* li {
  display: inline-block;
  margin: 0 10px;
} */

a {
  color: #42b983;
  text-decoration: none;
}

.category-item {
  font-size: 22px;
  margin-bottom: 15px;
}

.task-item {
  font-size: 16px;
}
.strike {
  text-decoration: line-through;
}

</style>
