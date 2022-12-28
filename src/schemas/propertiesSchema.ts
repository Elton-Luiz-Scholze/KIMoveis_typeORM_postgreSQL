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
    value: yup.number().notRequired(),
    size: yup.number().notRequired(),
    address: yup.object().shape({ 
        id: yup.string().notRequired(),
        district: yup.string().notRequired(),
        zipCode: yup.string().notRequired(),
        number: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().notRequired()
    }),
    category: yup.object().shape({
        id: yup.string().notRequired(),
        name: yup.string().notRequired()
    }),
    id: yup.string().notRequired(),
    sold: yup.boolean().notRequired(),
    createdAt: yup.string().notRequired(),
    updatedAt: yup.string().notRequired()
});

const returnAllPropertiesSchema = yup.array(returnPropertySchema);

export { createPropertySchema, returnPropertySchema, returnAllPropertiesSchema };