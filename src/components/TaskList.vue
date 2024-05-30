<template>

<div class="divs">

<div id="settings">

  <div>
    <input id="search-field" class="inputs" placeholder="Enter Your Search Keyword..." v-model="searchKeyword"/>
    <button id="search-btn" class="buttons" @click.prevent="taskStore.searchTasks(searchKeyword)">Search</button>
  </div>

  <div>
    <select class="inputs" id="filter" @change="filterTasks()" v-model="filterKeyword">
      <option value="" disabled selected hidden>Filter by Status</option>
      <option>All</option>
      <option>Not Started</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>

    <button id="sort-btn" class="buttons" @click.prevent="taskStore.sortTasks">Sort by Name</button>
  </div>
</div>

<br>
      <div id="tasks">
        <table id="tasks-table" class="tables">
          <thead>
            <th id="nameHead" class="table-headings">Task Name</th>
            <th id="statusHead" class="table-headings">Task Status</th>
            <th id="startHead" class="table-headings">Task Start</th>
            <th id="endHead" class="table-headings">Task End</th>
            <th></th>
            <th></th>
        </thead>

          <br>

          <!-- <tr></tr> -->

          <tbody v-if="filter === 'all'">
            <tr class="task-rows" v-for="task in taskStore.tasks" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
          </tbody>
          

          <tbody v-if="filter === 'not-started'">
            <tr class="task-rows" v-for="task in taskStore.isNotStarted" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
          </tbody>

          <tbody v-if="filter === 'in-progress'">
            <tr class="task-rows" v-for="task in taskStore.isInProgress" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
          </tbody>

          <tbody v-if="filter === 'completed'">
            <tr class="task-rows" v-for="task in taskStore.isCompleted" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
          </tbody>

        </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
import {useTaskStore} from '../stores/TaskStore'
import TaskDetails from './TaskDetails.vue'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
    setup() {
      const taskStore = useTaskStore()

      taskStore.tasks.forEach((task: Task, index) => 
      {
        if(task.taskId === -1)
        {
          taskStore.tasks.splice(index, 1)
        }
      })

      const filter = ref('all')

      return {taskStore, filter}
    },
    components:
    {
      'task-details': TaskDetails
    },
    data() {
         return {
          filterKeyword: '',
          searchKeyword: ''
         }
      },
    methods: 
    {

        filterTasks(): void
        {
          if(this.filterKeyword === "Not Started")
          {
            this.filter = 'not-started'
          }

          else if(this.filterKeyword === "In Progress")
          {
            this.filter = 'in-progress'
          }

          else if(this.filterKeyword === "Completed")
          {
            this.filter = 'completed'
          }

          else
          {
            this.filter = 'all'
          }


        }
    }
})
</script>

<style scoped>
#tasks
{
  display: flex;
  justify-content: space-around;
}

#settings
{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#filter
{
  margin-right: 20px;
}

#search-field
{
  width: 220px;
  margin-right: 20px;
}


.tables
{
  background-color: white;
  width: 100%;
}


</style>
