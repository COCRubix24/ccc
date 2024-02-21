let knightPosition = [4, 3];
let observer = null;

export const observeKnight = (o) => {
    if (observer) {
        console.log("i h");
        throw new Error("Multiple knight observers not implemented.");
    }
    console.log("i hate");
    observer = o;
    emitChange();

    return () => {
        observer = null;
    };
};

const emitChange = () => {
    observer(knightPosition);
    console.log("hey", knightPosition);
};

export const isValidKnightMove = (toX, toY) => {
    const [x, y] = knightPosition;
    const dx = Math.abs(toX - x);
    const dy = Math.abs(toY - y);
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
};

export const moveKnight = (toX, toY) => {
    knightPosition = [toX, toY];
    emitChange();
};
