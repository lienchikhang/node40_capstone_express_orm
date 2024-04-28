import { Controller } from '@nestjs/common';
import { CustomjwtService } from './customjwt.service';

@Controller('customjwt')
export class CustomjwtController {
  constructor(private readonly customjwtService: CustomjwtService) {}
}
