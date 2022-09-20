window.onload = function () { genPortList() }

let usedPorts

function genPortList() {
  const url = '../data.json'
  const request = new XMLHttpRequest()
  request.open('get', url)
  request.send(null)
  request.onload = function () {
    if (request.status == 200) {
      const data = JSON.parse(request.responseText)

      usedPorts = data.ports

      let portItemNode = ''

      for (let i = 0; i < usedPorts.length; i++) {
        const {
          title,
          sub_title,
          dev_port,
          test_port,
          prd_port
        } = usedPorts[i]

        portItemNode += `<div class="port-list-item">
          <p class="title">${title}</p>
          ${sub_title ? '<p class="sub-title">' + sub_title + '</p>' : ''}
          <ul>
            ${dev_port ? '<li><div class="label"><img src="../images/icon-1.png" class="icon"><span>Dev</span></div><div class="value">' + dev_port + '</div></li>' : ''}
            ${test_port ? '<li><div class="label"><img src="../images/icon-2.png" class="icon"><span>Test</span></div><div class="value">' + test_port + '</div></li>' : ''}
            ${prd_port ? '<li><div class="label"><img src="../images/icon-3.png" class="icon"><span>Prd</span></div><div class="value">' + prd_port + '</div></li>' : ''}
          </ul>
        </div>`
      }

      document.getElementById('port-list').innerHTML = portItemNode

      getCurPort()
    }
  }
}

let devPortBtn, testPortBtn, prdPortBtn
if (devPortBtn = document.getElementById('devPortBtn')) {
  devPortBtn.onclick = () => getNextPort('dev')
}
if (testPortBtn = document.getElementById('testPortBtn')) {
  testPortBtn.onclick = () => getNextPort('test')
}
if (prdPortBtn = document.getElementById('prdPortBtn')) {
  prdPortBtn.onclick = () => getNextPort('prd')
}
function getNextPort(env = 'dev') {
  let port = 0
  let _ports = []
  let text = ''

  if (env === 'dev') {
    _ports = usedPorts.map(_ => +_.dev_port).filter(_ => !!_)
    port = _ports.length ? Math.max(..._ports) + 1 : 3000
    text = '开发'
  } else if (env === 'test') {
    _ports = usedPorts.map(_ => +_.test_port).filter(_ => !!_)
    port = _ports.length ? Math.max(..._ports) + 1 : 6000
    text = '测试'
  } else {
    port = 8081
    _ports = usedPorts.map(_ => +_.prd_port).filter(_ => !!_)
    port = _ports.length ? Math.max(..._ports) + 1 : 8081
    text = '生产'
  }

  alert(`下一个项目可使用的${text}环境端口：${port}`)
}

function getCurPort() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, async function (tabs) {
    const url = tabs[0].url
    const rurl = url.match(new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/))
    let port = rurl && rurl.length ? rurl[3] : null

    if (port) {
      port = +port.slice(1)

      const warningNode = document.getElementById('warning')

      console.log('port', port, warningNode)

      if (warningNode) {
        const isUsed = usedPorts.some(_ => (+_.dev_port === port || +_.test_port === port || +_.prd_port === port))
        const warningTextNode = document.createElement('p')
        warningTextNode.setAttribute('class', 'warning-text')
        warningTextNode.innerText = isUsed ? `正在使用端口 ${port}` : `端口 ${port} 未记录！`
        warningNode.appendChild(warningTextNode)
      }
    }
  })
}