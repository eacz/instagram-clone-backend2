import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { DatesService } from './dates.service';
import { FilesService } from './files.service';

@Module({
  controllers: [],
  providers: [
    DatesService,
    FilesService,
    CloudinaryProvider,
    CloudinaryService,
  ],
  exports: [DatesService, FilesService, CloudinaryProvider, CloudinaryService],
})
export class CommonModule {}
