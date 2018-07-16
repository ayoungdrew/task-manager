<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <hr>
    <div class="row">
      <div class="col-md-6">
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
              <small style="font-style: italic; font-size: 16px;" v-show="isEmpty(category.id)">No tasks in this category yet :(</small>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <newCategory v-on:say-hello="addCategory"></newCategory>
        <newTask
          :categories="this.categories"
          v-on:say-hello="addTask"
        ></newTask>
      </div>
      <div class="col-md-12">
      <form role="form" class="task-form" @submit.prevent="deleteCompleted">
          <p><button type="submit" class="btn btn-danger">Remove Completed Tasks</button></p>
      </form>
      <form role="form" class="task-form" @submit="deleteEmptyCategories">
          <p><button type="submit" class="btn btn-danger">Remove Empty Categories</button></p>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TaskItem from '@/components/TaskItem'
import NewCategory from '@/components/NewCategory'
import NewTask from '@/components/NewTask'


export default {
  name: 'TaskList',
  data() {
    return {
      msg: 'Vue Task Manager ver. 2',
      categories: '',
      tasks: ''
    };
  },
  components: {
    TaskItem,
    NewCategory,
    NewTask
  },
  created: function () {
    console.log('yay happy to be here')
    this.loadCategories()
  },
  methods: {
    loadCategories() {
      axios.get('http://localhost:3000/categories')
        .then((response) => {
          this.categories = response.data
          console.log('local store of categories', this.categories)
        })
        .then(this.loadTasks)
        .catch(function (error) {
          console.log(error);
        });
    },
    loadTasks() {
      axios.get('http://localhost:3000/tasks')
        .then((response) => {
          this.tasks = response.data
          console.log('local store of tasks', this.tasks)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeTaskStatus(taskId, taskStatus) {
      console.log('hi! task id is', taskId, 'and status is', taskStatus)
      const newStatus = taskStatus? 0 : 1
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
    addCategory(newCategoryName) {
      console.log(newCategoryName)
      if (newCategoryName.length > 0) {
        axios.post('http://localhost:3000/categories', {
          name: newCategoryName,
        })
        .then((response) => {
          console.log('categories are', this.categories)
          console.log('this categories', this.categories)
          this.categories.push(response.data)
          console.log('response is', response);
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        alert('New category name must be at least one character.')
      }
    },
    addTask(newTaskName, newTaskCategory) {
      if (newTaskName.length > 0 && newTaskCategory) {
        axios.post('http://localhost:3000/tasks', {
          name: newTaskName,
          category_id: newTaskCategory,
          status: 0
        })
        .then((response) => {
          // this.loadCategories()
          console.log('this tasks are', this.tasks)
          console.log('response is', response)
          this.tasks.push(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        alert("Need values for Task name and Category!")
      }
    },
    deleteCompleted() {
      // console.log('removing completed')
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status === 1) {
          axios.delete('http://localhost:3000/tasks/' + this.tasks[i].id)
          .then((response) => {
            this.loadCategories()
            console.log('response is', response)
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    },
    deleteEmptyCategories() {
      console.log('removing empty categories')
      for (let i = 0; i < this.categories.length; i++) {
        console.log('checking index', i)
        if (!this.tasks.find(x => x.category_id === this.categories[i].id)) {
          console.log('result', this.categories[i].name, this.tasks.find(x => x.category_id === this.categories[i].id))
          console.log('deleting', this.categories[i].name)
          this.categories.splice(i, 1)
          // axios.delete('http://localhost:3000/categories/' + this.categories[i].id)
          // .then((response) => {
          //   // this.loadCategories()
          //   console.log('lets remove', this.categories[i])
          //   // this.categories.splice(i,1)
          //   console.log('response is', response)
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
        } else {
          console.log(this.categories[i].name, 'has tasks')
        }
      }
      console.log('end of for loop')
    },
    logHello(taskId) {
      console.log('hello!!!', taskId)
    },
    isEmpty (categoryId) {
      const taskList = this.tasks
      return !taskList.find(x => x.category_id === categoryId)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
  text-decoration: none;
}

.btn {
  font-weight: bold;
}

.category-item {
  font-size: 22px;
  margin-bottom: 15px;
}

.task-item {
  font-size: 16px;
}

</style>
