import { AuthEntity } from "src/auth/entities/auth.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @ManyToOne(() => AuthEntity, (user) => user.id, {eager:true})
    user:AuthEntity 
}
