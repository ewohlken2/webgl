export function each(nodeList, cb) {
    if(!nodeList) {
        return;
    }

    if(!nodeList.length) {
        cb(nodeList, 0);
    }else{
        for (let i = 0; i < nodeList.length; i++) {
            cb(nodeList[i], i);
        }
    }
}

export function find(el, selector) {
    const foo = el.querySelectorAll(selector);

    if(foo.length > 1)  {
        return Array.from(foo);
    }else{
        return foo[0];
    }
}

export function parseDomForOpts(el, keys) {
    let opts = {};
    if(keys) {
        keys.forEach(key => {
            if(el.dataset.hasOwnProperty(key)) {
                opts[key] = el.dataset[key];
            }
        })
    }
    return opts;

}