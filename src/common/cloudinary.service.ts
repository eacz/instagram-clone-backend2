import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import * as toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ folder: 'instagram' }, (error, result) => {
        if (error) return reject(error)
        resolve(result)
      })

      toStream(file.buffer).pipe(upload)
    })
  }
  async deleteImage(photoUrl: string) {
    const urlsParts = photoUrl.split('/')
    const id = urlsParts[urlsParts.length - 1].split('.')[0]
    console.log({ id })

    await v2.uploader.destroy(`instagram/${id}`)
  }
}
