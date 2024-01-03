import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadOptions } from './file-upload-options.interface';

@Injectable()
export class S3Service {
  private readonly client = new S3Client({
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async upload({ bucket, key, file }: FileUploadOptions) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
      }),
    );
  }

  getObjectUrl(bucket: string, key: string) {
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }
}
