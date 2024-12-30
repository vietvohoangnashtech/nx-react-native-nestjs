import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  email?: string;
}
