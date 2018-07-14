<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li class="category-item" v-for="category in categories">
        {{ category.name }}
        <ul>
          <li class="task-item" v-for="task in tasks" v-if="task.category_id === category.id" :class="{ strike: task.status }">
            <a href="#">{{ task.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      categories: '',
      tasks: '',
      msg: 'This is the task list component',
    };
  },
  created: function () {
    this.loadCategories()
  },
  methods: {
    testMethod() {
      console.log('helloooo')
    },
    loadCategories() {
      console.log('hey')
      axios.get('http://localhost:3000/categories')
        .then((categories) => {
          console.log(categories)
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
          // $('.task').remove()
          // for (let i = 0; i < tasks.data.length; i++) {
          //     $('.category-' + tasks.data[i].category_id).append(
          //       '<li class="task" task-id="' + tasks.data[i].id + '" data-status="' + tasks.data[i].status + '"><a href="#">' + tasks.data[i].name + '</a></li>'
          //     )
          // }
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
