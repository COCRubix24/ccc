import React, { Component } from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "../constants/ItemTypes";

const pawnSource = {
  beginDrag(props) {
    return {};
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class Pawn extends Component {
  render() {
    const {
      connectDragSource,
      isDragging
    } = this.props;
    const pawnStyle = {
      cursor: "pointer",
      opacity: isDragging ? 0.5 : 1,
    };
    return connectDragSource(
      <span style={pawnStyle}>
        {"♙"}
      </span>
    );
  }
}

export default DragSource(ItemTypes.PAWN, pawnSource, collect)(Pawn);
