import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import { connect } from 'react-redux';

import ProgressLine from 'components/ProgressLine';
import Filter from 'components/Filter';
import {setFilterAction} from 'actions/filterActions';
import {undo, redo} from 'actions/historyActions';


const Root = styled.div`
  display: flex;
  flex-direction: column;   
  font-size: 40px;
`;

const TopLine = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px; 
`;
const Wrapper = styled.div `
  display: flex;
`;

const Name = styled.span``;
const Button = styled.button`
  cursor: pointer;
`;


class Header extends PureComponent {


  render() {
    return (
      <Root>
        <Switch>
          <Route exact path = '/category/:key/edit_task/:taskId'>
            <Name>To-Do Item</Name>
          </Route>

          <Route path='/'> 
           <div>
            <TopLine>  
              <Name>To-Do List</Name>
              <Filter store = {this.props.store} filterHandler = {this.props.filterHandler} url = {this.props.location.pathname}/>
            </TopLine>
            <Wrapper>
              <Button onClick = {() => this.props.undo()} style = {{color: 'grey', fontSize: '28px'}} >
                <i className ="fa fa-arrow-circle-left" aria-hidden="true"></i>
              </Button>
              <Button onClick = {() => this.props.redo()} style = {{color: 'grey', fontSize: '28px'}}>
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </Button>
            </Wrapper>
            <ProgressLine></ProgressLine>
            </div>
          </Route>
        </Switch>

      </Root>
    );
  }
}

export default withRouter(connect(
    state => ({
      store: state
    }),
    dispatch => ({
      undo: () => {
        dispatch(undo());
      },

      redo: () => {
        dispatch(redo());
      },

      filterHandler: (searchValue) => {
        dispatch(setFilterAction(searchValue));
      },
        
    })
  )(Header));
