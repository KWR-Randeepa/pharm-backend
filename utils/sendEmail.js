import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    try {
        // START: Configure with your actual email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred service
            auth: {
                user: 'medifind42@gmail.com', // REPLACE WITH YOUR EMAIL
                pass: 'asiucvsnigmadkrm' // REPLACE WITH YOUR APP PASSWORD
            }
        });
        // END: Configuration

        const mailOptions = {
            from: '"MediFind" <no-reply@medifind.com>',
            to: to,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", to);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;
