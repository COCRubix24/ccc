import React, { Component } from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "../constants/ItemTypes";

const rookSource = {
  beginDrag(props) {
    return {};
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class Rook extends Component {
  render() {
    const {
      connectDragSource,
      isDragging
    } = this.props;
    const rookStyle = {
      cursor: "pointer",
      opacity: isDragging ? 0.5 : 1,
    };
    return connectDragSource(
      <span style={rookStyle}>
        {"atta"}
      </span>
    );
  }
}

export default DragSource(ItemTypes.ROOK, rookSource, collect)(Rook);
