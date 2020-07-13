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
import restaurantLogin from "./components/restaurantLogin";
import restaurantProfile from "./components/restaurantProfile";
import DonateForm from "./components/DonateForm";

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
            key="restaurantLogin"
            component={restaurantLogin}
            title="restaurantLogin"
            initial={true}
          />
          <Scene
            hideNavBar="true"
            key="restaurantProfile"
            component={restaurantProfile}
            title="restaurantProfile"
          />
          <Scene
            hideNavBar="true"
            key="DonateForm"
            component={DonateForm}
            title="DonateForm"
            initial={true}
          />
        </Scene>
      </Router>
    );
  }
}
