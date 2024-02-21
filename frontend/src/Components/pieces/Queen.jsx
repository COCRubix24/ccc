import React, { Component } from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "../constants/ItemTypes";

// Draggable object source
const queenSource = {
    beginDrag(props) {
        return {};
    },
};
const imageUrl =
    "https://cpng.pikpng.com/pngl/s/202-2028175_toothpaste-png-colgate-toothpaste-png-clipart.png";
// Collecting function
const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

class Queen extends Component {
    render() {
        const {
            connectDragSource,
            // connectDragPreview,
            isDragging,
        } = this.props;
        const queenStyle = {
            cursor: "pointer",
            opacity: `isDragging ? 0.5 : 1`,
            width: "100px",
        };
        return connectDragSource(
            <span style={queenStyle}>
                <img
                    src={imageUrl}
                    alt="Knight Icon"
                    style={{ width: "100px" }}
                />
                {/* Placeholder for the Queen icon */}
            </span>
        );
    }
}

export default DragSource(ItemTypes.QUEEN, queenSource, collect)(Queen);
