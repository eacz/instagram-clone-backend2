import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  async uploadImage(file: Express.Multer.File) {
    try {
      const fileUploaded = await this.cloudinaryService.uploadImage(file)
      return fileUploaded
    } catch (error) {
      console.log(error)
      throw new ServiceUnavailableException(
        `There was a problem with the file upload provider, please try again later`
      )
    }
  }

  async uploadImages(files: Array<Express.Multer.File>) {
    const imagesUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const image = await this.uploadImage(files[i])
      imagesUrls.push(image.secure_url)
    }

    return imagesUrls
  }

  async deleteImage(photoUrl: string) {
    try {
      return await this.cloudinaryService.deleteImage(photoUrl)
    } catch (error) {
      throw new ServiceUnavailableException(
        `There was a problem with the file upload provider, please try again later`
      )
    }
  }

  async deleteImages(photosUrls: string[]) {
    for (let i = 0; i < photosUrls.length; i++) {
      await this.deleteImage(photosUrls[i])
    }
  }
}
