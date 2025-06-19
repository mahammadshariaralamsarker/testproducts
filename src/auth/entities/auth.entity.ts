import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
