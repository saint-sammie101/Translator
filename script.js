// document.getElementById("btn").onclick = function(){
//     var text = document.getElementById("search").value
//     alert(text)
// }
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f7451c0bd4msh4118f85359ebc87p117a2ajsn57d515ec5e26',
        'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
    }
}

function getLang(data) {
    var opt = document.createElement("option")// <option></option>
    opt.setAttribute("value", data[1])// <option value =""></option>
    opt.innerText = data[0]// <option value ="">0</option>

    document.getElementById("lang").append(opt)
}

window.load = fetch('https://translate-plus.p.rapidapi.com/', options)
    .then((result) => result.json())
    .then((result) => {
        Object.entries(result.supported_languages).slice(1,).forEach((lng) => getLang(lng))
    })
    .catch(err => console.error(err));

document.getElementById("btn").onclick = function () {
    var text = document.getElementById("search").value
    var lng = document.getElementById("lang").value



    if (text == "") {
        alert("your search is empty")
    } else {
        const option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'f7451c0bd4msh4118f85359ebc87p117a2ajsn57d515ec5e26',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            body: `{"text":${JSON.stringify(text)}}`
        }
        fetch('https://translate-plus.p.rapidapi.com/language_detect', option)
            .then(response => response.json())
            .then(response => {
                var dectectLng = response.language_detection.language
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': 'f7451c0bd4msh4118f85359ebc87p117a2ajsn57d515ec5e26',
                        'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
                    },
                    body: `{"text":${JSON.stringify(text)},"source":${JSON.stringify(dectectLng)},"target":${JSON.stringify(lng)}}`
                };
                
                fetch('https://translate-plus.p.rapidapi.com/translate', options)
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .catch(err => console.error(err));



            })
            .catch(err => console.error(err));

    }
}




