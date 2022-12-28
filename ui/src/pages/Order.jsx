import React from 'react'

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
    <div>Order</div>
  )
}

export default Order