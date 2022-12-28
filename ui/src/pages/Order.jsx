import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import driverApi from "../services/api/driver";

const Order = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orderDate: Date.now(),
      recipientName: "",
      recipientFullAddress: "",
      latitudeTo: "",
      longitudeTo: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      await driverApi.createDriver(data);
      reset();
      alert("Create order successfully");
    } catch (err) {
      alert("Create order failed");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formOrderDate">
          <Form.Label>Order Date </Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter order date"
            {...register("orderDate", {
              required: "This field cannot be empty",
              valueAsDate: true,
            })}
          />
          <Form.Text className="text-danger">
            {errors?.orderDate?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRecipientName">
          <Form.Label>Recipient Name</Form.Label>
          <Form.Control
            placeholder="Enter recipient name"
            {...register("recipientName", {
              required: "This field cannot be empty",
            })}
          />
          <Form.Text className="text-danger">
            {errors?.recipientName?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRecipientFullAddress">
          <Form.Label>Recipient Full Address</Form.Label>
          <Form.Control
            placeholder="Enter recipient full address"
            {...register("recipientFullAddress", {
              required: "This field cannot be empty",
            })}
          />
          <Form.Text className="text-danger">
            {errors?.recipientFullAddress?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLatitudeTo">
          <Form.Label>Latitude To</Form.Label>
          <Form.Control
            placeholder="Enter Latitude To"
            {...register("latitudeTo", {
              required: "This field cannot be empty",
              valueAsNumber: true,
            })}
          />
          <Form.Text className="text-danger">
            {errors?.latitudeTo?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLongitudeTo">
          <Form.Label>Longitude T</Form.Label>
          <Form.Control
            placeholder="Enter Longitude To"
            {...register("longitudeTo", {
              required: "This field cannot be empty",
              valueAsNumber: true,
            })}
          />
          <Form.Text className="text-danger">
            {errors?.longitudeTo?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Order;
