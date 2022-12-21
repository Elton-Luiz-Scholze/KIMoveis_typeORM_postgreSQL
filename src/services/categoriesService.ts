import { ICategoryRequest } from "../interfaces/categories";
import { categoryRepository } from "../repositories/categoryRepository";
import { returnedCategorySchema } from "../schemas/categoriesSchema";

const createCategoryService = async (data: ICategoryRequest): Promise<ICategoryRequest>=> {  
    const createCategory = categoryRepository.create(data);
        
    await categoryRepository.save(createCategory);
    
    const returnedCategory = await returnedCategorySchema.validate(createCategory, {
        stripUnknown: true
    });
    
    return returnedCategory;
}

export { createCategoryService };