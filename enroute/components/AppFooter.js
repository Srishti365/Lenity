import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from "native-base";
import { Actions } from "react-native-router-flux";
export default class AppFooter extends Component {
  render() {
    return (
      <Container>
        <Content />
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                Actions.RequestForm();
              }}
              vertical
            >
              <Icon name="apps" />
              <Text>Request</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                Actions.ContactLenity();
              }}
            >
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
