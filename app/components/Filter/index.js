import React, { PureComponent } from 'react';
import { Route, Link   } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import styled from 'styled-components';


const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  font-size: 22px;
`;

const Checkbox = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  border: 1px solid black;
  border-radius: 4%;
  height: 40px;
`;


const UserInput = styled.input`
  width: 90%;
  height: 100%;
`;

  const DeleteButton = styled.button`
    color: red;
    font-size: 44px;
    width: 44px;
    height: 100%;
    padding: 0;
    cursor: pointer;
 `;

 const Button = styled.div `
  margin: 0;
  margin-right: 10px;
  padding: 0;
  cursor: pointer;
`;

export default class extends PureComponent {

  defineCategoryId = () => {
    let arr = this.props.url.split('/');
    let category = arr.indexOf('category');
    let categoryId;
    if(category != -1 ) {
      categoryId = arr[category+1];
    } else alert('choose category!');
    return categoryId;
  }


  filterHandler = (search) => {
    this.props.filterHandler(search);
  }


  defineExitURL = (val) =>{
    let arr = this.props.url.split('/');
    let ind = arr.indexOf(val);
    if(ind != -1) {
      arr.splice(ind, 1); 
    }
    return arr.join('/');
  }

  defineShowDoneMode = () => {
    let arr = this.props.url.split('/');
     if(arr.indexOf('done') != -1) {
      return true;
     } else return false;
  }

  searchToUrl = () => {
    let arr = this.props.url.split('/');
    let search = arr.indexOf('search');   
    if(search != -1){
      return this.props.url;
    } 
    else return this.props.url + '/search';
  }



  render() {
    if(document.getElementById('searchInput') &&
     document.getElementById('searchInput').value != '' &&
     this.props.store.searchValue != document.getElementById('searchInput').value) {
      
      this.props.filterHandler(document.getElementById('searchInput').value);
    }
    return (
      <Root>
        <Checkbox>
        {this.defineShowDoneMode() ?
          <Link style = {{color: 'black'}} to = {this.defineExitURL('done')}>
            <Button>
              <i className="fa fa-check-square-o" aria-hidden="<true></true>"></i>
            </Button>
              </Link>
        : <Link style = {{color: 'black'}} to = {this.props.url + '/done'}>
            <Button >
              <i className="fa fa-square-o" aria-hidden="true"></i>
            </Button>
          </Link>
        }  <div>Show done</div>
        </Checkbox>


        <Search>
          <Link to = {this.searchToUrl()}>
            <UserInput id = 'searchInput' type = "textfield" innerRef = {(input) => this.inputValue = input} onChange = { () => this.filterHandler(this.inputValue.value)} placeholder = "Search" />
          </Link>
          <Link to = {this.defineExitURL('search')}>  
            <DeleteButton onClick = { () => {document.getElementById('searchInput').value = ''; this.filterHandler('')} }><i className="fa fa-window-close" aria-hidden="true"></i></DeleteButton>
          </Link>
        </Search>
      </Root> 
    );
  }
}
