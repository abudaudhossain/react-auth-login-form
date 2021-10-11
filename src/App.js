import './App.css';

function App() {

  const handelRegister = e =>{
    console.log("well register is done");
    e.preventDefault();

  }

  return (
    <div className="App">
     <form onSubmit ={handelRegister} >
       <h3>Please Register</h3>
       <label htmlFor="email">Email: </label>
       <input type="email" name="email" />
       <br />
       <label htmlFor="password">Password: </label>
       <input type="password" name="password" />
       <br />
       <input type="submit" value="register" />
     </form>
    </div>
  );
}

export default App;
