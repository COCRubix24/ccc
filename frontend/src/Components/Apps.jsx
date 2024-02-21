import React, { useState, useEffect } from "react";
import Board from "../Components/board/Board";
import { observeKnight } from "../Components/util/KnightObserver";
import { observeQueen } from "../Components/util/QueenObserver";
// import "../../src/stylesheets/global.css";

// chess board demo
const Apps = () => {
    const boardWidth = "100vmin";
    const backgroundImageUrl =
        "https://images.hindustantimes.com/img/2022/08/18/550x309/_d_mart_grocery_chains_plans_on_expansion_1660781151901_1660781152136_1660781152136.jpg";
    // Initialize state variables for knight and queen positions
    const [knightPosition, setKnightPosition] = useState([0, 4]);
    const [queenPosition, setQueenPosition] = useState([0, 3]);

    // Subscribe to changes in knight and queen positions
    useEffect(() => {
        const unsubscribeKnight = observeKnight((newKnightPosition) =>
            setKnightPosition(newKnightPosition)
        );
        const unsubscribeQueen = observeQueen((newQueenPosition) =>
            setQueenPosition(newQueenPosition)
        );

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribeKnight();
            unsubscribeQueen();
        };
    }, []);

    // Log knightPosition and queenPosition before passing them to the Board component
    console.log("knightPosition:", knightPosition);
    console.log("queenPosition:", queenPosition);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "1500px",
                justifyContent: "center",
                // height: "0px",
            }}
        >
            <div
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: "cover",
                    width: boardWidth,
                    alignItems: "center",
                    // height: "100%",
                }}
            >
                {/* Pass both knightPosition and queenPosition to the Board component */}
                <Board
                    style={{
                        width: boardWidth,
                        display: "flex",
                        alignItems: "center",
                    }}
                    knightPosition={knightPosition}
                    queenPosition={queenPosition}
                />
            </div>
        </div>
    );
};

export default Apps;
