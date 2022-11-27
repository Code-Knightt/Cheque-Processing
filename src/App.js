import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/Home";
import Processing from "./Pages/Processing";
import Submitted from "./Pages/Submitted";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/submitted" element={<Submitted />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
