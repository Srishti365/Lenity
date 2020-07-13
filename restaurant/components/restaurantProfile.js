import React from "react";
import { Alert, View, Text, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Form,
  Icon,
  Item,
  Label,
  Input,
  Title,
  Content
} from "native-base";
import { Actions } from "react-native-router-flux";
import CustomHeader from "./CustomHeader";
import AppFooter from "./AppFooter";
import axios from "axios";

export default class restaurantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: "",
      applied: ""
    };
  }

  handleSubmit1 = () => {
    this.handleSubmit();
  };

  handleSubmit = async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    var response = await axios.post(
      "http://10.0.55.37:8080/restaurant/applycoupon",
      {
        coupon: this.state.coupon
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log(response.data);
  };
  showAlert() {
    Alert.alert(
      "Request Received",
      "Our team would shortly get in touch with you.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Actions.reset("restaurantProfile") }
      ]
    );
  }
  handleLogout = async () => {
    console.log("handlesubmitcalled");
    await AsyncStorage.removeItem("jwtToken");
    console.log("tokenremoved");
    Actions.reset("restaurantLogin");
  };
  render() {
    return (
      <Container>
        <CustomHeader />
        <Content>
          <Form>
            <Item floatingLabel>
              <Icon active name="barcode" />

              <Label>Coupon</Label>
              <Input
                value={this.state.coupon}
                onChangeText={val => this.setState({ coupon: val })}
              />
            </Item>
            <Button
              rounded
              onPress={this.handleSubmit1}
              style={{
                padding: 20,
                marginTop: 20,
                marginLeft: 100,
                width: 100
              }}
            >
              <Text>Redeem</Text>
            </Button>
          </Form>
        </Content>
        <AppFooter />
      </Container>
    );
  }
}
