import { ICategoryRequest } from "../interfaces/categories";
import { categoryRepository } from "../repositories/categoryRepository";
import { listAllCategoriesSchema, returnedCategorySchema } from "../schemas/categoriesSchema";

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

export { createCategoryService, listAllCategoriesService };