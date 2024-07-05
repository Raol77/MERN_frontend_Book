import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SinglePage from "./Pages/SinglePage";
import CreateBook from "./Pages/CreateBook";
import EditPage from "./Pages/EditPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books/:id" element={<SinglePage></SinglePage>}></Route>
          <Route path="/books" element={<CreateBook></CreateBook>}></Route>
          <Route path="/edit/:id" element={<EditPage></EditPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
