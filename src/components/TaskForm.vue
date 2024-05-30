<template>
    <form>
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

      <button id="task-btn" class="buttons" @click.prevent="saveTask()">{{ btnName }}</button>
    </div>
  </form>

</template>

<script lang="ts">
import { useTaskStore } from '@/stores/TaskStore';
import { defineComponent, ref, watchEffect } from 'vue';
import EventBus from '../main'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

let newTempTask: Task;

export default defineComponent({

    created() 
    {

            EventBus.on('edit-task', (tempTask: any) => {
                this.editTask(tempTask);
            })
    },

        data(): {newTask: Task, btnName: string}
        {
            return {
              newTask:
              {
                taskId: 0, taskName: "", taskStatus: "", taskStart: new Date(), taskEnd: new Date()
              },

              btnName: "Save Task"
            }
        },

        methods: {
          saveTask() {

            if(this.newTask.taskStart > this.newTask.taskEnd)
            {
              alert("End of Task should be after Start of Task");
              return;
            }

            const taskStore = useTaskStore()

            if(this.newTask.taskId < taskStore.tasks.length)
            {
              taskStore.editTask(this.newTask);
            }

            else
            {
                taskStore.addTask({
                taskId: taskStore.tasks.length,
                taskName: this.newTask.taskName,
                taskStatus: this.newTask.taskStatus,
                taskStart: new Date(this.newTask.taskStart),
                taskEnd: new Date(this.newTask.taskEnd)
              })
            }

            this.newTask.taskId = taskStore.tasks.length
            this.newTask.taskName= ''
            this.newTask.taskStatus= ''
            this.newTask.taskStart= new Date()
            this.newTask.taskEnd= new Date()
          },

          editTask(tempTask: Task)
          {
              this.newTask.taskId = tempTask.taskId;
              this.newTask.taskName= tempTask.taskName;
              this.newTask.taskStatus= tempTask.taskStatus;
              this.newTask.taskStart= new Date(tempTask.taskStart);
              this.newTask.taskEnd= new Date(tempTask.taskEnd);

              this.btnName = "Update Task";
          }
        }
})
</script>

<style scoped>

#task-form
{
  display: flex;
  justify-content: space-around;
}

</style>
