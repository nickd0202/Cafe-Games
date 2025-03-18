import React, { useState } from "react";
import Nav from "./Nav";
import "./Dice.css"; // Import styles

function DiceGame() {
  const [players, setPlayers] = useState(["My", "Cafe Owner's"]);
  const [results, setResults] = useState({});
  const [winner, setWinner] = useState(null);
  const [pot, setPot] = useState(100);
  const [showRules, setShowRules] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [playerDice, setPlayerDice] = useState({
    "My": [1, 1, 1],
    "Cafe Owner's": [1, 1, 1],
  });

  // Function to roll three dice
  const rollDice = () => {
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
  };

  // Function to evaluate the dice roll
  const evaluateRoll = (dice) => {
    dice.sort((a, b) => a - b);

    if (dice[0] === 1 && dice[1] === 2 && dice[2] === 3)
      return { rank: 0, description: "1-2-3 (Auto Lose)" };
    if (dice[0] === 4 && dice[1] === 5 && dice[2] === 6)
      return { rank: 4, description: "4-5-6 (Auto Win)" };
    if (dice[0] === dice[1] && dice[1] === dice[2])
      return { rank: 3 + dice[0], description: `Trips (${dice[0]}-${dice[1]}-${dice[2]})` };
    if (dice[0] === dice[1]) return { rank: dice[2], description: `Point ${dice[2]}` };
    if (dice[1] === dice[2]) return { rank: dice[0], description: `Point ${dice[0]}` };

    return null;
  };

  // Function to handle game round
  const playRound = () => {
    setRolling(true); // Start animation

    setTimeout(() => {
      let playerResults = {};
      let highestRank = -1;
      let roundWinner = null;
      let newPlayerDice = {};

      players.forEach((player) => {
        let dice, result;
        do {
          dice = rollDice();
          result = evaluateRoll(dice);
        } while (!result);

        playerResults[player] = result;
        newPlayerDice[player] = dice;

        if (result.rank > highestRank) {
          highestRank = result.rank;
          roundWinner = player;
        } else if (result.rank === highestRank) {
          roundWinner = roundWinner ? null : player;
        }
      });

      setResults(playerResults);

      if (roundWinner) {
        setWinner(`${roundWinner} Wins!`);
        setPot(pot * 2); 
      } else {
        setWinner("It is a tie!");
        setPot(0); 
      }

      setPlayerDice(newPlayerDice);
      setRolling(false); // Stop animation
    }, 1000); // Animation duration
  };

  return (
    <div className="dice-game">
      <Nav />
      <h1>Dice Game</h1>
      <h2>Pot: ${pot}</h2>

      <div className="players-dice-container">
        {players.map((player) => (
          <div key={player} className="player-section">
            <h3>{player} Dice</h3>
            <div className="dice-container">
              {playerDice[player].map((value, index) => (
                <div key={index} className={`dice ${rolling ? "rolling" : ""}`}>
                  🎲 {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={playRound} disabled={rolling} className="roll-button">
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <button onClick={() => setShowRules(true)} className="rules-button">
        Show Rules
      </button>

      <h2>Results:</h2>
      {Object.keys(results).map((player) => (
        <p key={player}>
          <strong>{player}:</strong> {results[player].description}
        </p>
      ))}

      {winner && <h2>{winner}</h2>}

      {/* Rules Modal */}
      {showRules && (
        <div className="modal">
          <div className="modal-content">
            <h2>Game Rules</h2>
            <p>Each round, players roll three dice until they get a valid result.</p>
            <p><strong>Winning Combinations:</strong></p>
            <ul>
              <li><strong>4-5-6:</strong> Automatic win.</li>
              <li><strong>Trips:</strong> Three of a kind beats any point (e.g., 3-3-3 beats 2-2-6).</li>
              <li><strong>Point:</strong> A pair + another number establishes a point (higher point wins).</li>
              <li><strong>1-2-3:</strong> Automatic loss.</li>
            </ul>
            <button onClick={() => setShowRules(false)} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiceGame;
