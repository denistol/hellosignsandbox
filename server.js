var express = require('express');
var app = express();
var path = require('path')
app.disable('etag');
const clientId = 'a67c3e0fdb6851e0c3b32dad5df26459'
const apiKey = '6f161fa998f6f35457a57638d369302c41f42725f1186e829b006e075c218411'
const domain = 'example.com'
const hellosign = require('hellosign-sdk')({ key: apiKey });
app.use(express.static('dist'));
app.get('/', (req,res) => {
    const p = path.join(__dirname,'index.html')
    res.sendFile(p)
});

app.get('/hellosign', function (req, res) {

  const {client_id} = req.query

  const opts = {
    test_mode: 1,
    clientId: client_id,
    title: 'NDA with Acme Co.',
    subject: 'The NDA we talked about',
    message: 'Please sign this NDA and then we can discuss more.',
    signers: [
      {
        email_address: 'alice@example.com',
        name: 'Alice',
        order: 0
      },
      {
        email_address: 'bob@example.com',
        name: 'Bob',
        order: 1
      }
    ],
    cc_email_addresses: ['lawyer@example.com'],
    files: ['NDA.pdf']
  };
  
  
  hellosign.signatureRequest.createEmbedded(opts)
  .then((hres) => {
    const signature = hres.signature_request.signatures[0];
    const signatureId = signature.signature_id;
    return hellosign.embedded.getSignUrl(signatureId);
  }).then((signres) => {
    console.log('The sign url: ' + signres.embedded.sign_url);
    res.redirect(`${signres.embedded.sign_url}&client_id=${clientId}&skip_domain_verification=1`)
  }).catch((err) => {
      console.log(err)
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});