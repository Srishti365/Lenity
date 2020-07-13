import React from "react";
import { View, Text, AsyncStorage, Alert } from "react-native";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Button,
  Label,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import CustomHeader from "./CustomHeader";
import { AppFooter } from "./AppFooter";

export default class DelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      deliverLocation: "",
      name: "",
      quantity: "",
      storage: "",
      croptype: ""
    };
  }

  componentDidMount() {
    this.setState({ storage: this.props.name1 }, () => {
      console.log("name: ", this.state.name);
    });
  }

  requestDelivery = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    console.log("token", token);

    var response = await axios.post(
      "http://10.0.55.37:8080/findStorage/confirm",
      {
        name: this.state.name,
        location: this.state.deliverLocation,
        quantity: this.state.quantity,
        storage: this.state.storage,
        cropType: this.state.croptype
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log("confirmmmm response", response);
    Actions.reset("Profile");
    //this.showAlert1();
  };

  showAlert1() {
    Alert.alert(
      "Request Received",
      "Our team would shortly get in touch with you.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Actions.reset("Profile") }
      ]
    );
  }

  render() {
    return (
      <Container>
        <CustomHeader />
        <Content>
          <Text style={{ fontSize: 25 }}>FILL THE FORM TO REQUEST PICKUP</Text>
          <Form>
            <Item floatingLabel>
              <Icon active name="person" />

              <Label>Name</Label>
              <Input
                value={this.state.name}
                onChangeText={val => this.setState({ name: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="ios-pin" />

              <Label>Pickup Location</Label>
              <Input
                value={this.state.deliverLocation}
                onChangeText={val => this.setState({ deliverLocation: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="ios-rose" />

              <Label>Crop type</Label>
              <Input
                value={this.state.croptype}
                onChangeText={val => this.setState({ croptype: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="ios-add-circle" />

              <Label>Quantity(in kgs)</Label>
              <Input
                value={this.state.quantity}
                onChangeText={val => this.setState({ quantity: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="ios-pin" />

              <Label>storage location</Label>
              <Input
                value={this.state.storage}
                onChangeText={val => this.setState({ storage: val })}
              />
            </Item>
            <Button
              rounded
              dark
              onPress={this.requestDelivery}
              style={{
                paddingLeft: 45,
                marginTop: 20,
                marginLeft: 100,
                width: 200
              }}
            >
              <Text style={{ color: "white" }}>Request Delivery</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
