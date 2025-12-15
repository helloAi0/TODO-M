// 10 × 10 × 10 × 10 = 100,000 quotes
// Lightweight, offline, customizable quote generator

const part1 = [
    "Small steps",
    "Consistent effort",
    "Focused action",
    "Daily progress",
    "Strong discipline",
    "Clear intention",
    "Persistent work",
    "Smart planning",
    "Positive habits",
    "Determined mindset"
];

const part2 = [
    "every single day",
    "with patience",
    "with consistency",
    "without excuses",
    "with full focus",
    "with purpose",
    "with courage",
    "with clarity",
    "with belief",
    "with commitment"
];

const part3 = [
    "leads to",
    "creates",
    "builds",
    "unlocks",
    "shapes",
    "strengthens",
    "drives",
    "multiplies",
    "accelerates",
    "defines"
];

const part4 = [
    "big results 🚀",
    "your best future ✨",
    "real success 💪",
    "long-term growth 🌱",
    "freedom tomorrow 🔥",
    "strong habits ✔",
    "true confidence ⚡",
    "meaningful wins 🏆",
    "your goals 🎯",
    "lasting change 🧠"
];

// Generate quotes lazily (better performance than huge array)
export function getRandomQuote() {
    const a = part1[Math.floor(Math.random() * part1.length)];
    const b = part2[Math.floor(Math.random() * part2.length)];
    const c = part3[Math.floor(Math.random() * part3.length)];
    const d = part4[Math.floor(Math.random() * part4.length)];

    return `${a} ${b} ${c} ${d}`;
}
