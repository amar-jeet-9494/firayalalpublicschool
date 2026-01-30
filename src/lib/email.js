import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT, // 465 for SSL, 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export async function sendEnquiryEmail(to, data) {
  const subject = `New Admission Enquiry: ${data.student_name}`;
  const html = `
    <h2>New Admission Enquiry Received</h2>
    <p><strong>Student Name:</strong> ${data.student_name}</p>
    <p><strong>Class:</strong> ${data.admission_class}</p>
    <p><strong>Parent Name:</strong> ${data.parent_name} (${data.relationship})</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Visit:</strong> ${data.visit_date} at ${data.visit_time}</p>
    <p><strong>Source:</strong> ${data.source_of_enquiry}</p>
    <br>
    <p>View details in Admin Dashboard.</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Firayalal Public School" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}
