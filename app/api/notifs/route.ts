import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = await request.json();

    const { data } = await resend.emails.send({
      from: "noreply@harveydansou.com",
      to: formData.email,
      subject: "Thank you for your message",
      html: `<div><p>Hello ${formData.firstname},</p><br/>
      <p>Thank you for reaching out to me.</p>
      <p>I will get back to you as soon as possible.</p> <br/> 
      <p>Best regards,</p>
      <p>Harvey Dansou</p><br/><br/>
      <p><strong>*This email was sent from an unattended email address.*</strong></p>
      </div>`,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
