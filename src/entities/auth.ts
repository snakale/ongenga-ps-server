import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";
import { User } from './user';

@Entity()
export class Auth extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() password: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
    
    @CreateDateColumn({name: 'created_at'})
    private _created_at: Date;

    @UpdateDateColumn({name: 'updated_at'})
    private _updated_at: Date;

    /*@Column({nullable: true })
    public updatedAt: number;

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = Math.floor(Date.now() / 1000);
    }*/

}
