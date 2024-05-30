<template>
   <td> {{ taskElem.taskName }} </td>
    <td>{{ taskElem.taskStatus }} </td>
    <td> {{ new Date(taskElem.taskStart).toLocaleString() }} </td>
    <td> {{ new Date(taskElem.taskEnd).toLocaleString() }} </td>
    <td> <button id="edit-btn" class="buttons" @click="editTask(taskElem)">Edit Task</button> </td>
    <td> <button id="delete-btn" class="buttons" @click="taskStore.deleteTask(taskElem.taskId)">Delete Task</button> </td>
</template>

<script>
import { useTaskStore } from '@/stores/TaskStore';
import { defineComponent} from 'vue';
import EventBus from '../main'

export default defineComponent({
    props: ["taskElem"],
    setup()
    {
        const taskStore = useTaskStore()

        const editTask = (taskElem) => 
        {
            EventBus.emit('edit-task',taskElem)
        }

        return {taskStore, editTask}
    }

})
</script>

<style scoped>

td
{
  text-align: center;
  padding-bottom: 10px;
}

</style>