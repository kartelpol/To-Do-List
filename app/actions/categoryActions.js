export const addCategory = (name) => {
  return (dispatch) => dispatch({
    type: 'ADD_CATEGORY', 
    payload: {categories: {
    name: name,
    key: Date.now(),
    redact: false,
    newNest: false, 
    nests: [],
    displayNests: false,
    enable: false
    }}
  })
}


export const deleteCategory = (key, categories, tasks) => {
  let newCategories = deleteHelper(key, categories);
  let newTasks = deleteTasks(key, tasks);

  return(dispatch) => dispatch({
    type: 'DELETE_CATEGORY',
    payload: {newCategories, newTasks}
  })
}

function deleteTasks(key, tasks) {
  return tasks.filter((item) => {
    if(item.categoryId != key) 
      return item;
  })
}


function deleteHelper(key, categories) {
  return categories.filter((item) => {
    if(item.key != key) {
      if(item.nests.length) {
        item.nests = deleteHelper(key, item.nests)
      } 
      return item
    }
  });
}


export const setEditState = (key, categories) => {
  return(dispatch) => dispatch({
    type: 'SET_CATEGORY_EDIT_MODE',
    payload: setEditHelper(categories, key)
  })
} 


function setEditHelper(obj, key) {
  return obj.map((item) => {
    if (item.key == key) {
      item.redact = true;
      return item;
    } else if (item.nests.length != 0) {
      setEditHelper(item.nests, key);
      return item;
    } else return item;
  });
}



export const editCategory = (  key, categories, name) => {
  return(dispatch) => dispatch({
    type: 'RENAME_CATEGORY',
    payload: editCategoryHelper(categories, key, name)
  })
}
    
function editCategoryHelper(obj, key, name) {
  return obj.map((item) => {
    if (item.key == key) {
      item.redact = false;
      item.name = name;
        return item;
      } else if (item.nests.length != 0) {
        editCategoryHelper(item.nests);
        return item;
      } else return item;
    });
  }


