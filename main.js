window.addEventListener("DOMContentLoaded", async function () {
    const apiurl = "/test.json";
    const serverdata = await ( await fetch(apiurl, {
        method: "GET"
    })).json();
    const cards = document.querySelector("div.servers");
    for(let i = 0;i<serverdata.count;i++){
        const a = serverdata.data[i];
        console.log(JSON.stringify(a));
        cards.appendChild(createcard(
            a.server_name, 
            a.tag_name,
            //"/5.png",
            a.server_icon, 
            a.server_invite, 
            a.description
        ));
    }
});