import React, { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { Actions } from "react-native-router-flux";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
export default class CustomHeader extends Component {
  render() {
    const { onOpen } = this.props;

    return (
      <Container>
        <Header style={{ paddingTop: StatusBar.currentHeight }}>
          <Left>
            <Button transparent onPress={onOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>EnRoute</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>

            <Button transparent onPress={() => Actions.reset("TruckLogin")}>
              <Icon name="ios-power" />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
