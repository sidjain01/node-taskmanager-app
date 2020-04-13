const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sgMailWelcome=(async (email,name) => {
    try {
      await sgMail.send({
        to : email ,
        from : 'sidsanjeevjain@gmail.com',
        subject : 'Thanks for joining us.',
        text : `Welcome ${name}, Great to see you working with us.`
    });
    } catch (error) {
      if (error.response) {
        console.error(error.response.body)
      }
    }
})

const sgMailCancel=(async (email,name) => {
    try {
      await sgMail.send({
        to : email ,
        from : 'sidsanjeevjain@gmail.com',
        subject : 'Thanks for working with us.',
        text : `Good Bye ${name}, We will miss you and please let us know why you left us.`
    });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
})
module.exports = {
    sgMailWelcome,
    sgMailCancel
}