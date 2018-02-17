import React, { PureComponent } from 'react';
import styled from 'styled-components';



const Root = styled.div `
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input `
  width: 100%;
  height: 100%;
`;

const SaveButton = styled.button `
  padding: 3px;
  background-color: green;
  color: white;
  cursor: pointer;
`;

export default class extends PureComponent {
  saveCategoryHandler(event) {
    if(this.categoryInput) {
      if(this.categoryInput.value.length){
        this.props.renameCategory(event.currentTarget.id, this.props.store.categories, this.categoryInput.value );
      }
    } 
  }

  render() {
    return (
      <Root>
        <Input innerRef = {(input) => { this.categoryInput = input }} placeholder = 'Enter new name'></Input>
        <SaveButton id = { this.props.item.key } onClick = { this.saveCategoryHandler.bind(this)}>Save</SaveButton>
      </Root>
    );
  }
}


