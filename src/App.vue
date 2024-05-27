<template>
  <header id="task-header" class="headers">
    <h1 id="task-heading" class="heading1">Task App</h1>
  </header>
  <br>
  <div id="task-form" class="divs">
    <div>
      <label id="task-name" class="labels" for="name-input">Name:</label>
      <input id="name-input" class="inputs" v-model="newTask.taskName"/>
    </div>

    <div>
      <label id="task-status" class="labels" for="status-input">Status:</label>
      <select id="status-input" class="inputs" v-model="newTask.taskStatus">
        <option id="not-started" class="status-options">Not Started</option>
        <option id="in-progress" class="status-options">In Progress</option>
        <option id="completed" class="status-options">Completed</option>
      </select>
    </div>

    <div>
      <label id="task-start" class="labels" for="start-input">Start:</label>
      <input id="start-input" class="inputs" type="datetime-local" v-model="newTask.taskStart"/>
    </div>

    <div>
      <label id="task-end" class="labels" for="end-input">End:</label>
      <input id="end-input" class="inputs" type="datetime-local" v-model="newTask.taskEnd"/>
    </div>

    <button id="task-btn" class="buttons" @click="saveTask()">{{ btnName }}</button>
  </div>

  <br>

  <div class="divs">

    <div id="settings">

      <div>
        <input id="search-field" class="inputs" placeholder="Enter Your Search Keyword..." v-model="searchKeyword"/>
        <button id="search-btn" class="buttons" @click="searchTasks()">Search</button>
      </div>

      <div>
        <select class="inputs" id="filter" @change="filterTasks()" v-model="filterKeyword">
          <option value="" disabled selected hidden>Filter by Status</option>
          <option>All</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button id="sort-btn" class="buttons" @click="sortTasks()">Sort by Name</button>
      </div>
    </div>

    <br>

    <div id="tasks">
      <table id="tasks-table" class="tables">
        <th id="nameHead" class="table-headings">Task Name</th>
        <th id="statusHead" class="table-headings">Task Status</th>
        <th id="startHead" class="table-headings">Task Start</th>
        <th id="endHead" class="table-headings">Task End</th>
        <th></th>
        <th></th>

        <tr clas="task-rows" v-for="task in tasks" :key="task.taskId" :id="task.taskId.toString()">
          <td>
            {{ task.taskName }}
          </td>
          <td>
            {{ task.taskStatus }}
          </td>
          <td>
            {{ new Date(task.taskStart).toLocaleString() }}
          </td>
          <td>
            {{ new Date(task.taskEnd).toLocaleString() }}
          </td>
          <td>
            <button id="edit-btn" class="buttons" @click="editTask(task.taskId)">Edit Task</button>
          </td>
          <td>
            <button id="delete-btn" class="buttons" @click="deleteTask(task.taskId)">Delete Task</button>
          </td>
        </tr>

      </table>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
  name: 'App',
  data(): {newTask: Task, tasks: Task[], btnName: string, currentTaskIndex: number, searchKeyword: string, filterKeyword: string} {
    return {
      newTask: {
        taskId: 0,
        taskName: "",
        taskStatus: "",
        taskStart: new Date(),
        taskEnd: new Date()
      },
      tasks: [],
      btnName: "Save Task",
      currentTaskIndex: -1,
      searchKeyword: "",
      filterKeyword: ""
    }
  },
  methods :
  {
    saveTask(): void
    {
      if(this.newTask.taskStart > this.newTask.taskEnd)
      {
        alert("End of Task should be after Start of Task");
        return;
      }

      if(this.currentTaskIndex === -1)
      {
        this.tasks.push(this.newTask);
        this.newTask.taskId++;
      }

      else
      {
        this.tasks[this.currentTaskIndex] = this.newTask;
      }

      this.currentTaskIndex = -1;
      this.btnName = "Save Task";

      this.newTask = {
        taskId: this.newTask.taskId,
        taskName: '',
        taskStatus: '',
        taskStart: new Date(),
        taskEnd: new Date()
      };
    },

    editTask(tempId: number): void
    {
      this.btnName = "Update Task";
      const index = this.tasks.findIndex(task => task.taskId === tempId);

      if (index !== -1)
      {
        this.newTask.taskName = this.tasks[index].taskName;
        this.newTask.taskStatus = this.tasks[index].taskStatus;
        this.newTask.taskStart = this.tasks[index].taskStart;
        this.newTask.taskEnd = this.tasks[index].taskEnd;
        this.currentTaskIndex = index;
      }
    },

    deleteTask(tempId: number): void
    {
      const index = this.tasks.findIndex(task => task.taskId === tempId);

      if (index !== -1) 
      {
        this.tasks.splice(index, 1);
      }

    },

    searchTasks(): void
    {
      this.tasks.forEach(task => 
        {

          var element = document.getElementById(task.taskId.toString());

          if(element)
          {
            element.style.display = "";
          }


          if(!task.taskName.includes(this.searchKeyword))
          {
            var elem = document.getElementById(task.taskId.toString());

            if(elem)
            {
              elem.style.display = "none";
            }

          }
        }
      );
    },

    filterTasks(): void
    {
      this.tasks.forEach(task => 
        {

          var element = document.getElementById(task.taskId.toString());

          if(element)
          {
            element.style.display = "";
          }


          if(task.taskStatus !== this.filterKeyword && this.filterKeyword !== "All")
          {
            var elem = document.getElementById(task.taskId.toString());

            if(elem)
            {
              elem.style.display = "none";
            }

          }
        }
      );
    },

    sortTasks(): void
    {

      this.tasks.sort((a, b) => {
      const nameA = a.taskName.toUpperCase();
      const nameB = b.taskName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
  });
          
    }
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

#tasks, #task-form
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

#search-field
{
  width: 220px;
  margin-right: 20px;
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

.tables
{
  background-color: white;
  width: 100%;
}

tr
{
  margin: 10px;
}

td
{
  text-align: center;
  padding-bottom: 10px;
}


</style>
