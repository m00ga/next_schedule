"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { AnyObject, ObjectSchema } from "yup";

const Form = ({
    children,
    schema,
    onSubmit,
}: {
    children: ReactNode;
    schema: ObjectSchema<AnyObject>;
    onSubmit: (data: object, reset: () => void) => Promise<void>;
}) => {
    const methods = useForm({ resolver: yupResolver(schema) });
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => onSubmit(data, methods.reset))}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
