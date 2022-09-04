import { Home, Category, SharedLayout, Detail, Error } from "./containers/";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />}></Route>
            <Route path='/:category' element={<Category />}></Route>
            <Route path='/:category/:id' element={<Detail />}></Route>
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
        {/* <ToastContainer position='top-right' autoClose={1500} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
