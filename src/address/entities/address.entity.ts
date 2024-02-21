import { OrderEntity } from "src/order/entities/order.entity";
import { CityEntity } from "../../city/entities/city.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'address' })
export class AddressEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'complement', nullable: true })
    complement: string;

    @Column({ name: 'number', nullable: false })
    numberAddress: number;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({ name: 'city_id', nullable: false })
    cityId: number;

    @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.addresses)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;

    @ManyToOne(() => CityEntity, city => city.addresses)
    @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
    city?: CityEntity;

    @OneToMany(() => OrderEntity, order => order.address)
    orders?: OrderEntity[];
}