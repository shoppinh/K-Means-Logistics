import React from 'react'

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
      alert("Create driver failed");
    }
  }
  return (
    <div>Driver</div>
  )
}

export default Driver