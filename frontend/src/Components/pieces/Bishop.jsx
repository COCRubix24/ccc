import React, { Component } from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "../constants/ItemTypes";

const bishopSource = {
  beginDrag(props) {
    return {};
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class Bishop extends Component {
  render() {
    const {
      connectDragSource,
      isDragging
    } = this.props;
    const bishopStyle = {
      cursor: "pointer",
      opacity: isDragging ? 0.5 : 1,
    };
    return connectDragSource(
      <span style={bishopStyle}>
        {"man"}
      </span>
    );
  }
}

export default DragSource(ItemTypes.BISHOP, bishopSource, collect)(Bishop);
