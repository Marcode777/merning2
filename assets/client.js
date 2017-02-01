

function Merning(){
  return(
    <h2>MERNING2</h2>
  );
}








function Monster(props){
  return <h3> nickname: {props.nickname} type: {props.type} </h3>
  };



function MonsterList(props){
  return(
      <ul className="list-group">
        {props.monsters.map(Monster)}
      </ul>
    );
}
 


function CreateMonster(props){

  const submit = () => {
    const nicknameInput = document.querySelector('#nickname');
    const typeInput = document.querySelector('#type');

    props.onAddMonster({
      nickname: nicknameInput.value,
      type: typeInput.value
    });

    nicknameInput.value = "";
    typeInput.value= "";
  }

  return(
    <div style={{display: 'flex'}}>
      <input id="nickname" className="form-control" placeholder="Nickname"/>
      <input id="type" className="form-control" placeholder="type"/>
      <button className="btn btn-primary" type="button" onClick={submit}>
        Add Monster
      </button>
    </div>
  );

}












class App extends React.Component{
  constructor(){
    super();

      this.state = {
        monsters: []
      };
    }


  componentWillMount(){
    fetch('/monsters')
      .then( res => res.json())
      .then(data => {
        this.setState({monsters: data});
      })
  }

  handleAddMonster(newMonster){
    fetch('/monsters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMonster)
    })
    .then(res => res.json())
    .then(monster => {
      this.setState({
        monsters: this.state.monsters.concat(monster)
      });
    });
  }


  render(){
    return(
      <div>
        <Merning/>

        <MonsterList monsters={this.state.monsters}/>
        <CreateMonster onAddMonster={this.handleAddMonster.bind(this)}/>
      </div>
    );
  }
}

    ReactDOM.render(
      <App/>,
      document.getElementById("example")
    );
