import * as yup from "yup";
import { ICategoryRequest } from "../interfaces/categories";

const createCategorySchema: yup.SchemaOf<ICategoryRequest> = yup.object().shape({
    name: yup.string().required()
});

const returnedCategorySchema: yup.SchemaOf<ICategoryRequest> = yup.object().shape({
    name: yup.string().notRequired(),
    id: yup.string().notRequired()
});

const listAllCategoriesSchema: yup.SchemaOf<ICategoryRequest[]> = yup.array(returnedCategorySchema);

export { createCategorySchema, returnedCategorySchema, listAllCategoriesSchema };