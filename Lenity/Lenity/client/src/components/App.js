import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { SnackbarProvider } from "notistack";

import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import SignIn from "./SignIn";
import Signout from "./Signout";
import Dashboard from "./Dashboard";
import Verify from "./Verify";
import reducers from "../reducers";
import viewProfile from "./viewProfile";
import editProfile from "./editProfile";
import foodDonate from "./foodDonate";
import Donate from "./Donate";
import ExecutiveSignin from "./ExecutiveSignin";
import ExecutiveDashboard from "./ExecutiveDashboard";
import Chat from "./Chat/Chat";
import Search from "./Search";
import ItemDetail from "./ItemDetail";
import itemrequests from "./itemrequests";
import PaypalButtonApp from "./paypalbuttonapp";

import Pending from "./Pending";
import ItemDonate from "./ItemDonate";
import NgoDonate from "./NgoDonate";
import completedDeliveries from "./completedDeliveries";
var jwtToken = localStorage.getItem("JWT_TOKEN");
const App = () => {
  return (
    <div className="app">
      <Provider
        store={createStore(
          reducers,
          {
            auth: {
              token: jwtToken,
              isAuthenticated: jwtToken ? true : false
            }
          },
          applyMiddleware(reduxThunk)
        )}
      >
        <BrowserRouter>
          <div className="container-fluid">
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signout" component={Home} />
            <Route exact path="/verify" component={Verify} />
            <Route exact path="/viewProfile" component={viewProfile} />
            <Route exact path="/editProfile" component={editProfile} />
            <Route exact path="/foodDonate" component={foodDonate} />
            <Route exact path="/Donate" component={Donate} />
            <Route exact path="/executivesignin" component={ExecutiveSignin} />
            <Route exact path="/execdashboard" component={ExecutiveDashboard} />
            <Route
              exact
              path="/completedDeliveries"
              component={completedDeliveries}
            />

            <Route exact path="/search" component={Search} />
            <Route exact path="/ItemDetail" component={ItemDetail} />
            <Route exact path="/itemrequests" component={itemrequests} />
            <Route exact path="/pendingrequest" component={Pending} />
            <Route exact path="/ItemDonate" component={ItemDonate} />
            <Route exact path="/NgoDonate" component={NgoDonate} />
            <Route exact path="/payment" component={PaypalButtonApp} />


            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              {/* <Router history={history}> */}
              <Route exact path="/chat" component={Chat} />
              {/* </Router> */}
            </SnackbarProvider>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
