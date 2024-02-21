import React from "react";

export const Square = ({ squareIsBlack, children }) => {
    const fill = squareIsBlack ? "white" : "white";
    const stroke = squareIsBlack ? "black" : "black";

    const squareStyle = {
        // backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid black",
    };

    return <div style={squareStyle}>{children}</div>;
};

export const Chessboard = ({ children }) => {
    const backgroundImageUrl =
        "https://images.hindustantimes.com/img/2022/08/18/550x309/_d_mart_grocery_chains_plans_on_expansion_1660781151901_1660781152136_1660781152136.jpg"; // URL of the image

    const boardStyle = {
        width: "100%",
        height: "100%",
        background: `url(${backgroundImageUrl})`, // Set background image for the entire board
        backgroundSize: "cover", // Cover the entire container with the background image
        display: "flex",
        flexWrap: "wrap",
    };

    return <div style={boardStyle}>{children}</div>;
};
