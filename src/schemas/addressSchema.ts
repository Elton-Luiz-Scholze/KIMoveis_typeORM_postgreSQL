import * as yup from "yup";
import { IAddressRequest } from "../interfaces/properties";

const createAddressesSchema: yup.SchemaOf<IAddressRequest> = yup.object().shape({
    district: yup.string().required(),
    zipCode: yup.string().required(),
    number: yup.string().notRequired(),
    city: yup.string().required(),
    state: yup.string().required()
});

export { createAddressesSchema };