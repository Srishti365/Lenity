import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  Form,
  Drawer,
  Item,
  Picker,
  Grid,
  Row,
  Col,
  Icon,
  Button,
  Label,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import Login from "./Login";
import CustomHeader from "./CustomHeader";
import AppFooter from "./AppFooter";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      deliverLocation: "",
      name: "",
      quantity: "",
      storage: "",
      croptype: "",
      storageLocs: [],
      searchLoc: {}
    };
  }
  handleSubmit = async () => {
    console.log("handlesubmitcalled");
    await AsyncStorage.removeItem("jwtToken");
    console.log("tokenremoved");
    Actions.reset("Login");
  };
  search = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    console.log("token", token);
    console.log("stateeee", this.state.location);
    let config = {
      headers: { Authorization: token },
      params: {
        location: this.state.location
      }
    };
    var response = await axios.get(
      "http://10.0.55.37:8080/findStorage",
      config
    );
    console.log("response received");
    console.log("storage response", response.data.storages);
    console.log("search loc:", response.data.search_location);
    this.setState(
      {
        searchLoc: response.data.search_location,
        storageLocs: response.data.storages
      },
      () => {
        console.log(
          "storage locs://///////////////////////////// ",
          this.state.storageLocs
        );
        console.log(
          "search locs:------------------------ ",
          this.state.searchLoc
        );
      }
    );
    // this.setState({ searchLoc: response.data.search_location }, () => {
    //   console.log("search locs: ", this.state.searchLoc);
    // });
    Actions.GMaps({
      strlocs: this.state.storageLocs,
      searchlocs: this.state.searchLoc
    });
  };

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
  };
  // closeDrawer = () => {
  //   this.drawer._root.close();
  // };
  // openDrawer = () => {
  //   this.drawer._root.open();
  // };

  render() {
    return (
      <Container>
        <CustomHeader />

        <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
          <Grid>
            <Row>
              <Col>
                <Item>
                  <Button transparent onPress={this.search}>
                    <Icon name="ios-search" />
                  </Button>

                  <Input
                    placeholder="Search for nearest cold storage facilities"
                    value={this.state.location}
                    onChangeText={val => this.setState({ location: val })}
                  />
                </Item>
                {/* <Form>
            <Item floatingLabel>
              <Icon active name="mail" />

              <Label>Name</Label>
              <Input
                value={this.state.name}
                onChangeText={val => this.setState({ name: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="lock" />

              <Label>location</Label>
              <Input
                value={this.state.deliverLocation}
                onChangeText={val => this.setState({ deliverLocation: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="lock" />

              <Label>Crop type</Label>
              <Input
                value={this.state.croptype}
                onChangeText={val => this.setState({ croptype: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="lock" />

              <Label>Quantity</Label>
              <Input
                value={this.state.quantity}
                onChangeText={val => this.setState({ quantity: val })}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="lock" />

              <Label>storage location</Label>
              <Input
                value={this.state.storage}
                onChangeText={val => this.setState({ storage: val })}
              />
            </Item>
            <Button
              rounded
              onPress={this.requestDelivery}
              style={{
                padding: 20,
                marginTop: 20,
                marginLeft: 100,
                width: 100
              }}
            >
              <Text>Request Delivery</Text>
            </Button>
          </Form> */}
              </Col>
            </Row>
          </Grid>
        </Content>
        <AppFooter />
      </Container>
    );
  }
}
