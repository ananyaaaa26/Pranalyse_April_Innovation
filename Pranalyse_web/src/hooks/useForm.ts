import { useState } from "react";

export function useForm(initialState: any) {
  const [values, setValues] = useState(initialState);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { values, handleChange };
}