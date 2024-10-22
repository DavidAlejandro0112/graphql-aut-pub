import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostInput: CreatePostInput) {
    const post = this.postRepository.create(createPostInput)
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({id});
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.postRepository.update(id, updatePostInput);
  }

  remove(id: number) {
    return this.postRepository.softDelete(id);
  }
}
