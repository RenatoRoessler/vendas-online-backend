import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'city' })
export class cityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'state_id', nullable: false })
    stateId: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'created_at', nullable: false })
    created_at: Date;

    @Column({ name: 'updated_at', nullable: false })
    updated_at: Date;
}