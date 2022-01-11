import './Game.css';
import React, { useState, useEffect, useCallback, useContext } from "react";
import Progress from "../components/Progress";
import {GameContext} from '../components/Home'
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import MyDialog from './MyDialog'

function Game() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [monster, setMonster] = useState(false);
  const [health, setHealth] = useState(100);
  const [healing, setHealing] = useState(0);
  const [damage, setDamage] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [win, setWin] = useState(false);
  const [healingImg, setHealingImg] = useState(false);
  const [powerImg, setPowerImg] = useState(false);
  const [number, setNumber] = useState(0);
  const game = useContext(GameContext);

  const navigate = useNavigate();
  const {id} = useParams();
  function handleClick() {
    navigate('/');
  }

  const fetchMoveHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

  };
   
    try {
      const response = await fetch(
        `http://localhost:8081/api/game/${id}/move`, requestOptions)

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      
      if(data.currentDungeon.monsterDto != null)
        if(data.currentDungeon.monsterDto.health > 0){
            setMonster(true);
        }
      if(data.currentDungeon.itemDto.healingValue!=null) {
        setHealingImg(true);
        setPowerImg(false);
      }
      else if(data.currentDungeon.itemDto.strength!=null){
        setPowerImg(true);
        setHealingImg(false);
      }
      else{
        setPowerImg(false);
        setHealingImg(false);
      }
      if(data.health>0) setHealth(data.health);  
      else setHealth(0);
      if(health<=0) setGameover(true);
      
      setHealing(data.healingValue);
      setDamage(data.damage);
      setNumber(data.currentDungeon.id)
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
    setIsLoading(false);
    
  }, []);

  const fetchFightHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

  };
   
    try {
      const response = await fetch(
        `http://localhost:8081/api/game/${id}/fight`, requestOptions)

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();  
      console.log(data); 
      if(data.currentDungeon.itemDto.strength===null && data.currentDungeon.itemDto.healingValue===null ) setWin(true);
      if(data.currentDungeon.monsterDto != null)
        if(data.currentDungeon.monsterDto.health > 0){
            setMonster(true);
        }
        else setMonster(false);
      else setMonster(false);
               
      if(data.health>0) setHealth(data.health);  
      else setHealth(0);
      if(data.health<=0) setGameover(true);
      else {
        if(data.currentDungeon.itemDto.strength===null && data.currentDungeon.itemDto.healingValue===null) setWin(true);
      }
      setHealing(data.healingValue)  
      setDamage(data.damage); 
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
    setIsLoading(false);
  }, []);

  const fetchFleeHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  };
   
    try {
      const response = await fetch(
        `http://localhost:8081/api/game/${id}/flee`, requestOptions)

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);     
      
      if(data.currentDungeon.monsterDto != null)
        if(data.currentDungeon.monsterDto.health > 0){
            setMonster(true);
        }
        else setMonster(false);
      else setMonster(false);
      if(data.currentDungeon.itemDto.healingValue!=null) {
        setHealingImg(true);
        setPowerImg(false);
      }
      else if(data.currentDungeon.itemDto.strength!=null){
        setPowerImg(true);
        setHealingImg(false);
      }
      else{
        setPowerImg(false);
        setHealingImg(false);
      }
      if(data.health>0) setHealth(data.health);  
      else setHealth(0);
      if(health<=0) setGameover(true);
      setHealing(data.healingValue); 
      setNumber(data.currentDungeon.id)
      setDamage(damage+data.damage);  
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
    setIsLoading(false);
    
  }, []);

  const fetchHealHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  };
   
    try {
      const response = await fetch(
        `http://localhost:8081/api/game/${id}/heal`, requestOptions)

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
 
      if(data.health>0) setHealth(data.health);  
      else setHealth(0);
      setHealing(data.healingValue);  
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
    setIsLoading(false);
    
  }, []);

  return (
    <div className='Game'>
      <label className='numberBox'>{number}</label>
      {monster && (<img src={require('../images/monster.png')} />)}
      <div className='controls'>
        <div className='items'>
          {powerImg && (<img src={require('../images/strength.png')} />)}
          {healingImg && (<img src={require('../images/healing.png')} />)}
        </div>  
        <Progress  bgcolor={"blue"} completed={healing} />
        <Progress  bgcolor={"red"} completed={damage} />
        <Progress  bgcolor={"green"} completed={health} />
        <button onClick={fetchMoveHandler}>Move</button>
        <button onClick={fetchFightHandler}>Fight</button>
        <button onClick={fetchFleeHandler}>Flee</button>
        <button onClick={fetchHealHandler}>Heal</button>
        <MyDialog open={gameover} props={"YOU LOST"}/>
        <MyDialog open={win}  props={"YOU WON"}/>
      </div>
    </div>  
  );
}
export default Game;