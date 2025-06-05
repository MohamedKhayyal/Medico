import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <div>
      <BrowserRouter>
     <Navbar/>
      </BrowserRouter>
    </div>
  )
}
