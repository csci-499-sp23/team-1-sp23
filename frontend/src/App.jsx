import { Routes, Route } from "react-router-dom";
import {
  HomepageContainer,
  LoginContainer,
  SignupContainer,
  MapContainer,
  ProfileContainer,
  NeighborhoodContainer,
  SchoolpageContainer,
  NotFound
} from "./components/containers";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
        <Route path="/signup" element={<SignupContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/map" element={<MapContainer />}>
          <Route index element={<MapContainer />} />
          <Route path=":place" element={<Card />} />
        </Route>
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="/school/:schoolName" element={<SchoolpageContainer />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;
