async function getDiscordInviteInfo(inviteUrl) {
    // 招待コードを抽出
    const match = inviteUrl.match(/discord\.gg\/([^\/]+)/);
    if (!match) {
        throw new Error("招待リンクが正しくありません");
    }
  
    const inviteCode = match[1];
  
    // Discord REST API
    const apiUrl = `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`;
  
    const res = await fetch(apiUrl);
    if (!res.ok) {
        throw new Error("APIリクエストに失敗しました: " + res.status);
    }
  
    const data = await res.json();
  
    return {
        serverName: data.guild?.name,
        memberCount: data.approximate_member_count,
        onlineCount: data.approximate_presence_count,
        icon: data.guild?.icon,
    };
}
  