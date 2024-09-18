document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('qr-id').value;
    const price = document.getElementById('qr-price').value;
    const data = { id, price };

    console.log('Sending data:', data); // Log data being sent

    fetch('/generate-qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const qrImage = document.createElement('img');
            const qrImageUrl = URL.createObjectURL(blob);
            qrImage.src = qrImageUrl;
            const qrResultDiv = document.getElementById('qr-result');
            qrResultDiv.innerHTML = '';
            qrResultDiv.appendChild(qrImage);
        })
        .catch(error => {
            console.error('Error generating QR code:', error);
            alert('Error generating QR code. Check the console for details.');
        });
});

