import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendVerificationEmail = async (
  username: string,
  email: string,
  token: string,
): Promise<void> => {
  const URL = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`

  await resend.emails.send({
    from: `Solucione <${process.env.RESEND_EMAIL}>`,
    to: email,
    subject: 'Verifique seu e-mail',
    html: `
      <p>Olá, ${username},</p>
      <p>Por favor, clique no botão abaixo para confirmar seu e-mail e validar seu cadastro:</p>
      <a href="${URL}" style="background-color:#4F46E5;padding:12px 20px;color:white;border-radius:6px;text-decoration:none">Confirmar e-mail</a>
      <br />
      <br />
      <p>Atenciosamente, </p>
      <p style="font-weight:900">Solucione</p>
    `,
  })
}
