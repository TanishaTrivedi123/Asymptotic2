const YES_KEYWORDS = new Set([
  "yes",
  "y",
  "yeah",
  "yaa",
  "yep",
  "haan",
  "haa",
  "ha",
  "han",
  "ok",
  "okay",
  "sure",
  "bilkul",
  "definitely",
  "of course",
  "why not"
]);

const NO_KEYWORDS = new Set([
  "no",
  "n",
  "nope",
  "nah",
  "nahi",
  "na",
  "not",
  "never",
  "dont",
  "do not"
]);

module.exports = { YES_KEYWORDS, NO_KEYWORDS };
