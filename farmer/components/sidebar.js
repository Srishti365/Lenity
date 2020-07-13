import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Button, Row, Col } from "native-base";
export default class SideBar extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <Container
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <Button
          transparent
          style={{
            borderBottomColor: "grey"
          }}
          onPress={() => Actions.Profile()}
        >
          <Text>Profile</Text>
        </Button>

        <Button
          transparent
          style={{
            borderTopColor: "grey",
            borderBottomColor: "grey"
          }}
          onPress={() => Actions.DelForm()}
        >
          <Text>RequestForm</Text>
        </Button>
      </Container>
    );
  }
}
