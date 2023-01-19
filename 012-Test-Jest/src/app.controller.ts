import { Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { AppService } from './app.service';
// import { InterceptorInterceptor } from './interceptor/interceptor/interceptor.interceptor';
// @UseInterceptors(InterceptorInterceptor)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
