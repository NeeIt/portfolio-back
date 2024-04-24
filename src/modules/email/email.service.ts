import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IEmailParams } from "../../interfaces/email.interface";


@Injectable()
export class EmailService {
  // Implement getAccessToken method (you already have this from previous discussions).
  async sendEmail(emailParams: IEmailParams): Promise<void> {
    try {
      // Create a Nodemailer transporter with your email service provider's SMTP settings
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '************',
          pass: '************', // If you're using an app-specific password
        },
      });

      // Email data
      const mailOptions = {
        to: '************',
        from: '************',
        subject: `Contact Form: ${emailParams.name}`,
        text: `Name: ${emailParams.name}\nEmail: ${emailParams.from}\nPhone:${emailParams.phone} Message: ${emailParams.message}`,
      };

      // Send the email
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  }
}
