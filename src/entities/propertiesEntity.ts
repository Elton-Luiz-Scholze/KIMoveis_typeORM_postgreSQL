import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addresses } from "./addressesEntity";

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
    addresses: Addresses
}

export { Properties };