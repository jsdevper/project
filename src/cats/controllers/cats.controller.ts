import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { CatRequestDto } from '../dto/cats.request.dto';
import { SuccessInterceptor } from 'src/common/interceptions/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
