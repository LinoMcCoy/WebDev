import logo from './logo.svg';
import './App.css';

function App() {
  const currentDate= new Date();
  const [isLoggedIn(!isLoggedIn)       ]


  const customStyle= {
    color: "blue",
    fontSize: "20px",
    border: "1px solid black",
  };

  const num= Math.floor(Math.random()*10);
  const name= "Lino";
  const lname= "Rangel";
  

  if(num % 2 == 0){
    customStyle.background= "gray"; 
  } else{
    customStyle.background= "yellow"; 
  }

  const img= "https://picsum.photos/200";

  return (
    <div className="App">
      <Header/>
      <h1 style={customStyle}>Hello World, I am {name + " " + lname}</h1>
      <img alt= "RandomImage" src={img}></img>
      <p>This is my first react app. My lucky number is {num}</p>
      <p className='footer'>Copyright {currentDate.getFullYear()}</p>
       
    </div>
  );
}

export default App;
