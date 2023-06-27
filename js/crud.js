async function crud() {
    let label = document.getElementsByName('label');
    let image = document.getElementsByName('image');
    let submitBtn = document.getElementById('submit');
    let bgElement = $('#bg-container');
    let bgImg = $('[name=bg-img]');
    let logoImg = $('[name=logo-img]');
    let headerImg = $('[name=header-img]');
    let bodyImg = $('[name=body-img]');
    let footerImg = $('[name=footer-img');
    let submitBg = document.getElementById('submit-bg');

    submitBg.addEventListener('click', async function () {
        const formData = new FormData();
        formData.append('bg-img', bgImg.prop('files')[0]);
        formData.append('logo-img', logoImg.prop('files')[0]);
        formData.append('header-img', headerImg.prop('files')[0]);
        formData.append('body-img', bodyImg.prop('files')[0]);
        formData.append('footer-img', footerImg.prop('files')[0]);

        let response = await fetch("./backend/add-settings.php", {
            method: "post",
            body: formData
        })

        let data = await response.json();

        if (data > 0 ) {
            let bgRequest = await fetch('./backend/get-settings.php', {
                method: "GET"
            });

            let  bgResponse = await bgRequest.json();

            showSettings(bgResponse);

            // change bg
            if (bgResponse.length  > 0 ) {
                // bg
                if (bgResponse[0][1] != null) {
                    bgElement.css('background-image', 'url("./img/assets/'+ bgResponse[0][1] +'")')
                } else {
                    bgElement.css('background-image', 'url("./img/assets/background-default.png")')
                }
                // logo
                if (bgResponse[0][2] != null) {
                    $('#logo-img').attr('src', './img/assets/'+bgResponse[0][2])
                } else {
                    $('#logo-img').attr('src', './img/assets/logo-default.png')
                }
                // header
                if (bgResponse[0][3] != null) {
                    $('#header-img').attr('src', './img/assets/'+bgResponse[0][3])
                } else {
                    $('#header-img').attr('src', './img/assets/header-default.img')
                }
                // body
                if (bgResponse[0][4] != null) {
                    $('#body-img').attr('src', './img/assets/'+bgResponse[0][4])
                } else {
                    $('#body-img').attr('src', './img/assets/body-default.png')
                }
                // footer
                if (bgResponse[0][5] != null) {
                    $('#footer-img').attr('src', './img/assets/'+bgResponse[0][5])
                } else {
                    $('#footer-img').attr('src', './img/assets/footer-default.png')
                }
            } else {
                bgElement.css('background-image', 'url("./img/assets/background-default.png")')
            }
        }
    })

    let initialResponse = await fetch('./backend/get.php', {method: "GET"})
    let initialData = await initialResponse.json();
    let bgRequest = await fetch('./backend/get-settings.php', {
        method: "GET"
    });
    let  bgResponse = await bgRequest.json();

    if (bgResponse.length > 0 ) {
        showSettings(bgResponse);
    }
    showLabels(initialData);

    submitBtn.addEventListener("click", async function () {
        let labelValue = label[0].value
        const form_data = new FormData();
        form_data.append('img', image[0].files[0]);
        form_data.append('label', labelValue);

        let response = await fetch("./backend/add.php", {
            method: "POST",
            body: form_data
        })

        let data = await response.json();

        if (data === 1 ) {
            let initialResponse = await fetch('./backend/get.php', {method: "GET"})
            let initialData = await initialResponse.json();
            let lastItemToSegment = initialData[[initialData.length - 1]]
            // redraw
            let image = new Image(24);
            image.src = "./img/"+lastItemToSegment[3]
            image.onload = function () {
                theWheel.addSegment(
                    {image: "./img/"+lastItemToSegment[3] , fillStyle:initialData.length - 1 % 2 == 0 ? "#5dc1d8": "#f42d92"  , text: lastItemToSegment[2], imgData: image, imageDirection: 'S', strokeStyle: "black"}
                )
                theWheel.draw()
            }
            console.log(theWheel.segments)

            showLabels(initialData);
        }

    })


}

function showLabels(data) {
    $('#table-data').empty()

    let html=``

    data.forEach(function (value, num) {
        html += `<tr id="${num+1}">
                <td class="text-center" ><input type="checkbox" name="prize" value=${value[0]} ${value[5] == 1 ? "checked" : ""}></td>
                <td class="text-center">${value[2]}</td>
                <td class="text-center"><img src="${'./img/'+value[3]}" width="30px"></td>
                <td class="text-center"><button class="btn btn-danger" onclick="deleteLabel(${value[0]}, ${num+1})">Delete</button></td>
        </tr>`
    })

    $('#table-data').append(html)

    setPrize();
}

function showSettings(data) {
    $('#settingTable').empty()

    console.log(data)
    let html=``

    data[0].forEach(function (value, num) {
        if (num != 0 && num != 6) {
            html += `<tr id="${num+1}">
                <td class="text-center"><img src="${'./img/assets/'+value}" width="30px"></td>
                <td class="text-center"><button class="btn bg-primary btn-primary" onclick="deleteSettings('${value}')">Delete</button></td>
            </tr>`
        }
    })

    $('#settingTable').append(html)

    setPrize();
}

function setPrize() {
    $('[name=prize]').change(async function () {
        /*console.log($(this).is(':checked'))*/
        let data = new FormData();
        data.append('is-prize', $(this).val());
        let prizeRequest = await fetch('./backend/add-prize.php', {
            method: "POST",
            body: data
        })

        let prizeResponse = await prizeRequest.json();
        if (prizeResponse > 0) {
            Swal.fire({
                text: "Operasi Sukses"
            })
        }

    })
}

async function deleteLabel(id, currNum) {
    console.log(theWheel.segments)
    let formData = new FormData();
    formData.append('id', id)
    let deleteResponse = await fetch('./backend/delete.php', {method:"POST", body: formData})
    let result = await deleteResponse.json();

    // re fetch
    if (result === 1 ) {
        $('#'+currNum).remove()
    }
    theWheel.deleteSegment(currNum)
    console.log(theWheel.segments.length);
    //theWheel.segments[1].text = ""
    theWheel.draw()
    console.log(theWheel.segments)
}

async function deleteSettings(name) {
    let data = new FormData();
    data.append('data-name', name)
    let deleteRequest = await fetch('./backend/update-settings.php', {
        method: "POST",
        body: data
    })

    let deleteResponse = await deleteRequest.json();

    if (deleteResponse > 0 ) {
        let bgRequest = await fetch('./backend/get-settings.php', {
            method: "GET"
        });
        let  bgResponse = await bgRequest.json();

        if (bgResponse.length > 0) {
            showSettings(bgResponse);
        }

    }
}

crud()



