const nodemailer = require("nodemailer");
const utility = {};


utility.sendMail = async (name, email, token) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'pythondevforsure@gmail.com',
                pass: 'idbbbcuygqhwqedx'
            }
        });

        const mailOptions = {
            to: req.body.email,
            name: existingUser.name,
            subject: 'password reset link',
            text: `Click here to reset Password :` + link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('email not sent', error);
            }
            else {
                console.log('email sent', info.response);
            }
        });

        return res.status(200).json({
            message: 'password reset link sent successfully',
            email: req.body.email
         });
    }catch (error) {
       console.log(error);
       res.status(500).json({
          message: 'Somthing went wrong',
          email: 'req.body.email'
       });
    }
   
}


// utility.sendMail = async (name, email, token) => {
//     try {

//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 4000,
//             secure: false,
//             requireTLS: true,
//             auth: {
//                 user: "<tapendrapratapsingh2@gmail.com>",
//                 pass: "tapendra@12"
//             }
//         });

//         const mailOptions = {
//             from: "<tapendrapratapsingh2@gmail.com>",
//             to: "<san34@yopmail.com>",
//             subject: 'for reset password ',
//             html: '<p> hii ' + name + ', Please copy the link<a href="http://192.168.1.15:4000/api/v1/contact/add?token=' + token + '"> reset your password </a>'
//         }

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error)
//             } else {
//                 console.log("Mail has been send :-", info.response)
//             }
//         })

//     } catch (err) {
//         res.status(400).send({
//             success: false,
//             msg: err
//         })
//     }
// }