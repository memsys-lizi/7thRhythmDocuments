(function () {
  var config = window.ADOFAI_AI || {};
  var endpoint = resolveEndpoint(config.endpoint || defaultEndpoint(config.port || '1970'));
  var game = config.game || 'adofai';
  var state = {
    open: false,
    busy: false,
    lastQuestion: ''
  };

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function resolveEndpoint(fallback) {
    var params = new URLSearchParams(window.location.search);
    var queryEndpoint = params.get('aiEndpoint');
    if (queryEndpoint) {
      window.localStorage.setItem('adofai-ai-endpoint', queryEndpoint);
      return queryEndpoint;
    }
    return window.localStorage.getItem('adofai-ai-endpoint') || fallback;
  }

  function defaultEndpoint(port) {
    if (window.location.protocol === 'file:') {
      return 'http://127.0.0.1:' + port + '/api/ask';
    }
    return window.location.protocol + '//' + window.location.hostname + ':' + port + '/api/ask';
  }

  function init() {
    var root = createElement('section', 'ai-chat');
    root.setAttribute('aria-label', '文档 AI 问答');
    root.innerHTML = [
      '<button class="ai-chat-toggle" type="button" aria-expanded="false" title="打开文档问答">AI</button>',
      '<div class="ai-chat-panel" aria-hidden="true">',
      '  <div class="ai-chat-header">',
      '    <div>',
      '      <strong>文档问答</strong>',
      '      <span>基于 ADOFAI 源码文档</span>',
      '    </div>',
      '    <button class="ai-chat-close" type="button" title="关闭">×</button>',
      '  </div>',
      '  <div class="ai-chat-messages" role="log" aria-live="polite"></div>',
      '  <details class="ai-chat-settings">',
      '    <summary>接口设置</summary>',
      '    <label>AI 服务地址</label>',
      '    <input class="ai-chat-endpoint" type="url">',
      '    <button class="ai-chat-save-endpoint" type="button">保存地址</button>',
      '  </details>',
      '  <form class="ai-chat-form">',
      '    <textarea class="ai-chat-input" rows="3" placeholder="询问 ADOFAI 源码文档，例如：判定逻辑在哪里？"></textarea>',
      '    <div class="ai-chat-actions">',
      '      <button class="ai-chat-clear" type="button">清空</button>',
      '      <button class="ai-chat-submit" type="submit">发送</button>',
      '    </div>',
      '  </form>',
      '</div>'
    ].join('');
    document.body.appendChild(root);

    var toggle = root.querySelector('.ai-chat-toggle');
    var close = root.querySelector('.ai-chat-close');
    var panel = root.querySelector('.ai-chat-panel');
    var messages = root.querySelector('.ai-chat-messages');
    var endpointInput = root.querySelector('.ai-chat-endpoint');
    var saveEndpoint = root.querySelector('.ai-chat-save-endpoint');
    var form = root.querySelector('.ai-chat-form');
    var input = root.querySelector('.ai-chat-input');
    var clear = root.querySelector('.ai-chat-clear');
    var submit = root.querySelector('.ai-chat-submit');

    addMessage(messages, 'assistant', '可以直接问 ADOFAI 源码文档。回答会附带来源，点击来源可跳转到对应页面。', []);
    endpointInput.value = endpoint;

    toggle.addEventListener('click', function () {
      setOpen(root, panel, toggle, !state.open);
      if (state.open) input.focus();
    });

    close.addEventListener('click', function () {
      setOpen(root, panel, toggle, false);
    });

    clear.addEventListener('click', function () {
      messages.innerHTML = '';
      addMessage(messages, 'assistant', '记录已清空。继续提问即可。', []);
    });

    saveEndpoint.addEventListener('click', function () {
      var nextEndpoint = endpointInput.value.trim();
      if (!nextEndpoint) return;
      endpoint = nextEndpoint;
      window.localStorage.setItem('adofai-ai-endpoint', endpoint);
      addMessage(messages, 'assistant', 'AI 服务地址已保存。', []);
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        form.requestSubmit();
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (state.busy) return;
      var question = input.value.trim();
      if (!question) return;
      input.value = '';
      askQuestion(question, messages, submit);
    });
  }

  function setOpen(root, panel, toggle, open) {
    state.open = open;
    root.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function askQuestion(question, messages, submit) {
    state.busy = true;
    state.lastQuestion = question;
    submit.disabled = true;
    addMessage(messages, 'user', question, []);
    var pending = addMessage(messages, 'assistant', '正在检索文档并生成回答...', []);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game: game,
        question: question
      })
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok) {
            throw new Error(data.error || '问答服务返回错误。');
          }
          return data;
        });
      })
      .then(function (data) {
        replaceMessage(pending, 'assistant', data.answer || '没有返回回答。', data.sources || []);
      })
      .catch(function (error) {
        replaceMessage(pending, 'assistant', '问答服务暂时不可用：' + error.message, []);
      })
      .finally(function () {
        state.busy = false;
        submit.disabled = false;
        messages.scrollTop = messages.scrollHeight;
      });
  }

  function addMessage(messages, role, content, sources) {
    var message = createElement('article', 'ai-chat-message ai-chat-message-' + role);
    replaceMessage(message, role, content, sources);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function replaceMessage(message, role, content, sources) {
    message.className = 'ai-chat-message ai-chat-message-' + role;
    var label = role === 'user' ? '你' : 'AI';
    var html = [
      '<div class="ai-chat-role">' + escapeHtml(label) + '</div>',
      '<div class="ai-chat-content">' + renderMarkdown(content) + '</div>'
    ];

    if (sources && sources.length) {
      html.push(renderSources(sources));
    }

    message.innerHTML = html.join('');
    Array.prototype.forEach.call(message.querySelectorAll('[data-ai-source]'), function (button) {
      button.addEventListener('click', function () {
        jumpToSource(button.getAttribute('data-ai-source'));
      });
    });
  }

  function renderSources(sources) {
    var items = sources.slice(0, 5).map(function (source, index) {
      var title = source.title || source.path || '来源 ' + (index + 1);
      var score = typeof source.score === 'number' ? ' · ' + source.score.toFixed(4) : '';
      return [
        '<button class="ai-chat-source" type="button" data-ai-source="' + escapeAttribute(source.url || '') + '">',
        '<span>' + escapeHtml(title) + '</span>',
        '<small>' + escapeHtml(source.path || '') + score + '</small>',
        '</button>'
      ].join('');
    });
    return '<div class="ai-chat-sources"><strong>来源</strong>' + items.join('') + '</div>';
  }

  function jumpToSource(url) {
    if (!url) return;
    var normalized = url;
    if (normalized.indexOf('/#/') === 0) {
      normalized = normalized.slice(1);
    }
    if (normalized.indexOf('#/') === 0) {
      window.location.hash = normalized;
      return;
    }
    window.location.href = normalized;
  }

  function renderMarkdown(markdown) {
    var text = String(markdown || '');
    var blocks = [];
    text = text.replace(/```([\s\S]*?)```/g, function (_, code) {
      blocks.push('<pre><code>' + escapeHtml(code.trim()) + '</code></pre>');
      return '\n@@CODE_BLOCK_' + (blocks.length - 1) + '@@\n';
    });

    var html = escapeHtml(text);
    html = html.replace(/^###\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^##\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^#\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = renderLists(html);
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html
      .split(/\n{2,}/)
      .map(function (part) {
        var trimmed = part.trim();
        if (!trimmed) return '';
        if (/^<(h3|h4|ul|ol|pre)/.test(trimmed)) return trimmed;
        return '<p>' + trimmed.replace(/\n/g, '<br>') + '</p>';
      })
      .join('');

    blocks.forEach(function (block, index) {
      html = html.replace('@@CODE_BLOCK_' + index + '@@', block);
    });
    return html;
  }

  function renderLists(html) {
    var lines = html.split('\n');
    var output = [];
    var inList = false;

    lines.forEach(function (line) {
      var match = /^\s*[-*]\s+(.+)$/.exec(line);
      if (match) {
        if (!inList) {
          output.push('<ul>');
          inList = true;
        }
        output.push('<li>' + match[1] + '</li>');
      } else {
        if (inList) {
          output.push('</ul>');
          inList = false;
        }
        output.push(line);
      }
    });

    if (inList) output.push('</ul>');
    return output.join('\n');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#096;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
