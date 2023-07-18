import { CityEntity } from "../../city/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'state' })
export class stateEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => CityEntity, city => city.state)
    cities?: CityEntity[];
}