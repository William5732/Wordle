function Keyboard({ onKeyPress, letterStatuses }) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
  ];

  const getKeyStyle = (key) => {
    const status = letterStatuses[key];
    if (status === "green") return { backgroundColor: "#6aaa64", color: "white" };
    if (status === "yellow") return { backgroundColor: "#c9b458", color: "white" };
    if (status === "grey") return { backgroundColor: "#222222", color: "white" };
    return {};
  };

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => (
            <button 
              key={key} 
              onClick={() => onKeyPress(key)}
              className="key-button"
              style={getKeyStyle(key)}
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
