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
    "https://rukminim2.flixcart.com/image/850/1000/xif0q/cereal-flake/r/t/x/100-crunchy-choco-bites-jar-1-a-one-grocery-original-imagrhhgphe2fayg.jpeg?q=20&crop=false";
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
