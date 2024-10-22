import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private autRepository: Repository<Author>,
  ) {}

  create(createAuthorInput: CreateAuthorInput):Promise<Author> {

    const author = this.autRepository.create(createAuthorInput);
    return this.autRepository.save(author);
  }

  findAll() {
    return this.autRepository.find();
  }

  findOne(id: number) {
    return this.autRepository.findOneBy({id});
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return this.autRepository.update(id, updateAuthorInput);
  }

  remove(id: number) {
    return this.autRepository.softDelete(id);
  }
}
