import React from "react";
import { View, Text } from "react-native";
import { AppLoading } from "expo";
import { Router, Scene } from "react-native-router-flux";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content
} from "native-base";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SearchStorage from "./components/SearchStorage";
import GMaps from "./components/GMaps";
import DelForm from "./components/DelForm";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      // <Container>
      //   <CustomHeader />

      //   <EnquiryForm />
      //   <AppFooter />
      // </Container>
      <Router>
        <Scene key="root">
          <Scene
            hideNavBar="true"
            key="Login"
            component={Login}
            title="Login"
            initial={true}
          />
          <Scene
            hideNavBar="true"
            key="Profile"
            component={Profile}
            title="Profile"
          />
          <Scene
            hideNavBar="true"
            key="SearchStorage"
            component={SearchStorage}
            title="SearchStorage"
          />
          <Scene
            hideNavBar="true"
            key="GMaps"
            component={GMaps}
            title="GMaps"
          />
          <Scene
            hideNavBar="true"
            key="DelForm"
            component={DelForm}
            title="DelForm"
          />
        </Scene>
      </Router>
    );
  }
}
