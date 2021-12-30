import { useState } from "react";// eslint-disable-next-line
import styles from "./App.module.css";
import { Home, Category, Navbar, NotFound, Search, Cast } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [searchedResult, setSearchedResult] = useState();  

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <Navbar setSearchedResult={setSearchedResult} />

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search searchedResult={searchedResult} />} />
          <Route path="/:category/:id" element={<Category />} />
          <Route path="/:category/:id/cast" element={<Cast />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
