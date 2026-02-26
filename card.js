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
function createcard(serverid, servername, tagname, servericon, serverinvite, description){
    const main_card = document.createElement("div");
    main_card.classList.add("col");
    main_card.id = serverid;
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
    join.addEventListener("click", function () {
        window.open(serverinvite, "_blank");
    });
    card_div.addEventListener("click", async function () {
        title.classList.add("full");
        const d = await getDiscordInviteInfo(serverinvite);
        let de = "説明が存在しません。"
        if(description != "") de = description;
        des.textContent = de;
        mem.textContent = `メンバー:${d.onlineCount}/${d.memberCount}`
        mem.style.display = "";
    });
    card_div.appendChild(icon);
    card_div.appendChild(title);
    card_div.appendChild(tag);
    card_div.appendChild(des);
    card_div.appendChild(mem);
    card_div.appendChild(join);
    main_card.appendChild(card_div);
    return main_card
}