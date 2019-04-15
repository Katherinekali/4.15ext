let scroll = new BScroll(".content");
let ul = document.querySelector(".content ul")
axios.get("/api/getData").then(res => {
    ul.innerHTML = res.data.map(item => {
        return ` <li>
        <h2><img src="./img/psb (1).jpg" alt=""></h2>
        <div>
            <p>${item.title}</p>
        </div>
    </li>`
    }).join("")
})