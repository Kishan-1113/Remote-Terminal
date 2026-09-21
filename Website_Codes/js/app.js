/**
 * Project Terminal - Clean Interactive Frontend Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const appConfig = window.APP_CONFIG || {};

  document.querySelectorAll("[data-image-key]").forEach(image => {
    const imageConfig = appConfig.images && appConfig.images[image.dataset.imageKey];
    if (!imageConfig || !imageConfig.url) return;

    image.addEventListener("error", () => {
      if (image.src.endsWith(imageConfig.fallback)) return;
      image.src = imageConfig.fallback;
    }, { once: true });
    image.src = imageConfig.url;
  });

  const downloadConfig = appConfig.download;
  if (downloadConfig && downloadConfig.url) {
    document.querySelectorAll("a[download]").forEach(link => {
      link.href = downloadConfig.url;
      if (downloadConfig.filename) link.download = downloadConfig.filename;
    });
  }

  // =========================================================================
  // 1. COMMAND CATALOG DATASET
  // =========================================================================
  const COMMAND_CATALOG = [
    // Git Commands
    {
      category: "git",
      intent: "git.branch.create",
      template: "git checkout -b {branch_name}",
      confirm: false,
      slotKey: "branch_name",
      defaultSlot: "feature-login",
      english: "Create and switch to a new branch",
      hinglish: "computer naam ke branch banao",
      sampleSimOutput: "Switched to a new branch 'computer'"
    },
    {
      category: "git",
      intent: "git.status",
      template: "git status",
      confirm: false,
      slotKey: null,
      english: "Check current working tree status",
      hinglish: "status check karo",
      sampleSimOutput: "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean"
    },
    {
      category: "git",
      intent: "git.commit.message",
      template: 'git commit -m "{message}"',
      confirm: false,
      slotKey: "message",
      defaultSlot: "update docs",
      english: "Commit staged changes with message",
      hinglish: "update docs message ke sath commit karo",
      sampleSimOutput: "[main 8a4c9e1] update docs\n 2 files changed, 18 insertions(+), 4 deletions(-)"
    },
    {
      category: "git",
      intent: "git.push.current",
      template: "git push origin HEAD",
      confirm: false,
      slotKey: null,
      english: "Push current active branch to remote",
      hinglish: "current branch ko push karo",
      sampleSimOutput: "Enumerating objects: 5, done.\nTo github.com:user/project-terminal.git\n * [new branch] main -> main"
    },
    {
      category: "git",
      intent: "git.pull.rebase",
      template: "git pull --rebase",
      confirm: false,
      slotKey: null,
      english: "Pull latest changes using rebase",
      hinglish: "remote se rebase karke pull lo",
      sampleSimOutput: "Current branch main is up to date."
    },
    {
      category: "git",
      intent: "git.branch.delete.force",
      template: "git branch -D {branch_name}",
      confirm: true,
      slotKey: "branch_name",
      defaultSlot: "temp-test",
      english: "Force delete a local branch",
      hinglish: "temp-test branch ko forcefully delete karo",
      sampleSimOutput: "Deleted branch temp-test (was 4f8b1c2)."
    },

    // Docker Commands
    {
      category: "docker",
      intent: "docker.container.stop",
      template: "docker stop {container}",
      confirm: true,
      slotKey: "container",
      defaultSlot: "mouse",
      english: "Gracefully stop a running container",
      hinglish: "mouse container ko stop karo",
      sampleSimOutput: "Stopping container 'mouse'...\nmouse\n[OK] Container mouse successfully stopped (exit code 0)."
    },
    {
      category: "docker",
      intent: "docker.ps",
      template: "docker ps",
      confirm: false,
      slotKey: null,
      english: "List active docker containers",
      hinglish: "active docker containers dikhao",
      sampleSimOutput: "CONTAINER ID   IMAGE          STATUS         PORTS                  NAMES\nc3f4e19a2b     redis:alpine   Up 2 hours     0.0.0.0:6379->6379/tcp redis-cache"
    },
    {
      category: "docker",
      intent: "docker.container.run.detached",
      template: "docker run -d {image}",
      confirm: true,
      slotKey: "image",
      defaultSlot: "redis:alpine",
      english: "Run container in detached background mode",
      hinglish: "redis container background mein chalao",
      sampleSimOutput: "38fa1b490ce5d92e1048f029b3c4820d85a129038d174620f489b1c20e48102a\n[Container started in background]"
    },
    {
      category: "docker",
      intent: "docker.compose.up.detached",
      template: "docker compose up -d",
      confirm: false,
      slotKey: null,
      english: "Start Docker Compose stack in background",
      hinglish: "docker compose up detached mode mein chalao",
      sampleSimOutput: "[+] Running 2/2\n ✔ Container app-db-1   Started\n ✔ Container app-web-1  Started"
    },
    {
      category: "docker",
      intent: "docker.system.prune.all",
      template: "docker system prune -a --volumes -f",
      confirm: true,
      slotKey: null,
      english: "Prune all unused containers, volumes & cache",
      hinglish: "saare bekar docker resources saaf karo",
      sampleSimOutput: "Deleted Containers: c3f4e19a\nTotal reclaimed space: 1.482GB"
    },
    {
      category: "docker",
      intent: "docker.logs.follow",
      template: "docker logs -f {container}",
      confirm: false,
      slotKey: "container",
      defaultSlot: "web-app",
      english: "Stream live logs from a container",
      hinglish: "web-app container ke live logs dikhao",
      sampleSimOutput: "[INFO] Server started on port 8000\n[INFO] Connected to redis cache"
    },

    // Linux Commands
    {
      category: "linux",
      intent: "linux.ls.hidden",
      template: "ls -la",
      confirm: false,
      slotKey: null,
      english: "List all files including hidden dotfiles",
      hinglish: "chhupe hue files dikhao",
      sampleSimOutput: "drwxr-xr-x 4 user staff 128 Sep 18 16:00 .\n-rw-r--r-- 1 user staff  72 Sep 18 16:05 .gitignore\n-rw-r--r-- 1 user staff 5509 Sep 18 16:15 engine.py"
    },
    {
      category: "linux",
      intent: "linux.service.status",
      template: "sudo systemctl status {service}",
      confirm: false,
      slotKey: "service",
      defaultSlot: "nginx",
      english: "Check status of a system service/daemon",
      hinglish: "nginx service ka status check karo",
      sampleSimOutput: "● nginx.service - Web Server\n   Active: active (running) since Fri 2026-09-18 10:00:00 UTC"
    },
    {
      category: "linux",
      intent: "linux.chmod.executable",
      template: "chmod +x {file}",
      confirm: false,
      slotKey: "file",
      defaultSlot: "run_linux.sh",
      english: "Grant execute permission to a script file",
      hinglish: "run_linux.sh file ko executable banao",
      sampleSimOutput: "Mode of 'run_linux.sh' changed to 0755 (-rwxr-xr-x)"
    },
    {
      category: "linux",
      intent: "linux.rm.recursive",
      template: "rm -rf {directory}",
      confirm: true,
      slotKey: "directory",
      defaultSlot: "build",
      english: "Recursively delete directory and contents",
      hinglish: "build folder ko delete karo poora",
      sampleSimOutput: "Removed directory 'build' and all its contents recursively."
    },
    {
      category: "linux",
      intent: "linux.find.name",
      template: "find . -name \"{filename}\"",
      confirm: false,
      slotKey: "filename",
      defaultSlot: "*.log",
      english: "Search for files matching a pattern",
      hinglish: "saari log files dhundho yaha",
      sampleSimOutput: "./logs/app.log\n./logs/error.log"
    },
    {
      category: "linux",
      intent: "linux.df",
      template: "df -h",
      confirm: false,
      slotKey: null,
      english: "Display disk space usage in human-readable format",
      hinglish: "disk space kitna bacha hai dikhao",
      sampleSimOutput: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p2  468G  112G  333G  26% /"
    }
  ];

  // =========================================================================
  // 2. COMMAND CATALOG EXPLORER
  // =========================================================================
  const explorerGrid = document.getElementById("explorerGrid");
  const explorerSearch = document.getElementById("explorerSearch");
  const catFilterBtns = document.querySelectorAll(".cat-filter-btn");
  const explorerCount = document.getElementById("explorerCount");

  let activeCat = "all";
  let searchWord = "";

  function renderCatalog() {
    if (!explorerGrid) return;

    const items = COMMAND_CATALOG.filter(it => {
      const catMatch = activeCat === "all" || it.category === activeCat;
      const searchMatch = !searchWord ||
        it.intent.toLowerCase().includes(searchWord) ||
        it.template.toLowerCase().includes(searchWord) ||
        it.english.toLowerCase().includes(searchWord) ||
        it.hinglish.toLowerCase().includes(searchWord);
      return catMatch && searchMatch;
    });

    if (explorerCount) {
      explorerCount.textContent = `Showing ${items.length} of ${COMMAND_CATALOG.length} indexed commands`;
    }

    if (items.length === 0) {
      explorerGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h4>No matching commands found</h4>
          <p>Try searching for "branch", "docker", "service", or "chmod".</p>
        </div>
      `;
      return;
    }

    explorerGrid.innerHTML = items.map(it => {
      return `
        <div class="cat-card">
          <div class="cat-card-top">
            <span class="category-chip ${it.category}">${it.category.toUpperCase()}</span>
            <span class="cat-intent-id" title="${escapeHtml(it.intent)}">${escapeHtml(it.intent)}</span>
            <span class="safety-flag ${it.confirm ? 'danger' : 'safe'}">
              ${it.confirm ? '⚠️ Confirm' : '⚡ Safe'}
            </span>
          </div>

          <div class="cat-phrases">
            <div class="cat-phrase-row">
              <span class="lang-chip">EN</span>
              <span>${escapeHtml(it.english)}</span>
            </div>
            <div class="cat-phrase-row" style="color: #38bdf8;">
              <span class="lang-chip">HI</span>
              <span>"${escapeHtml(it.hinglish)}"</span>
            </div>
          </div>

          <div class="cat-code-box">
            <code>${escapeHtml(it.template)}</code>
          </div>

          <div class="cat-card-actions">
            <button class="btn-card-action action-test btn-card-test" data-query="${escapeHtml(it.hinglish)}">
              💬 Copy Phrase
            </button>
            <button class="btn-card-action btn-card-copy" data-cmd="${escapeHtml(it.template)}">
              📋 Copy Command
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Attach button listeners
    explorerGrid.querySelectorAll(".btn-card-test").forEach(btn => {
      btn.addEventListener("click", () => {
        const query = btn.getAttribute("data-query");
        if (query) {
          copyText(query, btn);
          showToast(`Copied phrase: "${query}"`);
        }
      });
    });

    explorerGrid.querySelectorAll(".btn-card-copy").forEach(btn => {
      btn.addEventListener("click", () => {
        const cmd = btn.getAttribute("data-cmd");
        if (cmd) copyText(cmd, btn);
      });
    });
  }

  if (catFilterBtns) {
    catFilterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        catFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-filter") || "all";
        renderCatalog();
      });
    });
  }

  if (explorerSearch) {
    explorerSearch.addEventListener("input", (e) => {
      searchWord = e.target.value.toLowerCase().trim();
      renderCatalog();
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        explorerSearch.focus();
      }
    });
  }

  renderCatalog();

  // =========================================================================
  // 5. FAQ ACCORDION & CATEGORY FILTER
  // =========================================================================
  const faqCards = document.querySelectorAll(".faq-card");
  const faqTabs = document.querySelectorAll(".faq-tab-btn");

  faqCards.forEach(card => {
    const q = card.querySelector(".faq-q");
    if (q) {
      q.addEventListener("click", () => {
        const isOpen = card.classList.contains("open");
        faqCards.forEach(c => c.classList.remove("open"));
        if (!isOpen) {
          card.classList.add("open");
        }
      });
    }
  });

  if (faqTabs.length) {
    faqTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        faqTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const category = tab.getAttribute("data-cat");

        let firstMatched = false;
        faqCards.forEach(card => {
          const cardCat = card.getAttribute("data-cat");
          const matches = category === "all" || cardCat === category;

          if (matches) {
            card.style.display = "block";
            if (!firstMatched) {
              card.classList.add("open");
              firstMatched = true;
            } else {
              card.classList.remove("open");
            }
          } else {
            card.style.display = "none";
            card.classList.remove("open");
          }
        });
      });
    });
  }

  // =========================================================================
  // 6. SCROLL PROGRESS & COPY TOAST
  // =========================================================================
  const scrollBar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    if (scrollBar) {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = height > 0 ? (top / height) * 100 : 0;
      scrollBar.style.width = `${pct}%`;
    }
  });

  const toast = document.getElementById("toastNotice");
  const toastMsg = document.getElementById("toastMessage");
  let tTimeout = null;

  function showToast(msg) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add("show");
    if (tTimeout) clearTimeout(tTimeout);
    tTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function copyText(text, btn) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = "✓ Copied";
        setTimeout(() => { btn.innerHTML = orig; }, 1800);
      }
      showToast(`Copied: "${text}"`);
    });
  }

  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const txt = btn.getAttribute("data-copy");
      if (txt) copyText(txt, btn);
    });
  });

  const dlBtn = document.getElementById("btnSingleDownload");
  if (dlBtn) {
    dlBtn.addEventListener("click", () => {
      showToast("Starting download! Windows application ready for local execution.");
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[s]));
  }
});
