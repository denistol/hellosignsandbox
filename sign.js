const clientId = '647e82fc81a9ddaba62b72285dc169d0'
const apiKey = 'de94f482acc004adc84756e1a3b71bfc2e4c6782cedc40b0525aae91adb3f432'


const hellosign = require('hellosign-sdk')({ key: apiKey });

hellosign.signatureRequest.createEmbedded({test_mode: 1}).then((res) => {
  const signature = res.signature_request.signatures[0];
  const signatureId = signature.signature_id;

  return hellosign.embedded.getSignUrl(signatureId);
}).then((res) => {
  console.log('The sign url: ' + res.embedded.sign_url);
}).catch((err) => {
  // handle error
  console.log(err)
});