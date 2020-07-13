import React from "react";
import { View, AsyncStorage } from "react-native";
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
  Input,
  Text,
  Drawer,
  List,
  ListItem
} from "native-base";
import { Actions } from "react-native-router-flux";
import TruckLogin from "./TruckLogin";
import CustomHeader from "./CustomHeader";
import SideBar from "./sidebar";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      truck_agent: {},
      truck_data: {},
      selectedCrop: {},
      pendingRequests: {}
    };
  }
  handleSubmit = async () => {
    console.log("handlesubmitcalled");
    await AsyncStorage.removeItem("jwtToken");
    console.log("tokenremoved");
    Actions.reset("TruckLogin");
  };
  // search = async () => {
  //   const token = await AsyncStorage.getItem("jwtToken");
  //   console.log("token", token);
  //   console.log("stateeee", this.state.location);
  //   let config = {
  //     headers: { Authorization: token },
  //     params: {
  //       location: this.state.location
  //     }
  //   };
  //   var response = await axios.get(
  //     "http://192.168.42.130:8080/findStorage",
  //     config
  //   );
  //   console.log("response received");
  //   console.log("storage response", response);
  // };

  // requestDelivery = async () => {
  //   const token = await AsyncStorage.getItem("jwtToken");
  //   console.log("token", token);

  //   var response = await axios.post(
  //     "http://192.168.42.130:8080/findStorage/confirm",
  //     {
  //       name: this.state.name,
  //       location: this.state.deliverLocation,
  //       quantity: this.state.quantity,
  //       storage: this.state.storage
  //     },

  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: token
  //       }
  //     }
  //   );
  //   console.log("confirmmmm response", response);
  // };
  componentDidMount() {
    this.getrequests();
  }

  getrequests = async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    var response = await axios.get("http://10.0.55.37:8080/delivery", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    console.log("response received truck", response.data);
    this.setState(
      { truck_data: response.data.truck_data, isLoading: false },
      () => {
        //console.log(this.state.user.email);
        console.log("state now", this.state.truck_data);
        console.log(this.state.isLoading, "..state updated");
      }
    );

    this.state.truck_data.map((x, index) =>
      console.log("indivifdual", x.location)
    );
  };

  // getpendingRequests = async () => {
  //   const token = await AsyncStorage.getItem("jwtToken");

  //   var response = await axios.get(
  //     "http://192.168.42.130:8080/delivery/pending",
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: token
  //       }
  //     }
  //   );
  //   console.log("response received pending", response.data);
  //   this.setState({ pendingRequests: response.data }, () => {
  //     //console.log(this.state.user.email);
  //     console.log("state now of pending-----", this.state.pendingRequests);
  //     console.log(
  //       "state now of pending deievres-----",
  //       this.state.pendingRequests.deliveries
  //     );
  //   });

  //   this.state.pendingRequests.deliveries.map((x, index) =>
  //     console.log("indivifdual pending", x.location)
  //   );
  //   Actions.PendingDeliveries({
  //     pendingdeliveries: this.state.pendingRequests.deliveries
  //   });
  // };

  getpendingRequests = () => {
    Actions.PendingDeliveries();
  };

  request = async (event, value) => {
    const token = await AsyncStorage.getItem("jwtToken");

    console.log("button pressed", value);
    var response = await axios.post(
      "http://10.0.55.37:8080/delivery",
      {
        id: value
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log("response crop type item", response.data.details.cropType);
    this.setState({ selectedCrop: response.data.details }, () => {
      //console.log(this.state.user.email);
      console.log("state now of selected crop", this.state.selectedCrop);
    });
    Actions.RequestDetails({ details: this.state.selectedCrop });
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    if (!this.state.isLoading) {
      var rendered = this.state.truck_data.map(data => {
        if (!(data.status || data.confirm_status)) {
          return (
            <Button
              transparent
              key={data._id}
              value={data._id}
              onPress={event => this.request(event, data._id)}
            >
              <Text>Pickup Location:{data.location}</Text>
              <Text>Requestor:{data.name}</Text>
            </Button>
          );
        }
      });
      return (
        <Container>
          <Drawer
            ref={ref => {
              this.drawer = ref;
            }}
            content={<SideBar onClose={this.closeDrawer} />}
            onClose={() => this.closeDrawer()}
          >
            <CustomHeader title={"Scene1"} onOpen={this.openDrawer} />
            <Content>
              <View>
                <Text>Requests based on your Location</Text>
              </View>
              <View>{rendered}</View>
            </Content>
          </Drawer>
        </Container>
      );
    } else {
      return <Text>Loading...</Text>;
    }

    // return (
    //   <Container>
    //     <Header />
    //     <Content>
    //       <Text>Hello welcome</Text>
    //       <Text>
    //         {!this.state.isLoading ? (
    //           <Text>
    //             {this.state.truck_data.map((data, index) => (
    //               <List>
    //                 {!(data.status || data.confirm_status) ? (
    //                   <ListItem>
    //                     <Text>{data.location}</Text>
    //                   </ListItem>
    //                 ) : (
    //                   <Text>emoty</Text>
    //                 )}
    //               </List>
    //             ))}
    //           </Text>
    //         ) : (
    //           <Text>Loading...</Text>
    //         )}
    //       </Text>

    //       <Button rounded light onPress={this.handleSubmit}>
    //         <Text>Logout</Text>
    //       </Button>
    //     </Content>
    //   </Container>
    // );
  }
}
