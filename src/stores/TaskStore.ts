import {defineStore} from 'pinia'

export const useTaskStore = defineStore('taskStore', {

    state: () => ({
        tasks: [
            {taskId: -1, taskName: "", taskStatus: "", taskStart: new Date(), taskEnd: new Date()}
        ]
    }),

    getters:
    {
        isNotStarted(): any
        {
            return this.tasks.filter(task => task.taskStatus === "Not Started");
        },

        isInProgress(): any
        {
            return this.tasks.filter(task => task.taskStatus === "In Progress");
        },

        isCompleted(): any
        {
            return this.tasks.filter(task => task.taskStatus === "Completed");
        }
    },

    actions: 
    {
        addTask(task)
        {
            this.tasks.push(task);
        },

        deleteTask(tempId: number)
        {
            const index = this.tasks.findIndex(task => task.taskId === tempId);

            if (index !== -1) 
            {
                this.tasks.splice(index, 1);
            }
        },

        editTask(tempTask)
        {
            this.tasks.forEach(task =>
                {
                    if(task.taskId === tempTask.taskId)
                    {
                        task.taskName = tempTask.taskName;
                        task.taskStatus = tempTask.taskStatus;
                        task.taskStart = new Date(tempTask.taskStart);
                        task.taskEnd = new Date(tempTask.taskEnd);
                    }
                }
            )
        },

        searchTasks(searchWord: string)
        {
            this.tasks.forEach(task => 
            {
        
                  const element = document.getElementById(task.taskId.toString());
        
                  if(element)
                  {
                    element.style.display = "";
                  }
        
        
                  if(!task.taskName.includes(searchWord))
                  {
                    const elem = document.getElementById(task.taskId.toString());
        
                    if(elem)
                    {
                      elem.style.display = "none";
                    }
        
                  }
            })
        },

        sortTasks(): void
        {
    
            this.tasks = this.tasks.sort((a, b) => {
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
})