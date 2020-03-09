import React, { Component, createContext } from "react";
import Cookies from 'js-cookie';

// Helper functions

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;

  return move(array, index, newIndex);
}

// Context

const GridContext = createContext({ items: [] });

export class GridProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      moveItem: this.moveItem,
      setItems: this.setItems
    };
  }

  render() {
    return (
      <GridContext.Provider value={this.state}>
        {this.props.children}
      </GridContext.Provider>
    );
  }

  setItems = items => {
    var i
    var items_copy = items.slice()
    //retreive cookie
    var cookie_items = JSON.parse(Cookies.get('items'));
    var myArr = []
    //compare each item to each other
    for(i in cookie_items){
      //check if it is in items
      const j = items_copy.findIndex(item => item.id === cookie_items[i].id)
      if(j != -1){
         myArr.push(cookie_items[i])
         items_copy.splice(j,1)
      }
    }
    for(i in items_copy){myArr.push(items_copy[i])}
    this.setState({items: myArr})
  };

  moveItem = (sourceId, destinationId) => {
    const sourceIndex = this.state.items.findIndex(
      item => item.id === sourceId
    );
    const destinationIndex = this.state.items.findIndex(
      item => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    this.setState(state => ({
      items: moveElement(state.items, sourceIndex, offset)
    }));

    //store items in cookie
    Cookies.set('items', this.state.items)
  };
}

export default GridContext;
