<template>
  <div class="hello">
    <form role="form" class="task-form" @submit.prevent="$emit('say-hello', newTaskName, newTaskCategory)">
        <div class="form-group">
            <label>Task</label>
            <input type="text" class="form-control" name="task" v-model="newTaskName">
        </div>

        <div class="form-group">
            <label>Category</label>
            <select id="categories" class="form-control" name="category" v-model="newTaskCategory">
              <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>
        </div>

        <p><button type="submit" class="btn btn-primary">Add Task</button></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewTask',
  props: ['categories'],
  data() {
    return {
      msg: 'This is the new task component',
      newTaskName: '',
      newTaskCategory: ''
    };
  },
  methods: {
    addTask() {
      console.log(this.newTaskName, this.newTaskCategory)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.btn {
  font-weight: bold;
}

</style>
