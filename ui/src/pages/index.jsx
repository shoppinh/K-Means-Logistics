import React, {useEffect, useState, useCallback} from "react";
import {
  Button, Container, Form
} from "react-bootstrap";

import driverApi from "../services/api/driver";
import kMeansApi from "../services/api/k-means";
import orderApi from "../services/api/order";
export default function KMeans() {
  const [commonState, setCommonState] = useState({
    drivers: [],
    orders:[],
    ordersSelected: [],
    driversSelected: [],

    orderValueSelected: "",
    orderIndexSelected: 0,
    driverValueSelected: "",
    driverIndexSelected: 0,

    strDriversSelected: "",
    strOrdersSelected: "",

    kmeansresult: [],
  })
  console.log("🚀 ~ file: index.jsx ~ line 25 ~ KMeans ~ commonState", commonState)


  const driverChange = useCallback((event)=> {
    const { value, selectedIndex } = event.target;
    setCommonState((prevState) => ({
      ...prevState,
      driverValueSelected: value,
      driverIndexSelected: selectedIndex,
    }));
  },[])

  function orderChange(event) {
    const { value, selectedIndex } = event.target;

    setCommonState((prevState) => ({
      ...prevState,
      orderValueSelected: value,
      orderIndexSelected: selectedIndex,
    }))
  }

  function selectDriver() {
    var data = commonState.driversSelected;
    var strDriversSelected = commonState.strDriversSelected;
    const exist = commonState.driversSelected.findIndex(item=> item.driverId=== commonState.driverValueSelected )
    
    if (exist === -1) {
      strDriversSelected +=
        commonState.drivers[commonState.driverIndexSelected].name + ", ";
      data.push({
        driverId: commonState.drivers[commonState.driverIndexSelected]._id,
        name: commonState.drivers[commonState.driverIndexSelected].name,
        phoneNumber: commonState.drivers[commonState.driverIndexSelected].phoneNumber,
      });
      setCommonState((prevState) => ({
        ...prevState,
          driversSelected: data,
          strDriversSelected: strDriversSelected,
      }));
    } else {
      alert("Driver is already selected");
    }
  }

  function selectOrder() {
    var data = commonState.ordersSelected;
    var strOrdersSelected = commonState.strOrdersSelected;
    const exist = commonState.ordersSelected.findIndex(item=> item.orderId=== commonState.orderValueSelected )

    if (exist === -1) {
      strOrdersSelected +=
        commonState.orders[commonState.orderIndexSelected].longitudeFrom +
        " - To " +
        commonState.orders[commonState.orderIndexSelected].longitudeTo +
        " - " +
        commonState.orders[commonState.orderIndexSelected]
          .orderDate +
        ", ";
      data.push({
        orderId: commonState.orders[commonState.orderIndexSelected]._id,
        orderDate: commonState.orders[commonState.orderIndexSelected].orderDate,
        longitudeFrom: commonState.orders[commonState.orderIndexSelected].longitudeFrom,
        latitudeFrom: commonState.orders[commonState.orderIndexSelected].latitudeFrom,
        longitudeTo: commonState.orders[commonState.orderIndexSelected].longitudeTo,
        latitudeTo: commonState.orders[commonState.orderIndexSelected].latitudeTo,

      });
      setCommonState((prevState) => ({
        ...prevState,
        ordersSelected: data,
        strOrdersSelected: strOrdersSelected}));
    } else {
      alert("Order is already selected");
    }
  }

  function clearAll() {
    setCommonState((prevState) => ({
      ...prevState,
      
        ordersSelected: [],
        driversSelected: [],
  
        orderValueSelected: "",
        orderIndexSelected: 0,
        driverValueSelected: "",
        driverIndexSelected: 0,
  
        strDriversSelected: "",
        strOrdersSelected: "",
        kmeansresult: [],
      }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    
    
    var data = {
      orders: commonState.ordersSelected,
      drivers: commonState.driversSelected,
    };

    try {
      const response = await kMeansApi.assignDriver(data);
      setCommonState((prevState) => ({
        ...prevState,
        kmeansresult: response
      }));
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 155 ~ handleSubmit ~ error", error)
    }
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const drivers = await driverApi.getDrivers();
      const orders = await orderApi.getOrders();
      setCommonState((prevState) => ({
        ...prevState,
        drivers: drivers,
        orders: orders.orders,
        }));
    };
    fetchData();
  }
  ,[])
    let kmeansresult = null;
    if (commonState.kmeansresult) {
      kmeansresult = commonState.kmeansresult?.map((dr) => {
        return (
          <div>
            <label>
              <u>Driver</u> : {dr.name}{":"}{dr.phoneNumber}
             
            </label>
            <br />
            <label>
              &nbsp;&nbsp;<u>Orders Assigned</u> :{" "}
            </label>
            <br />
            {dr.ordersAssigned.map((item) => {
              return (
                <div>
                  <label>
                    &nbsp;&nbsp;&nbsp;
                    {item.orderId +
                      " : " +
                      item.recipient_name +
                      " - " +
                      item.recipient_full_address}
                  </label>
                  <br />
                </div>
              );
            })}
            <p />
          </div>
        );
      });
    }
    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="driverSelection">
            <Form.Label>Driver</Form.Label>
            <Form.Select
              aria-label="Select driver"
              value={commonState.driverValue}
              onChange={driverChange}
            >
            {commonState.drivers.map((item) => {
              return (
                <option value={item._id} key={item._id}>{item.name}</option>
              );
            })}
            
              
            </Form.Select>
            <Button className="my-2" onClick={selectDriver}>
              Choose
            </Button>
            <Form.Text className="text-muted d-block">
              Selected Drivers: {commonState.strDriversSelected}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="orderSelection">
            <Form.Label>Order</Form.Label>
            <Form.Select
              aria-label="Select driver"
              value={commonState.orderValue}
              onChange={orderChange}
            >
              {commonState.orders.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                   { item._id + 
                      " - To "}
                    
                  </option>
                );
              })}
            </Form.Select>
            <Button className="my-2" onClick={selectOrder}>
              Choose
            </Button>

            <Form.Text className="text-muted d-block">
              Selected Orders: {commonState.strOrdersSelected}
            </Form.Text>
          </Form.Group>

          <Form.Text className="text-muted d-block">
            K-Means result: {kmeansresult}
          </Form.Text>

          <div className="my-2">
            <Button variant="danger" className="mx-2" onClick={clearAll}>
              Clear
            </Button>
            <Button variant="primary" type="submit" >
              Assign Orders using K-Means
            </Button>
          </div>
        </Form>
      </Container>
    );
  
}
