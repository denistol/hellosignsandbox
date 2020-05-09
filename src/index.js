import HelloSign from 'hellosign-embedded';
const clientId = 'a67c3e0fdb6851e0c3b32dad5df26459'
const signUrl = 'http://localhost:3000/hellosign'
const domain = 'example.com'

const client = new HelloSign({
  clientId,
  debug: true,
  test_mode: 1,
  testMode: 1,
  skipDomainVerification: true,
});

client.open(signUrl, {
  clientId,
  debug: true,
  test_mode: 1,
  testMode: 1,
  skipDomainVerification: true,
});

client.on('sign', () => {
  alert('>>>The document has been signed!');
});