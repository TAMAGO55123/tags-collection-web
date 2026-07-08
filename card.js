function fixIconUrl(url) {
    try {
        const u = new URL(url);
        const filename = u.pathname.split('/').pop();

        const isAnimated = filename.startsWith("a_");

        if (isAnimated) {
            u.searchParams.delete("size");
        }

        return u.toString();
    } catch {
        return url;
    }
}
function escapeHTML(str) {
    const div = document.createElement("div")
    div.textContent = str
    return div.innerHTML
}
function createcard(id, servername, tagname, servericon, serverinvite, description){
    const main_card = document.createElement("div");
    main_card.classList.add("col");
    main_card.id = id;
    main_card.innerHTML = `
    <div class="server-card">
        <img src="${escapeHTML(fixIconUrl(servericon))}" class="server-icon">    
        <h5>${escapeHTML(servername)}</h5>
        <p>${escapeHTML(tagname)}</p>
        <p class="text-tertiary small des">クリックして詳細</p>
        <p class="text-tertiary small mem" style="display: none;">メンバー:</p>
        <button class="join-btn btn btn-primary">参加する</button>
        <button class="btn btn-outline-light share"><i class="bi bi-share"></i></button>
    </div>
    `
    
    main_card.querySelector("button.join-btn").addEventListener("click", function () {
        window.open(serverinvite, "_blank");
    });
    main_card.querySelector("div.server-card").addEventListener("click", async function (e) {
        main_card.querySelector("h5").classList.add("full");
        const d = await getDiscordInviteInfo(serverinvite);
        let de = "説明が存在しません。"
        if(description != "") de = description;
        main_card.querySelector("p.des").textContent = de;
        main_card.querySelector("p.mem").textContent = `メンバー:${d.onlineCount}/${d.memberCount}`
        main_card.querySelector("p.mem").style.display = "";
    });
    main_card.querySelector("button.share").addEventListener("click", async (e) => {
        const url = `${window.location.protocol}//${window.location.host}/server?id=${id}`;
        await navigator.clipboard.writeText(url)
        alert("クリップボードにコピーしました！")
    });
    return main_card
}