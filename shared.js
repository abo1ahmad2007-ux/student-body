// ===== SHARED NAV & CHAT =====

// Set active nav link based on current page
(function(){
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// Chat widget
function toggleChat(){
  document.getElementById('chatPopup').classList.toggle('open');
}

function sendChat(){
  var inp = document.getElementById('chatInput');
  var msgs = document.getElementById('chatMsgs');
  var val = inp.value.trim();
  if(!val) return;
  var userMsg = document.createElement('div');
  userMsg.className = 'msg-user';
  userMsg.textContent = val;
  msgs.appendChild(userMsg);
  inp.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(function(){
    var botMsg = document.createElement('div');
    botMsg.className = 'msg-bot';
    var responses = [
      'شكراً على سؤالك! يمكنك التواصل معنا عبر البريد الإلكتروني للمزيد.',
      'سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.',
      'يمكنك زيارة مكتب الهيئة الطلابية من 9 صباحاً حتى 4 مساءً.',
      'للاستفسارات العاجلة، يرجى التواصل عبر أرقام الهاتف الموجودة في صفحة تواصل معنا.'
    ];
    botMsg.textContent = responses[Math.floor(Math.random()*responses.length)];
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;
  }, 900);
}

document.addEventListener('DOMContentLoaded', function(){
  var chatInput = document.getElementById('chatInput');
  if(chatInput){
    chatInput.addEventListener('keydown', function(e){
      if(e.key === 'Enter') sendChat();
    });
  }
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        var el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth'});
      }
    });
  });
});

// Show toast notification
function showToast(msg, type){
  var toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:'+(type==='success'?'#1D9E75':'#1a4fa0')+';color:#fff;padding:12px 24px;border-radius:10px;font-size:13px;font-family:Cairo,sans-serif;z-index:999;box-shadow:0 4px 16px rgba(0,0,0,0.15);transition:opacity 0.4s';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(function(){ toast.style.opacity='0'; setTimeout(function(){ toast.remove(); },400); },3000);
}
