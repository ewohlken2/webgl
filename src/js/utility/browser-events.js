export function onLoad(cb) {
    if(document.readyState === 'complete') {
        cb();
    }else{
        window.addEventListener('load', cb);
    }
}