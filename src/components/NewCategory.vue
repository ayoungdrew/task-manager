<template>
  <div class="hello">
    <form role="form" class="category-form" @submit.prevent="$emit('say-hello', newCategoryName)">
        <div class="form-group">
            <label>Category</label>
            <input type="text" class="form-control" name="category" v-model="newCategoryName">
        </div>

        <button type="submit" class="btn btn-primary">Add Category</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewCategory',
  data() {
    return {
      msg: 'This is the new category component',
      newCategoryName: ''
    };
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.btn {
  font-weight: bold;
}

</style>
