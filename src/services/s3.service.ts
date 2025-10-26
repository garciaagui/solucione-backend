import { BadRequestException } from '@/utils/exceptions'
import { AWS_REGION, S3_BUCKET_NAME, s3Client, UPLOAD_CONFIG } from '@/utils/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import path from 'path'

export default class S3Service {
  private generateKey(originalName: string): string {
    const fileExtension = path.extname(originalName)
    const uniqueId = crypto.randomBytes(16).toString('hex')
    const timestamp = Date.now()
    return `complaints/${timestamp}-${uniqueId}${fileExtension}`
  }

  public async uploadImage(buffer: Buffer, originalName: string): Promise<string> {
    if (buffer.length > UPLOAD_CONFIG.maxFileSize) {
      throw new BadRequestException(
        `Arquivo muito grande. Tamanho máximo: ${UPLOAD_CONFIG.maxFileSize / (1024 * 1024)}MB`,
      )
    }

    const key = this.generateKey(originalName)
    const fileExtension = path.extname(originalName)

    try {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: `image/${fileExtension.slice(1)}`,
      })

      await s3Client.send(command)

      const url = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`
      return url
    } catch (error) {
      throw new Error('Erro ao fazer upload da imagem')
    }
  }
}
