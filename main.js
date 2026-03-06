window.addEventListener("DOMContentLoaded", async function () {
    const cards = document.querySelector("div.servers");
    const cat_btn = document.querySelectorAll('.category-btn');
    const here_nothing = document.querySelector("p#here-nothing");
    const search_box = document.querySelector("input#search-box");
    const page_changer = document.querySelector("div#page-changer");
    const now_page = document.querySelector("span#now-page");
    const all_page = document.querySelector("span#all-page");
    const page_back = document.querySelector("button#page-back");
    const page_next = document.querySelector("button#page-next");
    const loding = document.querySelector("div#loading");
    //const apiurl = "/test.json";
    const apiurl = "https://tags-collection-api.aoku.workers.dev/tags";
    let page = 1;
    async function renderTags(category="all", lang="all", tag_name=""){
        cards.classList.add("d-none");
        page_changer.classList.add("d-none");
        loding.classList.remove("d-none");
        let reqBody = {offset: page};
        let cat = category == "all" ? "all" : category == "normal" ? 0 : category == "request" ? 1 : 2;
        if (cat != "all") reqBody["category"] = cat;
        if (lang != "all") reqBody["lang"] = lang;
        if (tag_name != "") reqBody["tag_name"] = tag_name;
        const url = apiurl + "?" + new URLSearchParams(reqBody).toString();
        console.log(url)
        const serverdata = await ( await fetch(url, {
            method: "GET",
        })).json();
        cards.innerHTML = "";
        let rows; 
        if(serverdata.limit < serverdata.count){rows = serverdata.limit;}
        else{rows = serverdata.count} 
        for(let i = 0;i<rows;i++){
            const a = serverdata.data[i];
            //console.log(JSON.stringify(a));
            cards.appendChild(createcard(
                a.id,
                a.server_name, 
                a.tag_name,
                //"/5.png",
                a.server_icon, 
                a.server_invite, 
                a.description
            ));
        }
        let isNoting = false;
        if (serverdata.count == 0) isNoting = true;
        else isNoting = false;

        now_page.textContent = page;
        all_page.textContent = Math.ceil(serverdata.count / serverdata.limit);
        cards.classList.remove("d-none");
        if(!isNoting){
            page_changer.classList.remove("d-none");
            here_nothing.classList.add("d-none");
        }
        else {
            here_nothing.classList.remove("d-none");
        }
        loding.classList.add("d-none");
    }
    cat_btn.forEach((item) => {
        item.addEventListener('click', async (e) => {
            e.target.parentElement.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const url = new URL(window.location.href);
            url.searchParams.set("category", document.querySelector("#cat .category-btn.active").value);
            url.searchParams.set("lang", document.querySelector("#lang-cat .category-btn.active").value);
            if(document.querySelector("#cat .category-btn.active").value == "all"){
                url.searchParams.delete("category");
            }
            if(document.querySelector("#lang-cat .category-btn.active").value == "all"){
                url.searchParams.delete("lang")
            }
            history.replaceState(null, "", url);
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
            page = 1
            const url = new URL(window.location.href);
            url.searchParams.set("search", search_box.value.trim());
            if(search_box.value.trim() == "") {
                url.searchParams.delete("search");
            }
            history.replaceState(null, "", url);
            await renderTags(
                document.querySelector("#cat .category-btn.active").value,
                document.querySelector("#lang-cat .category-btn.active").value,
                search_box.value.trim()
            );
        }
    });

    page_back.addEventListener("click", async () => {
        if(page > 1) {
            page -= 1;
            now_page.textContent = page;
            const url = new URL(window.location.href);
            url.searchParams.set("page", page);
            if(page == 1) {
                url.searchParams.delete("page");
            }
            history.replaceState(null, "", url);
            await renderTags(
                document.querySelector("#cat .category-btn.active").value,
                document.querySelector("#lang-cat .category-btn.active").value,
                search_box.value.trim()
            );
            page_back.disable = page <= 1;
            page_next.disable = page >= Number(all_page.textContent);
        }
    });
    page_next.addEventListener("click", async () => {
        if(page < Number(all_page.textContent)) {
            page += 1;
            now_page.textContent = page;
            const url = new URL(window.location.href);
            url.searchParams.set("page", page);
            if(page == 1) {
                url.searchParams.delete("page");
            }
            history.replaceState(null, "", url);
            await renderTags(
                document.querySelector("#cat .category-btn.active").value,
                document.querySelector("#lang-cat .category-btn.active").value,
                search_box.value.trim()
            );
            page_back.disabled = page <= 1;
            page_next.disabled = page >= Number(all_page.textContent);
        }
    });
    const params = new URLSearchParams(location.search);
    search_box.value = params.get("search");
    page = params.has("page") ? Number(params.get("page")) : 1;
    let category = document.querySelector(params.has("category") ? `div#cat button[value=${params.get("category")}]` : "div#cat button[value=all]");
    category.classList.add("active");
    let category_lang = document.querySelector(params.has("lang") ? `div#lang-cat button[value=${params.get("lang")}]` : "div#lang-cat button[value=all]");
    category_lang.classList.add("active");
    await renderTags(
        document.querySelector("#cat .category-btn.active").value,
        document.querySelector("#lang-cat .category-btn.active").value,
        search_box.value.trim()
    );
    page_back.disabled = page <= 1;
    page_next.disabled = page >= Number(all_page.textContent);
});