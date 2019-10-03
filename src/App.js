import React from 'react';
import './App.css';


const choicesList = ["rock", "paper", "scissors", "lizard", "spock"];

const ApiResult = ({ api_result }) => {
  if (api_result != null) {
    return (
        <div>
        <div>
          You played {choicesList[api_result.player-1]}.
        </div>
        <div>
          The computer played {choicesList[api_result.computer-1]}.
        </div>
        <div>
          You {api_result.results}.
        </div>
        </div>
      )
  }
  else{
    return (<div></div>)
  }
}
      

function Choice(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class ChoiceButtons extends React.Component {
  renderButton(i) {
    return (
      <Choice
        value={choicesList[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
    <ul>
      {choicesList.map((value, index) => {
        return <li key={index}>{this.renderButton(index)}</li>
      })}
    </ul>
    </div>
  )
  }
}

class Game extends React.Component {

  state = {api_result: null}

  handleClick(i) {
    console.log(i)
    //modify to point to the API endpoint
    fetch('http://127.0.0.1:5000/play', {method: 'post',
    body: '{"player":'+ (i+1) +'}'})
        .then(res => res.json())
        .then((data) => {
          this.setState({ api_result: data })
        })
        .catch(console.log);
  }

  render (){
  return (
    <div className="App">
      <header className="App-header">
        <p>
         Select a choice to play against the computer.
        </p>
        <div><ChoiceButtons onClick={ i => this.handleClick(i)}/></div>
        <div><ApiResult api_result={this.state.api_result} /></div>
      </header>

    </div>
  );
  }
}

class App extends React.Component {


  render (){
  return (<div><Game /></div>);
  }
}

export default App;
