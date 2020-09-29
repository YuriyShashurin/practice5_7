const btn = document.querySelector(".btn");

if (localStorage.getItem("Items")){
    const cards = localStorage.getItem("Items");
    const div = document.querySelector(".photo");
    div.innerHTML = cards;

}

function validate_input(page,limit) {

    if (((page<1 || page>10) || isNaN(page)) && ((limit<1 || limit>10) || isNaN(limit))) {
        return "Номер страницы и лимит вне диапазона от 1 до 10";
    }
    else if ((limit<1 || limit>10) || isNaN(limit) ){
        return "Лимит вне диапазона от 1 до 10";
    }
    else if ((page<1 || page>10) || isNaN(page)){
        return  "Номер страницы вне диапазона от 1 до 10";
    }
    return true

}

function useRequest  (page, limit)  {
    localStorage.clear();
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let card = '';
            data.forEach(item => {
                const cardBlock = `
            <div class="card">
            <img src="${item.download_url}" class="card_image">
            <p class="author">${item.author}</p>
            <p class="author">Ссылка: ${item.url}</p>
            </div>
        `;
                card = card +cardBlock;
            });
            localStorage.setItem('Items', card);
            const div = document.querySelector(".photo");
            return div.innerHTML = card;

        })
}



btn.addEventListener("click", async () => {
    const page = Number(document.querySelector('.number').value);
    const limit = Number(document.querySelector('.limit').value);
    const validate = await validate_input(page, limit);
    if (validate === true){
        console.log("1")
        const requsetResult = await useRequest(page, limit);
    }
    else {
        alert(validate);
    }


});

