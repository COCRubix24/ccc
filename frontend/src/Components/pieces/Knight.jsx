import React, { Component } from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "../constants/ItemTypes";

// Draggable object source
const knightSource = {
    beginDrag(props) {
        return {};
    },
};
const imageUrl =
    "https://m.media-amazon.com/images/I/71r7IljAWBL._AC_UF1000,1000_QL80_.jpg"; // Replace this with your image URL

// Collecting function
const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

class Knight extends Component {
    render() {
        const {
            connectDragSource,
            // connectDragPreview,
            isDragging,
        } = this.props;
        const knightStyle = {
            cursor: "pointer",
            opacity: `isDragging ? 0.5 : 1`,
            width: "200px",
        };
        return connectDragSource(
            <span style={knightStyle}>
                <img
                    src={imageUrl}
                    alt="Knight Icon"
                    style={{ width: "150px" }}
                />
            </span>
        );
    }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
