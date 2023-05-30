import { Module } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema, Cat } from './cats.schema';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService],
})
export class CatsModule {}
