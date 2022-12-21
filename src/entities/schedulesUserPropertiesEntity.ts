import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./propertiesEntity";
import { User } from "./userEntity";

@Entity()
class Schedules_user_properties {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "date" })
    date: string

    @Column({ type: "time" })
    hour: string

    @ManyToOne(() => Properties, properties => properties.schedules)
    property: Properties

    @ManyToOne(() => User, user => user.schedules)
    user: User
}

export { Schedules_user_properties };