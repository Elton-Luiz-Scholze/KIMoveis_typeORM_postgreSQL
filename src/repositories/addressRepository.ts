import AppDataSource from "../data-source";
import { Addresses } from "../entities/addressesEntity";

const addressRepository = AppDataSource.getRepository(Addresses);

export { addressRepository };