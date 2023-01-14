import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import st1 from './data/json/st-1.json';
import { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { ArrowDown, ArrowUp, ArrowUpCircleFill, Check, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

const a = Math.floor(Math.random() * st1.length);

function App() {
  const target = st1[a];
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [levelIcon, setLevelIcon] = useState();
  const [dpIcon, setDpIcon] = useState();
  const [dp, setDp] = useState("");
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [guesses] = useState([]);

  const funcs = {
    "name": setName,
    "level": setLevel,
    "dp": setDp,
  };

  const filter = {
    "name": name,
    "level": level,
    "dp": dp,
  }

  const onNameChange = (value) => {
    setName(value);
  }

  const inputChangeHandler = (field, value) => {
    console.log(value);
    filter[field] = value;
    funcs[field](value);
  }

  const checkName = () => {
    setAttempts(attempts + 1);
    let correctText = "";
    if (name.toLowerCase() === target.name.toLowerCase()){ 
      setCorrect(true);
      correctText = "Correct!";
    }
    else {
      setCorrect(false);
      if (parseInt(level) > parseInt(target.level))
        setLevelIcon(<ArrowDown color='red'/>);
      else if (parseInt(level) < parseInt(target.level))
        setLevelIcon(<ArrowUp color='red'/>);
      else 
        setLevelIcon(<CheckCircleFill color='green' />);

      if (parseInt(dp) > parseInt(target.dp))
        setDpIcon(<ArrowDown color='red'/>);
      else if (parseInt(dp) < parseInt(target.dp))
        setDpIcon(<ArrowUpCircleFill color='red' />);
      else 
        setDpIcon(<CheckCircleFill color='green' />);
      correctText = "Incorrect";
    }

    const guess = "Attempt " + attempts + ": " + name + " : " + correctText;
    guesses.push(guess);
  }

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkName();
    }
  };

  console.log(guesses);

  const filteredDigimon = st1.filter((digimon) => {
    for (const key in filter) {
      if (filter[key] && digimon[key] !== filter[key])
        return false;
    }
    return true;
  });
  const names = filteredDigimon.map((digimon) => digimon.name);
  const levels = [...new Set(filteredDigimon.map((digimon) => digimon.level))];
  const dps = [...new Set(filteredDigimon.map((digimon) => digimon.dp))];

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
              <Col>
                <Form.Group>
                  <Form.Label>Set</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Level</Form.Label>
                  <Form.Label>{levelIcon}</Form.Label>
                  <Typeahead
                    selected={level}
                    options={levels}
                    placeholder="Level"
                    onChange={(option) => inputChangeHandler("level", option[0])}
                    onInputChange={(e) => inputChangeHandler("level", e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>DP</Form.Label>
                  <Form.Label>{dpIcon}</Form.Label>
                  <Typeahead
                    options={dps}
                    placeholder="DP"
                    onChange={(option) => inputChangeHandler("dp", option[0])}
                    onInputChange={(e) => inputChangeHandler("dp", e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Button onClick={checkName}>
            Check!
          </Button>
        </Container>
        {guesses.map((guess, i) => {
          return <p>{guess}</p>
        })}
      </header>
    </div>
  );
}

export default App;
