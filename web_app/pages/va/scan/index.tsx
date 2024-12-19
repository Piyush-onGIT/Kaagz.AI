import "bootstrap/dist/css/bootstrap.min.css";

import { Skills } from "./Feature";
import { NavBar } from "../../../components/navbar";
import ScannerPage from "./ScannerPage";
import { Foooter } from "../../../components/foooter";

export default function demo() {
  return (
    <div className="App">
      <NavBar />

      <div className="bg-white mt-20">
        <ScannerPage />
        <Foooter />
      </div>
    </div>
  );
}
