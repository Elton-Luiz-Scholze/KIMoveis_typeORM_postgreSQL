import { AppError } from "../errors/errors";
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

const listAllPropertiesByCategoryIdService = async (id: string) => {
    const findCategory = await categoryRepository.findOneBy({ id: id });

    if(!findCategory) {
        throw new AppError(404, "Category not found");
    }

    const category = await categoryRepository.findOne({
        where: {
            id: id
        },
        relations: {
                properties: {
                    address: true,
                    category: true
                }
            },
    });

    return category;
}

export { createCategoryService, listAllCategoriesService, listAllPropertiesByCategoryIdService };