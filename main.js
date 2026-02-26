window.addEventListener("DOMContentLoaded", async function () {
    // const apiurl = "/test.json";
    const apiurl = "https://tags-collection-api.aoku.workers.dev/tags"
    async function renderTags(category="all", lang="all"){
        let reqBody = {};
        if (category != "all") reqBody["category"] = category;
        if (lang != "all") reqBody["lang"] = lang;
        const serverdata = await ( await fetch(apiurl, {
            method: "GET",
            body: JSON.stringify(reqBody)
        })).json();
        const cards = document.querySelector("div.servers");
        for(let i = 0;i<serverdata.count;i++){
            const a = serverdata.data[i];
            console.log(JSON.stringify(a));
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
    }
    function changeCategory(){
        
    }
    await renderTags()
});