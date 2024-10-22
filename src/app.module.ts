import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService], 
        useFactory: async (configService: ConfigService) => ({
          type:'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'), 
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          //entities:[User],
          synchronize: true, // Solo en desarrollo; no usar en producción
        }),
      }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground:true,
      debug: true,
    }),
    PostsModule,
    AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
