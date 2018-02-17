export const addTask = (name, category) => ({
    type: 'ADD_TASK',
    payload: { tasks: {
      name: name,
      categoryId: category,
      id: Date.now(),
      done: false,
      description: ''
    }}
  })

export const setCompleteness = (id, value) => ({
  type: 'CHANGE_TASK_COMPLETENESS', 
  payload: {id, value}
})

export const editTask = (id, name, description, done, tasks) => {
  tasks = tasks.filter((item) => {
    if(item.id == id) {
      item.name = name;
      item.done = done;
      item.description = description;
    }
    return item;
  });
  return (dispatch) => dispatch({
  	type: 'EDIT_TASK',
    payload: tasks
  })
}


export const moveTask = (category, id, tasks) => {
  tasks = tasks.filter((item) => {
    if(item.id == id) {
      item.categoryId = category;
    }
    return item;
  });

  return (dispatch) => dispatch({
    type: 'CHANGE_CATEGORY',
    payload: tasks
  })
}