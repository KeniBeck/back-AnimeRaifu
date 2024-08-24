import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.fecha_nacimiento = new Date(value.fecha_nacimiento);
    return value;
  }
}
