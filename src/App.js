import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Talent from "./pages/Talent";
import Supporters from "./pages/Supporters";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Airtable from "airtable";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
const base = new Airtable({ apiKey: "keyaU6R8fXqJODoNZ" }).base(
  "appUwhzMAK167hdBg"
);

function App() {
  const talentExpertiseOptions = [
    "Brand strategy & identity",
    "Product marketing",
    "Growth marketing",
    "Content marketing",
    "PR & Influencer",
    "CRM / Lifecycle marketing",
    "General management / business strategy",
    "Consumer / customer insights & analytics",
    "Art direction / graphic design",
    "Copywriting",
    "Innovation",
    "Partnerships",
    "Events & sponsorships",
    "UX design",
    "Search engine marketing & optimization",
    "Comms & media strategy",
    "Partnerships & business development",
    "Project management",
    "Art Direction / graphic design",
  ];

  const talentExperienceOptions = [
    "2-5",
    "5-7",
    "7-10",
    "10+",
    "1-2",
    "N/A - I work in a different business area",
  ];

  const supportersExpertiseOptions = [
    "Brand strategy & identity",
    "Product marketing",
    "Growth marketing",
    "Content marketing",
    "PR & Influencer",
    "CRM / Lifecycle marketing",
    "General management / business strategy",
    "Consumer / customer insights & analytics",
    "Art direction / graphic design",
    "Copywriting",
    "Innovation",
    "Partnerships",
    "Events & sponsorships",
    "Recruiting / hiring",
    "Diversity, equity, inclusion",
    "Art Direction / graphic design",
    "Diversity",
    "N/A - I'm a CEO / GM / MD",
    "UX design",
    "Search engine marketing & optimization",
    "Comms & media strategy",
    "White",
    "Partnerships & business development",
    "Project management",
  ];

  const supportersExperienceOptions = [
    "5-7",
    "7-10",
    "10-12",
    "12+",
    "N/A - I work in recruiting / hiring",
    "N/A - I work in diversity, equity, inclusion",
    "N/A - I work in a different business area",
    "N/A - I work in diversity",
    "N/A - I'm a CEO / GM / MD",
    "Brand strategy & identity",
    "Growth marketing",
    "Content marketing",
    "Innovation",
    "2-5",
  ];

  const trackingId = "UA-172908475-1";
  ReactGA.initialize(trackingId);

  const history = createBrowserHistory();

  history.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/talent">
            <Auth>
              <Header
                type="talent"
                logoSize={["3.5rem", "3.5rem", "3.5rem", "5rem", "5.5rem"]}
              />
              <Talent
                base={base}
                experienceOptions={talentExperienceOptions}
                expertiseOptions={talentExpertiseOptions}
              />
              <Footer />
            </Auth>
          </Route>
          <Route path="/supporters">
            <Auth>
              <Header
                type="supporters"
                logoSize={["3.5rem", "3.5rem", "3.5rem", "5rem", "5.5rem"]}
              />
              <Supporters
                base={base}
                experienceOptions={supportersExperienceOptions}
                expertiseOptions={supportersExpertiseOptions}
              />
              <Footer />
            </Auth>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
