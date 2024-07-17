jectType()
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  @Field(() => Int)
  id: number

  @Column
  @Field()
  title: string

  @Column
  @Field()
  description: string

  @Column
  @Field(() => String, {
    nullable: true
  })
  notes: string | null

  @Column({
    type: DataType.DATE
  })
  @Field()
  createdAt: string

  @Column({
    type: DataType.DATE
  })
  @Field()
  dueDate: string

  @Column
  @Field()
  priority: number

  @Column({
    type: DataType.DATE
  })
  @Field()
  updatedAt: string

  @Column
  @Field()
  : number

}