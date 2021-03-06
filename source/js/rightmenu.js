let kk = {};
kk.showRightMenu = function(isTrue, x=0, y=0){
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top',x+'px').css('left',y+'px');

    if(isTrue){
        $rightMenu.show();
    }else{
        $rightMenu.hide();
    }
}
kk.switchDarkMode = function(){
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
kk.switchReadMode = function(){
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn () {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}
kk.switchTheme=function(load=false){
    //空字符串表示butterfly原版主题（即不加载css）
    //FallGuys.css是我自己的魔改主题，需替换
    let themes = ['',''];
    let vTheme = parseInt(localStorage.getItem('visitor-theme'));
    if(!vTheme){
        vTheme = load?0:1;
    }else{
        vTheme += load?0:1;
        vTheme%=themes.length;
    }
    localStorage.setItem('visitor-theme',vTheme)
    let themesrc = ''
    if(themes[vTheme]){
        themesrc += window.location.origin+'/css/dorakika/'+themes[vTheme];
    }
    //css引入时link标签添加属性tag="theme"
    let themeLink = $(document).find('[tag="theme"]')[0];
    if(themeLink)themeLink.href = themesrc;
};

//复制选中文字
kk.copySelect = function(){
    document.execCommand('Copy',false,null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
kk.scrollToTop = function(){
    btf.scrollToDest(0, 500);
}

// 右键菜单事件
if(! (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
    window.oncontextmenu = function(event){
        $('.rightMenu-group.hide').hide();
        if(document.getSelection().toString()){
            $('#menu-text').show();
        }

        console.log(event.target);
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if(pageX + rmWidth > window.innerWidth){
            pageX -= rmWidth+10;
        }
        if(pageY + rmHeight > window.innerHeight){
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        kk.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click',function(){kk.showRightMenu(false);});
//     window.addEventListener('load',function(){kk.switchTheme(true);});
}
let rm={};rm.stopdragimg=$("img"),rm.stopdragimg.on("dragstart",(function(){return!1})),rm.showRightMenu=function(e,t=0,n=0){let o=$("#rightMenu");o.css("top",t+"px").css("left",n+"px"),e?(o.show(),stopMaskScroll()):o.hide()},rm.hideRightMenu=function(){rm.showRightMenu(!1),$("#rightmenu-mask").attr("style","display: none")};let rmWidth=$("#rightMenu").width(),rmHeight=$("#rightMenu").height();rm.reloadrmSize=function(){rmWidth=$("#rightMenu").width(),rmHeight=$("#rightMenu").height()};let domhref="",domImgSrc="";function downloadImage(e,t){rm.hideRightMenu(),0==rm.downloadimging?(rm.downloadimging=!0,btf.snackbarShow("正在下载中，请稍后",!1,1e4),setTimeout((function(){let n=new Image;n.setAttribute("crossOrigin","anonymous"),n.onload=function(){let e=document.createElement("canvas");e.width=n.width,e.height=n.height,e.getContext("2d").drawImage(n,0,0,n.width,n.height);let o=e.toDataURL("image/png"),i=document.createElement("a"),r=new MouseEvent("click");i.download=t||"photo",i.href=o,i.dispatchEvent(r)},n.src=e,btf.snackbarShow("图片已添加盲水印，请遵守版权协议"),rm.downloadimging=!1}),"10000")):btf.snackbarShow("有正在进行中的下载，请稍后再试")}function imageToBlob(e){const t=new Image,n=document.createElement("canvas"),o=n.getContext("2d");return t.crossOrigin="",t.src=e,new Promise((e=>{t.onload=function(){n.width=this.naturalWidth,n.height=this.naturalHeight,o.drawImage(this,0,0),n.toBlob((t=>{e(t)}),"image/png",.75)}}))}async function copyImage(e){const t=await imageToBlob(e),n=new ClipboardItem({"image/png":t});navigator.clipboard.write([n])}function stopMaskScroll(){if(document.getElementById("rightmenu-mask")){document.getElementById("rightmenu-mask").addEventListener("mousewheel",(function(e){rm.hideRightMenu()}),!1)}if(document.getElementById("rightMenu")){document.getElementById("rightMenu").addEventListener("mousewheel",(function(e){rm.hideRightMenu()}),!1)}}window.oncontextmenu=function(e){if(document.body.clientWidth>768){let t=e.clientX+10,n=e.clientY,o=$(".rightMenuOther"),i=$(".rightMenuPlugin"),r=$("#menu-copytext"),c=$("#menu-commenttext"),m=$("#menu-newwindow"),a=$("#menu-copylink"),d=$("#menu-copyimg"),h=$("#menu-downloadimg"),u=$("#menu-search"),l=$("#menu-searchBaidu"),g=e.target.href,s=e.target.currentSrc,w=!1;return o.show(),selectTextNow&&window.getSelection()?(w=!0,r.show(),c.show(),u.show(),l.show(),o.hide()):(r.hide(),c.hide(),l.hide(),u.hide()),g?(w=!0,m.show(),a.show(),o.hide(),domhref=g):(m.hide(),a.hide()),s?(w=!0,d.show(),h.show(),o.hide(),domImgSrc=s):(d.hide(),h.hide()),w?i.show():i.hide(),rm.reloadrmSize(),t+rmWidth>window.innerWidth&&(t-=rmWidth+10),n+rmHeight>window.innerHeight&&(n-=n+rmHeight-window.innerHeight),rm.showRightMenu(!0,n,t),$("#rightmenu-mask").attr("style","display: flex"),!1}},rm.downloadimging=!1,rm.writeClipImg=function(e){console.log("按下复制"),rm.hideRightMenu(),btf.snackbarShow("正在下载中，请稍后",!1,1e4),0==rm.downloadimging&&(rm.downloadimging=!0,setTimeout((function(){copyImage(e),btf.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议"),rm.downloadimging=!1}),"10000"))},rm.copyUrl=function(e){$("body").after("<input id='copyVal'></input>");var t=e,n=document.getElementById("copyVal");n.value=t,n.select(),n.setSelectionRange(0,n.value.length),document.execCommand("copy"),$("#copyVal").remove()},rm.rightmenuCopyText=function(e){navigator.clipboard&&navigator.clipboard.writeText(e),rm.hideRightMenu()},rm.copyPageUrl=function(){var e=window.location.href;rm.copyUrl(e),btf.snackbarShow("复制本页链接地址成功",!1,2e3),rm.hideRightMenu()};var selectTextNow="",selectTextPre="";function selceText(){var e;(e=document.selection?document.selection.createRange().text:window.getSelection()+"")?(selectTextNow=e,selectTextPre=e):selectTextNow=""}function replaceAll(e,t,n){return e.split(t).join(n)}function addRightMenuClickEvent(){$("#menu-backward").on("click",(function(){window.history.back(),rm.hideRightMenu()})),$("#menu-forward").on("click",(function(){window.history.forward(),rm.hideRightMenu()})),$("#menu-refresh").on("click",(function(){window.location.reload()})),$("#menu-top").on("click",(function(){btf.scrollToDest(0,500),rm.hideRightMenu()})),$(".menu-link").on("click",rm.hideRightMenu),$("#menu-darkmode").on("click",rm.switchDarkMode),$("#menu-home").on("click",(function(){window.location.href=window.location.origin})),$("#rightmenu-mask").on("click",rm.hideRightMenu),$("#rightmenu-mask").contextmenu((function(){return rm.hideRightMenu(),!1})),$("#menu-copy").on("click",rm.copyPageUrl),$("#menu-copytext").on("click",(function(){rm.rightmenuCopyText(selectTextPre),btf.snackbarShow("复制成功，复制和转载请标注本文地址")})),$("#menu-commenttext").on("click",(function(){rm.rightMenuCommentText(selectTextPre)})),$("#menu-newwindow").on("click",(function(){window.open(domhref),rm.hideRightMenu()})),$("#menu-copylink").on("click",(function(){rm.rightmenuCopyText(domhref),btf.snackbarShow("已复制链接地址")})),$("#menu-downloadimg").on("click",(function(){downloadImage(domImgSrc,"blog.justlovesmile.top")})),$("#menu-copyimg").on("click",(function(){rm.writeClipImg(domImgSrc)})),$("#menu-searchBaidu").on("click",rm.searchBaidu)}document.onmouseup=document.ondbclick=selceText,rm.rightMenuCommentText=function(e){rm.hideRightMenu();var t=document.getElementsByClassName("el-textarea__inner")[0];let n=document.createEvent("HTMLEvents");n.initEvent("input",!0,!0);let o=replaceAll(e,"\n","\n> ");t.value="> "+o+"\n\n",t.dispatchEvent(n);var i=document.querySelector("#post-comment").offsetTop;window.scrollTo(0,i-80),t.focus(),t.setSelectionRange(-1,-1)},rm.searchBaidu=function(){btf.snackbarShow("即将跳转到百度搜索",!1,2e3),setTimeout((function(){window.open("https://www.baidu.com/s?wd="+selectTextPre)}),"2000"),rm.hideRightMenu()},rm.switchDarkMode=function(){rm.hideRightMenu(),"light"==("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(activateDarkMode(),saveToLocal.set("theme","dark",2),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)):(activateLightMode(),saveToLocal.set("theme","light",2),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),"function"==typeof utterancesTheme&&utterancesTheme(),"object"==typeof FB&&window.loadFBComment(),window.DISQUS&&document.getElementById("disqus_thread").children.length&&setTimeout((()=>window.disqusReset()),200)},addRightMenuClickEvent();
