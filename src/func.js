function generateQRCode() {
    var inputText = document.getElementById('input').value;
    var outputDiv = document.getElementById('output');
    var downloadLink = document.getElementById('downloadLink');

    outputDiv.innerHTML = '';

    var qrcode = new QRCode(outputDiv, {
        text: inputText,
        width: 128,
        height: 128
    });

    downloadLink.style.display = 'block';
    downloadLink.href = outputDiv.firstChild.toDataURL('image/png');
    downloadLink.download = 'qrcode.png';
}