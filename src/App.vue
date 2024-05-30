<template>
  <header id="task-header" class="headers">
    <h1 id="task-heading" class="heading1">Task App</h1>
  </header>

  <task-form/>

  <br>
  <br>

  <task-list/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue'
import {useTaskStore} from './stores/TaskStore'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
  setup()
  {
      const taskStore = useTaskStore()

      return {taskStore}
  },
  name: 'App',
  components:
  {
    'task-form': TaskForm,
    'task-list': TaskList
  }
});
</script>

<style>


#app
{
  font-family: Georgia, 'Times New Roman', Times, serif;
}

body
{
  background-color:lavenderblush;
}

.headers
{
  background-color: cadetblue;
  height: 100px;
  display:flex;
  align-items: center;
  justify-content: center;
}

.heading1
{
  color: aliceblue;
}

.divs
{
  background-color:aliceblue;
  padding: 50px;
  box-shadow: 0 0 5px 0 rgba(0, 0 , 0, 0.5);
  /**shadow */
}

.labels
{
  font-size: large;
  font-weight: bold;
  margin-top: 8px;
}

.inputs
{
  padding: 5px 5px;
  margin-left: 10px;
  font-size: medium;
}

.buttons
{
  background-color: cadetblue;
  color: aliceblue;
  font-size: medium;
  padding: 10px 10px;
  border: none;
  margin-top: -5px;
}

</style>
