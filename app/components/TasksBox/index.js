import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import TaskItem from 'components/TaskItem'
import {addTask} from 'actions/taskActions'

import { categorySearcher } from 'tools/categorySearcher'


const Root = styled.div `
  display: flex;
  flex-direction: column;
`;

const TaskCreating = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
  width: 85%;
  flex-shrink: 0;
`;

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 60vh;
`;


const InputTask = styled.input`
  border: 1px solid black;
`;

const AddButton = styled.button`
  background-color: green;
  color: white;
  border: 1px solid black;
  border-left: none;
  border-radius: 7%;
  padding: 3px;
  cursor: pointer;
`;

class TaskBox extends PureComponent {

  defineDoneMode = () => {
    let urlArr = this.props.location.pathname.split('/');
    let done;
    if(urlArr.indexOf('done') != -1 ) done = true;
    else done = false;
    return done;
  }

  handleTaskClick = () => {
    const input = document.getElementById('inputT');
    const key = this.props.match.params.key;

    if(this.taskInput.value.length && key && this.props.store.categories.length) {
      const category = categorySearcher(this.props.store.categories, key);
      if (category) {
        this.props.taskToStore(this.taskInput.value, key); 
        input.value = '';        
      } else {
      	alert('Choose existing category!');
      } 
    } else alert('Choose category, enter the task name and try again');
  }      


   taskFilter = () => {
    let key = this.props.match.params.key;
    let category = categorySearcher(this.props.store.categories, key);
    let  arr;
    if( category ) {
      if(this.defineDoneMode()) {
       arr = this.props.store.tasks.filter((item) => {
          if( item.categoryId == key && item.name.indexOf(this.props.store.searchValue) != -1) {
            return item
          }
        })
      } else arr = this.props.store.tasks.filter((item) => {
          if( !item.done && item.categoryId == key && item.name.indexOf(this.props.store.searchValue) != -1) {
            return item
          }
      })  
    }
    return arr;
}
  

  render() {
    console.log('taskbox',this.props.store);
    return (
      <Root>
        <TaskCreating>
          <InputTask id = 'inputT' innerRef = {(input) => { this.taskInput = input }} placeholder="Add task"></InputTask>
          <AddButton onClick = { this.handleTaskClick}>Add</AddButton>
        </TaskCreating>
        <Wrapper>
          { this.taskFilter() != undefined ?  
            this.taskFilter().map((item, index) => (
            <TaskItem>{item}</TaskItem>
          ))
          : <div style = {{color: 'grey'}}>No Tasks here</div> 
          }
        </Wrapper>

      </Root>
    )
  }
}

export default withRouter(connect(
    state => ({
    	store: state
    }),
    dispatch => ({

      taskToStore: (name, category) => {
        dispatch(addTask(name, category));
      }
    })
  )(TaskBox));

 


