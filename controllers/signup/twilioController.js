const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: phone, channel: 'sms' });
    res.json({ success: true, message: "OTP sent!" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});



app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: phone, code: otp });
    res.json({ success: verificationCheck.status === 'approved' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});