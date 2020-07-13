import React, { Component } from "react";
import { Alert, AsyncStorage, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Drawer,
  Button,
  Text
} from "native-base";
import axios from "axios";
import AppFooter from "./AppFooter";
import CustomHeader from "./CustomHeader";
import { Actions } from "react-native-router-flux";
import SideBar from "./sidebar";

export default class DonateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: null
    };
  }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
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
        { text: "OK", onPress: () => Actions.pop() }
      ]
    );
  }
  onValueChange2 = (itemvalue, position) => {
    this.setState({
      selectValue: itemvalue
    });
  };

  handleSubmit = e => {
    //e.preventDefault();
    //console.log(this.state);
    this.reqToLenity();
    Actions.reset("restaurantProfile");
  };
  reqToLenity = async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    var res = await axios.post(
      "http://10.0.55.37:8080/restaurant/donate",
      {
        quantity: this.state.quantity
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log(res.data);
  };
  render() {
    return (
      <Container>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar onClose={this.closeDrawer} />}
          onClose={() => this.closeDrawer()}
        >
          <CustomHeader title={"Scene2"} onOpen={this.openDrawer} />
          <View>
            <Form>
              <Item floatingLabel>
                <Label>Quantity</Label>
                <Input
                  value={this.state.quantity}
                  onChangeText={val => this.setState({ quantity: val })}
                />
              </Item>
              <Button
                rounded
                light
                style={{ marginTop: 10 }}
                onPress={this.handleSubmit}
              >
                <Text>Donate to Lenity</Text>
              </Button>
            </Form>
          </View>
          <AppFooter />
        </Drawer>
      </Container>
    );
  }
}
