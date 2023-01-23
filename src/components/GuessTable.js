import { capitalizeFirst } from "../utils/utils";
import "./GuessTable.css";

export default function GuessTable({ guesses }) {
  const Data = ({ correct, children }) => {
    return (<td align="center" className={`m-1 cell ${correct ? "greenCell" : "redCell"}`}>
      {children}
    </td>);
  }
  return (
    <table className='table text-center mt-4'>
      <tr style={{ color: 'white' }}>
        <th>Name</th>
        <th>Set</th>
        <th>Number</th>
        <th>Color</th>
        <th>Stage</th>
        <th>Level</th>
        <th>DP</th>
      </tr>
      {guesses.map((guess, i) => {
        return (
          <tr>
            <Data correct={guess.name[1]} children={guess.name[0]} />
            <Data correct={guess.set[1]}>{guess.set[0]}</Data>
            <Data correct={guess.num[1]}>{guess.num[0]}{guess.num[1] ? "" : guess.num[2]}</Data>
            <Data correct={guess.color[1]}>{capitalizeFirst(guess.color[0])}</Data>
            <Data correct={guess.stage[1]}>{capitalizeFirst(guess.stage[0])}</Data>
            <Data correct={guess.level[1]}>{guess.level[0]}{guess.level[1] ? "" : guess.level[2]}</Data>
            <Data correct={guess.dp[1]}>{guess.dp[0]}{guess.dp[1] ? "" : guess.dp[2]}</Data>
          </tr>
        )
      })}
    </table>
  );
}