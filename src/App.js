import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Talent from "./pages/Talent";
import Supporters from "./pages/Supporters";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Airtable from "airtable";
import ReactGA from "react-ga";
const base = new Airtable({ apiKey: "keybCrU5yM6hEI8rc" }).base(
  "appUwhzMAK167hdBg"
);

function App() {
  const trackingId = "UA-172908475-1";
  ReactGA.initialize(trackingId);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/talent">
            <Auth>
              <Header
                type="talent"
                logoSize={["3.5rem", "3.5rem", "3.5rem", "5rem", "5.5rem"]}
              />
              <Talent base={base} title="Talent of Color Gallery — hue" />
              <Footer />
            </Auth>
          </Route>
          <Route path="/supporters">
            <Auth>
              <Header
                type="supporters"
                logoSize={["3.5rem", "3.5rem", "3.5rem", "5rem", "5.5rem"]}
              />
              <Supporters base={base} title="Supporter Gallery — hue" />
              <Footer />
            </Auth>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
