import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter<T extends Prisma.PrismaClientKnownRequestError>
  implements ExceptionFilter
{
  private errorCodesStatusMapping: { [key: string]: number } = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = this.errorCodesStatusMapping[exception.code] || 500;

    const message =
      status === HttpStatus.NOT_FOUND
        ? `${exception.meta?.modelName || 'Resource'} not found.`
        : exception.message;

    response.status(status).json({
      message,
      statusCode: status,
    });
  }
}
