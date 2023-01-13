import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import st1 from './data/json/st-1.json';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

function App() {
  const target = st1[0];
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [dp, setDp] = useState("");
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

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

  const inputChangeHandler = (field, value) => {
    console.log(value);
    filter[field] = value;
    funcs[field](value);
  }

  const checkName = () => {
    setAttempts(attempts + 1);
    if (name.toLowerCase() === target.name.toLowerCase())
      setCorrect(true);
    else
      setCorrect(false);
  }

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkName();
    }
  };

  console.log(filter);

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
                    onChange={(option) => setName(option[0])}
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
                  <Typeahead
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
        </Container>
        {correct && <p>That's correct!</p>}
        {attempts > 0 && !correct && <p>Wrong, try again!</p>}
      </header>
    </div>
  );
}

export default App;
