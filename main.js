window.addEventListener("DOMContentLoaded", async function () {
    const cat_btn = document.querySelectorAll('.category-btn');
    const here_nothing = document.querySelector("p#here-nothing");
    const search_box = document.querySelector("input#search-box");
    //const apiurl = "/test.json";
    const apiurl = "https://tags-collection-api.aoku.workers.dev/tags"
    async function renderTags(category="all", lang="all", tag_name=""){
        let reqBody = {};
        let cat = category == "all" ? "all" : category == "normal" ? 0 : category == "request" ? 1 : 2;
        if (cat != "all") reqBody["category"] = cat;
        if (lang != "all") reqBody["lang"] = lang;
        if (tag_name != "") reqBody["tag_name"] = tag_name;
        const url = apiurl + "?" + new URLSearchParams(reqBody).toString();
        console.log(url)
        const serverdata = await ( await fetch(url, {
            method: "GET",
        })).json();
        const cards = document.querySelector("div.servers");
        cards.innerHTML = "";
        for(let i = 0;i<serverdata.count;i++){
            const a = serverdata.data[i];
            //console.log(JSON.stringify(a));
            cards.appendChild(createcard(
                a.server_id,
                a.server_name, 
                a.tag_name,
                //"/5.png",
                a.server_icon, 
                a.server_invite, 
                a.description
            ));
        }
        if (serverdata.count == 0) {
            if(here_nothing.classList.contains("d-none")){
                here_nothing.classList.remove("d-none")
            }
        }
        else {
            if(!here_nothing.classList.contains("d-none")){
                here_nothing.classList.add("d-none")
            }
        }
    }
    cat_btn.forEach((item) => {
        item.addEventListener('click', async (e) => {
            e.target.parentElement.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            await renderTags(
                document.querySelector("#cat .category-btn.active").value,
                document.querySelector("#lang-cat .category-btn.active").value,
                search_box.value.trim()
            );
        });
    });

    search_box.addEventListener("keydown", async (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            await renderTags(
                document.querySelector("#cat .category-btn.active").value,
                document.querySelector("#lang-cat .category-btn.active").value,
                search_box.value.trim()
            );
        }
    });
    await renderTags()
});