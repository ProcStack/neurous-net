!function s(o, r, a) {
    function h(e, t) {
        if (!r[e]) {
            if (!o[e]) {
                var i = "function" == typeof require && require;
                if (!t && i) return i(e, !0);
                if (n) return n(e, !0);
                throw (i = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND", 
                i;
            }
            i = r[e] = {
                exports: {}
            }, o[e][0].call(i.exports, function(t) {
                return h(o[e][1][t] || t);
            }, i, i.exports, s, o, r, a);
        }
        return r[e].exports;
    }
    for (var n = "function" == typeof require && require, t = 0; t < a.length; t++) h(a[t]);
    return h;
}({
    1: [ function(t, e, i) {
        const d = t("./State.js"), m = t("./Utils.js"), s = t("./Systems/Emitter_PointTrails.js"), o = t("./Systems/Emitter_Sparks.js"), r = t("./Systems/Emitter_Fields.js");
        class a {
            constructor(t, e) {
                this.emitters = {
                    pointTrails: [],
                    sparks: [],
                    newtons: []
                }, this.nullKeys = [ 9, 37, 38, 39, 40 ], this.deviceSpecifics = {
                    intro_pause: {
                        desktop: "Hit <span class='introBolds'>Space</span>",
                        mobile: "<span class='introBolds'>Tap with 3 Fingers</span>"
                    },
                    intro_pull: {
                        desktop: "Left Click",
                        mobile: "Tap+Drag"
                    },
                    intro_newton: {
                        desktop: "Middle Click",
                        mobile: "Two Finger Tap"
                    },
                    intro_pullAll: {
                        desktop: "Right Click",
                        mobile: "Tap+Hold"
                    },
                    intro_start: {
                        desktop: "Click",
                        mobile: "Tap"
                    }
                }, this.verbose = !0, this.verboseTarget = null, this.target = t, this.background = e, 
                this.sparkCount = 10;
            }
            init() {
                var t = this.mobileCheck(), e = this.tabletCheck(t), t = t || e;
                d.mobile = t, d.tablet = e, this.sparkCount = t ? 7 : 30, this.verboseTarget = document.getElementById("verbose"), 
                this.buildEventListeners(), this.buildCanvas(), this.buildEmitters(), this.runCanvas(), 
                this.introCardAnim(1);
            }
            verboseLog(t) {
                this.verbose && this.verboseTarget && ([ "string", "number" ].includes(typeof t) || (t = (t = (t = JSON.stringify(t)).split(",")).join(",<br>")), 
                this.verboseTarget.innerHTML = t);
            }
            mobileCheck() {
                let t = 0;
                var e;
                return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = 1), 
                t;
            }
            tabletCheck(t) {
                let e = t;
                return 0 == e && (t = navigator.userAgent || navigator.vendor || window.opera, /(android|ipad|playbook|silk)/i.test(t) && (e = 1)), 
                e;
            }
            preventDefault(t) {
                (t = t || window.event).preventDefault && t.preventDefault(), t.returnValue = !1;
            }
            getMouseXY(t) {
                0 != t && (d.IE ? (d.mouseX = t.clientX + document.body.scrollLeft, d.mouseY = t.clientY + document.body.scrollTop) : (d.mouseX = t.pageX, 
                d.mouseY = t.pageY), this.preventDefault(t));
            }
            moveMouse(t) {
                this.getMouseXY(t), d.touchDragCount = 0, this.preventDefault(t);
            }
            mouseDown(t) {
                d.touchDragCount++, this.mouseAttracter(t, 0);
            }
            mouseUp(t) {
                1 == d.mButton && d.mouseAttract < 2 && d.touchDragCount < 5 && this.genTrailPoints(), 
                2 != d.mButton && 1 != d.touchTwoFinger || this.releaseForces(), d.touchDragCount = 0, 
                d.mouseAttract = 0, d.mButton = 0;
            }
            mouseAttracter(t, e = 0) {
                if (d.mButton = t.which, 1 == d.mButton && (0 == e && (d.mouseAttract = 1), 10 <= (e += 1) ? d.mouseAttract = 2 : e < 10 && 1 <= d.mouseAttract && 0), 
                2 == d.mButton && this.genForces(), 3 == d.mButton) {
                    d.mouseAttract = 3;
                    let t = document.getElementById("score_val");
                    t && (t.innerText = 0);
                }
                return !1;
            }
            touchStart(t) {
                var e = t.touches;
                if (1 < e.length) d.touchTwoFinger = 1, this.genForces(), d.touchTimer && clearTimeout(d.touchTimer); else {
                    e = e[0];
                    if (d.mouseX = e.pageX, d.mouseY = e.pageY, d.touchDown = 1, d.mouseAttract = 1, 
                    0 == d.touchTwoFingerPrev) {
                        let t = this;
                        d.touchTimer = setTimeout(() => {
                            t.touchLong();
                        }, d.longTouchLength);
                    }
                    this.doubleTouchDetect();
                }
                this.preventDefault(t);
            }
            touchDrag(t) {
                d.touchDragCount++, 5 < d.touchDragCount && d.touchTimer && clearTimeout(d.touchTimer);
                var e = t.touches;
                1 < e.length && 1 == d.touchTwoFinger ? d.mouseAttract = 0 : (e = e[0], d.mouseX = e.pageX, 
                d.mouseY = e.pageY), this.preventDefault(t);
            }
            touchEnd(t) {
                d.touchTimer && clearTimeout(d.touchTimer), d.touchDragCount < 5 && this.genTrailPoints(), 
                this.releaseForces(), 2 <= t.touches.length && this.togglePaused(), d.touchTwoFingerPrev = d.touchTwoFinger, 
                d.touchTwoFinger = 0, d.touchDragCount = 0, d.touchDown = 0, d.mouseAttract = 0, 
                this.preventDefault(t);
            }
            touchLong() {
                d.paused && this.togglePaused(), d.mouseAttract = 3;
            }
            doubleTouchDetect() {
                d.doubleTouchVal += 1, 2 == d.doubleTouchVal ? (d.doubleTouchVal = 0, d.touchDoubleTimer && clearTimeout(d.touchDoubleTimer)) : d.touchDoubleTimer = setTimeout(function() {
                    d.doubleTouchVal = 0;
                }, d.doubleTouchLength);
            }
            resize(t) {
                d.sW = window.innerWidth, d.sH = window.innerHeight, this.buildCanvas();
                var e = document.getElementById("introCards").offsetWidth;
                let i = document.getElementById("introCardsInner");
                if (e > d.sW) i.classList.add("mobile"), d.introCardsOrient = 1; else {
                    let t = document.getElementById("introCardsInner");
                    t.classList.remove("mobile"), d.introCardsOrient = 0;
                }
            }
            keyPress(t) {
                t = t.keyCode || t.which;
                return -1 == this.nullKeys.indexOf(t) && (32 === t ? (this.togglePaused(), !1) : void 0);
            }
            buildEventListeners() {
                let e = this;
                function t() {
                    document.removeEventListener("mousedown", t), document.removeEventListener("touchstart", t), 
                    e.toggleIntroCardVisibility(0);
                }
                document.addEventListener("mousemove", t => {
                    e.moveMouse(t);
                }, !1), document.addEventListener("mousedown", t => {
                    e.mouseDown(t);
                }, !1), document.addEventListener("mouseup", t => {
                    e.mouseUp(t);
                }, !1), document.addEventListener("touchstart", t => {
                    e.touchStart(t);
                }, !1), document.addEventListener("touchmove", t => {
                    e.touchDrag(t);
                }, !1), document.addEventListener("touchcancel", t => {
                    e.touchEnd(t);
                }, !1), document.addEventListener("touchend", t => {
                    e.touchEnd(t);
                }, !1), document.addEventListener("mousedown", t), document.addEventListener("touchstart", t), 
                window.addEventListener("selectstart", t => {
                    e.preventDefault(t);
                }, !1), document.addEventListener("keyup", t => {
                    e.keyPress(t);
                }, !1), window.addEventListener("resize", t => {
                    e.resize(t);
                }, !1), window.oncontextmenu = t => !1;
            }
            buildCanvas() {
                "string" == typeof this.target && (this.target = document.getElementById(this.target)), 
                "string" == typeof this.background && (this.background = document.getElementById(this.background)), 
                this.target.width = d.sW, this.target.height = d.sH, this.background.width = d.sW, 
                this.background.height = d.sH, m.gradientRunner(this.background, m.rgbToHex([ 0, 40, 50 ]), m.rgbToHex([ 0, 10, 30 ]), 0), 
                this.target.focus(), this.target.onfocusout = () => {
                    this.target.focus();
                };
            }
            buildEmitters() {
                var t = new r(d);
                this.emitters.newtons.push(t);
                let e = new s(d);
                e.forces = t.points;
                let i = m.mag([ d.sW, d.sH ]) / 20 + 25;
                d.mobile && (i += 50), e.scatterPoints([ d.sW, d.sH ], i), this.emitters.pointTrails.push(e);
                t = new o(d);
                this.emitters.sparks.push(t);
            }
            genTrailPoints() {
                this.emitters.pointTrails.forEach(t => {
                    t.spawnPointsAt([ d.mouseX, d.mouseY ], 2);
                }), this.emitters.sparks.forEach(t => {
                    t.genPoint([ d.mouseX, d.mouseY ], this.sparkCount);
                });
            }
            genForces() {
                this.emitters.newtons.forEach(t => {
                    t.genPoint([ d.mouseX, d.mouseY ]);
                });
            }
            releaseForces() {
                this.emitters.newtons.forEach(t => {
                    t.newtonRelease();
                });
            }
            togglePaused(t = null) {
                null == t && (t = !d.paused), 0 == (d.paused = t) && this.runCanvas();
            }
            introCardPrep() {
                document.getElementById("intro_pause");
                let i = null;
                for (var s in i = d.mobile ? "mobile" : "desktop", this.deviceSpecifics) {
                    let e = document.getElementById(s);
                    if (e) {
                        let t = this.deviceSpecifics[s];
                        t.hasOwnProperty(i) && (e.innerHTML = t[i]);
                    }
                }
            }
            introCardAnim(t = 0) {
                let i = document.getElementById("introCards");
                if (i) {
                    let e = document.getElementById("neurousTitle");
                    var s = i.offsetWidth;
                    if (d.introCardsOrient = s > d.sW, e, d.introCardsOrient) {
                        let t = document.getElementById("introCardsInner");
                        t && t.classList.add("mobile"), e.style.maxWidth = d.sH;
                    } else e.style.maxWidth = d.sW;
                    this.introCardPrep(), i.style.transition = " all 1s ease-in", i.style.visibility = "visible";
                    let t = document.getElementById("markerCanvas");
                    t && t.focus();
                }
            }
            toggleIntroCardVisibility(t = null) {
                let e = document.getElementById("introCards");
                var i;
                e && (null == t && (i = parseInt(e.getAttribute("vis")), console.log("vis " + typeof i + " " + (i + 1)), 
                t = i), e.setAttribute("vis", t), 0 == t && (d.mobile ? e.classList.add("fadeOutMobile") : e.classList.add("fadeOut")));
            }
            runCanvas() {
                d.runner += 1;
                let c = this.target.getContext("2d");
                c.clearRect(0, 0, d.sW, d.sH), d.touchDown && d.touchDown++;
                let p = 0;
                for (let u in this.emitters) this.emitters[u].forEach(r => {
                    r.step();
                    for (let o = 0; o < r.points.length; ++o) {
                        var a = r.points[o], h = [ ...a.pos ];
                        let t;
                        t = 0 == a.spark ? [ Math.min(255, a.color[0] + a.color[0] * a.mousePerc), Math.min(255, a.color[1] + a.color[1] * a.mousePerc), Math.min(255, a.color[2] + a.color[2] * a.mousePerc) ] : m.multFloat(a.color, a.colorBoost + 1);
                        var n = 5 * (a.mousePerc + (1 - Math.min(1, (this.mouseDist + this.pullDist / 5) / (6 * this.pullDist) + .1)) + 1);
                        let e = Math.min(1, a.alpha + a.mousePerc / 2 - .5 * a.colorBoost);
                        "sparks" != u && (e += Math.max(0, e / 3 - .5));
                        var l = [ "lighter", "lighter", "screen", "lighter" ];
                        let i = null;
                        d.mobile || (i = l[a.id % l.length]);
                        l = a.speed / 120 + 1;
                        0 < a.mousePerc && 3 != d.mouseAttract && (p += parseInt(2 * a.mousePerc));
                        let s = 1;
                        s = d.mobile ? 2 * a.mousePerc * l : 3 * a.mousePerc * l, "newtons" != u && m.drawGeo([ ...a.trail, ...a.pos ], 3, n, t, e, s, this.target, i), 
                        "sparks" != u && (c.beginPath(), d.mobile || (c.globalCompositeOperation = i), c.fillStyle = m.rgbToHex(t), 
                        c.globalAlpha = a.alpha, l = (a.size + a.mousePerc) * l, c.arc(h[0], h[1], l, 0, 2 * Math.PI), 
                        c.fill(), 3 < a.size && !d.mobile && (c.beginPath(), d.mobile || (c.globalCompositeOperation = i), 
                        c.fillStyle = m.rgbToHex(t), c.globalAlpha = .35, l = a.size + a.mousePerc, l *= 1.3, 
                        c.arc(h[0], h[1], l, 0, 2 * Math.PI), c.fill(), 6 < a.size && (c.beginPath(), d.mobile || (c.globalCompositeOperation = i), 
                        c.fillStyle = m.rgbToHex(t), c.globalAlpha = .12, l = a.size + a.mousePerc, l *= 1.6, 
                        c.arc(h[0], h[1], l, 0, 2 * Math.PI), c.fill())));
                    }
                });
                d.paused || window.requestAnimationFrame(() => {
                    this.runCanvas();
                });
            }
        }
        window.addEventListener("load", () => {
            const t = new a("markerCanvas", "bkCanvas");
            t.init();
        });
    }, {
        "./State.js": 2,
        "./Systems/Emitter_Fields.js": 4,
        "./Systems/Emitter_PointTrails.js": 5,
        "./Systems/Emitter_Sparks.js": 6,
        "./Utils.js": 11
    } ],
    2: [ function(t, e, i) {
        var s = {
            sW: window.innerWidth,
            sH: window.innerHeight,
            mobile: !1,
            tablet: !1,
            mouseX: 0,
            mouseY: 0,
            mButton: 0,
            paused: !1,
            runner: 0,
            mouseAttract: 0,
            touchDown: 0,
            touchDragCount: 0,
            touchTwoFinger: 0,
            touchTwoFingerPrev: 0,
            touchTimer: null,
            longTouchLength: 500,
            doubleTouchVal: 0,
            touchDoubleTimer: null,
            doubleTouchLength: 600,
            introCardsOrient: 0,
            curTime: .1 * new Date().getTime(),
            IE: !!document.all
        };
        e.exports = s;
    }, {} ],
    3: [ function(t, e, i) {
        e.exports = class {
            _type = "EmitterBase";
            get type() {
                return this._type;
            }
            set type(t) {
                this._type = t;
            }
            constructor(t) {
                this.State = t, this.time = 0, this.runner = 0, this.count = 0, this.curId = 0, 
                this.points = [], this.reapList = [], this.updateTime();
            }
            updateTime() {
                var t = new Date().getTime();
                this.time = .001 * t;
            }
            updateCount() {
                var t = this.points.length;
                this.curId += t - this.count, this.count = t;
            }
            step() {
                if (this.runner += 1, this.updateTime(), 0 < this.count) {
                    let i = [];
                    for (let e = 0; e < this.count; ++e) {
                        let t = this.points[e];
                        t && t.step() && i.push(e);
                    }
                    this.reapList = i, this.reapParticles();
                }
            }
            reapParticles() {
                if (0 < this.reapList.length) {
                    let t = 0;
                    for (;0 < this.reapList.length && (t += 1, !(10 < t)); ) {
                        var e = this.reapList.pop();
                        this.points.splice(e, 1);
                    }
                    this.updateCount();
                }
            }
        };
    }, {} ],
    4: [ function(t, e, i) {
        var s = t("./EmitterBase.js");
        const o = t("./Point_Newton.js");
        class r extends s {
            _type = "Fields";
            constructor(t) {
                super(t);
            }
            genPoint(t) {
                var e = 353.435 * this.time % 1e3;
                let i = new o(this.State, this.curId, e, t, [ 9 * Math.sin(this.time + this.curId), 9 * Math.cos(this.time + this.curId) ], 90, [ 0, 0, 0 ], .6);
                t = 10 * Math.random(this.curId + .3) + 20;
                i.size = t, i.origSize = t, i.weight = (.5 * i.weight + .5) * (t / 20 + .5), this.points.push(i), 
                this.updateCount();
            }
            newtonSpawn(t) {}
            newtonRelease() {
                0 < this.count && (this.points[this.count - 1].grow = 0);
            }
        }
        e.exports = r;
    }, {
        "./EmitterBase.js": 3,
        "./Point_Newton.js": 8
    } ],
    5: [ function(t, e, i) {
        var s = t("./EmitterBase.js");
        const u = t("./Point_Trail.js");
        class o extends s {
            _type = "PointTrails";
            _forces = [];
            get forces() {
                return this._forces;
            }
            set forces(t) {
                this._forces = t;
            }
            constructor(t) {
                super(t);
            }
            collisionParticles() {
                let e = [];
                for (let t = 0; t < this.count; ++t) 1 == this.points[t].bounce && 10 < this.points[t].age && e.push([ this.points[t].pos[0], this.points[t].pos[1] ]);
                return e;
            }
            scatterPoints(t, e) {
                let i, s, o;
                var r = t[0], a = t[1];
                for (let t = 0; t < e; ++t) {
                    var h = this.count, n = this.time + t;
                    i = t % 10 == 0 ? 4 * Math.sin(23.24 * this.runner + 23 + h) + 11 : 4 * Math.sin(23.24 * this.runner + 23 + h) + 6, 
                    s = t % 4 == 0 ? (o = .1 * Math.sin(234.353 * t) + .35, [ 10 * Math.sin(283.24 * i + 23 + h + i) + 10, 15 * Math.sin(233.24 * i + 23 + h + i) + 35, 30 * Math.sin(6723.24 * i + 23 + h + i) + 95 ]) : (o = Math.min(1, .3 * Math.sin(234.353 * t) + .95), 
                    [ 10 * Math.sin(263.24 * i + 23 + h + i) + 10, 20 * Math.sin(223.24 * i + 23 + h + i) + 45, 35 * Math.sin(123.24 * i + 23 + h + i) + 150 ]);
                    var l = [ (.5 * Math.sin(230 * t + 3434 + i) + .5) * r, (.5 * Math.sin(20 * t + 234 + i) + .5) * a ], h = [ 10 * Math.sin(230 * t + 3434 + i), 10 * Math.sin(630 * t + 134 + i) ], h = new u(this.State, this.curId, n, l, h, 0, s, o, [], Math.floor(i), this.forces);
                    this.points.push(h), this.updateCount();
                }
            }
            genPoint(t) {
                let e, i, s;
                var o = this.curId, r = 15325 * this.time % 1e3;
                e = o % 10 == 0 ? 4 * Math.sin(23.24 * this.runner + r + 23 + o) + 11 : 4 * Math.sin(23.24 * this.runner + r + 23 + o) + 6, 
                s = o % 4 == 0 ? (i = .1 * Math.sin(234.353 * o) + .35, [ 10 * Math.sin(223.24 * e + this.time + 23 + o + e) + 10, 15 * Math.sin(213.24 * e + 23 + r + o + e) + 35, 30 * Math.cos(233.24 * e + 23 + r + o + e) + 95 ]) : (i = Math.min(1, .3 * Math.sin(234.353 * o) + .95), 
                [ 10 * Math.sin(2633.24 * e + 23 + this.time + o + e) + 10, 20 * Math.sin(243.24 * e + 23 + r + o + e) + 45, 35 * Math.cos(235.24 * e + 23 + r + o + e) + 150 ]);
                r = new u(this.State, o, r, [ ...t ], [ 10 * Math.sin(230 * o + r + 3434 + e), 10 * Math.cos(630 * o + r + 134 + e) ], 0, s, i, [], Math.floor(e), this.forces);
                this.points.push(r), this.updateCount();
            }
            spawnPointsAt(e, i) {
                for (let t = 0; t < i; ++t) this.genPoint(e);
            }
        }
        e.exports = o;
    }, {
        "./EmitterBase.js": 3,
        "./Point_Trail.js": 10
    } ],
    6: [ function(t, e, i) {
        var s = t("./EmitterBase.js");
        const p = t("./Point_Spark.js");
        class o extends s {
            _type = "Sparks";
            constructor(t) {
                super(t);
            }
            newPoints(e, i, s, o, t) {
                for (let t = 0; t < i; ++t) {
                    var r = 12334.53 * (this.time + t) % 1e3, a = this.curId, h = 3 * Math.sin(23.24 * this.State.runner + 23 + r + a) + 4, n = [ 10 * Math.sin(23.24 * h + 23 + r + a + h) + 35, 10 * Math.sin(23.24 * h + r + a + h) + 45, 15 * Math.sin(23.24 * h + 23 + r + a + h) + 80 ], l = (.3 * Math.sin(r + a) + .7) * s, u = Math.floor(Math.sin(125.9757 * h + r + t + a + 345) * o[0] + o[1]), c = [ 10 * Math.sin(230.34 * t + r + 3434), 10 * Math.cos(630.53 * t + r + 134) ], h = new p(this.State, a, r, e, c, u, n, l, [], Math.floor(h));
                    this.points.push(h), this.updateCount();
                }
            }
            genPoint(t, e) {
                this.newPoints(t, e, .5, [ 2, 5 ], 1);
            }
        }
        e.exports = o;
    }, {
        "./EmitterBase.js": 3,
        "./Point_Spark.js": 9
    } ],
    7: [ function(t, e, i) {
        e.exports = class {
            _type = "Point";
            get type() {
                return this._type;
            }
            set type(t) {
                this._type = t;
            }
            constructor(t, e, i, s, o, r, a, h) {
                this.State = t, this.id = e, this.seed = i, this.pos = s, this.prevPos = s, this.weight = .5 * Math.sin(512.532 * e + 52.63 * e * Math.cos(i + 15.7391 * e * Math.sin(-i / 3.14)) + i) + .5, 
                this.size = 3 * this.weight + 1, this.origSize = 3 * this.weight + 1, this.speed = 0, 
                this.vel = o, this.velMagCap = 15, t.mobile ? (this.velMagCap = 10 + 10 * this.weight, 
                this.size *= .5, this.origSize *= .5) : this.velMagCap += 15 * this.weight, 0 < r ? (this.life = r, 
                this.fade = .95 * r) : (this.life = -1, this.fade = -1), this.age = 0, this.dead = 0, 
                this.color = a, this.colorBoost = 0, this.alpha = h, this.bounce = 0, this.mousePerc = 0;
            }
            step() {
                return this.age += 1, this.age >= this.life && 0 < this.life ? (this.dead = 1, !0) : (this.checkFadeToDeath(), 
                !1);
            }
            postStep() {
                this.prevPos = [ ...this.pos ], this.checkFieldPosition();
                var t;
                this.speed = ((t = [ this.pos[0] - this.prevPos[0], this.pos[1] - this.prevPos[1] ])[0] ** 2 + t[1] ** 2) ** .5;
            }
            checkFadeToDeath() {
                var t;
                0 < this.life && (this.age > this.fade ? (t = Math.min(1, (this.age - this.fade) / (this.life - this.fade)), 
                this.size = this.origSize * (1 - t), this.weight = this.weight * (1 - .4 * t), this.alpha = this.alpha * (1 - .3 * t)) : this.age > this.life && (this.size = 0, 
                this.weight = 0, this.alpha = 0));
            }
            newForce() {
                var t = [ Math.sin(234 * this.id + this.seed + 35 + this.pos[0] + this.age), Math.sin(1023 * this.id + this.seed + 1325 + this.pos[1] + this.age) ];
                this.addForce(t);
            }
            addForce(t, e = 0) {
                this.vel[0] += t[0], this.vel[1] += t[1], (this.pos[0] + this.vel[0] <= 0 || this.pos[0] + this.vel[0] >= this.State.sW) && (this.vel[0] = -1 * this.vel[0]), 
                (this.pos[1] + this.vel[1] <= 0 || this.pos[1] + this.vel[1] >= this.State.sH) && (this.vel[1] = -1 * this.vel[1]), 
                e && this.clampVel();
            }
            checkFieldPosition() {
                var t = [ +this.State.sW, +this.State.sH ];
                let e = [ ...this.pos ];
                e[0] = Math.min(Math.max(0, e[0] + this.vel[0]), t[0]), e[1] = Math.min(Math.max(0, e[1] + this.vel[1]), t[1]), 
                e[0] <= 0 || e[0] >= t[0] ? (this.pos[0] = e[0], this.vel[0] = -this.vel[0], this.bounce = 1) : this.pos[0] += this.vel[0], 
                e[1] <= 0 || e[1] >= t[1] ? (this.pos[1] = e[1], this.vel[1] = -this.vel[1], this.bounce = 1) : this.pos[1] += this.vel[1];
            }
            setVel(t, e = 0) {
                this.vel[0] = t[0], this.vel[1] = t[1], e && this.clampVel();
            }
            clampVel(t = 0) {
                let e = [ ...this.vel ], i = (e[0] ** 2 + e[1] ** 2) ** .5;
                i = i > this.velMagCap ? this.velMagCap / i : 1, e[0] *= i, e[1] *= i, this.vel = e;
            }
        };
    }, {} ],
    8: [ function(t, e, i) {
        t = t("./PointBase.js");
        class s extends t {
            _type = "Newton";
            constructor(t, e, i, s, o, r, a, h) {
                super(t, e, i, s, o, r, a, h), this.pullDist = 90 * this.weight + (t.sW + t.sH) * (.1 + .1 * t.mobile), 
                this.grow = 0;
            }
            step() {
                return super.step(), 1 == this.dead || (this.newForce(), this.postStep(), !1);
            }
            sizeGrowUpdate() {
                0 != this.grow && (-1 == this.grow ? this.size = this.origSize : this.size += this.grow);
            }
        }
        e.exports = s;
    }, {
        "./PointBase.js": 7
    } ],
    9: [ function(t, e, i) {
        t = t("./PointBase.js");
        class s extends t {
            _type = "Spark";
            constructor(t, e, i, s, o, r, a, h, n, l) {
                super(t, e, i, s, o, r, a, h), this.tlen = Math.floor(l * this.weight), this.size = 3 * this.weight + 1, 
                this.origSize = 3 * this.weight + 1, this.speed = 0, this.trail = [];
                for (let t = 0; t < l; ++t) this.trail.push(s[0]), this.trail.push(s[1]);
            }
            step() {
                return super.step(), 1 == this.dead || (this.newForce(), this.trailUpdate(), this.postStep(), 
                !1);
            }
            trailUpdate() {
                this.trail.push(this.pos[0]), this.trail.push(this.pos[1]), this.trail.length > this.tlen && (this.trail = this.trail.slice(2, this.trail.length));
            }
        }
        e.exports = s;
    }, {
        "./PointBase.js": 7
    } ],
    10: [ function(t, e, i) {
        const f = t("../Utils.js");
        t = t("./PointBase.js");
        class s extends t {
            _type = "PointTrail";
            constructor(t, e, i, s, o, r, a, h, n, l, u) {
                super(t, e, i, s, o, r, a, h), this.weight *= 1 - .5 * this.weight, this.pullDist = 90 * this.weight + (this.State.sW + this.State.sH) * (.1 + .1 * this.State.mobile), 
                t.mobile ? this.velMagCap = 10 + 10 * this.size : this.velMagCap = 30 + 30 * this.size, 
                this.tlen = Math.floor(l * this.weight), this.mouseDist = 3 * this.weight + 1, this.trail = [];
                for (let t = 0; t < l; ++t) this.trail.push(s[0]), this.trail.push(s[1]);
                this.prevToPos = [ ...o ], this.mousePerc = 0, this.forces = u, this.targetOffsetDist = 10 + 10 * this.weight, 
                this.targetOffsetVariance = 10 * this.weight;
            }
            step() {
                return super.step(), 1 == this.dead || (this.mousePerc *= .9, this.colorBoost *= .8, 
                this.trailUpdate(), 0 < this.State.mouseAttract || 0 < this.forces.length ? 3 == this.State.mouseAttract ? this.fullPullInfluence() : this.calculateForceInfluences() : this.prevToPos = [ ...this.vel ], 
                this.clampVel(), this.newForce(), this.postStep(), this.bounce = 1, !(this.prevToPos = [ ...this.vel ]));
            }
            getTargetOffset(t = 1) {
                var e = 400 + .1 * (this.State.sW + this.State.sH), i = [ this.State.mouseX / e, this.State.mouseY / e ], s = 75.1579 * this.id + 5014 + this.seed, o = this.State.runner / 30, r = 3.14159265358979, e = this.id / 3 + this.age / 3;
                return [ Math.sin(s + o + i[0] + Math.cos(215.15 * this.id + .2 * o + i[1]) * r) * (Math.sin(e) * this.targetOffsetVariance + this.targetOffsetDist * t), Math.cos(s + o + i[1] + Math.sin(5215.15 * this.id + .2 * o + i[0]) * r) * (Math.cos(e + this.seed) * this.targetOffsetVariance + this.targetOffsetDist * t) ];
            }
            fullPullInfluence() {
                let {
                    addVec: t,
                    subVec: e,
                    multFloat: i,
                    normalize: s,
                    dot: o,
                    mag: r,
                    lerpVec: a
                } = f, h = this.weight;
                this.State.mobile && (h = .5 * h + .5);
                var n = this.getTargetOffset(), l = 22 + 1.5 * this.size, u = [ this.State.mouseX, this.State.mouseY ];
                let c = [ u[0] + n[0] - this.pos[0], u[1] + n[1] - this.pos[1] ];
                var p = s(c);
                c = t(c, i(p, 100));
                u = 1 - Math.min(1, .008 * r(e(this.pos, u)));
                c = a(c, n, u), this.colorBoost = Math.min(1, this.colorBoost + .05 * u);
                n = r(c);
                l += .4 * n;
                u = s(this.vel);
                c = t(c, i(u, 6)), l < n && (c = s(c), c = i(c, l));
                n = this.id % 5 + this.size * (.6 * h + .4) ** 2, l = .4 * h + .4;
                c[0] = (c[0] * (1 - l) + this.vel[0] * l + this.vel[0] * n) / (1 + n), c[1] = (c[1] * (1 - l) + this.vel[1] * l + this.vel[1] * n) / (1 + n);
                n = .4 * h + .6, n = (.6 * o(s(this.vel), s(c)) + .4) * n + (1 - n);
                c = a(this.vel, c, n), c = a(this.prevToPos, c, .5), this.vel = c, this.prevToPos = c, 
                this.mousePerc = Math.min(1, this.mousePerc + .2);
            }
            calculateForceInfluences() {
                let {
                    normalize: s,
                    dot: o,
                    mag: e
                } = f, i = [], r = [];
                if (1 == this.State.mouseAttract && (t = [ this.State.mouseX, this.State.mouseY ], 
                i.push(t), r.push(.9)), 0 < this.forces.length) for (let t = 0; t < this.forces.length; ++t) {
                    i.push(this.forces[t].pos);
                    var a = .7 * this.forces[t].weight;
                    r.push(a);
                }
                var h = [ 0, 0 ];
                let n = [], l = [], u = 0, c = this.weight;
                this.State.mobile && (c = .6 * c + .2);
                var p = this.getTargetOffset();
                for (let t = 0; t < i.length; ++t) {
                    var d, m, g = e([ i[t][0] - this.pos[0], i[t][1] - this.pos[1] ]);
                    g < this.pullDist && (m = ((u = 1) - g / this.pullDist) * r[t], d = (m = Math.max(0, m)) * (1 - c), 
                    c, h = [ i[t][0] + p[0] - this.pos[0], i[t][1] + p[1] - this.pos[1] ], m = .3 * o(s(h), s(this.vel)) + .7, 
                    l.push(d * (1 - m * (.3 * c + .7))), n.push([ ...h ])), this.mouseDist = Math.min(this.mouseDist, g);
                }
                if (0 != u) {
                    l.reduce((t, e) => t + e);
                    let e = [ 0, 0 ], i = 0;
                    for (let t = 0; t < n.length; ++t) i += l[t], e[0] += n[t][0] * i, e[1] += n[t][1] * i;
                    this.mousePerc = Math.min(1, this.mousePerc + .5 * i), e[0] = e[0] / n.length, e[1] = e[1] / n.length;
                    var t = (.2 * o(s(e), s(this.vel)) + .8) * i;
                    this.vel[0] += e[0] * t, this.vel[1] += e[1] * t;
                }
            }
            trailUpdate() {
                this.trail.push(this.pos[0]), this.trail.push(this.pos[1]), this.trail.length > this.tlen && (this.trail = this.trail.slice(2, this.trail.length));
            }
        }
        e.exports = s;
    }, {
        "../Utils.js": 11,
        "./PointBase.js": 7
    } ],
    11: [ function(t, e, i) {
        const v = {
            sign: t => t < 0 ? -1 : 1,
            add: (t, e) => "object" == typeof e ? v.addVec(t, e) : v.addFloat(t, e),
            addFloat: (t, i) => t.map((t, e) => t + i),
            addVec: (t, i) => t.map((t, e) => t + i[e]),
            sub: (t, e) => "object" == typeof e ? v.subVec(t, e) : v.subFloat(t, e),
            subFloat: (t, i) => t.map((t, e) => t - i),
            subVec: (t, i) => t.map((t, e) => t - i[e]),
            mult: (t, e) => "object" == typeof e ? v.multVec(t, e) : v.multFloat(t, e),
            multFloat: (t, i) => t.map((t, e) => t * i),
            multVec: (t, i) => t.map((t, e) => t * i[e]),
            dot: (t, e) => t[0] * e[0] + t[1] * e[1],
            mag: t => (t[0] ** 2 + t[1] ** 2) ** .5,
            normalize: t => {
                var e = t[0] * v.sign(t[0]) + t[1] * v.sign(t[1]);
                return 0 == e ? [ 0, 0 ] : [ t[0] / e, t[1] / e ];
            },
            lerp: (t, e, i) => t * (1 - i) + e * i,
            lerpVec: (t, e, i) => [ v.lerp(t[0], e[0], i), v.lerp(t[1], e[1], i) ],
            componentToHex: t => {
                t = t.toString(16);
                return 1 == t.length ? "0" + t : t;
            },
            rgbToHex: t => "#" + v.componentToHex(Math.min(255, Math.max(0, Math.round(t[0])))) + v.componentToHex(Math.min(255, Math.max(0, Math.round(t[1])))) + v.componentToHex(Math.min(255, Math.max(0, Math.round(t[2])))),
            toHSV: t => {
                var e = t[0] * (1 / 255), i = t[1] * (1 / 255), s = t[2] * (1 / 255), o = Math.min(e, i, s), r = Math.max(e, i, s);
                let a, h, n = r;
                t = r - o;
                return h = 0 != r ? t / r : 0, o == r ? a = 0 : (e == r ? (a = (i - s) / t, i < s && (a += 6)) : a = i == r ? 2 + (s - e) / t : 4 + (e - i) / t, 
                a /= 6), [ a, h, n ];
            },
            toRGB: t => {
                let e, i, s;
                var o = t[0], r = t[1], a = t[2], h = Math.floor(6 * o), n = 6 * o - h, t = a * (1 - r), o = a * (1 - r * n), n = a * (1 - r * (1 - n));
                return 0 == (h %= 6) ? (e = a, i = n, s = t) : 1 == h ? (e = o, i = a, s = t) : 2 == h ? (e = t, 
                i = a, s = n) : 3 == h ? (e = t, i = o, s = a) : 4 == h ? (e = n, i = t, s = a) : 5 == h && (e = a, 
                i = t, s = o), [ 255 * e, 255 * i, 255 * s ];
            },
            drawGeo: (e, i, s, o, t, r, a, h = null) => {
                var n = e[0], l = e[1], u = o[0], c = o[1], p = o[2], d = v.rgbToHex([ Math.floor(u), Math.floor(c), Math.floor(p) ]), m = .5 * a.width, g = .5 * a.height;
                let f = a.getContext("2d");
                null != h && (f.globalCompositeOperation = h);
                f.globalAlpha = t;
                for (let t = 0; t < 1; t += 1) {
                    if (f.beginPath(), f.lineWidth = Math.max(1, r), -1 == r ? f.fillStyle = d : f.strokeStyle = d, 
                    i <= 2) {
                        if (1 == i) {
                            let t = f.createRadialGradient(n - m + m, l - g + g, 1, n - m + m, l - g + g, s / 2);
                            t.addColorStop(0, "rgba(" + Math.floor(o[0]) + "," + Math.floor(o[1]) + "," + Math.floor(o[2]) + ",1)"), 
                            4 < o.length ? t.addColorStop(1, "rgba(" + Math.floor(o[3]) + "," + Math.floor(o[4]) + "," + Math.floor(o[5]) + ",0)") : t.addColorStop(1, "rgba(" + Math.floor(o[0]) + "," + Math.floor(o[1]) + "," + Math.floor(o[2]) + ",0)"), 
                            f.fillStyle = t;
                        } else if (2 == i) {
                            let t = f.createRadialGradient(n - m + m, l - g + g, 1, n - m + m, l - g + g, s / 2);
                            t.addColorStop(0, "rgba(" + Math.floor(o[0]) + "," + Math.floor(o[1]) + "," + Math.floor(o[2]) + ",0)"), 
                            4 < o.length ? t.addColorStop(1, "rgba(" + Math.floor(o[3]) + "," + Math.floor(o[4]) + "," + Math.floor(o[5]) + ",1)") : t.addColorStop(1, "rgba(" + Math.floor(o[0]) + "," + Math.floor(o[1]) + "," + Math.floor(o[2]) + ",1)"), 
                            f.fillStyle = t;
                        }
                        f.arc(n - m + m, l - g + g, s / 2, 0, 2 * Math.PI);
                    } else if (2 < e.length) if (3 == i) {
                        f.moveTo(n - m + m, l - g + g);
                        for (let t = 2; t < e.length; t += 2) f.lineTo(e[t] - m + m, e[t + 1] - g + g);
                        f.lineJoin = "round", 1 == s && -1 != r ? f.closePath() : f.lineJoin = "miter";
                    } else {
                        f.lineJoin = "round", f.moveTo(n - m + m, l - g + g);
                        for (let t = 2; t < e.length; t += 4) f.quadraticCurveTo(e[t] - m + m, e[t + 1] - g + g, e[t + 2] - m + m, e[t + 3] - g + g);
                        1 == s && f.quadraticCurveTo(e[e.length - 2] - m + m, e[e.length - 1] - g + g, e[0] - m + m, e[1] - g + g), 
                        1 == s && -1 != r ? f.closePath() : f.lineJoin = "miter";
                    }
                    -1 == r ? f.fill() : f.stroke();
                }
            },
            drawLine: (e, t, i, s, o, r, a) => {
                let h, n;
                var l = i[0], u = i[1], i = i[2];
                h = rgbToHex([ Math.floor(l), Math.floor(u), Math.floor(i) ]), n = "string" == typeof r ? r.getContext("2d") : r, 
                n.beginPath(), -1 != a[0] && (n.globalAlpha = s / 2), n.strokeStyle = h, n.lineWidth = t, 
                n.moveTo(e[0], e[1]);
                for (let t = 2; t < e.length; t += 2) n.lineTo(e[t], e[t + 1]);
                o = 0 == o ? "round" : 1 == o ? "miter" : 2 == o ? "bevel" : "round", n.lineJoin = o, 
                n.lineCap = o, n.stroke(), -1 != a[0] && (n.globalAlpha = s, n.setLineDash(a), n.stroke());
            },
            gradientRunner: (t, e, i, s) => {
                let o = t.getContext("2d");
                var r = t.width, t = t.height;
                o.rect(0, 0, r, t);
                let a = o.createLinearGradient(0, 0, r, t);
                a.addColorStop(0, e), a.addColorStop(1, i), o.fillStyle = a, o.fill(), 1 == s && v.blurEffect(o, o, 1, 80, 3);
            },
            blurEffect: (t, i, e, s, o) => {
                var r;
                s.constructor !== Array && (r = s, (s = new Array())[0] = r, s[1] = r);
                let a, h;
                if ("string" == typeof t) {
                    let t = document.getElementById(e);
                    t || console.warn("'blurEffect' cannot find Input Object "), a = t.width, h = t.height;
                    let e = t.getContext("2d");
                    i = e;
                } else a = t.width, h = t.height;
                fader = t.getImageData(0, 0, a, h), pix = fader.data;
                let n, l, u, c, p, d, m, g, f, v, b, w = 1;
                if (1 == e) v = 0, b = pix.length, w = 1; else {
                    v = 4 * a * (parseInt(refreshWindow[1]) - 2), b = 4 * a * (parseInt(refreshWindow[3]) + 2);
                    let t = document.getElementById("sl" + diaVal + "_filterPercent_val");
                    t && (w = t.val());
                }
                o = Math.max(1, o);
                let M = 0;
                if (0 < s[0] || 0 < s[1] || 1 == e) for (let t = v; t < b; t += 4) if ((t / 4 % a > parseInt(refreshWindow[0]) - 2 && t / 4 % a < parseInt(refreshWindow[2]) + 1 || 1 == e) && 0 < pix[t + 3]) {
                    M = Math.max(1, o / 2), c = t / 4 % a, p = Math.floor(t / 4 / a), d = pix[t] * M, 
                    m = pix[t + 1] * M, g = pix[t + 2] * M, f = pix[t + 3] * M;
                    for (let t = 0; t < o; ++t) n = Math.round(Math.random() * s[0] - s[0] / 2 + c), 
                    n = Math.max(0, Math.min(n, a - 1)) - Math.max(0, n - a), l = Math.round(Math.random() * s[1] - s[1] / 2 + p), 
                    l = Math.max(0, Math.min(l, h - 1)) - Math.max(0, l - h), u = 4 * (l * a + n), d += pix[u], 
                    m += pix[u + 1], g += pix[u + 2], f += pix[u + 3], M++;
                    1 == w ? (d /= M, m /= M, g /= M, f /= M) : (d = pix[t] * (1 - w) + d / M * w, m = pix[t + 1] * (1 - w) + m / M * w, 
                    g = pix[t + 2] * (1 - w) + g / M * w, f = pix[t + 3] * (1 - w) + f / M * w), pix[u] = d, 
                    pix[u + 1] = m, pix[u + 2] = g, pix[u + 3] = f;
                }
                for (let t = v; t < b; t += 4) (t / 4 % a > parseInt(refreshWindow[0]) - 2 && t / 4 % a < parseInt(refreshWindow[2]) + 1 || 1 == e) && 0 < pix[t + 3] && (M = 2, 
                c = t / 4 % a, p = Math.floor(t / 4 / a), d = 2 * pix[t], m = 2 * pix[t + 1], g = 2 * pix[t + 2], 
                f = 2 * pix[t + 3], 0 < p && (d += pix[t - 4 * a], m += pix[t + 1 - 4 * a], g += pix[t + 2 - 4 * a], 
                f += pix[t + 3 - 4 * a], M += 1), p < h - 1 && (d += pix[t + 4 * a], m += pix[t + 1 + 4 * a], 
                g += pix[t + 2 + 4 * a], f += pix[t + 3 + 4 * a], M += 1), 0 < c && (d += pix[t - 4], 
                m += pix[t + 1 - 4], g += pix[t + 2 - 4], f += pix[t + 3 - 4], M += 1), c < a - 1 && (d += pix[t + 4], 
                m += pix[t + 1 + 4], g += pix[t + 2 + 4], f += pix[t + 3 + 4], M += 1), 1 == w ? (d /= M, 
                m /= M, g /= M, f /= M) : (d = pix[t] * (1 - w) + d / M * w, m = pix[t + 1] * (1 - w) + m / M * w, 
                g = pix[t + 2] * (1 - w) + g / M * w, f = pix[t + 3] * (1 - w) + f / M * w), pix[t] = d, 
                pix[t + 1] = m, pix[t + 2] = g, pix[t + 3] = f);
                i.putImageData(fader, 0, 0);
            }
        };
        e.exports = v;
    }, {} ]
}, {}, [ 1 ]);
