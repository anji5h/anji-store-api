module.exports = {
        register: function (data) {
            // return mail contetn
        },
        forgot_password: function (data) {
            let mailContent = {
                from: 'anji-store <noreply@anjistore.com>',
                to: `${data.email}`,
                subject: "Forgot Password ✔",
                text: "Hello",
                html: `
                <p>Hi <strong>${data.name}</strong>,</p>
                <p>We noticed that you are having trouble logging into our system.
                please use the link below to reset your password</p>
                <p>
                <a href="${data.link}">click here to reset password</a>
                </p>
                <p>If you have not requested to change your password kindly ignore this email</p>
                <p>Regards,</p>
                <p>Support Team,</p>
                `  
            }
            return mailContent;
        }
    }
