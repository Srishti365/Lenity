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
          backgroundColor: "white",
          paddingTop: 40
        }}
      >
        <Button
          transparent
          style={{
            borderBottomColor: "grey"
          }}
          onPress={() => Actions.Profile()}
        >
          <Text>Dashboard </Text>
        </Button>

        <Button
          transparent
          style={{
            borderTopColor: "grey",
            borderBottomColor: "grey"
          }}
          onPress={() => Actions.PendingDeliveries()}
        >
          <Text>Complete Pending Deliveries </Text>
        </Button>
      </Container>
    );
  }
}
