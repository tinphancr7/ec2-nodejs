import nodemailer from "nodemailer";

const sendSimpleEmail = async (dataSend) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP, // generated ethereal user
			pass: process.env.EMAIL_APP_PASSWORD, // generated eethereal password
		},
	});

	// send mail with defined transport object
	await transporter.sendMail({
		from: '"pet shop" <foo@example.com>', // sender address
		to: dataSend?.receivedEmail, // list of receivers
		subject: "Thông tin đặt lịch khám bệnh:", // Subject line
		text: "Hello world?", // plain text body
		html: emailBodyHtml(dataSend), // html body
	});
};

const emailBodyHtml = (dataSend) => {
	let result = `
    <h3>Xin chào ${dataSend?.fullName}!</h3>
    <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh tại website của chúng tôi.</p>
    <p>Thông tin đặt lịch của bạn như sau:</p>
    <p><b>Thời gian: ${dataSend?.bookingTime} ${dataSend?.bookingDate}</b></p>
    <div><b>Dịch vụ: ${dataSend?.specialty}</b></div>
    <p>Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận  và hoàn tất thủ tục khám bệnh</p>
    <div>
        <a href="${dataSend?.redirectLink}" target="_blank">Xác nhận đặt lịch</a>
    </div>
    <p>Trân trọng!</p>
    `;

	return result;
};

export {sendSimpleEmail};
