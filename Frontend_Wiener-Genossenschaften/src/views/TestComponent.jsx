import React from 'react';
import { useState, useRef } from 'react';
import useStore from '../stores/useStore';
import { useEffect } from 'react';
import { myfetchAPI } from '../utils/fetch';

// import { Component } from "react";

//FUNKTIONSKOMPONENTE:
function TestComponent() {
  const startWert = 10;
  const prop1 = 'Ich';
  const prop2 = 'heiße';
  const prop3 = 'Valentina';

  //Bedingung fürs Rendering
  const bedingungErfüllt = true;

  const elternFunktion = () => {
    console.log('Ich komme aus der Eltern-Komponente');
  };

  const sayHi = () => {
    console.log('Hi Guys, ich wurde als Funktion übergeben!');
  };

  const alleProps = {
    prop1,
    prop2,
    prop3,
    elternFunktion,
  };

  return (
    <div>
      <h2>Elternkomponente</h2>
      {/* <ProjectsComponent /> */}
      <BearComponent />
      <FormularKomponente />
      <ChildComponent meineProp={startWert} sayHi={sayHi} />
      <TestChildComponent {...alleProps} />
      <ChildrenProperty>
        <p>Das ist zusätzlicher Inhalt aus "children"</p>
        <div>Ich bin nur ein Div</div>
      </ChildrenProperty>
      <div>{bedingungErfüllt && <ArrayComponent />}</div>
    </div>
  );
}

const BearComponent = () => {
  const { bears, increasePopulation, removeAllBears } = useStore();

  return (
    <div>
      <p>Number of bears: {bears}</p>
      <button onClick={increasePopulation}>Increase Population</button>
      <button onClick={removeAllBears}>Remove All Bears</button>
    </div>
  );
};

// const ProjectsComponent = () => {
//   const { projects, loading, error, getAllProjects } = useStore();

//   useEffect(() => {
//     getAllProjects();
//   }, []);

//   if (loading) {
//     return <p>Lade...</p>;
//   }

//   if (error) {
//     return <p>Fehler beim Laden der Projekte: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h1>Projekte</h1>
//       <ul>
//         {projects.map((project) => (
//           <li key={project.id}>{project.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const FormularKomponente = () => {
  const [text, setText] = useState('');
  const [myCar, setMyCar] = useState('Volvo');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('The text you entered was: ' + text);
  };

  const handleSelect = (event) => {
    setMyCar(event.target.value);
  };

  const myStyle = {
    color: 'blue',
    fontSize: '22px',
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Trage hier Text ein:</label>
      <input
        type="text"
        id="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <h5>Wähle eine Farbe:</h5>
      <label htmlFor="red" style={{ color: 'red' }}>
        Rot
        <input type="radio" id="red" name="color" />
      </label>
      <label htmlFor="blue" style={myStyle}>
        Blau
        <input type="radio" id="blue" name="color" />
      </label>
      <h5>Select Elemente:</h5>
      <select value={myCar} onChange={handleSelect}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
      <h5>Input type='file'</h5>
      <input type="file" />
      <input type="submit" />
    </form>
  );
};

const ChildrenProperty = (props) => {
  // console.log('Inhalt props in ChildrenProperty:', props);
  return (
    <div>
      <h3>Children:</h3>
      {props.children}
    </div>
  );
};

const TestChildComponent = (props) => {
  console.log('Props in der TestChildCOmponente:', props);
  const { prop1, prop2, prop3, elternFunktion } = props;
  elternFunktion();

  const filename = 'signal-2023-12-14-112736_014.jpeg';

  return (
    <div>
      <p>Prop1: {prop1}</p>
      <p>Prop2: {prop2}</p>
      <p>Prop3: {prop3}</p>
      {/* <img src="../public/signal-2023-12-14-112736_014.jpeg" />
      <img src={`../public/${filename}`} />
      <img src={'../public/' + filename} />
      <img src={['../public/', filename].join('')} /> */}
    </div>
  );
};

function ChildComponent(props) {
  const { meineProp, sayHi } = props;
  console.log('Props in ChildComponent: ', props);
  const [zaehler, setZaehler] = useState(meineProp);

  const myArray = ['Maus', 'Katze', 'Hund'];
  const [newArray, setNewArray] = useState([myArray]);

  const handleButtonClick = () => {
    setZaehler(zaehler + 1);
    setNewArray([...myArray, 'neuerWert']);
  };

  sayHi();

  return (
    <div>
      <h3>ChildComponent</h3>
      <p>Zähler: {zaehler}</p>
      <button onClick={handleButtonClick}>Erhöhe den Zähler</button>
      <div>Array: {newArray}</div>
    </div>
  );
}

const ArrayComponent = () => {
  //Referenz hinzufügen:
  const myRef = React.createRef();
  const myButtonRef = useRef(null);

  const showRefObject = () => {
    console.log('Ref-Objekt vom Button:', myButtonRef.current);
    myButtonRef.current.style.backgroundColor = 'green';
  };

  //Bedingung:
  const user = false;

  //Arrays + useState
  const [arr, setArr] = useState([2, 6, 5, 1, 3, 4]);
  console.log('Array:', arr);

  const sortArray = () => {
    setArr([...arr].sort());
  };

  return (
    <div>
      <h3 ref={myRef}>Hier testen wir Arrays:</h3>
      <button onClick={sortArray}>Array Sortieren</button>
      <button
        ref={myButtonRef}
        onClick={(event) => {
          console.log('Klickevent ausgelöst!');
          console.log('Event:', { event });
        }}
      >
        Klick-Event
      </button>
      <div>{user ? 'User ist eigeloggt' : 'Kein User da!'}</div>
      <ul>
        {arr.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={showRefObject}>Show Ref-Objekt</button>
    </div>
  );
};

//KLASSENKOMPONENTE
class MeineKlassenkomponente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zaehler: 0,
    };
  }

  handleButtonClick = () => {
    this.setState({ zaehler: this.state.zaehler + 1 });
  };

  render() {
    return (
      <div>
        <p>Zähler: {this.state.zaehler}</p>
        <button onClick={this.handleButtonClick}>Erhöhe den Zähler</button>
      </div>
    );
  }
}

export default TestComponent;
