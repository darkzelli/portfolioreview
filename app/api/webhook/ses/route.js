const AWS = require('aws-sdk')
import Email from '@/components/Email'
import { render } from '@react-email/components'

export async function GET(req){

    const emailHtml = render(<Email/>)

    const SES_CONFIG = {
        accessKeyId: process.env.SES_IAM_ACCESS_KEY,
        secretAccessKey: process.env.SES_IAM_SECRET_ACCESS_KEY,
        region: process.env.SES_REGION

    }

    const AWS_SES = new AWS.SES(SES_CONFIG)

    const params = {
        Source: 'Portfolio Review <portfolioreview@portfolioreview.me>',
        Destination: {
          ToAddresses: ['email@portfolioreview.me'],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Fourth Email',
          },
        },
    };
    try {
        const res = await AWS_SES.sendEmail(params).promise()
        return Response.json({message: res}, {status: 200})
    } catch (error) {
        return Response.json({message: error}, {status: 400})
    }
    
      

}