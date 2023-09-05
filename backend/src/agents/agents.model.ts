import { Model, Table, Column, DataType } from "sequelize-typescript";

interface AgentCreationAttrs {
  name: string;
  salary: string;
}
@Table({ tableName: "agents" })
export class Agent extends Model<Agent, AgentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  salary: string;
}
