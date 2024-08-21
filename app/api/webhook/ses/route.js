import { Resend } from 'resend';
import Email from '@/components/Email'

export async function GET(req){

  
  const resend = new Resend(process.env.RESEND_KEY)
  
  try {
      const res = await resend.emails.send({
        from: 'Portfolio Review <team@portfolioreview.me>',
        to: 'thereezen24@gmail.com',
        subject: 'Another Test',
        react: <Email/>
      })
      return Response.json({message: res}, {status: 200})
  } catch (error) {
      return Response.json({message: error}, {status: 400})
  }
    
      

}