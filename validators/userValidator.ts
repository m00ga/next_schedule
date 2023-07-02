import * as yup from "yup";

const loginValidation = yup.string().required("Login required!");
const passwordValidation = yup
    .string()
    .min(8)
    .matches(
        /^(?:.*[A-z])(?:.*[\d])$/,
        "Password must have at least 1 number and symbol"
    )
    .required("Password required!");

export type userLoginType = {
    login: string;
    password: string;
};

export const userLoginValidator: yup.ObjectSchema<userLoginType> = yup.object({
    login: loginValidation,
    password: passwordValidation,
});

export type userRegisterType = {
    login: string;
    password: string;
    name: string;
    image: string;
};

export const userRegisterValidator: yup.ObjectSchema<userRegisterType> =
    yup.object({
        login: loginValidation,
        password: passwordValidation,
        name: yup.string().required("Name required"),
        image: yup.string().required("Image required"),
    });
