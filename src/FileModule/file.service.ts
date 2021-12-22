import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class FileService {
  async createFile(file) {
    const fileName = uuidv4();
    const filePath = join(__dirname, '..', '..', `uploads/${fileName}.webp`);
    try {
      await sharp(file.buffer)
        .resize({
          height: 700,
          width: 1000,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0.1 },
        })
        .webp()
        .toFile(filePath);
      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
