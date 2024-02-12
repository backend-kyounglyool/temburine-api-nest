import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { S3Service } from "../s3/s3.service";
import { ConfigService } from "@nestjs/config";
import { S3Content, UploadStatus } from "@prisma/client";
import { ContentRequestDto } from "./dto/request/content-request.dto";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { ContentDto } from "./dto/response/content.dto";
import { ContentUploadResponseDto } from "./dto/response/content-upload-response.dto";

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
    private readonly configService: ConfigService
  ) {}

  private readonly AWS_S3_BUCKET_NAME =
    this.configService.getOrThrow<string>("AWS_S3_BUCKET_NAME");

  buildContentDto(content: S3Content) {
    return {
      ...content,
      url: `${process.env.API_BASE_URL}/content/${content.id}`,
    };
  }

  async createContent(
    contentDto: ContentRequestDto,
    userId: number
  ): Promise<ContentDto> {
    const { name, type } = contentDto;

    const content = await this.prisma.s3Content.create({
      data: {
        name,
        userId,
        type,
      },
    });

    return this.buildContentDto(content);
  }

  async getContent(contentId: number): Promise<ContentDto> {
    const content = await this.prisma.s3Content.findUnique({
      where: { id: contentId },
    });

    if (!content) throw new NotFoundException("조회 실패");
    if (content.status !== UploadStatus.READY)
      throw new NotFoundException("이미지 조회 불가능");

    return this.buildContentDto(content);
  }

  async updateContentUploadStatus(contentId: number): Promise<ContentDto> {
    const content = await this.prisma.s3Content.update({
      where: { id: contentId },
      data: {
        status: UploadStatus.READY,
      },
    });

    return this.buildContentDto(content);
  }

  async getContentUploadUrl(
    contentDto: ContentRequestDto,
    userId: number
  ): Promise<ContentUploadResponseDto> {
    const content = await this.createContent(contentDto, userId);

    const signedUrl = await this.s3.getSignedUrl(
      new PutObjectCommand({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Key: content.id.toString(),
        ContentType: content.type,
        ACL: "private",
      })
    );

    return {
      contentId: content.id,
      signedUrl,
    };
  }

  async getContentViewUrl(contentId: number): Promise<string> {
    const content = await this.getContent(contentId);

    return this.s3.getSignedUrl(
      new GetObjectCommand({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Key: content.id.toString(),
      })
    );
  }

  getUrl(contentId: number): string {
    return `${process.env.API_BASE_URL}/content/${contentId}`;
  }
}
