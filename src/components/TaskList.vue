<template>
  <div class="hello">
    <task-item></task-item>
    <h1>{{ msg }}</h1>
    <ul>
      <li class="category-item" v-for="category in categories">
        {{ category.name }}
        <ul>
          <li
            class="task-item"
            v-for="task in tasks"
            v-if="task.category_id === category.id"
            v-on:click="changeTaskStatus(task.id, task.status)"
            :class="{ strike: task.status }">
            <a href="#">{{ task.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
    <hr>
    <ul>
      <li class="category-item" v-for="category in categories">
        {{ category.name }}
        <ul>
          <task-item :task="task"
            class="task-item"
            v-for="task in tasks"
            v-if="task.category_id === category.id"
            v-on:changeStatus="changeTaskStatus(task.id, task.status)"
            :id="task.id"
            :status="task.status"
            :name="task.name">
          </task-item>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import TaskItem from '@/components/TaskItem'

export default {
  name: 'TaskList',
  data() {
    return {
      categories: '',
      tasks: '',
      msg: 'This is the task list component',
    };
  },
  components: {
    TaskItem
  },
  created: function () {
    console.log('yay happy to be here')
    this.loadCategories()
  },
  methods: {
    loadCategories() {
      axios.get('http://localhost:3000/categories')
        .then((categories) => {
          this.categories = categories.data
          console.log('local store of categories', this.categories)
        })
        .then(this.loadTasks)
        .catch(function (error) {
          console.log(error);
        });
    },
    loadTasks() {
      axios.get('http://localhost:3000/tasks')
        .then((tasks) => {
          this.tasks = tasks.data
          console.log('local store of tasks', this.tasks)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeTaskStatus(taskId, taskStatus) {
      console.log('hi! changing task status', taskId, taskStatus)
      const newStatus = taskStatus? 0 : 1
      console.log('newStatus is', newStatus)
      axios.put('http://localhost:3000/tasks/' + taskId, {
        status: newStatus
      })
        .then((response) => {
          this.tasks.find(x => x.id === taskId).status = newStatus
          console.log('response is', response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    logHello(taskId, taskStatus) {
      console.log('hello!!!', taskId)
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
