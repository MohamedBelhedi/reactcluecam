

// buttons und style

import 'react-bootstrap'
import './App.css';
import { Button } from "react-bootstrap";
import Page from './components/Page';


import { BrowserRouter as Router,Routes,NavLink ,Route} from 'react-router-dom';
import Datenschutz from './components/Datenschutz';
import Footer from './components/footer';

function App() {

 return(
<>

<Routes>
<Route path={"/"} element={<Page/>} exact></Route>
<Route path={"/datenschutz"}  element={<Datenschutz/>}></Route>
<Route></Route>
<Route></Route>

</Routes>

<Footer/>
</>
 )
}

export default App;