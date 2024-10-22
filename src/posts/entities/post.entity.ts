import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { description: 'id' })
  id: number;
  
  @Column()
  @Field({description:'Titulo de la publicacion'})
  title: string;
  
  @Column()
  @Field({description: 'Contenido de la publicacion', nullable: true})
  content?: string;

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;
  
}
