import { AddressEntity } from "../../address/entities/address.entity";
import { stateEntity } from "../../state/entities/state.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'city' })
export class CityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'state_id', nullable: false })
    stateId: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, address => address.city)
    addresses?: AddressEntity[];

    @ManyToOne(() => stateEntity, state => state.cities)
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    state?: stateEntity;
}