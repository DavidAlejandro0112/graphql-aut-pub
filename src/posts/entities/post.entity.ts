import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'id' })
  id: number;

  @Field({description:'Titulo de la publicacion'})
  title: string;
  
  @Field({description: 'Contenido de la publicacion'})
  content: string;
  
}
