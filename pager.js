/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Ethan White.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

if(!$) {
    alert("Requires JQuery.");
    throw "Requires JQuery. Cannot run.";
}
if(!$.fadeIn) {
    alert("Your JQuery implementation doesn't support fadeIn/fadeOut.");
    throw "Requires up-to-date JQuery. Cannot run.";
}
//Util function
function EbyId(id) {
    return document.getElementById(id);
}
function Page(elm, name) {
    this.elm = elm;
    this.name = name;
    this.real = true;
}
var Pager = {
    registeredPages: [],
    currentPage: {
        real: false
    },
    backStack: [],
    shouldTransition: true,
    transitionDelay: 200,
    hidePage: function(page, callback) {
        if(callback == null) {
            callback = function() {
                return;
            };
        }
        if(Pager.shouldTransition) {
            page.elm.fadeOut(this.transitionDelay, callback);
        } else {
            page.elm.hide();
            callback();
        }
    },
    back: function() {
        this.loadPage(this.backStack.pop(), true);
    },
    showPage: function(page, callback) {
        if(callback == null) {
            callback = function() {
                return;
            };
        }
        realCallback = function() {
            Pager.currentPage = page;
            callback();
        }
        if(Pager.shouldTransition) {
            page.elm.fadeIn(this.transitionDelay, realCallback);
        } else {
            page.elm.show();
            realCallback();
        }
    },
    registerPage: function(elm, name) {
        if(!elm.hide) { //If it doesn't have the JQuery function hide()
            elm = $(elm);
        }
        if(name == null) {
            name = elm.attr("id");
        }
        var page = new Page(elm, name);
        this.registeredPages.push(page);
        elm.hide();
    },                
    getPage: function(name) {
        for(pageOld in this.registeredPages) {
            var page = this.registeredPages[pageOld];
            if(page.name == name) {
                return page;
            }
        }
        alert("Couldn't find " + name);
        return null;
    },
    //goingBack is only for internal use. You don't need to provice it.
    loadPage: function(name, goingBack) {
        if(goingBack != true) {
            this.backStack.push(this.currentPage);
        }
        var stepTwo = function() {
            Pager.showPage(name.real != null ? name : Pager.getPage(name));
        }
        if(this.currentPage.real) {
            this.hidePage(this.currentPage, stepTwo);
        } else {
            stepTwo();
        }
    }
}