import "bootstrap/dist/css/bootstrap.min.css";

import VerifyingAuthorityPage from "../../components/VerifyingAuthorityPage";
import { NavBar } from "../../components/navbar";
import { Banner } from "./Banner";
import { Skills } from "./Feature";
import { Foooter } from "../../components/foooter";

export default function demo() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <div className="bg-white">
        <Skills />
        <Foooter />
      </div>
    </div>
  );
}
