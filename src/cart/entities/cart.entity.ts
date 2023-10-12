import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart' })
export class CartEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => CartProductEntity, (cartProduct: CartProductEntity) => cartProduct.cart)
    cartProduct?: CartProductEntity[];
}