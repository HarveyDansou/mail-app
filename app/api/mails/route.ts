import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
}

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data } = await resend.emails.send({
      from: "noreply@harveydansou.com",
      to: "contact@harveydansou.com",
      subject: "Portfolio Message",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = await request.json();

    const { data } = await resend.emails.send({
      from: "contact@harveydansou.com",
      to: "hairvey.dansou@gmail.com",
      subject: "Portfolio Message",
      html: `<div><p>From: ${formData.firstname} <strong>${formData.lastname}</strong></p><p>Email: ${formData.email}</p><p>Phone: ${formData.phone}</p> <br/> <p>${formData.message}</p></div>`,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
