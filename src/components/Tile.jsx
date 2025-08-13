function Tile({ letter, color }) {
  let bgColor;
  if (color === "green") bgColor = "#6aaa64";
  else if (color === "yellow") bgColor = "#c9b458";
  else if (color === "grey") bgColor = "#787c7e";
  else bgColor = "#fff";

  return (
    <div 
      className="tile" 
      style={{ backgroundColor: bgColor, color: color === "empty" ? "black" : "white" }}
    >
      {letter}
    </div>
  );
}

export default Tile;
