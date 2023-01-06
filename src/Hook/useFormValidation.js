import { useState, useEffect } from "react";

function useFormValidation(
  initialState,
  validateFunc,
  sendSubmit,
  { ...props }
) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  //trang thai truoc khi gui
  const [isNotValid, setIsNotValid] = useState(true);

  useEffect(() => {
    const noErrors = Object.values(errors).every((val) => val === "");
    //van chua co field chua nhap
    const someValues = Object.values(values).some((val) => val === "");

    //TH ko có lỗi (thì kiểm tra lại lần nữa)
    if (noErrors) {
      //TH chưa nhập gì hết đã bấm gửi
      if (someValues) {
        //console.log("Có cái chưa nhập");
        setIsNotValid(true);
      } else {
        //console.log("i allow");
        // đã nhập thông tin đầy đủ và ko có lỗi
        setIsNotValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessages = validateFunc(name, value);
    //const noErrors = Object.values(errors).every((val) => val === "");
    /* if (noErrors) {
      setIsNotValid(true);
    } else {
      setIsNotValid(false);
    } */
    //ko cần vì error thay đổi sẽ kích hoạt effect thay đổi isNotValid

    setErrors({
      ...errors,
      [name]: errorMessages,
    });
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();

    // kiểm tra validate rồi submit

    for (const key in values) {
      const errorMessages = validateFunc(key, values[key]);

      setErrors({
        ...errors,
        [key]: errorMessages,
      });
      console.log(errors);
    }

    if (isNotValid) {
      // console.log("REJECT found:", errors.taiKhoan, errors.matKhau);
      alert("Có lỗi trong việc xác thực dữ liệu");
    } else {
      // console.log("SUBMIT authenticated!", values.taiKhoan, values.matKhau);
      //console.log(props.history);

      sendSubmit(data, props.history);
    }
  };

  return {
    handleBlur,
    handleChange,
    values,
    errors,
    isNotValid,
    handleSubmit,
  };
}

export default useFormValidation;
