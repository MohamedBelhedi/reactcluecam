

// buttons und style

import 'react-bootstrap'
import './App.css';
import { Button } from "react-bootstrap";
import Page from './components/Page';


import { BrowserRouter as Router,Routes,NavLink ,Route} from 'react-router-dom';
import Datenschutz from './components/Datenschutz';
import Footer from './components/footer';

function App() {
const NotFound=()=>{


  return(<h1>Falsch Raus hier</h1>)


}
 return(
<>

<Routes>
<Route path={"/reactcluecam"} element={<Page/>} exact></Route>
<Route path={"/datenschutz"}  element={<Datenschutz/>}></Route>
<Route path={"*"} element={<NotFound/>}></Route>
<Route></Route>
<Route></Route>

</Routes>

<Footer/>
</>
 )
}

export default App;
