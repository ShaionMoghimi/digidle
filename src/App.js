import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import st0 from './data/json/st-1.json';
import bt01 from './data/json/bt01-03.1.5.json';
import { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const st1 = st0.concat(bt01);

const a = Math.floor(Math.random() * st1.length);

function App() {
  const target = st1[a];
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [color, setColor] = useState("");
  const [num, setNum] = useState("");
  const [set, setSet] = useState("");
  const [stage, setStage] = useState("");
  const [dp, setDp] = useState("");
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [guesses] = useState([]);

  const clearAttributes = () => {
    setColor("");
    setDp("");
    setLevel("");
    setStage("");
  }

  const onNameChange = (value) => {
    if (value && value.length > 0) {
      const [name, setValue] = value.split(" | ");
      const [set, num] = setValue.split("-");
      setName(name);
      setNum(num);
      setSet(set);
      const digi = st1.filter((digimon) =>
        digimon.name === name && digimon.setNumber === (set + "-" + num)
      );
      if (digi.length === 0) {
        clearAttributes();
      } else {
        setLevel(digi[0].level);
        setDp(digi[0].dp);
        setColor(digi[0].color);
        setStage(digi[0].stage);
      }
    }
    else if (!value || (value && value.length === 0)) {
      clearAttributes();
    }
  }

  const checkName = () => {
    setAttempts(attempts + 1);
    if (name.toLowerCase() === target.name.toLowerCase() && set === target.setNumber) {
      setCorrect(true);
    }
    else {
      setCorrect(false);
    }
    const [s, n] = target.setNumber.split("-");
    const guess = {
      name: [name, name === target.name],
      color: [color, color === target.color],
      stage: [stage, stage === target.stage],
      level: [level, level === target.level, level > target.level ? "↓" : "↑"],
      dp: [dp, dp === target.dp, dp > target.dp ? "↓" : "↑"],
      set: [set, set === s],
      num: [num, num === n, num > n ? "↓" : "↑"],
    }
    guesses.push(guess);
  }

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkName();
    }
  };

  /*const filteredDigimon = st1.filter((digimon) => {
    for (const key in filter) {
      if (filter[key] && digimon[key] !== filter[key])
        return false;
    }
    return true;
  });
  */
  const names = st1.map((digimon) => digimon.name + " | " + digimon.setNumber);
  console.log("Guesses: ", guesses);
  //const levels = [...new Set(filteredDigimon.map((digimon) => digimon.level))];
  //const dps = [...new Set(filteredDigimon.map((digimon) => digimon.dp))];

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://static.wikia.nocookie.net/logopedia/images/2/27/Digimon_Logo_1.svg" className='mb-4' alt="logo" />
        <Container>
          <Form>
            <Row>
              <Col>
                <Form.Group className="d-flex flex-column justify-content-start">
                  <Form.Label className="mr-2">Name</Form.Label>
                  <Typeahead
                    options={names}
                    placeholder="Type a digimon's name"
                    onChange={(option) => onNameChange(option[0])}
                    onInputChange={(e) => setName(e)}
                    onKeyDown={checkEnter}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>Color:</div>
                <div>{color.toUpperCase()}</div>
              </Col>
              <Col>
                <div>Stage:</div>
                <div>{stage.toUpperCase()}</div>
              </Col>
              <Col>
                <div>Level:</div>
                <div>{level.toUpperCase()}</div>
              </Col>
              <Col>
                <div>DP:</div>
                <div>{dp.toUpperCase()}</div>
              </Col>
            </Row>
          </Form>
          <Button onClick={checkName}>
            Check!
          </Button>

          <table className='table'>
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
                  <td style={{ color: guess.name[1] ? 'green' : 'red' }}>{guess.name[0]}</td>
                  <td style={{ color: guess.set[1] ? 'green' : 'red' }}>{guess.set[0]}</td>
                  <td style={{ color: guess.num[1] ? 'green' : 'red' }}>
                    {guess.num[0]}{guess.num[1] ? "" : guess.num[2]}
                  </td>
                  <td style={{ color: guess.color[1] ? 'green' : 'red' }}>{guess.color[0]}</td>
                  <td style={{ color: guess.stage[1] ? 'green' : 'red' }}>{guess.stage[0]}</td>
                  <td style={{ color: guess.level[1] ? 'green' : 'red' }}>
                    {guess.level[0]}{guess.level[1] ? "" : guess.level[2]}
                  </td>
                  <td style={{ color: guess.dp[1] ? 'green' : 'red' }}>
                    {guess.dp[0]}{guess.dp[1] ? "" : guess.dp[2]}
                  </td>
                </tr>
              )
            })}
          </table>
        </Container>
      </header>
    </div>
  );
}

export default App;
