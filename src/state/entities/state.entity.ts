import { CityEntity } from "src/city/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'state' })
export class stateEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'created_at', nullable: false })
    created_at: Date;

    @Column({ name: 'updated_at', nullable: false })
    updated_at: Date;

    @OneToMany(() => CityEntity, city => city.state)
    cities: CityEntity[];
}