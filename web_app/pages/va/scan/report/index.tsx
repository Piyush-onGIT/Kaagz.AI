import "bootstrap/dist/css/bootstrap.min.css";

import { Skills } from "./Feature";
import { NavBar } from "../../../../components/navbar";
import { Foooter } from "../../../../components/foooter";

export default function demo() {
  return (
    <div className="App">
      <NavBar />
      
      <div className="mt-[80px] p-[80px] flex justify-center">
        <h1>Verification Report</h1>
      </div>
      <div className="bg-white">
        <Skills />
        <Foooter />
      </div>
    </div>
  );
}
