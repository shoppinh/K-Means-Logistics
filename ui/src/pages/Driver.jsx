import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import driverApi from "../services/api/driver";

const Driver = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });
  const onSubmit = async(data) => {
    try{
      await driverApi.createDriver(data);
      reset();
      alert("Create driver successfully");
    }catch(err) {
      console.log("🚀 ~ file: Driver.jsx ~ line 23 ~ onSubmit ~ err", err)
      alert("Create driver failed");
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("name", { required: "This field cannot be empty" })}
          />
          <Form.Text className="text-danger">{errors?.name?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter driver's phone number"
            {...register("phoneNumber", {
              required: "This field cannot be empty",
            })}
          />
          <Form.Text className="text-danger">
            {errors?.phoneNumber?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Driver;
