var that;
class Tab {
    
    constructor(id){
        that = this;
        this.main = document.getElementById(id)
        this.ul = this.main.querySelector('.tab-header-left')
        this.tabContent = this.main.querySelector('.tab-content')
        this.addIcon = this.main.querySelector('.tab-header-right')

        
        this.init()
    }
    // 初始化页面
    init(){
        this.updateDom()
        // init 初始化操作让相关的元素绑定事件
        for(var i = 0;i<this.lis.length;i++){
            this.lis[i].index = i
            this.lis[i].onclick = this.change;
            this.delIcons[i].onclick = this.remove;
            this.spans[i].ondblclick = this.edit;
            this.sections[i].ondblclick = this.edit;

        }
        this.addIcon.onclick = this.add;
    }
    // 因为我们动态添加元素，所有需要重新获取所有的 li 和 section
    updateDom(){
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.delIcons = this.main.querySelectorAll('.del-icon')
        this.spans = this.main.querySelectorAll('span')
    }
    // 切换功能
    change(){
        that.removeClass()
        console.log(this.index)
        this.classList.remove('active')
        this.className = 'active'

        that.sections[this.index].className = 'content-active'
    }
    removeClass(){
        for(var i = 0; i<this.lis.length; i++){
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    // 添加功能
    add(){
        console.log('add')
        let text = that.lis.length+1
        that.removeClass()
        // 创建 li 元素 和 section 原色
        let liHtml = '<li class="active"><span>tab'+text+'</span><label class="del-icon">X</label></li>' 
        let sectionHtml = '<section class="content-active">tab'+text+'</section>'
        // 把这个元素追加到相应到元素
        that.ul.insertAdjacentHTML('beforeend',liHtml)
        that.tabContent.insertAdjacentHTML('beforeend',sectionHtml)
        that.init()
    }
    // 删除功能
    remove(e){
        e.stopPropagation() // 组织冒泡，防止触发 li 的切换点击事件
        let index = this.parentNode.index
        console.log(index)
        // 根据索引删除指定的 li 和 sectio
        // remove 可以直接删除指定的元素 
        that.lis[index].remove()
        that.sections[index].remove()

        that.init()
        // 当我们选中的不是 选中状态的li 的时候，原来的选定状态保持不变
        if (document.querySelector('.active')) return;
        // 当删除了选中状态的 li 的时候，让他的前一个 li 处于选中状态
        index -- ;
        // 手动调用我们的点击事件，不需要鼠标触发
        that.lis[index+1] && that.lis[index+1].click()
        that.lis[index] && that.lis[index].click() 
    }
    // 修改功能
    edit(){
        // 双击获取 原先的文本框
        let text = this.innerHTML
        // 禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty()
        let index = this.parentNode.index
        this.innerHTML = '<input type="text" />'
        let input = this.children[0]
        input.value = text
        input.select() // 文本框里面的文字处于选定状态
        // 当我们离开文本框 就把文本框里面的值给 span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value
        }
        // 按下回车也可以把 文本框里面的值给 span
        input.onkeyup = function(e){
            if (e.keyCode === 13) this.blur() // 手动调用表单失去焦点事件，不需要鼠标离开操作
        }
    }
}
new Tab("tabbox")