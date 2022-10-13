import { BrowserRouter,Routes, Route } from "react-router-dom";
import Launch from "./components/Launch";
import Pledge from "./components/Pledge";
import Unpledge from "./components/Unpledge";
import Buy from "./components/Buy";

function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route index element={<Launch />} />
      <Route path="pledge" element={<Pledge />} />
      <Route path="unpledge" element={<Unpledge />} />
      <Route path="buy" element={<Buy />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;