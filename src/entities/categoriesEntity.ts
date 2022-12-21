import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./propertiesEntity";

@Entity()
class Categories {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    name: string

    @OneToMany(() => Properties, properties => properties.category)
    property: Properties[]
}


export { Categories };