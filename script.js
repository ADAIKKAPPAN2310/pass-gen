(() => {
  const passwordInput = document.getElementById("passwordInput");
  const copyBtn = document.getElementById("copyBtn");
  const copyStatus = document.getElementById("copyStatus");
  const copiedMsg = document.getElementById("copiedMsg");
  const lengthSlider = document.getElementById("lengthSlider");
  const lengthValue = document.getElementById("lengthValue");
  const trackFilled = document.getElementById("rangeTrackFilled");
  const trackEmpty = document.getElementById("rangeTrackEmpty");
  const strengthText = document.getElementById("strengthText");
  const strengthFill = document.getElementById("strengthFill");
  const generateBtn = document.getElementById("generateBtn");

  const options = {
    uppercase: document.getElementById("optUppercase"),
    lowercase: document.getElementById("optLowercase"),
    numbers: document.getElementById("optNumbers"),
    symbols: document.getElementById("optSymbols")
  };

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`\"'\\"
  };

  const strengthLevels = [
    { min: 0, label: "Weak", width: 25, gradient: "linear-gradient(to right, #ef4444, #f97316)" },
    { min: 2, label: "Fair", width: 45, gradient: "linear-gradient(to right, #f97316, #eab308)" },
    { min: 4, label: "Good", width: 65, gradient: "linear-gradient(to right, #eab308, #84cc16)" },
    { min: 6, label: "Strong", width: 85, gradient: "linear-gradient(to right, #84cc16, #22c55e)" },
    { min: 8, label: "Very Strong", width: 100, gradient: "linear-gradient(to right, #22c55e, #10b981)" }
  ];

  function randomChar(charPool) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    return charPool[randomIndex];
  }

  function shuffleString(value) {
    const chars = value.split("");
    for (let i = chars.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
  }

  function getEnabledKeys() {
    return Object.keys(options).filter((key) => options[key].checked);
  }

  function ensureAtLeastOneOption(changedKey) {
    const enabled = getEnabledKeys();
    if (enabled.length === 0 && changedKey) {
      options[changedKey].checked = true;
    }
  }

  function updateSliderTrack() {
    const min = Number(lengthSlider.min);
    const max = Number(lengthSlider.max);
    const val = Number(lengthSlider.value);
    const percent = ((val - min) / (max - min)) * 100;

    lengthValue.textContent = String(val);
    trackFilled.style.width = `${percent}%`;
    trackEmpty.style.width = `${100 - percent}%`;
  }

  function calculateStrength(password, enabledCount) {
    let score = 0;

    if (password.length >= 10) score += 2;
    if (password.length >= 14) score += 2;
    if (password.length >= 20) score += 2;
    score += Math.max(0, enabledCount - 1) * 2;

    return Math.min(10, score);
  }

  function renderStrength(score) {
    let level = strengthLevels[0];

    for (const candidate of strengthLevels) {
      if (score >= candidate.min) {
        level = candidate;
      }
    }

    strengthText.textContent = level.label;
    strengthFill.style.width = `${level.width}%`;
    strengthFill.style.backgroundImage = level.gradient;
  }

  function generatePassword() {
    const length = Number(lengthSlider.value);
    const enabledKeys = getEnabledKeys();

    if (enabledKeys.length === 0) {
      options.lowercase.checked = true;
      enabledKeys.push("lowercase");
    }

    const allChars = enabledKeys.map((key) => charSets[key]).join("");

    const required = enabledKeys.map((key) => randomChar(charSets[key]));
    const remainingLength = Math.max(0, length - required.length);

    let generated = required.join("");
    for (let i = 0; i < remainingLength; i += 1) {
      generated += randomChar(allChars);
    }

    generated = shuffleString(generated);

    passwordInput.value = generated;
    const strengthScore = calculateStrength(generated, enabledKeys.length);
    renderStrength(strengthScore);
  }

  async function copyPassword() {
    const textToCopy = passwordInput.value;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copyStatus.textContent = "Password copied.";
      copyBtn.title = "Copied";
      copiedMsg.classList.add("visible");
    } catch {
      passwordInput.focus();
      passwordInput.select();
      copyStatus.textContent = "Could not copy automatically. Press Ctrl+C.";
      copyBtn.title = "Copy to Clipboard";
    }

    window.setTimeout(() => {
      copyBtn.title = "Copy to Clipboard";
      copyStatus.textContent = "";
      copiedMsg.classList.remove("visible");
    }, 1200);
  }

  lengthSlider.addEventListener("input", () => {
    updateSliderTrack();
    generatePassword();
  });

  Object.entries(options).forEach(([key, checkbox]) => {
    checkbox.addEventListener("change", () => {
      ensureAtLeastOneOption(key);
      generatePassword();
    });
  });

  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyPassword);

  updateSliderTrack();
  generatePassword();
})();
