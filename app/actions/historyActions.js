export const undo = () => { 
  return (dispatch) => dispatch({
  	type: 'UNDO'
  })
}

export const redo = () => { 
  return (dispatch) => dispatch({
  	type: 'REDO'
  })
}