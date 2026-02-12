/* ============================================
   SovereignDent AI — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Navigation ---
  var nav = document.querySelector('.nav');
  var mobileToggle = document.querySelector('.nav-mobile-toggle');
  var mobileMenu = document.querySelector('.nav-mobile');
  var navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect on nav
  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });

  // Active nav link on scroll
  var sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);

  // --- Scroll Reveal ---
  var reveals = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Voice Gallery Filters ---
  var filterBtns = document.querySelectorAll('.voice-filter-btn');
  var voiceCards = document.querySelectorAll('.voice-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      voiceCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          requestAnimationFrame(function () {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Voice Player Modal (Real Audio) ---
  var voiceOverlay = document.querySelector('.voice-player-overlay');
  var voicePlayerName = document.querySelector('.voice-player-name');
  var voicePlayerRole = document.querySelector('.voice-player-role');
  var voicePlayerSample = document.querySelector('.voice-player-sample-text');
  var voicePlayerAvatar = document.querySelector('.voice-player-avatar');
  var voicePlayerClose = document.querySelector('.voice-player-close');
  var voicePlayerPlay = document.querySelector('.voice-player-play');
  var waveformContainer = document.querySelector('.voice-player-waveform');

  // Generate waveform bars
  if (waveformContainer) {
    for (var i = 0; i < 40; i++) {
      var bar = document.createElement('div');
      bar.className = 'waveform-bar';
      bar.style.height = (Math.random() * 30 + 8) + 'px';
      waveformContainer.appendChild(bar);
    }
  }

  var waveformBars = document.querySelectorAll('.waveform-bar');
  var waveformInterval = null;
  var isPlayerPlaying = false;
  var currentAudio = null;

  function animateWaveform() {
    waveformBars.forEach(function (bar) {
      bar.style.height = (Math.random() * 40 + 8) + 'px';
    });
  }

  function startPlayback() {
    if (!currentAudio) return;
    currentAudio.play();
    isPlayerPlaying = true;
    if (voicePlayerPlay) voicePlayerPlay.innerHTML = '&#9646;&#9646;';
    waveformInterval = setInterval(animateWaveform, 120);
  }

  function stopPlayback() {
    if (currentAudio) {
      currentAudio.pause();
    }
    isPlayerPlaying = false;
    if (voicePlayerPlay) voicePlayerPlay.innerHTML = '&#9654;';
    clearInterval(waveformInterval);
    waveformBars.forEach(function (bar) {
      bar.style.height = (Math.random() * 30 + 8) + 'px';
    });
  }

  // Open voice player
  function openVoicePlayer(card, autoPlay) {
    var name = card.getAttribute('data-name');
    var role = card.getAttribute('data-role');
    var sample = card.getAttribute('data-sample');
    var emoji = card.getAttribute('data-emoji');
    var audioSrc = card.getAttribute('data-audio');

    if (voicePlayerName) voicePlayerName.textContent = name;
    if (voicePlayerRole) voicePlayerRole.textContent = role;
    if (voicePlayerSample) voicePlayerSample.textContent = '"' + sample + '"';
    if (voicePlayerAvatar) voicePlayerAvatar.textContent = emoji;
    if (voiceOverlay) voiceOverlay.classList.add('open');

    // Stop any existing playback
    stopPlayback();

    // Create new audio element
    if (audioSrc) {
      currentAudio = new Audio(audioSrc);
      currentAudio.addEventListener('ended', function () {
        stopPlayback();
      });
    }

    if (autoPlay && currentAudio) {
      setTimeout(function () { startPlayback(); }, 200);
    }
  }

  voiceCards.forEach(function (card) {
    // Click play button = open modal and auto-play
    var playBtn = card.querySelector('.voice-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openVoicePlayer(card, true);
      });
    }
    // Click card anywhere else = open modal without auto-play
    card.addEventListener('click', function () {
      openVoicePlayer(card, false);
    });
  });

  // Close voice player
  if (voicePlayerClose) {
    voicePlayerClose.addEventListener('click', function () {
      voiceOverlay.classList.remove('open');
      stopPlayback();
      if (currentAudio) { currentAudio.currentTime = 0; }
    });
  }

  if (voiceOverlay) {
    voiceOverlay.addEventListener('click', function (e) {
      if (e.target === voiceOverlay) {
        voiceOverlay.classList.remove('open');
        stopPlayback();
        if (currentAudio) { currentAudio.currentTime = 0; }
      }
    });
  }

  // Play/pause toggle in modal
  if (voicePlayerPlay) {
    voicePlayerPlay.addEventListener('click', function () {
      if (isPlayerPlaying) {
        stopPlayback();
      } else {
        startPlayback();
      }
    });
  }

  // --- Pricing Toggle ---
  var pricingSwitch = document.querySelector('.pricing-toggle-switch');
  var monthlyLabel = document.querySelector('.pricing-label-monthly');
  var annualLabel = document.querySelector('.pricing-label-annual');
  var priceAmounts = document.querySelectorAll('.pricing-amount');
  var pricePeriods = document.querySelectorAll('.pricing-period');

  // Monthly: $999/mo = $11,988/yr | Annual: $833/mo = $9,996/yr (save $1,992)
  var yearlyNote = document.querySelector('.pricing-yearly-note');

  if (pricingSwitch) {
    pricingSwitch.addEventListener('click', function () {
      var isAnnual = pricingSwitch.classList.toggle('annual');
      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

      priceAmounts.forEach(function (el) {
        var card = el.closest('.pricing-card');
        if (card && !card.classList.contains('pricing-enterprise')) {
          el.textContent = isAnnual ? '$833' : '$999';
        }
      });

      pricePeriods.forEach(function (el) {
        var card = el.closest('.pricing-card');
        if (card && !card.classList.contains('pricing-enterprise')) {
          el.textContent = isAnnual ? '/mo (billed annually)' : '/month';
        }
      });

      if (yearlyNote) {
        yearlyNote.textContent = isAnnual
          ? '$9,996/year — save $1,992 vs monthly'
          : '$11,988/year at monthly rate';
      }
    });
  }

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Conversation Demo Players ---
  var conversationPlayers = document.querySelectorAll('.conversation-player');
  conversationPlayers.forEach(function (player) {
    var playBtn = player.querySelector('.conversation-play-btn');
    var progressBar = player.querySelector('.conversation-progress-bar');
    var timeDisplay = player.querySelector('.conversation-time');
    var duration = parseInt(player.getAttribute('data-duration') || '60', 10);
    var isPlaying = false;
    var progress = 0;
    var interval = null;

    function formatTime(seconds) {
      var m = Math.floor(seconds / 60);
      var s = seconds % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    if (timeDisplay) timeDisplay.textContent = formatTime(duration);

    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (isPlaying) {
          isPlaying = false;
          playBtn.innerHTML = '&#9654;';
          clearInterval(interval);
        } else {
          // Stop all other players first
          conversationPlayers.forEach(function (p) {
            var btn = p.querySelector('.conversation-play-btn');
            if (btn && p !== player) {
              btn.innerHTML = '&#9654;';
            }
          });

          isPlaying = true;
          playBtn.innerHTML = '&#9646;&#9646;';
          interval = setInterval(function () {
            progress += 1;
            if (progress >= duration) {
              progress = 0;
              isPlaying = false;
              playBtn.innerHTML = '&#9654;';
              clearInterval(interval);
            }
            var pct = (progress / duration) * 100;
            if (progressBar) progressBar.style.width = pct + '%';
            if (timeDisplay) timeDisplay.textContent = formatTime(duration - progress);
          }, 1000);
        }
      });
    }
  });

  // --- Smooth scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Keyboard: close modal on Escape ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (voiceOverlay && voiceOverlay.classList.contains('open')) {
        voiceOverlay.classList.remove('open');
        stopPlayback();
        if (currentAudio) { currentAudio.currentTime = 0; }
      }
    }
  });

})();
