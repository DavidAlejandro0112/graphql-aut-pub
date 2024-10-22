import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { description: 'id' })
  id: number;

  @Column()
  @Field(() => Int, { description: '' })
  name: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
