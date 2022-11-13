import React, { useEffect, useState, useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import dayjs from 'dayjs';
import driverApi from "../services/api/driver";
import kMeansApi from "../services/api/k-means";
import orderApi from "../services/api/order";
import {debounce} from 'lodash'
export default function KMeans() {
  const [commonState, setCommonState] = useState({
    drivers: {},
    orders: {},
    ordersSelected: [],
    driversSelected: [],

    orderValueSelected: "",
    driverValueSelected: "",

    strDriversSelected: "",
    strOrdersSelected: "",

    kmeansresult: [],
  });
  console.log(
    "🚀 ~ file: index.jsx ~ line 25 ~ KMeans ~ commonState",
    commonState
  );

  const driverChange = useCallback((selected) => {
    const selectedValue = selected[0];
    setCommonState((prevState) => ({
      ...prevState,
      driverValueSelected: selectedValue?._id,
    }));
  }, []);

  function orderChange(selected) {
    const selectedValue = selected[0];
    setCommonState((prevState) => ({
      ...prevState,
      orderValueSelected: selectedValue?._id,
    }));
  }

  function selectDriver() {
    if (commonState.driverValueSelected) {
      const data = commonState.driversSelected;
      let strDriversSelected = commonState.strDriversSelected;
      const exist = commonState.driversSelected.findIndex(
        (item) => item.driverId === commonState.driverValueSelected
      );
  
      if (exist === -1) {
        strDriversSelected +=
          commonState.drivers[commonState.driverValueSelected].name + ", ";
        data.push({
          driverId: commonState.drivers[commonState.driverValueSelected]._id,
          name: commonState.drivers[commonState.driverValueSelected].name,
          phoneNumber:
            commonState.drivers[commonState.driverValueSelected].phoneNumber,
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

   
  }

  function selectOrder() {
    if (commonState.orderValueSelected)
     {
      const data = commonState.ordersSelected;
      let strOrdersSelected = commonState.strOrdersSelected;
      const exist = commonState.ordersSelected.findIndex(
        (item) => item.orderId === commonState.orderValueSelected
      );
  
      if (exist === -1) {
        strOrdersSelected +=
          commonState.orders[commonState.orderValueSelected].longitudeFrom +
          " - To " +
          commonState.orders[commonState.orderValueSelected].longitudeTo +
          " - " +
          dayjs(commonState.orders[commonState.orderValueSelected].orderDate).format("DD/MM/YYYY hh:mm") +
          ", ";
        data.push({
          orderId: commonState.orders[commonState.orderValueSelected]._id,
          orderDate: commonState.orders[commonState.orderValueSelected].orderDate,
          longitudeFrom:
            commonState.orders[commonState.orderValueSelected].longitudeFrom,
          latitudeFrom:
            commonState.orders[commonState.orderValueSelected].latitudeFrom,
          longitudeTo:
            commonState.orders[commonState.orderValueSelected].longitudeTo,
          latitudeTo:
            commonState.orders[commonState.orderValueSelected].latitudeTo,
          recipientName:
            commonState.orders[commonState.orderValueSelected].recipientName,
        });
        setCommonState((prevState) => ({
          ...prevState,
          ordersSelected: data,
          strOrdersSelected: strOrdersSelected,
        }));
      } else {
        alert("Order is already selected");
      }
     }
   
  }

  function clearAll() {
    setCommonState((prevState) => ({
      ...prevState,

      ordersSelected: [],
      driversSelected: [],

      orderValueSelected: "",
      driverValueSelected: "",

      strDriversSelected: "",
      strOrdersSelected: "",
      kmeansresult: [],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      orders: commonState.ordersSelected,
      drivers: commonState.driversSelected,
    };

    try {
      const response = await kMeansApi.assignDriver(data);
      setCommonState((prevState) => ({
        ...prevState,
        kmeansresult: response,
      }));
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 155 ~ handleSubmit ~ error",
        error
      );
    }
  }
  const fetchOrdersOptions = async (text)=> {
    try {
      const response = await orderApi.getOrders({text})
      let mappedOrders = {}
      response.orders.forEach((order, index) => {
        mappedOrders[order._id] = order
      })
      setCommonState((prevState) => ({
        ...prevState,
        orders: mappedOrders,
      }));
    }
    catch (error) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 155 ~ handleSubmit ~ error",
        error
      );
    }
  }

  const fetchDriversOptions = async (text)=> {
    try {
      const response = await driverApi.getDrivers({text})
      let mappedDrivers = {}
      response.drivers.forEach((driver, index) => {
        mappedDrivers[driver._id] = driver
      })
      setCommonState((prevState) => ({
        ...prevState,
        drivers: mappedDrivers,
      }));
    }
    catch (error) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 155 ~ handleSubmit ~ error",
        error
      );
    }
  }
  const debounceOrdersDropdown = useCallback(debounce((value)=> fetchOrdersOptions(value),1000),[])
  const handleOrdersInputChange = async (text, event)=> {
    debounceOrdersDropdown(text)
    
  }

  const debounceDriversDropdown = useCallback(debounce((value)=> fetchDriversOptions(value),1000),[])
  const handleDriversInputChange = async (text, event)=> {
    debounceDriversDropdown(text)
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const drivers = await driverApi.getDrivers();
      const orders = await orderApi.getOrders();
      
      let mappedDrivers = {}
      drivers.drivers.forEach((driver, index) => {
        mappedDrivers[driver._id] = driver
      })
      let mappedOrders = {}
      orders.orders.forEach((order, index) => {
        mappedOrders[order._id] = order
      })
      setCommonState((prevState) => ({
        ...prevState,
        drivers: mappedDrivers,
        orders: mappedOrders,
      }));
    };
    fetchData();
  }, []);
  let kmeansresult = null;
  if (commonState.kmeansresult) {
    kmeansresult = commonState.kmeansresult?.map((dr) => {
      return (
        <div>
          <label>
            <u>Driver</u> : {dr.name}
            {":"}
            {dr.phoneNumber}
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
                    item.recipientName + " when: " + dayjs(item.orderDate).format("DD/MM/YYYY hh:mm")
                    }
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
          <Typeahead
            id="basic-example"
            onChange={driverChange}
            options={Object.keys(commonState.drivers).map((item) => commonState.drivers[item])}
            placeholder="Choose a driver..."
            selected={commonState.driverValueSelected ? [commonState.drivers[commonState.driverValueSelected]] : []}
            labelKey="name"
            onInputChange={handleDriversInputChange}
          />
          <Button className="my-2" onClick={selectDriver}>
            Choose
          </Button>
          <Form.Text className="text-muted d-block">
            Selected Drivers: {commonState.strDriversSelected}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="orderSelection">
          <Form.Label>Order</Form.Label>
          <Typeahead
            id="basic-example"
            onChange={orderChange}
            options={Object.keys(commonState.orders).map((item) => commonState.orders[item])}
            placeholder="Choose a order..."
            selected={commonState.orderValueSelected ? [commonState.orders[commonState.orderValueSelected]] : []}
            labelKey="recipientName"
            onInputChange={handleOrdersInputChange}
            renderMenuItemChildren={(option, props, index) => (
              <>
                <div>{option.recipientName}</div>
                <div>{dayjs(option.orderDate).format("DD/MM/YYYY hh:mm")}</div>
              </>
            )}
          />
          
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
          <Button variant="primary" type="submit">
            Assign Orders using K-Means
          </Button>
        </div>
      </Form>
    </Container>
  );
}
