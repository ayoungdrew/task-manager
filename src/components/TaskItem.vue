<template>
  <div>
    <li
    :class="{ strike: status === 1 }"
    something="changeTaskStatus(id, status)"
    v-on:click="$emit('changeStatus')"
    ><a href="#">{{ name }}</a>
  </li><slot></slot>
  </div>
</template>

<script>

export default {
  name: 'TaskItem',
  props: ['id', 'name', 'category_id', 'status'],
  data() {
    return {
      msg: 'This is the task list component',
    };
  },
  methods: {
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
