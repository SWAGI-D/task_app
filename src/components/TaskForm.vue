<template>

    <transition name="toast">
      <toast v-if="showToast">Start of Task should be after End of Task</toast>
    </transition>

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
import  ToastBox from './ToastBox.vue'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

let newTempTask: Task;

export default defineComponent({
    components: {
        'toast': ToastBox
    },
    created() 
    {

            EventBus.on('edit-task', (tempTask: any) => {
                this.editTask(tempTask);
            })
    },

        data(): {newTask: Task, btnName: string, showToast: boolean}
        {
            return {
              newTask:
              {
                taskId: 0, taskName: "", taskStatus: "", taskStart: new Date(), taskEnd: new Date()
              },

              btnName: "Save Task",
              showToast: false
            }
        },

        methods: {
          saveTask() {

            if(this.newTask.taskStart > this.newTask.taskEnd)
            {
              this.showToast = true;
              setTimeout(() => this.showToast = false, 3000)
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

.toast-enter-active {
    animation: wobble 0.5s ease;
  }
  
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  @keyframes wobble {
    0% { transform: translateY(-100px); opacity: 0 }
    50% { transform: translateY(0px); opacity: 1 }
    60% { transform: translateX(8px); opacity: 1 }
    70% { transform: translateX(-8px); opacity: 1 }
    80% { transform: translateX(4px); opacity: 1 }
    90% { transform: translateX(-4px); opacity: 1 }
    100% { transform: translateX(0px); opacity: 1 }
  }

</style>
