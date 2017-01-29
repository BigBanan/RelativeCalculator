const table = {
    父: '爸爸',
    母: '妈妈',
    兄: '哥哥',
    弟: '弟弟',
    姐: '姐姐',
    妹: '妹妹',
    夫: '老公',
    妻: '老婆',
    子: '儿子',
    女: '女儿',
}

const options = {
    text: '',        //输入的文本
    sex: 1,         //自己的性别：0女性,1男性
}

const resultByFind = function(options) {
    const o = {
        text: options.text.slice(2),
        sex: options.sex,
        // 转换类型： 'default'算称谓,'chain'算关系(此时reverse无效)
        type: 'default',
        // 称呼方式： true对方称呼我,false我称呼对方
        reverse: false,
    }
    var r = relationship(o).join('/')
    return r
}

const scrollToBottom = function(element, verticatMiddleElement) {
    log(element.scrollHeight, element.offsetHeight)
    if(element.scrollHeight > element.offsetHeight) {
        verticatMiddleElement.classList.remove('vertical-align')
        element.scrollTop = element.scrollHeight
    } else {
        verticatMiddleElement.classList.add('vertical-align')
    }
}

const showResult = function(result) {
    var s = e('#id-input-now')
    e('#id-input-back').innerHTML = options.text
    if (result.length == 0) {
        s.innerHTML = '您家这关系也忒复杂了吧，没法算。'
        scrollToBottom(e('.result-input'), e('.input-now'))
        e('.input-now').classList.add('warning')
    } else {
        s.innerHTML = result
    }
    scrollToBottom(e('.input-back'), e('.input-back-contain'))
    options.text = ''
}

// const clearClick = function() {
//     clearAllByClassName('click')
// }
//
// const clearClickEqual = function() {
//     clearAllByClassName('clickEqual')
// }

const bindClicksEff = function() {
    const tds = es('td')
    for (var i = 0; i < tds.length; i++) {
        const td = tds[i]
        td.addEventListener('touchstart', function(event){
            t = event.target
            t.classList.add('click')
            // setTimeout(clearClick, 500)
            var THIS = this
            setTimeout(function(){
                // log('THIS', THIS, THIS.t)
                THIS.classList.remove('click')
            }, 500)
        })
    }

    const eq = e('#id-button-equal')
    eq.addEventListener('touchstart', function(){
        this.classList.add('clickEqual')
        // setTimeout(clearClickEqual, 501)
        var THIS = this
        setTimeout(function(){
            // log('THIS', THIS, THIS.t)
            THIS.classList.remove('clickEqual')
        }, 500)
    })
}

const bindSwitch = function() {
    e('xuanxian').addEventListener('touchstart', function(event){
        console.log('switch')
        this.classList.toggle('girl')
        if(this.classList.contains('girl')) {
            options.sex = 0
        } else {
            options.sex = 1
        }
    })
}

const bindClickButton = function() {
    const tds = es('td')
    for (var i = 0; i < tds.length; i++) {
        const td = tds[i]
        td.addEventListener('touchstart', function(event){
            e('.input-now').classList.remove('warning')
            t = event.target
            const type = t.dataset.type
            // log(type)
            if(table[type]) {
                e('#id-span-shine').classList.remove('hidden')
                if(options.text.length == 0) {
                    options.text = '我'
                }
                options.text += '的' + table[type]
                e('#id-input-now').innerHTML = options.text
            } else if(type === 'C') {
                e('#id-span-shine').classList.remove('hidden')
                if(options.text.length !== 0) {
                    options.text = options.text.split('的')
                    options.text.pop()
                    options.text = options.text.join('的')
                    if(options.text.length == 1) {
                        options.text = ''
                    }
                }
                e('#id-input-now').innerHTML = options.text
            } else if(type === 'AC') {
                e('#id-span-shine').classList.remove('hidden')
                options.text = ''
                e('#id-input-now').innerHTML = ''
                e('#id-input-back').innerHTML = ''
            } else if(type === '=') {
                if (options.text.length != 0) {
                    var r = String(resultByFind(options))
                    showResult(r)
                    e('#id-span-shine').classList.add('hidden')
                }
            }
            scrollToBottom(e('.result-input'), e('.input-now'))
        })
    }
}

const bindEventsJsq = function() {
    bindClicksEff()

    bindSwitch()

    bindClickButton()
}

const __mainJSQ = function() {

    bindEventsJsq()
}
