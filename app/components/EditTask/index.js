import React, { PureComponent } from 'react'
import { Route, Link  } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {setCompleteness, editTask} from 'actions/taskActions'
import {setFilterAction} from 'actions/filterActions'

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 700px;
  border: 1px solid grey;
  padding-left: 20px;
`;

const ButtonsBox = styled.div `
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const Button = styled.button `
  cursor: pointer;
  margin-top: 25px;
  margin-right: 25px;  
  border: 1px solid black;
  border-radius: 5%;
`;

const DoneButton = styled.button `
  cursor: pointer;
`;

const TaskName = styled.input `
  margin-top: 50px;
  border: 1px solid black;
  width: 300px;
`;

const CompletenessWrapper = styled.div `
  margin-top: 20px;
  display: flex;
  width: 85px;
  justify-content: space-between;
`;

const TextArea = styled.textarea `
  margin-top: 50px;
  border: 1px solid black;
  width: 88%;
  height: 300px;
`;

class EditTask extends PureComponent {

  getExitURL = () => {
    let urlArray = this.props.match.url.split('/');
    urlArray.length = urlArray.length - 2;
    let newURL = urlArray.join('/');
    return newURL;    
  }

  getTask = () => {
    let urlArray = this.props.match.url.split('/');
    let id = urlArray[urlArray.length - 1];
    this.task = this.props.store.tasks.filter((item) => {
      if(item.id == id) {
        return item;
      } 
    });
    if(this.done == undefined) {
      this.done = this.task[0].done;
    }

    return this.task[0];
  }

  saveHandler = () =>  {
    let name;
    if(this.nameInput.value == '') {
     name = this.task[0].name;
    } else {
      name = this.nameInput.value;
    }
      this.props.editTask(this.task[0].id, name, this.descriptionInput.value, this.done, this.props.store.tasks);
      this.props.filterHandler('');
  }


  render() {
    return (
      <Wrapper>
        <ButtonsBox>
          <Link to = {this.getExitURL()}>
            <Button onClick = {this.saveHandler}>Save changes</Button>
          </Link>
          <Link to = {this.getExitURL()}>
            <Button onClick = { () => this.props.filterHandler('')}>Cancel</Button>
          </Link>
        </ButtonsBox>

        <TaskName innerRef = {(input) => { this.nameInput = input }} type = 'text' placeholder = {this.getTask().name }/>
        <CompletenessWrapper>
        { this.done ? 
          <DoneButton onClick = {(event) => { this.done = false; this.props.completeness(this.task[0].id, this.task[0].done)}}>
            <i className="fa fa-check-square-o" aria-hidden="<true></true>"></i>
          </DoneButton>
        :  <DoneButton onClick = { (event) => {this.done = true; this.props.completeness(this.task[0].id, this.task[0].done)}}>
            <i className="fa fa-square-o" aria-hidden="true"></i>
          </DoneButton>
       
        }<span>Done</span>
        </CompletenessWrapper>
        <TextArea innerRef = {(input) => { this.descriptionInput = input }} placeholder = 'Description'/>
      </Wrapper>
    )
  }
}



export default withRouter(connect(
    state => ({
    	store: state
    }),
    dispatch => ({
      completeness:(id, value) => {
        dispatch(setCompleteness(id, value))
      },  

      editTask: (id, name, description, done, tasks) => {
        dispatch(editTask(id, name, description, done, tasks));
      },

      filterHandler: (searchValue) => {
        dispatch(setFilterAction(searchValue));
      },
        
    })
  )(EditTask));