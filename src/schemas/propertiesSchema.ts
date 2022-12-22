import * as yup from "yup";
import { IPropertyRequest } from "../interfaces/properties";

const createPropertySchema: yup.SchemaOf<IPropertyRequest> = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object().shape({ 
        district: yup.string().required(),
        zipCode: yup.string().max(8).required(),
        number: yup.string().notRequired(),
        city: yup.string().required(),
        state: yup.string().max(2).required()
    }),
    categoryId: yup.string().required()
});

const returnPropertySchema = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object().shape({ 
        id: yup.string().required(),
        district: yup.string().required(),
        zipCode: yup.string().required(),
        number: yup.string().notRequired(),
        city: yup.string().required(),
        state: yup.string().required()
    }),
    category: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required()
    }),
    id: yup.string().required(),
    sold: yup.boolean().required(),
    createdAt: yup.string().required(),
    updatedAt: yup.string().required()
});

export { createPropertySchema, returnPropertySchema };