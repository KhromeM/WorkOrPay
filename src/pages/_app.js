import React from "react";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import ContactPage from "./contact";
import PricingPage from "./pricing";
import DashboardPage from "./dashboard";
import AuthPage from "./auth";
import SettingsPage from "./settings";
import LegalPage from "./legal";
import ContractGenerate from "../components/BehindLogin/ContractGenerate";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Switch, Route, Router, useLocation } from "./../util/router";
import PurchasePage from "./purchase";
import PurchaseSinglePage from "./purchaseSingle";
import FirebaseActionPage from "./firebase-action";
import NotFoundPage from "./404";
import Footer from "./../components/Footer";
import "./../util/analytics";
import { AuthProvider } from "./../util/auth";
import { ThemeProvider } from "./../util/theme";
import { QueryClientProvider } from "./../util/db";
import Logo1 from "../resources/Logos/black.png";
import Logo2 from "../resources/Logos/white.png";

import "./transition.css";
import Contract from "../components/BehindLogin/DisplayContract";
import DisplayContract from "../components/BehindLogin/DisplayContract";

function MiniApp() {
  const location = useLocation();
  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="transition"
          timeout={300}
        >
          <div>
            <Switch location={location}>
              <Route exact path="/" component={IndexPage} />
              {/* <Route exact path="/about" component={AboutPage} /> */}
              <Route exact path="/faq" component={FaqPage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/pricing" component={PricingPage} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route
                exact
                path="/generatecontract"
                component={ContractGenerate}
              />
              <Route
                exact
                path="/displaycontract"
                component={DisplayContract}
              />
              <Route exact path="/auth/:type" component={AuthPage} />
              <Route exact path="/settings/:section" component={SettingsPage} />
              <Route exact path="/legal/:section" component={LegalPage} />
              <Route exact path="/purchase/:plan" component={PurchasePage} />
              <Route
                exact
                path="/purchasesingle/:plan"
                component={PurchaseSinglePage}
              />
              <Route
                exact
                path="/firebase-action"
                component={FirebaseActionPage}
              />
              <Route component={NotFoundPage} />
            </Switch>
            <Footer
              bgColor="light"
              size="normal"
              bgImage=""
              bgImageOpacity={1}
              description="A short description of what you do here"
              copyright={`© ${new Date().getFullYear()} Envariable`}
              logo={Logo1}
              logoInverted={Logo2}
              sticky={true}
            />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
function App(props) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Navbar color="default" logo={Logo1} logoInverted={Logo2} />
            <MiniApp />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
