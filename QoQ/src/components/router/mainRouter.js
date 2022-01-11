import { Routes, Route } from "react-router-dom";
import Home from '../Home'
import Game from '../Game'


export default function MainRouter(){
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route  exact path={"/game/:id"} element={<Game/>} render={(props)=><Game {...props} />} />
        </Routes>
    )
}
