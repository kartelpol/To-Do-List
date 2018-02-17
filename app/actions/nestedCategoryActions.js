import customizeCategory from 'tools/customizeCategory'

export const addNest = (key, category) => {
  return (dispatch) => dispatch({
    type: 'SET_ADD_NEST_MODE',
    payload: customizeCategory(category, key, 'newNest', true)
  })
}


export const saveNest = (key, category, name) => {
  return (dispatch) => dispatch({
  	type: 'SAVE_NESTED_CATEGORY',
  	payload: saveNestHelper( key, category, name)
  })
}

function saveNestHelper( key, category, name) {
  return category.map((item) => {
    if (item.key == key) {
      item.newNest = false; 
      item.nests.push({ 
        name: name, 
        key: Date.now(), 
        redact: false, 
        newNest: false, 
        nests: [],
        displayNests: false, 
        enable: false
      });
      return item;
    } else if (item.nests.length != 0) {
      saveNestHelper(key, item.nests, name);
      return item;
    } else return item;
  });
}


export const displayNest = (key, val, category) =>{
  return (dispatch) => dispatch({
    type: 'DISPLAY_NESTED_CATEGORIES',
    payload: displayNestHelper( category, key, val)
  })
  
} 

function displayNestHelper(obj, key, val) {
  return obj.map((item) => {
    if (item.key == key) {
      item.displayNests = val; 
      return item;
    } else if (item.nests.length != 0) {
      displayNestHelper(item.nests, key, val);
      return item;
    } else return item;
  });
}
