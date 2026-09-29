// ================================
// 3D CARD EFFECT
// DESKTOP ONLY
// ================================

const card = document.querySelector(".profile-card");

if (card && window.innerWidth > 600) {

  document.addEventListener("mousemove", function (event) {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateX = (centerY - event.clientY) / 100;
    const rotateY = (event.clientX - centerX) / 100;

    card.style.transform =
      `translateY(-50%) perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;

  });

  document.addEventListener("mouseleave", function () {

    card.style.transform =
      "translateY(-50%) perspective(1000px) rotateX(0deg) rotateY(0deg)";

  });

}


// ================================
// RESET EFFECT WHEN RESIZING
// ================================

window.addEventListener("resize", function () {

  if (window.innerWidth <= 600 && card) {
    card.style.transform = "none";
  }

});

const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

if (music && musicToggle) {
  musicToggle.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        musicToggle.textContent = "🔊";
      } else {
        music.pause();
        musicToggle.textContent = "🔇";
      }
    } catch (error) {
      console.error("Music error:", error);
    }
  });
}

window.addEventListener("pagehide", () => {
  music.pause();
  music.currentTime = 0;
});

/*visible*/
const SUPABASE_URL = "https://kwdodscnscditdzgptbd.supabase.co";
const SUPABASE_KEY = "sb_publishable_dqBnsHMB7ABGJ2yBe9A7ng_yMOAIIK8";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const views = document.getElementById("views");

function getVisitorId() {
  let id = localStorage.getItem("ryuVisitorId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("ryuVisitorId", id);
  }

  return id;
}

async function registerView() {
  const { data, error } = await supabase.rpc("register_view", {
    p_visitor_id: getVisitorId()
  });

  if (error) {
    console.error("Visitor counter:", error);
    return;
  }

  if (views) {
    views.textContent = String(data).padStart(3, "0");
  }
}

registerView();
