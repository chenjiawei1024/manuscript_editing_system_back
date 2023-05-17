import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';
import { TagModule } from './tag/tag.module';
import { ShareFolderModule } from './share-folder/share-folder.module';
import { ShareFileModule } from './share-file/share-file.module';

import { User } from './user/entities/user.entity';
import { Folder } from './folder/entities/folder.entity';
import { File } from './file/entities/file.entity';
import { Tag } from './tag/entities/tag.entity';
import { ShareFolder } from './share-folder/entities/share-folder.entity';
import { ShareFile } from './share-file/entities/share-file.entity';
import { JwtMiddleware } from './utils/jwt.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'manu_system',
      entities: [User, Folder, File, Tag, ShareFolder, ShareFile],
      synchronize: true,
      // autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, File, Folder, Tag, ShareFolder, ShareFile]),
    UserModule,
    FolderModule,
    FileModule,
    TagModule,
    ShareFolderModule,
    ShareFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        // 登录
        { path: '/user/login', method: RequestMethod.POST },
        // 注册
        { path: '/user', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
