import { camelize } from "Utility/string";
import { find, parseDomForOpts, each } from "../utility/dom";

export default class DomComponent {
    static cache = {};
    el;

    constructor(el, opts = {}) {
        
        if(!el) {
            return false;
        }
        
        this.el = el;
        this.el.classList.add('js');

        if(opts) {
            this.opts = Object.assign({}, opts, parseDomForOpts(el, Object.keys(opts).map(key => camelize(key))));
        }
    }

    loaded() {
        this.el.classList.add('js-loaded');
    }

    find(selector) {
        return find(this.el, selector);
    }

    fromNodeRef(nodeRef) {
        if(DomComponent.cache[nodeRef]) {
            return DomComponent.cache[nodeRef];
        }
    }

    static loadEntryComponents(cmps) {
        cmps.forEach((cmp) => {
            if(!cmp.name) {
                console.error('entry component needs a name: ', cmp);
            }
    
            let cmpsOnPage = document.querySelectorAll(`[data-js-component='${cmp.name}']`);
    
            if(cmpsOnPage.length) {
                each(cmpsOnPage, (el) => {
                    DomComponent.cache[el] = new cmp(el);
                });
            }
        })   
    }
}