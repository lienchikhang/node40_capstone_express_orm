import { Controller } from '@nestjs/common';
import { AuthCheckService } from './auth-check.service';

@Controller('auth-check')
export class AuthCheckController {
  constructor(private readonly authCheckService: AuthCheckService) {}
}
