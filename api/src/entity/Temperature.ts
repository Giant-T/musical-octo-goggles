import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Temperature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value_celsius: number;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;
}
