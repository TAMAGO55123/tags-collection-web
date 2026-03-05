window.addEventListener("DOMContentLoaded", async function () {
    const search_box = document.querySelector("input#search-box");
    const server = document.querySelector("div#server");
    const loding = document.querySelector("div#loading");
    //const apiurl = "/test.json";
    const apiurl = "https://tags-collection-api.aoku.workers.dev/tags";
    let page = 1;

    search_box.addEventListener("keydown", async (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            this.location.href = `/?search=${search_box.value.trim()}`
        }
    });

    async function renderTag(serverid){
        loding.classList.remove("d-none");
        /*const data = {
            "id": 391,
            "server_id": "1437303908736172074",
            "server_name": "egirl lounge 🎀 | dating  •  ask2dm •  giveaways •  chill •  active • icons",
            "server_invite": "https://discord.gg/BSu48PPf6P",
            "server_icon": "https://cdn.discordapp.com/icons/1437303908736172074/a_124c31860f83f7a5b8a90565407a8a01.gif?size=1024",
            "tag_name": "^ω^",
            "category": 0,
            "lang": "English",
            "bumped": 1772453894,
            "created_at": 1772453894,
            "description": ""
        }*/
        const url = `${apiurl}?id=${serverid}`;
        console.log(url)
        const serverdata = await ( await fetch(url, {
            method: "GET",
        })).json();
        console.log(serverdata)
        if (serverdata.count != 0) {
            const data = serverdata.data[0]
            const row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("d-flex");
            const left_grid = document.createElement("div");
            left_grid.classList.add("col-4");
            left_grid.classList.add("d-flex")
            left_grid.classList.add("justify-content-center")
            const right_grid = document.createElement("div");
            right_grid.classList.add("col-8");
            // タイトル
            const title = document.createElement("h4");
            title.textContent = data.server_name;
            // タグ名
            const tag_main = document.createElement("p");
            tag_main.textContent = "タグ：";
            const tag = document.createElement("span");
            tag.textContent = data.tag_name;
            tag.classList.add("tag");
            // サーバーアイコン
            const img = document.createElement("img");
            img.src = data.server_icon;
            img.classList.add("servericon");
            img.classList.add("d-flex");
            // メンバーカウント
            const count = document.createElement("p");
            count.classList.add("count");
            count.classList.add("align-items-center");
            count.classList.add("d-flex");
            const online_img = document.createElement("img");
            online_img.src = "/img/online.png";
            const all_img = document.createElement("i");
            all_img.classList.add("bi");
            all_img.classList.add("bi-person");
            count.appendChild(online_img);
            const invite_info = await getDiscordInviteInfo(data.server_invite);
            count.innerHTML += escapeHTML(invite_info.onlineCount);
            count.innerHTML += "/"
            count.appendChild(all_img);
            count.innerHTML += escapeHTML(invite_info.memberCount);
            // 参加ボタン
            const join_div = document.createElement("div");
            join_div.classList.add("d-flex");
            join_div.classList.add("justify-content-center");
            const join_btn = document.createElement("button")
            join_btn.classList.add("join-btn");
            join_btn.classList.add("col-10");
            join_btn.classList.add("d-flex");
            join_btn.classList.add("text-center");
            join_btn.classList.add("justify-content-center");
            join_btn.textContent = "参加する"
            join_btn.addEventListener("click", () => {
                window.open(data.server_invite, "_blank");
            });
            // 要素追加
            server.appendChild(row);
            row.appendChild(left_grid);
            row.appendChild(right_grid);
            left_grid.appendChild(img);
            right_grid.appendChild(title);
            right_grid.appendChild(tag_main)
            tag_main.appendChild(tag);
            right_grid.appendChild(count);
            row.appendChild(join_div);
            join_div.appendChild(join_btn)
        } else {
            window.location.href="/"
        }
        loding.classList.add("d-none")
    }

    const params = new URLSearchParams(location.search);
    
    if (params.has("id")) {
        await renderTag(params.get("id"))
    }
    else {
        window.location.href="/"
    }
});