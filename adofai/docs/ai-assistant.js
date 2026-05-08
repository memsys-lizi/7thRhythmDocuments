(function () {
  var config = window.ADOFAI_AI || {};
  var askEndpoint = resolveEndpoint(config.endpoint || defaultEndpoint(config.port || '1970', '/api/ask'));
  var streamEndpoint = toStreamEndpoint(askEndpoint);
  var game = config.game || 'adofai';
  var state = {
    open: window.localStorage.getItem('adofai-ai-sidebar-open') !== 'false',
    busy: false
  };

  function init() {
    var root = createElement('aside', 'ai-sidebar');
    root.setAttribute('aria-label', '文档 AI 问答侧栏');
    root.innerHTML = [
      '<button class="ai-sidebar-rail" type="button" aria-expanded="true" title="展开文档问答">AI</button>',
      '<div class="ai-sidebar-panel">',
      '  <header class="ai-sidebar-header">',
      '    <div>',
      '      <strong>文档问答</strong>',
      '      <span>基于 ADOFAI 源码文档检索回答</span>',
      '    </div>',
      '    <button class="ai-sidebar-collapse" type="button">收起</button>',
      '  </header>',
      '  <div class="ai-sidebar-messages" role="log" aria-live="polite"></div>',
      '  <details class="ai-sidebar-settings">',
      '    <summary>接口设置</summary>',
      '    <label>AI 服务地址</label>',
      '    <input class="ai-sidebar-endpoint" type="url">',
      '    <button class="ai-sidebar-save-endpoint" type="button">保存地址</button>',
      '  </details>',
      '  <form class="ai-sidebar-form">',
      '    <textarea class="ai-sidebar-input" rows="3" placeholder="询问 ADOFAI 源码文档，例如：判定逻辑在哪里？"></textarea>',
      '    <div class="ai-sidebar-actions">',
      '      <button class="ai-sidebar-clear" type="button">清空</button>',
      '      <button class="ai-sidebar-submit" type="submit">发送</button>',
      '    </div>',
      '  </form>',
      '</div>'
    ].join('');

    document.body.appendChild(root);

    var rail = root.querySelector('.ai-sidebar-rail');
    var collapse = root.querySelector('.ai-sidebar-collapse');
    var messages = root.querySelector('.ai-sidebar-messages');
    var endpointInput = root.querySelector('.ai-sidebar-endpoint');
    var saveEndpoint = root.querySelector('.ai-sidebar-save-endpoint');
    var form = root.querySelector('.ai-sidebar-form');
    var input = root.querySelector('.ai-sidebar-input');
    var clear = root.querySelector('.ai-sidebar-clear');
    var submit = root.querySelector('.ai-sidebar-submit');

    endpointInput.value = askEndpoint;
    setOpen(root, rail, state.open);
    addMessage(messages, 'assistant', '可以直接问 ADOFAI 源码文档。回答会流式显示，点击来源可跳转到对应页面。', []);

    rail.addEventListener('click', function () {
      setOpen(root, rail, true);
      input.focus();
    });

    collapse.addEventListener('click', function () {
      setOpen(root, rail, false);
    });

    clear.addEventListener('click', function () {
      messages.innerHTML = '';
      addMessage(messages, 'assistant', '记录已清空。继续提问即可。', []);
    });

    saveEndpoint.addEventListener('click', function () {
      var nextEndpoint = endpointInput.value.trim();
      if (!nextEndpoint) return;
      askEndpoint = nextEndpoint;
      streamEndpoint = toStreamEndpoint(askEndpoint);
      window.localStorage.setItem('adofai-ai-endpoint', askEndpoint);
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

  function askQuestion(question, messages, submit) {
    state.busy = true;
    submit.disabled = true;
    addMessage(messages, 'user', question, []);

    var answer = '';
    var sources = [];
    var pending = addMessage(messages, 'assistant', '正在检索文档...', [], true);

    fetch(streamEndpoint, {
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
        if (!response.ok) {
          return response.json().then(function (data) {
            throw new Error(data.error || '问答服务返回错误。');
          });
        }
        if (!response.body) {
          throw new Error('当前浏览器不支持流式读取。');
        }
        return readStream(response, function (event) {
          if (event.type === 'sources') {
            sources = event.sources || [];
            replaceMessage(pending, 'assistant', answer || '已找到相关文档，正在生成回答...', sources, true);
          }
          if (event.type === 'delta') {
            answer += event.delta || '';
            replaceMessage(pending, 'assistant', answer, sources, true);
          }
          if (event.type === 'error') {
            throw new Error(event.error || '流式回答失败。');
          }
        });
      })
      .then(function () {
        replaceMessage(pending, 'assistant', answer || '没有返回回答。', sources, false);
      })
      .catch(function (error) {
        return askQuestionFallback(question)
          .then(function (data) {
            replaceMessage(pending, 'assistant', data.answer || '没有返回回答。', data.sources || [], false);
          })
          .catch(function () {
            replaceMessage(pending, 'assistant', '问答服务暂时不可用：' + error.message, [], false);
          });
      })
      .finally(function () {
        state.busy = false;
        submit.disabled = false;
        messages.scrollTop = messages.scrollHeight;
      });
  }

  function askQuestionFallback(question) {
    return fetch(askEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game: game,
        question: question
      })
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          throw new Error(data.error || '问答服务返回错误。');
        }
        return data;
      });
    });
  }

  function readStream(response, onEvent) {
    var reader = response.body.getReader();
    var decoder = new TextDecoder();
    var buffer = '';

    function pump() {
      return reader.read().then(function (result) {
        if (result.done) {
          flushBuffer();
          return;
        }
        buffer += decoder.decode(result.value, { stream: true });
        flushBuffer();
        return pump();
      });
    }

    function flushBuffer() {
      var lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';
      lines.forEach(function (line) {
        var trimmed = line.trim();
        if (!trimmed) return;
        onEvent(JSON.parse(trimmed));
      });
    }

    return pump();
  }

  function setOpen(root, rail, open) {
    state.open = open;
    root.classList.toggle('is-open', open);
    document.body.classList.toggle('ai-sidebar-open', open);
    rail.setAttribute('aria-expanded', open ? 'true' : 'false');
    window.localStorage.setItem('adofai-ai-sidebar-open', open ? 'true' : 'false');
  }

  function addMessage(messages, role, content, sources, streaming) {
    var message = createElement('article', 'ai-sidebar-message ai-sidebar-message-' + role);
    replaceMessage(message, role, content, sources, streaming);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function replaceMessage(message, role, content, sources, streaming) {
    message.className = 'ai-sidebar-message ai-sidebar-message-' + role + (streaming ? ' is-streaming' : '');
    var label = role === 'user' ? '你' : 'AI';
    var html = [
      '<div class="ai-sidebar-role">' + escapeHtml(label) + '</div>',
      '<div class="ai-sidebar-content">' + renderMarkdown(content) + (streaming ? '<span class="ai-stream-caret"></span>' : '') + '</div>'
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

    var container = message.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  function renderSources(sources) {
    var items = sources.slice(0, 5).map(function (source, index) {
      var title = source.title || source.path || '来源 ' + (index + 1);
      var score = typeof source.score === 'number' ? ' · ' + source.score.toFixed(4) : '';
      return [
        '<button class="ai-sidebar-source" type="button" data-ai-source="' + escapeAttribute(source.url || '') + '">',
        '<span>' + escapeHtml(title) + '</span>',
        '<small>' + escapeHtml(source.path || '') + score + '</small>',
        '</button>'
      ].join('');
    });
    return '<div class="ai-sidebar-sources"><strong>来源</strong>' + items.join('') + '</div>';
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

  function defaultEndpoint(port, pathname) {
    if (window.location.protocol === 'file:') {
      return 'http://127.0.0.1:' + port + pathname;
    }
    return window.location.protocol + '//' + window.location.hostname + ':' + port + pathname;
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

  function toStreamEndpoint(endpoint) {
    if (endpoint.indexOf('/api/ask-stream') !== -1) return endpoint;
    return endpoint.replace(/\/api\/ask$/, '/api/ask-stream');
  }

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
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
