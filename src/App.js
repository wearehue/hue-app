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
    "Diversity",
    "equity",
    "inclusion",
  ];

  const talentExperienceOptions = [
    "2-5",
    "5-7",
    "7-10",
    "10+",
    "Option One",
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
    "Option One",
    "Option Two",
    "Art Direction / graphic design",
    "Diversity",
    "equity",
    "inclusion",
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
    "Option One",
    "N/A - I work in diversity",
    "equity",
    "inclusion",
    "N/A - I'm a CEO / GM / MD",
    "Brand strategy & identity",
    "Growth marketing",
    "Content marketing",
    "Innovation",
    "2-5",
  ];

  const trackingId = "UA-1234567890-1";
  ReactGA.initialize(trackingId);

  const history = createBrowserHistory();

  history.listen((location) => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/talent">
            <Auth>
              <Header
                type="talent"
                logoSize={["3.5rem", "3.5rem", 20, 90, 100]}
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
                logoSize={["3.5rem", "3.5rem", 20, 90, 100]}
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
