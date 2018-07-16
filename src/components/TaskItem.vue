<template>
  <div>
    <li
    class="hello"
    :class="{ strike: status === 1 }"
    something="changeTaskStatus(id, status)"
    v-on:click="$emit('changeStatus')"
    ><a href="#">{{ name }} hmm {{ status }}</a>
  </li><slot></slot>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TaskItem',
  props: ['id', 'name', 'category_id', 'status'],
  data() {
    return {
      categories: '',
      tasks: '',
      msg: 'This is the task list component',
    };
  },
  created: function () {
    console.log('status is', this.status)
  },
  methods: {
    changeTaskStatus(taskId, taskStatus) {
      console.log('changing task status', taskId, taskStatus)
      const newStatus = taskStatus? 0 : 1
      axios.put('http://localhost:3000/tasks/' + taskId, {
        status: newStatus
      })
        .then((response) => {
          // this.loadCategories()
          console.log('response is', response)
          console.log('newStatus is', newStatus)
          this.status = newStatus
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
