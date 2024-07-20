import multiparty from 'multiparty'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'

const bucketName = 'jorgim-ecommerce'

export default async function Handle(req: any, res: any) {
    const form = new multiparty.Form()
    const { fields, files } = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })
    const client = new S3Client({
        region: 'sa-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
    })
    const links = []
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop()
        const newFilename = Date.now() + '.' + ext
        const contentType = mime.lookup(file.path) || undefined
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: contentType,
        }))
        const link = `https://${bucketName}.s3.sa-east-1.amazonaws.com/${newFilename}`
        links.push(link);
    }
    return res.json({ links })
}

export const config = {
    api: { bodyParser: false },
}
