const blockedIPs = [
  "123.123.123.123",  // 차단할 IP
  "111.111.111.111"
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("❌ POST만 허용됩니다.");
  }

  const ip = (
    req.headers["x-forwarded-for"]?.split(',')[0] ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress
  ).trim();

  if (blockedIPs.includes(ip)) {
    console.log(`[차단됨] IP: ${ip}`);
    return res.status(403).send("🚫 이용할 수 없습니다. 차단되었습니다.");
  }

  let raw = "";
  req.on("data", chunk => raw += chunk);
  req.on("end", () => {
    const params = new URLSearchParams(raw);
    const message = params.get("message");

    if (!message || message.trim() === "") {
      return res.status(400).send("⚠️ 메시지를 입력하세요.");
    }

    console.log(`[새 질문 도착]\nIP: ${ip}\n내용: ${message}`);
    return res.status(200).send("✅ 질문이 성공적으로 전송되었습니다!");
  });
}
