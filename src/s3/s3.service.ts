import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service extends S3Client {
  constructor(private readonly configService: ConfigService) {
    super({
      region: configService.getOrThrow("AWS_REGION"),
      credentials: {
        accessKeyId: configService.getOrThrow("AWS_ACCESS_KEY"),
        secretAccessKey: configService.getOrThrow("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  public getSignedUrl(command: GetObjectCommand | PutObjectCommand) {
    return getSignedUrl(this, command, { expiresIn: 3600 });
  }
}
