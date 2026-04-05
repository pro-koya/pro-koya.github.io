(function () {
  "use strict";

  function getSiteRoot() {
    var root = document.body ? document.body.getAttribute("data-site-root") : "";
    if (!root) return "./";
    return /\/$/.test(root) ? root : root + "/";
  }

  function resolveSitePath(path) {
    if (!path) return "#";
    if (/^(https?:)?\/\//.test(path)) return path;
    return getSiteRoot() + path.replace(/^\.?\//, "");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderTags(tags) {
    return (tags || [])
      .map(function (tag) {
        return '<span>' + escapeHtml(tag) + "</span>";
      })
      .join("");
  }

  function getWorks() {
    return Array.isArray(window.PORTFOLIO_WORKS) ? window.PORTFOLIO_WORKS.slice() : [];
  }

  function sortWorks(items, key) {
    return items.sort(function (a, b) {
      var left = typeof a[key] === "number" ? a[key] : 999;
      var right = typeof b[key] === "number" ? b[key] : 999;
      return left - right;
    });
  }

  function createFeaturedWorkCard(work, index) {
    var number = String(index + 1).padStart(2, "0");
    return [
      '<article class="work-card work-card--featured reveal">',
      '  <div class="work-card__number">' + number + "</div>",
      '  <a class="work-card__media" href="' + escapeHtml(resolveSitePath(work.detailPath)) + '">',
      '    <img src="' + escapeHtml(resolveSitePath(work.thumbnail)) + '" alt="' + escapeHtml(work.title) + 'のサムネイル">',
      "  </a>",
      '  <div class="work-card__body">',
      '    <div class="work-card__kicker">Selected Work / ' + number + "</div>",
      '    <h3 class="work-card__title">' + escapeHtml(work.title) + "</h3>",
      '    <p class="work-card__summary">' + escapeHtml(work.summary) + "</p>",
      '    <p class="work-card__excerpt">' + escapeHtml(work.excerpt) + "</p>",
      '    <div class="work-card__meta-line">' + escapeHtml(work.categoryLabel) + " / " + escapeHtml(work.focusLabel) + "</div>",
      '    <div class="work-card__stack">' + renderTags((work.tags || []).slice(0, 4)) + "</div>",
      '    <a class="text-link" href="' + escapeHtml(resolveSitePath(work.detailPath)) + '">詳細を見る</a>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function createCategoryWorkCard(work, index) {
    var number = String(index + 1).padStart(2, "0");
    return [
      '<article class="works-entry reveal">',
      '  <div class="works-entry__number">' + number + "</div>",
      '  <div class="works-entry__body">',
      '    <div class="works-entry__kicker">' + escapeHtml(work.categoryLabel) + " / " + escapeHtml(work.focusLabel) + "</div>",
      '    <h3 class="works-entry__title">' + escapeHtml(work.title) + "</h3>",
      '    <p class="works-entry__summary">' + escapeHtml(work.summary) + "</p>",
      '    <p class="works-entry__excerpt">' + escapeHtml(work.excerpt) + "</p>",
      '    <div class="works-entry__stack">' + renderTags(work.tags || []) + "</div>",
      '    <a class="text-link" href="' + escapeHtml(resolveSitePath(work.detailPath)) + '">ケーススタディを見る</a>',
      "  </div>",
      '  <a class="works-entry__media" href="' + escapeHtml(resolveSitePath(work.detailPath)) + '">',
      '    <img src="' + escapeHtml(resolveSitePath(work.thumbnail)) + '" alt="' + escapeHtml(work.title) + 'のサムネイル">',
      "  </a>",
      "</article>"
    ].join("");
  }

  function renderFeaturedWorks(featuredMount, works) {
    featuredMount.innerHTML = works
      .map(function (work, index) {
        return createFeaturedWorkCard(work, index);
      })
      .join("");
  }

  function renderCategoryWorks(mount, works) {
    mount.innerHTML = works
      .map(function (work, index) {
        return createCategoryWorkCard(work, index);
      })
      .join("");
  }

  function renderWorks() {
    var works = getWorks();
    if (!works.length) return;

    var featuredMount = document.querySelector("[data-featured-works]");
    if (featuredMount) {
      var featured = sortWorks(
        works.filter(function (work) {
          return Boolean(work.featured);
        }),
        "featuredOrder"
      );
      renderFeaturedWorks(featuredMount, featured);
    }

    document.querySelectorAll("[data-category-works]").forEach(function (mount) {
      var category = mount.getAttribute("data-category-works");
      var items = sortWorks(
        works.filter(function (work) {
          return work.category === category;
        }),
        "categoryOrder"
      );
      renderCategoryWorks(mount, items);
    });
  }

  function initHeader() {
    var header = document.querySelector("[data-site-header]");
    if (!header) return;

    var toggle = header.querySelector("[data-nav-toggle]");
    var links = header.querySelectorAll(".site-nav a");

    function syncScrollState() {
      header.classList.toggle("is-scrolled", window.scrollY > 14);
    }

    function setMenuState(open) {
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (toggle) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      }
    }

    function closeMenu() {
      setMenuState(false);
    }

    function toggleMenu() {
      setMenuState(!header.classList.contains("is-open"));
    }

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    if (toggle) {
      toggle.addEventListener("click", toggleMenu);
    }

    links.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("is-open")) return;
      if (header.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }

  function initReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initYear() {
    var currentYear = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(currentYear);
    });
  }

  function getContactEndpoint() {
    var config = window.PORTFOLIO_SITE_CONFIG || {};
    return typeof config.contactEndpoint === "string" ? config.contactEndpoint.trim() : "";
  }

  function getContactTransport() {
    var config = window.PORTFOLIO_SITE_CONFIG || {};
    return typeof config.contactTransport === "string" ? config.contactTransport.trim() : "gas_iframe";
  }

  function getTrustedContactOrigins() {
    var config = window.PORTFOLIO_SITE_CONFIG || {};
    return Array.isArray(config.contactTrustedOrigins) ? config.contactTrustedOrigins.slice() : [];
  }

  function setContactStatus(statusNode, state, message) {
    if (!statusNode) return;
    statusNode.textContent = message || "";
    statusNode.classList.remove("is-pending", "is-success", "is-error");
    if (state === "pending" || state === "success" || state === "error") {
      statusNode.classList.add("is-" + state);
    }
  }

  function ensureHiddenInput(form, name) {
    var input = form.querySelector('input[name="' + name + '"]');
    if (input) return input;
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.appendChild(input);
    return input;
  }

  function makeRequestId() {
    return "contact-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
  }

  function isTrustedOrigin(origin, trustedOrigins) {
    return trustedOrigins.some(function (trustedOrigin) {
      return origin === trustedOrigin;
    });
  }

  function initContactForms() {
    var forms = document.querySelectorAll("[data-contact-form]");
    if (!forms.length) return;

    var endpoint = getContactEndpoint();
    var transport = getContactTransport();
    var trustedOrigins = getTrustedContactOrigins();
    var pendingSubmissions = {};

    window.addEventListener("message", function (event) {
      if (!isTrustedOrigin(event.origin, trustedOrigins)) return;

      var data = event.data;
      if (!data || data.source !== "portfolio-contact" || !data.requestId) return;

      var pending = pendingSubmissions[data.requestId];
      if (!pending) return;

      window.clearTimeout(pending.timeoutId);
      delete pendingSubmissions[data.requestId];

      if (pending.startedAt) {
        pending.startedAt.value = new Date().toISOString();
      }

      if (pending.submitButton) {
        pending.submitButton.disabled = false;
        pending.submitButton.textContent = pending.defaultLabel;
      }

      if (data.status === "success") {
        pending.form.reset();
        if (pending.startedAt) {
          pending.startedAt.value = new Date().toISOString();
        }
        setContactStatus(
          pending.statusNode,
          "success",
          data.message || "送信しました。内容を確認のうえ返信します。"
        );
        return;
      }

      setContactStatus(
        pending.statusNode,
        "error",
        data.message || "送信に失敗しました。時間を置いてもう一度お試しください。"
      );
    });

    forms.forEach(function (form) {
      var statusNode = form.querySelector("[data-form-status]");
      var submitButton = form.querySelector('button[type="submit"]');
      var defaultLabel = submitButton ? submitButton.textContent : "";
      var startedAt = form.querySelector('input[name="startedAt"]');
      var requestIdInput = ensureHiddenInput(form, "requestId");
      var pageContextInput = ensureHiddenInput(form, "pageContext");
      var pageUrlInput = ensureHiddenInput(form, "pageUrl");
      var returnOriginInput = ensureHiddenInput(form, "returnOrigin");
      var iframeName = "contact-transport-" + Math.random().toString(36).slice(2, 10);
      var transportFrame = document.createElement("iframe");
      var activeRequestId = "";

      transportFrame.name = iframeName;
      transportFrame.className = "contact-transport-frame";
      transportFrame.setAttribute("hidden", "hidden");
      transportFrame.setAttribute("tabindex", "-1");
      transportFrame.setAttribute("aria-hidden", "true");
      form.parentNode.appendChild(transportFrame);

      transportFrame.addEventListener("load", function () {
        if (!activeRequestId) return;

        var pending = pendingSubmissions[activeRequestId];
        if (!pending) return;

        window.setTimeout(function () {
          var latestPending = pendingSubmissions[activeRequestId];
          if (!latestPending) return;

          window.clearTimeout(latestPending.timeoutId);
          delete pendingSubmissions[activeRequestId];
          activeRequestId = "";

          latestPending.form.reset();
          if (latestPending.startedAt) {
            latestPending.startedAt.value = new Date().toISOString();
          }
          if (latestPending.submitButton) {
            latestPending.submitButton.disabled = false;
            latestPending.submitButton.textContent = latestPending.defaultLabel;
          }
          setContactStatus(
            latestPending.statusNode,
            "success",
            "送信を受け付けました。"
          );
        }, 1200);
      });

      form.method = "POST";
      form.action = endpoint || "";
      form.target = iframeName;

      if (startedAt) {
        startedAt.value = new Date().toISOString();
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (transport !== "gas_iframe") {
          setContactStatus(statusNode, "error", "未対応の送信方式です。");
          return;
        }

        if (!endpoint || endpoint.indexOf("script.google.com/macros/s/") === -1) {
          setContactStatus(statusNode, "error", "送信先の設定がまだ完了していません。");
          return;
        }

        if (typeof form.reportValidity === "function" && !form.reportValidity()) {
          return;
        }

        var requestId = makeRequestId();
        requestIdInput.value = requestId;
        pageContextInput.value = form.getAttribute("data-contact-context") || window.location.pathname;
        pageUrlInput.value = window.location.href;
        returnOriginInput.value = window.location.origin;
        activeRequestId = requestId;

        setContactStatus(statusNode, "pending", "送信しています...");
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "送信中...";
        }

        pendingSubmissions[requestId] = {
          form: form,
          startedAt: startedAt,
          statusNode: statusNode,
          submitButton: submitButton,
          defaultLabel: defaultLabel,
          timeoutId: window.setTimeout(function () {
            delete pendingSubmissions[requestId];
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = defaultLabel;
            }
            setContactStatus(
              statusNode,
              "error",
              "送信完了の応答を確認できませんでした。しばらくしてからもう一度お試しください。"
            );
          }, 30000)
        };

        form.submit();
      });
    });
  }

  function init() {
    renderWorks();
    initHeader();
    initReveal();
    initYear();
    initContactForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
