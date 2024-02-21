// Import necessary libraries and components
import React, { useState } from "react";
import { QueenSquareWrapper } from "./SquareWrapper";
import { KnightSquareWrapper } from "./SquareWrapper";
import Knight from "../pieces/Knight";
import withDragDropContext from "../../lib/withDragDropContext";
import Queen from "../pieces/Queen";
import Bishop from "../pieces/Bishop";
import Rook from "../pieces/Rook"; // Import Rook component

// Define the Board component
const Board = ({
    knightPosition: [knightX, knightY],
    queenPosition: [queenX, queenY],
}) => {
    // State to store queen's position
    // console.log("queen", queenX);
    console.log(knightX);

    const renderSquare = (i) => {
        // i: board position, x: column, y: row
        const x = i % 8;
        const y = Math.floor(i / 8);
        const piece1 = renderPiece1(x, y);
        console.log("q", piece1);
        const piece2 = renderPiece2(x, y);
        console.log("k", piece2);

        // Render out the square
        return (
            <>
                <div key={i} style={squareStyle}>
                    <KnightSquareWrapper x={x} y={y}>
                        {piece2}
                    </KnightSquareWrapper>
                    {/* <QueenSquareWrapper x={x} y={y}>
                      {piece1}
                  </QueenSquareWrapper> */}
                </div>
                <div key={i} style={squareStyle}>
                    {/* <KnightSquareWrapper x={x} y={y}>
                      {piece2}
                  </KnightSquareWrapper> */}
                    <QueenSquareWrapper x={x} y={y}>
                        {piece1}
                    </QueenSquareWrapper>
                </div>
            </>
        );
    };

    // Function to render the piece based on its position
    // Function to render the piece based on its position
    const renderPiece1 = (x, y) => {
        let piece = null;
        // if (x === knightX && y === knightY) {
        //     piece = <Knight />;
        // }
        if (x === queenX && y === queenY) {
            piece = <Queen />;
        }
        return piece;
    };
    const renderPiece2 = (x, y) => {
        let piece = null;
        if (x === knightX && y === knightY) {
            piece = <Knight />;
        }
        // if (x === queenX && y === queenY) {
        //     piece = <Knight />;
        // }
        return piece;
    };

    // Populate chess board squares along with any pieces that may be on them
    const squares = [];
    for (let i = 0; i < 32; i++) {
        squares.push(renderSquare(i));
    }

    // Render the board component
    return <div style={boardStyle}>{squares}</div>;
};

// Styling properties applied to the board element
const boardStyle = {
    margin: "0 auto",
    width: "100vmin",
    height: "100vmin",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "10vmin",
    // border: "1px solid black",
};

// Styling properties applied to each square element
const squareStyle = {
    width: "12.5%",
    height: "12.5%",
};

// Export the Board component with DragDropContext
export default withDragDropContext(Board);
