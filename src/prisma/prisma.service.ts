import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Optional() connectionUrl?: string) {
    super({
      ...(connectionUrl && {
        datasources: {
          db: { url: connectionUrl },
        },
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
    await this.$queryRaw`SET pg_trgm.word_similarity_threshold = 0.25`;
  }
}
