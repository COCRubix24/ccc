let queenPosition = [1, 2];
let observer = null;

export const observeQueen = (o) => {
    if (observer) {
        throw new Error("Multiple observers not implemented.");
        console.log("obsserving");
    }

    observer = o;
    emitChange();

    return () => {
        observer = null;
    };
};

const emitChange = () => {
    observer(queenPosition);
};

export const isValidQueenMove = (toX, toY) => {
    const [x, y] = queenPosition;
    const dx = Math.abs(toX - x);
    const dy = Math.abs(toY - y);
    return dx === dy || dx === 0 || dy === 0; // Queen can move diagonally or in straight lines
};

export const moveQueen = (toX, toY) => {
    queenPosition = [toX, toY];
    emitChange();
};
