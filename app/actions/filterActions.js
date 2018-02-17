/*import activateTasks from 'tools/activateTasks'

export const setFilterAction = (id, done, searchValue, tasks) => {
  let activeTasks = activateTasks(id, tasks);
  console.log('filter', tasks);
  if(done){
    activeTasks = activeTasks.filter((item) => {
      if(item.done) {
        if(item.name.indexOf(searchValue) != -1) {
          return item;
        }
      }
    });   
  } else {
    activeTasks = activeTasks.filter((item) => {
      if(item.name.indexOf(searchValue) != -1) {
        return item;
      }
    }); 
  }
  console.log('active', activeTasks, tasks);
  return (dispatch) => dispatch({
  	type: 'FILTER_HANDLER',
  	payload: {activeTasks, searchValue}
  })  
}*/

export const setFilterAction = (searchValue) => ({
    type: 'FILTER_HANDLER',
    payload: searchValue
  });