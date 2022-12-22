import { AppError } from "../errors/errors";
import { ICategoryRequest } from "../interfaces/categories";
import { categoryRepository } from "../repositories/categoryRepository";
import { propertyRepository } from "../repositories/propertyRepository";
import { listAllCategoriesSchema, returnedCategorySchema } from "../schemas/categoriesSchema";
import { returnAllPropertiesSchema } from "../schemas/propertiesSchema";

const createCategoryService = async (data: ICategoryRequest): Promise<ICategoryRequest>=> {  
    const createCategory = categoryRepository.create(data);
        
    await categoryRepository.save(createCategory);
    
    const returnedCategory = await returnedCategorySchema.validate(createCategory, {
        stripUnknown: true
    });
    
    return returnedCategory;
}

const listAllCategoriesService = async () => {
    const allCategories = await categoryRepository.find();

    const returnedAllCategories = await listAllCategoriesSchema.validate(allCategories, {
        stripUnknown: true
    });

    return returnedAllCategories;
}

const listAllPropertiesByCategoryIdService = async (id: string) => {
    console.log(id)

    const findCategory = await categoryRepository.findOneBy({ id: id });

    if(!findCategory) {
        throw new AppError(404, "Category not found");
    }

    const properties = await propertyRepository.find({
        where: {
            category: {
                id: id
            }
        },
        relations: {
            address: true,
            category: true
        }
    });

    const returnedProperties = await returnAllPropertiesSchema.validate(properties, {
        stripUnknown: true
    });

    return returnedProperties;
}

export { createCategoryService, listAllCategoriesService, listAllPropertiesByCategoryIdService };