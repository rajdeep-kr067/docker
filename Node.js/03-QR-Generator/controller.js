const service = require('./service');

exports.generateQR = async (req, res) => {
    try {
        const { data } = req.body;

        console.log('Received data:', data); // Log received data

        const qrCodeText = service.formatData(data);

        console.log('Formatted QR code text:', qrCodeText); // Log formatted text

        const qrCodeBuffer = await service.generateQRCode(qrCodeText);

        console.log('QR code generated successfully'); // Log success

        res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
        res.type('image/png').send(qrCodeBuffer);
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

