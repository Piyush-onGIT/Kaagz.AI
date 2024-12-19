import "bootstrap/dist/css/bootstrap.min.css";

import { Skills } from "./Feature";
// import { Navbar } from "react-bootstrap";
import { NavBar } from "../../../components/navbar";
import { Foooter } from "../../../components/foooter";

export default function demo() {
  return (
    <div className="App">
      <NavBar />
      <div className="bg-white mt-[200px]">
        <Skills />
        <Foooter />
      </div>
    </div>
  );
}
