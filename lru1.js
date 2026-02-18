let capacity = 0;
let cache;

function initCache() {
    const capInput = document.getElementById("capacity").value;
    if (capInput <= 0) {
        alert("Enter valid capacity");
        return;
    }

    capacity = parseInt(capInput);
    cache = new Map();
    updateStatus("Cache initialized with capacity " + capacity);
    renderCache();
}

function updateStatus(msg) {
    document.getElementById("status").innerText = msg;
}

function renderCache() {
    const cacheDiv = document.getElementById("cache");
    cacheDiv.innerHTML = "";

    if (!cache || cache.size === 0) {
        cacheDiv.innerHTML = "<p>Cache empty</p>";
        return;
    }

    const entries = Array.from(cache.entries());

    entries.reverse().forEach((item, index) => {
        const [key, value] = item;

        const box = document.createElement("div");
        box.classList.add("cache-box");
        box.innerHTML = `<b>${key}</b><br>${value}`;

        if (index === 0) box.classList.add("mru");
        if (index === entries.length - 1) box.classList.add("lru");

        cacheDiv.appendChild(box);
    });
}

function getKey() {
    const key = document.getElementById("key").value;

    if (!cache || capacity === 0) {
        alert("Initialize cache first");
        return;
    }

    if (!cache.has(key)) {
        updateStatus("❌ MISSING KEY: " + key);
        return;
    }

    const val = cache.get(key);
    cache.delete(key);
    cache.set(key, val);

    updateStatus("✅ FOUND: " + key + " = " + val);
    renderCache();
}

function putKey() {
    const key = document.getElementById("key").value;
    const value = document.getElementById("value").value;

    if (!cache || capacity === 0) {
        alert("Initialize cache first");
        return;
    }

    if (key === "") {
        alert("Enter key");
        return;
    }

    // If key already exists → remove it first
    if (cache.has(key)) {
        cache.delete(key);
    }

    // If cache full → remove LRU
    if (cache.size >= capacity) {
        const lruKey = cache.keys().next().value;
        cache.delete(lruKey);
        updateStatus("🗑️ Removed LRU key: " + lruKey);
    }

    // Insert as most recent
    cache.set(key, value);

    renderCache();
}

function clearCache() {
    cache.clear();
    renderCache();
    updateStatus("Cache cleared");
}
