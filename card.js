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
function createcard(id, servername, tagname, servericon, serverinvite, description){
    const main_card = document.createElement("div");
    main_card.classList.add("col");
    main_card.id = id;
    const card_div = document.createElement("div");
    card_div.classList.add("server-card");
    const title = document.createElement("h5");
    title.classList.add("server-title")
    title.textContent = servername;
    const tag = document.createElement("p");
    tag.textContent = tagname;
    const icon = document.createElement("img");
    icon.classList.add("server-icon");
    icon.src = fixIconUrl(servericon);
    const des = document.createElement("p");
    des.classList.add("text-tertiary");
    des.classList.add("small");
    des.textContent = "クリックして詳細";
    const mem = document.createElement("p");
    mem.classList.add("text-tertiary");
    mem.classList.add("small");
    mem.textContent = "メンバー:";
    mem.style.display = "none";
    const join = document.createElement("button");
    join.textContent = "参加する";
    join.classList.add("join-btn");
    join.classList.add("btn");
    join.classList.add("btn-primary");
    const share_btn = document.createElement("button");
    share_btn.classList.add("btn");
    share_btn.classList.add("btn-outline-light")
    share_btn.classList.add("share")
    const share = document.createElement("i");
    share.classList.add("bi");
    share.classList.add("bi-share");
    join.addEventListener("click", function () {
        window.open(serverinvite, "_blank");
    });
    card_div.addEventListener("click", async function (e) {
        title.classList.add("full");
        const d = await getDiscordInviteInfo(serverinvite);
        let de = "説明が存在しません。"
        if(description != "") de = description;
        des.textContent = de;
        mem.textContent = `メンバー:${d.onlineCount}/${d.memberCount}`
        mem.style.display = "";
    });
    share_btn.addEventListener("click", async (e) => {
        const url = `${window.location.protocol}//${window.location.host}/server?id=${id}`;
        await navigator.clipboard.writeText(url)
        alert("クリップボードにコピーしました！")
    });
    card_div.appendChild(icon);
    card_div.appendChild(title);
    card_div.appendChild(tag);
    card_div.appendChild(des);
    card_div.appendChild(mem);
    card_div.appendChild(join);
    card_div.appendChild(share_btn);
    share_btn.appendChild(share);
    main_card.appendChild(card_div);
    return main_card
}