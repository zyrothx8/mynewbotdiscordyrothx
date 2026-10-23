
document.getElementById("startBotButton").addEventListener("click", async () => {
    const button = document.getElementById("startBotButton");
    const status = document.getElementById("botStatus");
    const language = document.documentElement.lang;

    button.disabled = true;
    button.textContent = language === "ar" ? "جارٍ التشغيل..." : "Starting...";

    try {
        const response = await fetch("/api/start", {
            method: "POST"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to start bot");
        }

        status.textContent = language === "ar"
            ? "● تم إرسال طلب التشغيل"
            : "● Start request sent";

        checkBotStatus();
    } catch (error) {
        status.textContent = language === "ar"
            ? "● فشل التشغيل"
            : "● Start failed";
    } finally {
        button.disabled = false;
        button.textContent = language === "ar" ? "تشغيل البوت" : "Start Bot";
    }
});

async function checkBotStatus() {
    try {
        const response = await fetch("/api/status");
        const data = await response.json();
        const language = document.documentElement.lang;
        const status = document.getElementById("botStatus");

        status.textContent = data.online
            ? (language === "ar" ? "● أونلاين" : "● Online")
            : (language === "ar" ? "● غير متصل" : "● Offline");

        status.style.color = data.online ? "#50fa7b" : "#ff6868";
    } catch {
        document.getElementById("botStatus").textContent =
            document.documentElement.lang === "ar"
                ? "● الخادم غير متاح"
                : "● Backend unavailable";
    }
}

checkBotStatus();
