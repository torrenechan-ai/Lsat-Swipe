# Lsat-Swipe 
Short, game-like LSAT practice on your phone. Scroll through LSAT questions instead of social media.

Try it: https://torrenechan-ai.github.io/Lsat-Swipe/

LSAT Swipe is a free, installable web app (PWA) built around a vertical swipe feed: one question per card, 2–5 minute sessions, and a review system that brings back the questions you miss.

Features
Swipe feed. One question per card, built for one-thumb use.
Commit before you see the answer. Lock in a choice, rate your confidence (Sure / 50-50 / Guess), and say why you picked it before the explanation is revealed.
Trap labels. Every wrong answer is tagged with the trap it uses (Reversed Logic, Out of Scope, Too Extreme, and others), so you learn the patterns, not just the answers.
Full explanations. Why the right answer is right and why each wrong answer is wrong.
Spaced repetition. Missed questions come back after 1, 3, 7 and 21 days. Lucky guesses count as misses.
Skill tree. Logical Reasoning and Reading Comprehension question types, each with a level based on volume and recent accuracy. Tap any type to drill it.
Streaks and XP. A daily question goal keeps the streak alive.
Stats. Accuracy by question type, your most common traps, a confidence check, and a 14-day trend.
Optional timer. A per-question countdown set to LSAT pace.
Works offline. Dark and light themes.
Private by design. No accounts and no server. Progress stays on your device, with export and import for backups.
Question bank

The app ships with 520 original LSAT-style Logical Reasoning questions covering all 19 LR question types, at difficulty levels 1–5. Each question has a full explanation and a trap label for every wrong answer.

These are original questions written to match the LSAT's format and difficulty. They are not official LSAT questions.

If you own official prep material, you can load your own questions from Settings → Import my questions. They're stored only on your device and never uploaded anywhere.

Install on iPhone
Open the link above in Safari.
Tap Share → Add to Home Screen.
Launch it from the home-screen icon. It runs full-screen and works offline after the first load.

On Android, open the link in Chrome and choose Install app.

Adding questions

Questions live in questions.json. Each entry looks like this:

json
{
  "id": "OR-0001",
  "source": "original",
  "section": "LR",
  "type": "Flaw",
  "difficulty": 3,
  "stimulus": "…",
  "stem": "The reasoning in the argument is most vulnerable to criticism on the grounds that it",
  "choices": { "A": "…", "B": "…", "C": "…", "D": "…", "E": "…" },
  "correct": "B",
  "explanation": "…",
  "traps": { "A": "Partially Supported", "C": "Out of Scope", "D": "Too Extreme", "E": "Out of Scope" },
  "tags": ["survey"]
}
section is LR or RC. RC questions also take rc_passage_topic, and the passage goes in stimulus.
type and traps labels must match the names in the taxonomy at the top of index.html.
Questions missing required fields are skipped.
Tech
A single-file HTML/CSS/JavaScript app with no framework and no build step.
Questions are kept separate in questions.json.
A service worker (sw.js) handles offline use, and manifest.json lets it install to the home screen.
Progress is saved in localStorage.
Hosted on GitHub Pages.

Built by Torren, a pre-law Political Science student at the University of Alabama, with help from AI tools.

Disclaimer

LSAT Swipe is an independent study tool and is not affiliated with or endorsed by the Law School Admission Council (LSAC). LSAT is a registered trademark of LSAC.
