import { useState, useEffect } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { WORDS } from "./words"; // named import to match export

function App() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState([]); // [{ word, colors }]
  const [currentGuess, setCurrentGuess] = useState("");
  const [letterStatuses, setLetterStatuses] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null); // "win" | "lose" | null
  const [notification, setNotification] = useState("");

  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setTargetWord(WORDS[randomIndex].toUpperCase());
    setGuesses([]);
    setCurrentGuess("");
    setLetterStatuses({});
    setGameOver(false);
    setGameResult(null);
  };

  const getColors = (guess, target) => {
    const colors = Array(5).fill("grey");
    const targetArr = target.split("");

    // Greens
    guess.split("").forEach((ch, i) => {
      if (ch === targetArr[i]) {
        colors[i] = "green";
        targetArr[i] = null;
      }
    });

    // Yellows
    guess.split("").forEach((ch, i) => {
      if (colors[i] === "green") return;
      const idx = targetArr.indexOf(ch);
      if (idx !== -1) {
        colors[i] = "yellow";
        targetArr[idx] = null;
      }
    });

    return colors;
  };

  const updateLetterStatuses = (guess, colors) => {
    setLetterStatuses((prev) => {
      const next = { ...prev };
      guess.split("").forEach((ch, i) => {
        const newColor = colors[i];
        const cur = next[ch];
        if (newColor === "green") next[ch] = "green";
        else if (newColor === "yellow" && cur !== "green") next[ch] = "yellow";
        else if (newColor === "grey" && !cur) next[ch] = "grey";
      });
      return next;
    });
  };

  const handleInput = (key) => {
    if (gameOver) return;

    if (key === "Enter" && currentGuess.length === 5) {
      // If your WORDS are uppercase, currentGuess already is too
      if (!WORDS.includes(currentGuess)) {
        setNotification("❌ Word not in list");
        setTimeout(() => setNotification(""), 2000); // disappears after 2s
        return;
      }

      const colors = getColors(currentGuess, targetWord);
      const newGuesses = [...guesses, { word: currentGuess, colors }];
      setGuesses(newGuesses);
      updateLetterStatuses(currentGuess, colors);

      if (currentGuess === targetWord) {
        setGameOver(true);
        setGameResult("win");
      } else if (newGuesses.length === 6) {
        setGameOver(true);
        setGameResult("lose");
      }

      setCurrentGuess("");
      return;
    }

    if (key === "Backspace") {
      setCurrentGuess((s) => s.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((s) => s + key.toUpperCase());
    }
  };

  const handleKeyDown = (e) => handleInput(e.key);

  return (
    <div className="app-container" tabIndex="0" onKeyDown={handleKeyDown}>
      <h1>Wordle Clone</h1>

      {notification && <div className="notification">{notification}</div>}

      <div className="game-wrapper">
        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          gameOver={gameOver}
        />
        <Keyboard onKeyPress={handleInput} letterStatuses={letterStatuses} />
      </div>

      {gameOver && (
        <div className="game-over">
          {gameResult === "win" ? (
            <h2>🎉 You Win!</h2>
          ) : (
            <h2>😢 You Lose! The word was {targetWord}</h2>
          )}
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
