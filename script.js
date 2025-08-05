document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const logoImg = document.getElementById("logo-img");
  const heroVideo = document.getElementById("hero-video");
  const overlay = document.getElementById("video-overlay");
  const overlayVideo = document.getElementById("overlay-video");
  const closeOverlay = document.getElementById("close-overlay");
  const performerList = document.getElementById("performer-list");

  // Theme switching
  document.querySelector('[data-filter="straight"]').addEventListener("click", () => {
    body.className = "theme-master";
    logoImg.src = "assets/master-bates-logo.png";
    heroVideo.src = "assets/trailer-straight.mp4";
  });
  document.querySelector('[data-filter="gay"]').addEventListener("click", () => {
    body.className = "theme-kisshim";
    logoImg.src = "assets/kisshim-bates-logo.png";
    heroVideo.src = "assets/bates-brothers.mp4";
  });

  // Performer data (24 total)
  const performers = [
    // Straight
    { name: "Lana Luxe", type: "straight", img: "assets/p1.jpg", video: "assets/p1.mp4", stats: "3.9K Fans · $14.99/mo", rating: 5, isNew: false },
    { name: "Sasha Storm", type: "straight", img: "assets/p2.jpg", video: "assets/p2.mp4", stats: "2.5K Fans · $9.99/mo", rating: 4, isNew: true },
    { name: "Mia Flame", type: "straight", img: "assets/p3.jpg", video: "assets/p3.mp4", stats: "4.2K Fans · $19.99/mo", rating: 5, isNew: false },
    { name: "Roxy Rose", type: "straight", img: "assets/p4.jpg", video: "assets/p4.mp4", stats: "3.1K Fans · $12.99/mo", rating: 3, isNew: true },
    { name: "Nina Blaze", type: "straight", img: "assets/p9.jpg", video: "assets/p9.mp4", stats: "5.0K Fans · $15.99/mo", rating: 5, isNew: false },
    { name: "Chloe Chase", type: "straight", img: "assets/p10.jpg", video: "assets/p10.mp4", stats: "2.8K Fans · $10.99/mo", rating: 4, isNew: true },
    { name: "Bella Banks", type: "straight", img: "assets/p11.jpg", video: "assets/p11.mp4", stats: "4.5K Fans · $13.99/mo", rating: 5, isNew: false },
    { name: "Amber Arouse", type: "straight", img: "assets/p12.jpg", video: "assets/p12.mp4", stats: "3.3K Fans · $11.99/mo", rating: 4, isNew: false },

    // Gay
    { name: "Kisshim Bates", type: "gay", img: "assets/p5.jpg", video: "assets/bates-brothers.mp4", stats: "5.4K Fans · $24.99/mo", rating: 5, isNew: false },
    { name: "Tyler Torque", type: "gay", img: "assets/p6.jpg", video: "assets/p6.mp4", stats: "2.7K Fans · $8.99/mo", rating: 3, isNew: true },
    { name: "Diego Dusk", type: "gay", img: "assets/p7.jpg", video: "assets/p7.mp4", stats: "3.6K Fans · $10.99/mo", rating: 4, isNew: false },
    { name: "Nico Noir", type: "gay", img: "assets/p8.jpg", video: "assets/p8.mp4", stats: "4.8K Fans · $16.99/mo", rating: 5, isNew: false },
    { name: "Marco Muse", type: "gay", img: "assets/p13.jpg", video: "assets/p13.mp4", stats: "2.2K Fans · $9.99/mo", rating: 4, isNew: true },
    { name: "Adrian Ace", type: "gay", img: "assets/p14.jpg", video: "assets/p14.mp4", stats: "3.4K Fans · $12.49/mo", rating: 5, isNew: false },
    { name: "Lucio Lux", type: "gay", img: "assets/p15.jpg", video: "assets/p15.mp4", stats: "4.0K Fans · $14.00/mo", rating: 3, isNew: true },
    { name: "Vin Vega", type: "gay", img: "assets/p16.jpg", video: "assets/p16.mp4", stats: "3.0K Fans · $11.50/mo", rating: 4, isNew: false },

    // AI
    { name: "AIVA 3000", type: "ai", img: "assets/p17.jpg", video: "assets/p17.mp4", stats: "8.9K Fans · $5.00/mo", rating: 5, isNew: true },
    { name: "DeepDream Doll", type: "ai", img: "assets/p18.jpg", video: "assets/p18.mp4", stats: "7.4K Fans · $6.50/mo", rating: 4, isNew: false },
    { name: "Synth Siren", type: "ai", img: "assets/p19.jpg", video: "assets/p19.mp4", stats: "6.2K Fans · $7.99/mo", rating: 4, isNew: true },
    { name: "Virtua Vixen", type: "ai", img: "assets/p20.jpg", video: "assets/p20.mp4", stats: "9.1K Fans · $5.99/mo", rating: 5, isNew: false },
    { name: "Pixel Princess", type: "ai", img: "assets/p21.jpg", video: "assets/p21.mp4", stats: "7.9K Fans · $6.99/mo", rating: 5, isNew: true },
    { name: "Code Candy", type: "ai", img: "assets/p22.jpg", video: "assets/p22.mp4", stats: "8.0K Fans · $4.99/mo", rating: 4, isNew: false },
    { name: "Bot Babe", type: "ai", img: "assets/p23.jpg", video: "assets/p23.mp4", stats: "7.2K Fans · $6.00/mo", rating: 4, isNew: true },
    { name: "Neon Nymph", type: "ai", img: "assets/p24.jpg", video: "assets/p24.mp4", stats: "8.3K Fans · $5.50/mo", rating: 5, isNew: false }
  ];

  // Build performer cards
  function buildGrid(filter = "all") {
    performerList.innerHTML = "";
    let filtered = performers;
    if (filter !== "all") {
      if (filter === "top") filtered = performers.filter(p => p.rating >= 5);
      else if (filter === "new") filtered = performers.filter(p => p.isNew);
      else filtered = performers.filter(p => p.type === filter);
    }
    filtered.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("performer-card");
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="performer-meta">${p.stats}</div>
      `;
      card.addEventListener("click", () => playOverlay(p.video));
      performerList.appendChild(card);
    });
  }

  // Category filter buttons
  document.querySelectorAll("nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      buildGrid(btn.dataset.filter);
    });
  });

  // Overlay video play
  function playOverlay(videoSrc) {
    overlayVideo.src = videoSrc;
    overlay.classList.remove("hidden");
    overlayVideo.play();
  }
  closeOverlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    overlayVideo.pause();
    overlayVideo.src = "";
  });

  // Build initial grid
  buildGrid();

  // Recently Active
  const recentList = document.getElementById("recent-list");
  performers.slice(0, 6).forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.name;
    recentList.appendChild(li);
  });

  // Top Fans
  const fanList = document.getElementById("fan-list");
  ["FanMaster69", "TipKing", "GoldGiver", "OilLord", "BugattiBaller"].forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    fanList.appendChild(li);
  });

  // Trending Tags
  const tagList = document.getElementById("tag-list");
  ["#oilwrestling", "#beach", "#bugatti", "#sunsetshoot", "#roleplay", "#striptease", "#lingerie", "#aiangel", "#viponly"].forEach(t => {
    const span = document.createElement("span");
    span.textContent = t;
    tagList.appendChild(span);
  });

  // JuicyAds Interstitial Trigger
  const adScript = document.createElement("script");
  adScript.type = "text/javascript";
  adScript.setAttribute("data-id", "juicyads-native-ads");
  adScript.setAttribute("data-ad-zone", "1098048"); // Replace with your zone
  adScript.setAttribute("data-targets", ".ad-link");
  adScript.src = "https://js.juicyads.com/juicyads.native-ads.min.js";
  document.body.appendChild(adScript);

  // AI Keyword Video Triggers
  const aiForm = document.getElementById("ai-form");
  const aiResponse = document.getElementById("ai-response");

  aiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("desire").value.toLowerCase();
    const aiMap = {
      "oil wrestling": "assets/oil-wrestling.mp4",
      "threesome": "assets/threesome.mp4",
      "lesbian kiss": "assets/lesbian-kiss.mp4",
      "cowgirl": "assets/cowgirl.mp4",
      "strip tease": "assets/strip-tease.mp4",
      "beach bugatti": "assets/trailer-straight.mp4",
      "blonde": "assets/p1.mp4",
      "ai goddess": "assets/p17.mp4"
    };
    const videoFile = aiMap[query] || "";
    if (videoFile) {
      aiResponse.innerHTML = `<video src="${videoFile}" autoplay loop muted width="100%"></video>`;
    } else {
      aiResponse.innerHTML = `👀 Searching for: "${query}"... (Not found yet)`;
    }
  });
});
