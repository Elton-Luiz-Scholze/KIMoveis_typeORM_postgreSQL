import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addresses } from "./addressesEntity";
import { Categories } from "./categoriesEntity";
import { Schedules_user_properties } from "./schedulesUserPropertiesEntity";

@Entity()
class Properties {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ default: false })
    sold: boolean

    @Column({type: "decimal", precision: 12, scale: 2 })
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses)
    @JoinColumn()
    address: Addresses

    @ManyToOne(() => Categories, categories => categories.property)
    category: Categories

    @OneToMany(() => Schedules_user_properties, schedules => schedules.property)
    schedules: Schedules_user_properties[]
}

export { Properties };