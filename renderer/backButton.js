function backButton(backBtn) {
    if (backBtn) {
        console.log('Ok');
        let path = `${backBtn}../`;
        console.log(path);
        document.getElementById('backBtn').innerHTML = `<button class="btn btn-small btn-default" onclick="readFolder(this.id);" id="${path}">Back</button><br>`;
    }
}