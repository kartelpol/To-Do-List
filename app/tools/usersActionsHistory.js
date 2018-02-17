import {cloneDeep} from 'lodash'


let history = [{categories: [], tasks: [], searchValue: ''}];
let currentPoint = 0;

export function addState(state){
  if(currentPoint != history.length-1) {
  	history.length = currentPoint+1;
  } 

  history.push(cloneDeep(state));
  currentPoint = history.length - 1;
  console.log('history', cloneDeep(state), history, currentPoint)	
}

export function undo() {
  if(currentPoint != 0) {
    currentPoint--;	
  }
     return history[currentPoint];
}

export function redo() {
  if(currentPoint < history.length - 1) {
    currentPoint++;
  }
  return history[currentPoint] 
}
