"use client";

import { FormProvider, useFormContext } from "react-hook-form";

const Form = FormProvider;

function useFormField() {
  const { getFieldState, formState } = useFormContext();
  return { getFieldState, formState };
}

export { Form, useFormField };
