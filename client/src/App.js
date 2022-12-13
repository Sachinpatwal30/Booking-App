import { useContext } from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { AuthContext } from "./context/AuthContext/AuthContext";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";




function App() {

  const {user}= useContext(AuthContext);
 
  return (

      <Router>
        <Routes>

        <Route path="/"  element={ user ?  <Home />: <Login/> } />
        <Route path="/hotels" element={ user?  <List /> : <Login/> } />
        <Route path="/hotels/:id" element={ user ? <Hotel /> : <Login/>  } />
        <Route path="/login" element={<Login/>}  />

        </Routes>
      </Router>
  );
}

export default App;
