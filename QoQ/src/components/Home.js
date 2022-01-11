import React, { useState, useCallback,useMemo, useContext} from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import './Home.css';
const GameContext = React.createContext(null);

export default function Home(){
    const [selectedBtn, setSelectedBtn] =useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [gameData, setGameData] = useState("nulla");
  
  const fetchGameHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    var level = "EASY"
    if(selectedBtn===1)  level = "EASY"
    else if(selectedBtn===2)  level="NORMAL"
    else  level="HARD"

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(level)
  };
   
    try {
      
      const response = await fetch(
        "http://localhost:8081/api/game", requestOptions);

      
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setGameData(response);
      const data = await response.json();
      window.location.href=`/game/${data.id}`;
       
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
    setIsLoading(false);
    
  }, []);
  
    return (
    <div className="homeLevels">
        <GameContext.Provider value={gameData}>
          <div>
            <Button class='levelButton'  onClick={fetchGameHandler}>Start</Button>
          </div> 
          <div> 
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button  color={selectedBtn === 1 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(1)}>EASY</Button>
              <Button  color={selectedBtn === 2 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(2)}>NORMAL</Button>
              <Button  color={selectedBtn === 3 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(3)}>HARD</Button>
            </ButtonGroup>
          </div>  
        </GameContext.Provider>
    </div>
    );
}
export { Home, GameContext };
