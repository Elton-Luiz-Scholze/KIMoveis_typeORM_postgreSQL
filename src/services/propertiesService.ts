import { AppError } from "../errors/errors";
import { IPropertyRequest } from "../interfaces/properties";
import { addressRepository } from "../repositories/addressRepository";
import { categoryRepository } from "../repositories/categoryRepository";
import { propertyRepository } from "../repositories/propertyRepository";
import { returnPropertySchema } from "../schemas/propertiesSchema";

const createPropertyService = async (data:IPropertyRequest) => {
    const { address, categoryId } = data;

    const findAddress = await addressRepository.findOneBy({ number: address.number });
    
    if(findAddress) {
        throw new AppError(409, "Address already exists");
    }

    const newAddress = addressRepository.create(address);
    await addressRepository.save(newAddress);
    
    const findCategory = await categoryRepository.findOneBy({id: categoryId});
    
    if(!findCategory) {
        throw new AppError(404, "Category not found");
    }

    const newProperty = propertyRepository.create({
        ...data,
        address: newAddress,
        category: findCategory
    });

    await propertyRepository.save(newProperty);

    const returnedNewProperty = await returnPropertySchema.validate(newProperty, {
        stripUnknown: true
    });

    return returnedNewProperty;
}

export { createPropertyService };