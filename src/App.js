import { useState } from "react";// eslint-disable-next-line
import styles from "./App.module.css";
import { Home, Category, Navbar, NotFound, Search, Cast } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [searchedResult, setSearchedResult] = useState();
  // eslint-disable-next-line
  const [category, setCategory] = useState();

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <Navbar setCategory={setCategory} setSearchedResult={setSearchedResult} />

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:category" element={<Search searchedResult={searchedResult} />} />
          <Route path="/:category/:id" element={<Category />} />
          <Route path="/:category/:id/cast" element={<Cast />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
