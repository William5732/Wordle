function Board({ guesses, currentGuess, gameOver }) {
  // Only show the typing row if the game isn't over and there are letters
  const showCurrentRow = !gameOver && currentGuess.length > 0;

  const rowsRemaining =
    6 - guesses.length - (showCurrentRow ? 1 : 0);

  const emptyRowsCount = Math.max(rowsRemaining, 0);

  return (
    <div className="board">
      {/* Completed guess rows */}
      {guesses.map((g, i) => (
        <div key={`g-${i}`} className="row">
          {g.word.split("").map((ch, j) => {
            const color =
              g.colors[j] === "green"
                ? "#6aaa64"
                : g.colors[j] === "yellow"
                ? "#c9b458"
                : "#3a3a3c";
            return (
              <div
                key={`g-${i}-${j}`}
                className="tile"
                style={{ backgroundColor: color, borderColor: "#3a3a3c", color: "white" }}
              >
                {ch}
              </div>
            );
          })}
        </div>
      ))}

      {/* Current typing row (optional) */}
      {showCurrentRow && (
        <div className="row">
          {currentGuess.split("").map((ch, i) => (
            <div key={`c-${i}`} className="tile">
              {ch}
            </div>
          ))}
          {Array.from({ length: 5 - currentGuess.length }).map((_, i) => (
            <div key={`c-empty-${i}`} className="tile" />
          ))}
        </div>
      )}

      {/* Empty filler rows */}
      {Array.from({ length: emptyRowsCount }).map((_, i) => (
        <div key={`e-${i}`} className="row">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={`e-${i}-${j}`} className="tile" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
