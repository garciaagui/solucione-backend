import { S3Client } from '@aws-sdk/client-s3'

export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!
export const AWS_REGION = process.env.AWS_REGION!

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
}
