import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  language: "es" | "en";
}

// Design System Colors
const COLORS = {
  primary: "#12ACA4",      // Teal
  secondary: "#17383F",    // Dark Green
  background: "#F4F7F6",   // Light grey/green
  white: "#FFFFFF",
  text: "#333333",
  textLight: "#666666",
  border: "#E0E0E0",
};

// Format date to localized string (e.g., "15 de enero, 2026" / "January 15, 2026")
const formatDate = (dateString: string, language: "es" | "en"): string => {
  try {
    const date = new Date(dateString + "T00:00:00");
    const months = {
      es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    };

    const day = date.getDate();
    const month = months[language][date.getMonth()];
    const year = date.getFullYear();

    if (language === "es") {
      return `${day} de ${month}, ${year}`;
    } else {
      return `${month} ${day}, ${year}`;
    }
  } catch {
    return dateString;
  }
};

// Format time to AM/PM format (e.g., "03:30 PM")
const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours.toString().padStart(2, "0")}:${formattedMinutes} ${period}`;
  } catch {
    return timeString;
  }
};

// Create reusable transporter with Zoho SMTP Pro settings
const createTransporter = () => {
  console.log("Attempting SMTP connection to smtppro...");
  return nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Professional email template for client confirmation
const getClientEmailTemplate = (data: ContactFormData): string => {
  const isSpanish = data.language === "es";
  const formattedDate = formatDate(data.date, data.language);
  const formattedTime = formatTime(data.time);

  const labels = {
    greeting: isSpanish ? "Estimado/a" : "Dear",
    thankYou: isSpanish
      ? "Gracias por contactar a Apen y Asociados"
      : "Thank you for contacting Apen y Asociados",
    received: isSpanish
      ? "Hemos recibido su solicitud de cita y un miembro de nuestro equipo se pondrá en contacto con usted a la brevedad para confirmar los detalles."
      : "We have received your appointment request and a member of our team will contact you shortly to confirm the details.",
    requestDetails: isSpanish ? "DETALLES DE SU SOLICITUD" : "YOUR REQUEST DETAILS",
    service: isSpanish ? "SERVICIO" : "SERVICE",
    preferredDate: isSpanish ? "FECHA PREFERIDA" : "PREFERRED DATE",
    preferredTime: isSpanish ? "HORA PREFERIDA" : "PREFERRED TIME",
    message: isSpanish ? "MENSAJE" : "MESSAGE",
    questions: isSpanish
      ? "Si tiene alguna pregunta antes de nuestra llamada, no dude en responder a este correo."
      : "If you have any questions before our call, please don't hesitate to reply to this email.",
    regards: isSpanish ? "Atentamente" : "Best regards",
    team: isSpanish ? "El Equipo de Apen y Asociados" : "The Apen y Asociados Team",
    confidentiality: isSpanish
      ? "AVISO DE CONFIDENCIALIDAD: Este correo electrónico y cualquier archivo adjunto son confidenciales y están destinados únicamente para el uso del destinatario. Si ha recibido este mensaje por error, por favor notifique al remitente y elimínelo de su sistema."
      : "CONFIDENTIALITY NOTICE: This email and any attachments are confidential and intended solely for the use of the addressee. If you have received this message in error, please notify the sender and delete it from your system.",
  };

  return `
<!DOCTYPE html>
<html lang="${data.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${labels.thankYou}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.background}; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${COLORS.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Card Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: ${COLORS.white}; border: 1px solid ${COLORS.border}; border-radius: 8px; overflow: hidden;">

          <!-- Header with Logo -->
          <tr>
            <td style="background-color: ${COLORS.secondary}; padding: 30px 40px; text-align: center;">
              <!-- Logo -->
              <img src="https://apenyasociados.com/logo-white.png" alt="Apen y Asociados" height="60" style="height: 60px; width: auto; max-width: 200px;" />
              <p style="color: ${COLORS.primary}; font-size: 14px; margin: 10px 0 0 0; letter-spacing: 1px;">
                ${isSpanish ? "AUDITORES Y CONSULTORES" : "AUDITORS & CONSULTANTS"}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">

              <!-- Greeting -->
              <p style="color: ${COLORS.text}; font-size: 16px; margin: 0 0 20px 0; line-height: 1.6;">
                ${labels.greeting} <strong>${data.name}</strong>,
              </p>

              <!-- Thank You Message -->
              <h1 style="color: ${COLORS.secondary}; font-size: 22px; margin: 0 0 15px 0; font-weight: 600;">
                ${labels.thankYou}
              </h1>

              <p style="color: ${COLORS.textLight}; font-size: 15px; margin: 0 0 30px 0; line-height: 1.7;">
                ${labels.received}
              </p>

              <!-- Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${COLORS.background}; border-radius: 6px; border-left: 4px solid ${COLORS.primary};">
                <tr>
                  <td style="padding: 25px;">
                    <h2 style="color: ${COLORS.secondary}; font-size: 14px; margin: 0 0 20px 0; font-weight: 600; letter-spacing: 0.5px;">
                      ${labels.requestDetails}
                    </h2>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <!-- Service -->
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 40%;">
                          <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600;">${labels.service}:</span>
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.text}; font-size: 15px;">${data.service}</span>
                        </td>
                      </tr>
                      <!-- Date -->
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600;">${labels.preferredDate}:</span>
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.text}; font-size: 15px;">${formattedDate}</span>
                        </td>
                      </tr>
                      <!-- Time -->
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600;">${labels.preferredTime}:</span>
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.text}; font-size: 15px;">${formattedTime}</span>
                        </td>
                      </tr>
                      ${data.message ? `
                      <!-- Message -->
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600;">${labels.message}:</span>
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="color: ${COLORS.text}; font-size: 15px;">${data.message}</span>
                        </td>
                      </tr>
                      ` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Additional Info -->
              <p style="color: ${COLORS.textLight}; font-size: 14px; margin: 30px 0 0 0; line-height: 1.6;">
                ${labels.questions}
              </p>

              <!-- Signature -->
              <p style="color: ${COLORS.text}; font-size: 15px; margin: 30px 0 0 0; line-height: 1.6;">
                ${labels.regards},<br/>
                <strong style="color: ${COLORS.secondary};">${labels.team}</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${COLORS.secondary}; padding: 25px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <p style="color: ${COLORS.primary}; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                      Apen y Asociados
                    </p>
                    <p style="color: ${COLORS.white}; font-size: 13px; margin: 0; opacity: 0.9;">
                      ${isSpanish ? "Teléfono" : "Phone"}: 4386 5000 | info@apenyasociados.com
                    </p>
                    <p style="color: ${COLORS.white}; font-size: 12px; margin: 8px 0 0 0; opacity: 0.7;">
                      Edificio Campus Tecnológico - TEC, Torre I, Cdad. de Guatemala
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confidentiality Notice -->
          <tr>
            <td style="padding: 20px 30px; background-color: ${COLORS.background};">
              <p style="color: #999999; font-size: 10px; margin: 0; line-height: 1.5; text-align: justify;">
                ${labels.confidentiality}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};

// Professional email template for firm/provider notification
const getFirmEmailTemplate = (data: ContactFormData): string => {
  const isSpanish = data.language === "es";
  const formattedDate = formatDate(data.date, data.language);
  const formattedTime = formatTime(data.time);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud de Cita</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.background}; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${COLORS.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Card Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: ${COLORS.white}; border: 1px solid ${COLORS.border}; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: ${COLORS.primary}; padding: 25px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h1 style="color: ${COLORS.white}; font-size: 20px; margin: 0; font-weight: 600;">
                      Nueva Solicitud de Cita
                    </h1>
                    <p style="color: ${COLORS.white}; font-size: 13px; margin: 5px 0 0 0; opacity: 0.9;">
                      Recibida desde apenyasociados.com
                    </p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="background-color: ${COLORS.white}; color: ${COLORS.primary}; font-size: 11px; font-weight: 600; padding: 5px 12px; border-radius: 20px; text-transform: uppercase;">
                      ${isSpanish ? "Español" : "English"}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Information Section -->
          <tr>
            <td style="padding: 30px 40px 0 40px;">
              <h2 style="color: ${COLORS.secondary}; font-size: 14px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${COLORS.primary}; padding-bottom: 10px;">
                INFORMACIÓN DEL CLIENTE
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
                    <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">NOMBRE</span>
                    <span style="color: ${COLORS.text}; font-size: 16px; font-weight: 600;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
                    <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">EMAIL</span>
                    <a href="mailto:${data.email}" style="color: ${COLORS.secondary}; font-size: 15px; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
                    <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">TELÉFONO</span>
                    <a href="tel:${data.phone}" style="color: ${COLORS.secondary}; font-size: 15px; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Appointment Details Section -->
          <tr>
            <td style="padding: 30px 40px 0 40px;">
              <h2 style="color: ${COLORS.secondary}; font-size: 14px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${COLORS.primary}; padding-bottom: 10px;">
                DETALLES DE LA CITA
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
                    <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">SERVICIO SOLICITADO</span>
                    <span style="color: ${COLORS.text}; font-size: 15px; font-weight: 600;">${data.service}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="50%">
                          <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">FECHA PREFERIDA</span>
                          <span style="color: ${COLORS.text}; font-size: 15px;">${formattedDate}</span>
                        </td>
                        <td width="50%">
                          <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">HORA PREFERIDA</span>
                          <span style="color: ${COLORS.text}; font-size: 15px;">${formattedTime}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${data.message ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
                    <span style="color: ${COLORS.primary}; font-size: 12px; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px;">MENSAJE DEL CLIENTE</span>
                    <p style="color: ${COLORS.text}; font-size: 14px; margin: 0; line-height: 1.6; background-color: ${COLORS.background}; padding: 12px; border-radius: 4px;">${data.message}</p>
                  </td>
                </tr>
                ` : ""}
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Solicitud de Cita - Apen y Asociados" style="display: inline-block; background-color: ${COLORS.primary}; color: ${COLORS.white}; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 30px; border-radius: 6px;">
                      Responder al Cliente
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${COLORS.secondary}; padding: 20px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <p style="color: ${COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0;">
                      Apen y Asociados
                    </p>
                    <p style="color: ${COLORS.white}; font-size: 11px; margin: 8px 0 0 0; opacity: 0.7;">
                      Este correo fue generado automáticamente desde el formulario de contacto
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confidentiality Notice -->
          <tr>
            <td style="padding: 15px 30px; background-color: ${COLORS.background};">
              <p style="color: #999999; font-size: 10px; margin: 0; line-height: 1.5; text-align: center;">
                AVISO DE CONFIDENCIALIDAD: Este correo electrónico contiene información confidencial del cliente.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const { name, email, phone, service, date, time, language } = body;

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message:
            language === "es"
              ? "Por favor complete todos los campos requeridos."
              : "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            language === "es"
              ? "Por favor ingrese un correo electrónico válido."
              : "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.EMAIL_FROM ||
      !process.env.EMAIL_TO_PROVIDER
    ) {
      console.error("Missing SMTP configuration environment variables");
      return NextResponse.json(
        {
          success: false,
          message:
            language === "es"
              ? "Error de configuración del servidor. Por favor intente más tarde."
              : "Server configuration error. Please try again later.",
        },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    // Verify SMTP connection and authentication
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    // Bilingual email subjects
    const clientSubject =
      language === "es"
        ? `Confirmación de Solicitud - Apen y Asociados`
        : `Request Confirmation - Apen y Asociados`;

    const providerSubject = `Nueva Solicitud: ${name} | ${service} | ${date}`;

    // Send confirmation email to client
    await transporter.sendMail({
      from: `"Apen y Asociados" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: clientSubject,
      html: getClientEmailTemplate(body),
    });

    console.log(`Client confirmation email sent to: ${email}`);

    // Send notification email to the firm
    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO_PROVIDER,
      replyTo: email,
      subject: providerSubject,
      html: getFirmEmailTemplate(body),
    });

    console.log(`Provider notification email sent to: ${process.env.EMAIL_TO_PROVIDER}`);

    return NextResponse.json({
      success: true,
      message:
        language === "es"
          ? "Su solicitud ha sido enviada exitosamente. Revise su correo electrónico para la confirmación."
          : "Your request has been sent successfully. Check your email for confirmation.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
