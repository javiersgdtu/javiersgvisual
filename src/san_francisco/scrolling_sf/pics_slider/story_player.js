var Flourish = function(t) {
    "use strict";
    var n = "$";

    function c() {}

    function p(e, t) {
        var n = new c;
        if (e instanceof c) e.each(function(e, t) {
            n.set(t, e)
        });
        else if (Array.isArray(e)) {
            var r, i = -1,
                a = e.length;
            if (null == t)
                for (; ++i < a;) n.set(i, e[i]);
            else
                for (; ++i < a;) n.set(t(r = e[i], i, e), r)
        } else if (e)
            for (var o in e) n.set(o, e[o]);
        return n
    }

    function a() {}
    c.prototype = p.prototype = {
        constructor: c,
        has: function(e) {
            return n + e in this
        },
        get: function(e) {
            return this[n + e]
        },
        set: function(e, t) {
            return this[n + e] = t, this
        },
        remove: function(e) {
            var t = n + e;
            return t in this && delete this[t]
        },
        clear: function() {
            for (var e in this) e[0] === n && delete this[e]
        },
        keys: function() {
            var e = [];
            for (var t in this) t[0] === n && e.push(t.slice(1));
            return e
        },
        values: function() {
            var e = [];
            for (var t in this) t[0] === n && e.push(this[t]);
            return e
        },
        entries: function() {
            var e = [];
            for (var t in this) t[0] === n && e.push({
                key: t.slice(1),
                value: this[t]
            });
            return e
        },
        size: function() {
            var e = 0;
            for (var t in this) t[0] === n && ++e;
            return e
        },
        empty: function() {
            for (var e in this)
                if (e[0] === n) return !1;
            return !0
        },
        each: function(e) {
            for (var t in this) t[0] === n && e(this[t], t.slice(1), this)
        }
    };
    var e = p.prototype;
    a.prototype = function(e, t) {
        var n = new a;
        if (e instanceof a) e.each(function(e) {
            n.add(e)
        });
        else if (e) {
            var r = -1,
                i = e.length;
            if (null == t)
                for (; ++r < i;) n.add(e[r]);
            else
                for (; ++r < i;) n.add(t(e[r], r, e))
        }
        return n
    }.prototype = {
        constructor: a,
        has: e.has,
        add: function(e) {
            return this[n + (e += "")] = e, this
        },
        remove: e.remove,
        clear: e.clear,
        values: e.keys,
        size: e.size,
        empty: e.empty,
        each: e.each
    };
    var o = {
        value: function() {}
    };

    function b() {
        for (var e, t = 0, n = arguments.length, r = {}; t < n; ++t) {
            if (!(e = arguments[t] + "") || e in r) throw new Error("illegal type: " + e);
            r[e] = []
        }
        return new i(r)
    }

    function i(e) {
        this._ = e
    }

    function u(e, t) {
        for (var n, r = 0, i = e.length; r < i; ++r)
            if ((n = e[r]).name === t) return n.value
    }

    function f(e, t, n) {
        for (var r = 0, i = e.length; r < i; ++r)
            if (e[r].name === t) {
                e[r] = o, e = e.slice(0, r).concat(e.slice(r + 1));
                break
            }
        return null != n && e.push({
            name: t,
            value: n
        }), e
    }
    i.prototype = b.prototype = {
        constructor: i,
        on: function(e, t) {
            var n, r = this._,
                i = function(e, r) {
                    return e.trim().split(/^|\s+/).map(function(e) {
                        var t = "",
                            n = e.indexOf(".");
                        if (0 <= n && (t = e.slice(n + 1), e = e.slice(0, n)), e && !r.hasOwnProperty(e)) throw new Error("unknown type: " + e);
                        return {
                            type: e,
                            name: t
                        }
                    })
                }(e + "", r),
                a = -1,
                o = i.length;
            if (!(arguments.length < 2)) {
                if (null != t && "function" != typeof t) throw new Error("invalid callback: " + t);
                for (; ++a < o;)
                    if (n = (e = i[a]).type) r[n] = f(r[n], e.name, t);
                    else if (null == t)
                    for (n in r) r[n] = f(r[n], e.name, null);
                return this
            }
            for (; ++a < o;)
                if ((n = (e = i[a]).type) && (n = u(r[n], e.name))) return n
        },
        copy: function() {
            var e = {},
                t = this._;
            for (var n in t) e[n] = t[n].slice();
            return new i(e)
        },
        call: function(e, t) {
            if (0 < (n = arguments.length - 2))
                for (var n, r, i = new Array(n), a = 0; a < n; ++a) i[a] = arguments[a + 2];
            if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
            for (a = 0, n = (r = this._[e]).length; a < n; ++a) r[a].value.apply(t, i)
        },
        apply: function(e, t, n) {
            if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
            for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n)
        }
    };
    var d = {},
        h = {};

    function s(e) {
        return new Function("d", "return {" + e.map(function(e, t) {
            return JSON.stringify(e) + ": d[" + t + "]"
        }).join(",") + "}")
    }

    function r(r) {
        var t = new RegExp('["' + r + "\n\r]"),
            l = r.charCodeAt(0);

        function a(r, e) {
            var t, n = [],
                i = r.length,
                a = 0,
                o = 0,
                c = i <= 0,
                u = !1;

            function f() {
                if (c) return h;
                if (u) return u = !1, d;
                var e, t, n = a;
                if (34 === r.charCodeAt(n)) {
                    for (; a++ < i && 34 !== r.charCodeAt(a) || 34 === r.charCodeAt(++a););
                    return (e = a) >= i ? c = !0 : 10 === (t = r.charCodeAt(a++)) ? u = !0 : 13 === t && (u = !0, 10 === r.charCodeAt(a) && ++a), r.slice(n + 1, e - 1).replace(/""/g, '"')
                }
                for (; a < i;) {
                    if (10 === (t = r.charCodeAt(e = a++))) u = !0;
                    else if (13 === t) u = !0, 10 === r.charCodeAt(a) && ++a;
                    else if (t !== l) continue;
                    return r.slice(n, e)
                }
                return c = !0, r.slice(n, i)
            }
            for (10 === r.charCodeAt(i - 1) && --i, 13 === r.charCodeAt(i - 1) && --i;
                (t = f()) !== h;) {
                for (var s = []; t !== d && t !== h;) s.push(t), t = f();
                e && null == (s = e(s, o++)) || n.push(s)
            }
            return n
        }

        function n(e) {
            return e.map(i).join(r)
        }

        function i(e) {
            return null == e ? "" : t.test(e += "") ? '"' + e.replace(/"/g, '""') + '"' : e
        }
        return {
            parse: function(e, n) {
                var r, i, t = a(e, function(e, t) {
                    if (r) return r(e, t - 1);
                    i = e, r = n ? function(n, r) {
                        var i = s(n);
                        return function(e, t) {
                            return r(i(e), t, n)
                        }
                    }(e, n) : s(e)
                });
                return t.columns = i || [], t
            },
            parseRows: a,
            format: function(e, n) {
                return null == n && (n = function(e) {
                    var n = Object.create(null),
                        r = [];
                    return e.forEach(function(e) {
                        for (var t in e) t in n || r.push(n[t] = t)
                    }), r
                }(e)), [n.map(i).join(r)].concat(e.map(function(t) {
                    return n.map(function(e) {
                        return i(t[e])
                    }).join(r)
                })).join("\n")
            },
            formatRows: function(e) {
                return e.map(n).join("\n")
            }
        }
    }
    var l = r(","),
        g = l.parseRows,
        v = l.formatRows;
    r("\t");

    function m(t, e, n, r, i) {
        for (var a in t.getVersionNumber = function() {
                return t.version_number
            }, t.setVersionNumber = function(e) {
                t.version_number = e
            }, t.id = e, t.version_number = n || 0, r) t[a] = r[a];
        if (i)
            for (var a in i) t[a] = i[a]
    }
    var y = {};

    function _(e) {
        e.running || (e.running = !0, function e(t, n) {
            t.request = w(t.items.shift(), function() {
                t.request = null, 0 == t.items.length ? n() : e(t, n)
            })
        }(e, function() {
            e.running = !1
        }))
    }

    function w(e, n) {
        var t = "method" in e ? e.method : "POST",
            r = "request_type" in e ? e.request_type : "application/json",
            i = "response_type" in e ? e.response_type : "application/json",
            a = e.url,
            o = e.payload,
            c = e.callback;
        if (o) {
            if ("function" != typeof o) throw new Error("Internal error: processRequestThen: payload must be a function, not " + typeof o, o);
            "string" != typeof(o = o()) && (o = JSON.stringify(o))
        }
        var u = function(r, e) {
            var i, a, o, c, u = b("beforesend", "progress", "load", "error"),
                f = p(),
                s = new XMLHttpRequest,
                l = null,
                d = null,
                h = 0;

            function t(e) {
                var t, n = s.status;
                if (!n && function(e) {
                        var t = e.responseType;
                        return t && "text" !== t ? e.response : e.responseText
                    }(s) || 200 <= n && n < 300 || 304 === n) {
                    if (o) try {
                        t = o.call(i, s)
                    } catch (e) {
                        return void u.call("error", i, e)
                    } else t = s;
                    u.call("load", i, t)
                } else u.call("error", i, e)
            }
            if ("undefined" == typeof XDomainRequest || "withCredentials" in s || !/^(http(s)?:)?\/\//.test(r) || (s = new XDomainRequest), "onload" in s ? s.onload = s.onerror = s.ontimeout = t : s.onreadystatechange = function(e) {
                    3 < s.readyState && t(e)
                }, s.onprogress = function(e) {
                    u.call("progress", i, e)
                }, i = {
                    header: function(e, t) {
                        return e = (e + "").toLowerCase(), arguments.length < 2 ? f.get(e) : (null == t ? f.remove(e) : f.set(e, t + ""), i)
                    },
                    mimeType: function(e) {
                        return arguments.length ? (a = null == e ? null : e + "", i) : a
                    },
                    responseType: function(e) {
                        return arguments.length ? (c = e, i) : c
                    },
                    timeout: function(e) {
                        return arguments.length ? (h = +e, i) : h
                    },
                    user: function(e) {
                        return arguments.length < 1 ? l : (l = null == e ? null : e + "", i)
                    },
                    password: function(e) {
                        return arguments.length < 1 ? d : (d = null == e ? null : e + "", i)
                    },
                    response: function(e) {
                        return o = e, i
                    },
                    get: function(e, t) {
                        return i.send("GET", e, t)
                    },
                    post: function(e, t) {
                        return i.send("POST", e, t)
                    },
                    send: function(e, t, n) {
                        return s.open(e, r, !0, l, d), null == a || f.has("accept") || f.set("accept", a + ",*/*"), s.setRequestHeader && f.each(function(e, t) {
                            s.setRequestHeader(t, e)
                        }), null != a && s.overrideMimeType && s.overrideMimeType(a), null != c && (s.responseType = c), 0 < h && (s.timeout = h), null == n && "function" == typeof t && (n = t, t = null), null != n && 1 === n.length && (n = function(n) {
                            return function(e, t) {
                                n(null == e ? t : null)
                            }
                        }(n)), null != n && i.on("error", n).on("load", function(e) {
                            n(null, e)
                        }), u.call("beforesend", i, s), s.send(null == t ? null : t), i
                    },
                    abort: function() {
                        return s.abort(), i
                    },
                    on: function() {
                        var e = u.on.apply(u, arguments);
                        return e === u ? i : e
                    }
                }, null == e) return i;
            if ("function" != typeof e) throw new Error("invalid callback: " + e);
            return i.get(e)
        }(a);
        return r && "GET" !== t && u.header("Content-Type", r), i && u.mimeType(i), u.on("error", function(t) {
            var e;
            try {
                e = JSON.parse(t.target.responseText), c(e.error)
            } catch (e) {
                c("Internal error: " + t.target.responseText)
            }
            n()
        }), u.on("load", function(e) {
            var t = e.responseText;
            "application/json" === i && (t = JSON.parse(t));
            try {
                c(void 0, t)
            } catch (e) {
                console.error(e.stack)
            }
            n()
        }), u.send(t, o), u
    }

    function x(e, t) {
        void 0 === t && (t = "default"), t in y || (y[t] = {
            items: [],
            running: !1,
            name: t
        }), y[t].items.push(e), _(y[t])
    }

    function T(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function S(n, r, i, a) {
        "function" == typeof i && (a = i, i = !1), i && T(n, r), x({
            url: n.api_prefix + "/" + n.id,
            payload: function() {
                return {
                    version_number: n.getVersionNumber(),
                    fields: r
                }
            },
            callback: function(e, t) {
                if (e) return a(e);
                i || T(n, r), n.setVersionNumber(t.version_number), a(void 0)
            }
        })
    }

    function k(n, r) {
        n.delete_requested = !0, x({
            url: n.api_prefix + "/" + n.id,
            method: "DELETE",
            payload: function() {
                return {
                    version_number: n.getVersionNumber()
                }
            },
            callback: function(e, t) {
                if (e) return r(e);
                n.setVersionNumber(t.version_number), n.is_deleted = !0, r(void 0, t)
            }
        })
    }

    function C(e, t) {
        return e < t ? -1 : t < e ? 1 : t <= e ? 0 : NaN
    }
    1 === (E = C).length && (M = E, E = function(e, t) {
        return C(M(e), t)
    });
    var M, E, A = "http://www.w3.org/1999/xhtml",
        D = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: A,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };

    function U(e) {
        var t = e += "",
            n = t.indexOf(":");
        return 0 <= n && "xmlns" !== (t = e.slice(0, n)) && (e = e.slice(n + 1)), D.hasOwnProperty(t) ? {
            space: D[t],
            local: e
        } : e
    }

    function O(e) {
        var t = U(e);
        return (t.local ? function(e) {
            return function() {
                return this.ownerDocument.createElementNS(e.space, e.local)
            }
        } : function(n) {
            return function() {
                var e = this.ownerDocument,
                    t = this.namespaceURI;
                return t === A && e.documentElement.namespaceURI === A ? e.createElement(n) : e.createElementNS(t, n)
            }
        })(t)
    }

    function N() {}

    function F(e) {
        return null == e ? N : function() {
            return this.querySelector(e)
        }
    }

    function j() {
        return []
    }

    function H(e) {
        return null == e ? j : function() {
            return this.querySelectorAll(e)
        }
    }
    var R = function(e) {
        return function() {
            return this.matches(e)
        }
    };
    if ("undefined" != typeof document) {
        var P = document.documentElement;
        if (!P.matches) {
            var L = P.webkitMatchesSelector || P.msMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector;
            R = function(e) {
                return function() {
                    return L.call(this, e)
                }
            }
        }
    }
    var I = R;

    function q(e) {
        return new Array(e.length)
    }

    function Y(e, t) {
        this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t
    }
    Y.prototype = {
        constructor: Y,
        appendChild: function(e) {
            return this._parent.insertBefore(e, this._next)
        },
        insertBefore: function(e, t) {
            return this._parent.insertBefore(e, t)
        },
        querySelector: function(e) {
            return this._parent.querySelector(e)
        },
        querySelectorAll: function(e) {
            return this._parent.querySelectorAll(e)
        }
    };
    var B = "$";

    function z(e, t, n, r, i, a) {
        for (var o, c = 0, u = t.length, f = a.length; c < f; ++c)(o = t[c]) ? (o.__data__ = a[c], r[c] = o) : n[c] = new Y(e, a[c]);
        for (; c < u; ++c)(o = t[c]) && (i[c] = o)
    }

    function V(e, t, n, r, i, a, o) {
        var c, u, f, s = {},
            l = t.length,
            d = a.length,
            h = new Array(l);
        for (c = 0; c < l; ++c)(u = t[c]) && (h[c] = f = B + o.call(u, u.__data__, c, t), f in s ? i[c] = u : s[f] = u);
        for (c = 0; c < d; ++c)(u = s[f = B + o.call(e, a[c], c, a)]) ? ((r[c] = u).__data__ = a[c], s[f] = null) : n[c] = new Y(e, a[c]);
        for (c = 0; c < l; ++c)(u = t[c]) && s[h[c]] === u && (i[c] = u)
    }

    function X(e, t) {
        return e < t ? -1 : t < e ? 1 : t <= e ? 0 : NaN
    }

    function W(e) {
        return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView
    }

    function $(e, t) {
        return e.style.getPropertyValue(t) || W(e).getComputedStyle(e, null).getPropertyValue(t)
    }

    function J(e) {
        return e.trim().split(/^|\s+/)
    }

    function Z(e) {
        return e.classList || new G(e)
    }

    function G(e) {
        this._node = e, this._names = J(e.getAttribute("class") || "")
    }

    function Q(e, t) {
        for (var n = Z(e), r = -1, i = t.length; ++r < i;) n.add(t[r])
    }

    function K(e, t) {
        for (var n = Z(e), r = -1, i = t.length; ++r < i;) n.remove(t[r])
    }

    function ee() {
        this.textContent = ""
    }

    function te() {
        this.innerHTML = ""
    }

    function ne() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function re() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function ie() {
        return null
    }

    function ae() {
        var e = this.parentNode;
        e && e.removeChild(this)
    }

    function oe() {
        return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
    }

    function ce() {
        return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
    }
    G.prototype = {
        add: function(e) {
            this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function(e) {
            var t = this._names.indexOf(e);
            0 <= t && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function(e) {
            return 0 <= this._names.indexOf(e)
        }
    };
    var ue = {};
    "undefined" != typeof document && ("onmouseenter" in document.documentElement || (ue = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }));

    function fe(n, e, t) {
        return n = se(n, e, t),
            function(e) {
                var t = e.relatedTarget;
                t && (t === this || 8 & t.compareDocumentPosition(this)) || n.call(this, e)
            }
    }

    function se(t, n, r) {
        return function(e) {
            try {
                t.call(this, this.__data__, n, r)
            } finally {}
        }
    }

    function le(a) {
        return function() {
            var e = this.__on;
            if (e) {
                for (var t, n = 0, r = -1, i = e.length; n < i; ++n) t = e[n], a.type && t.type !== a.type || t.name !== a.name ? e[++r] = t : this.removeEventListener(t.type, t.listener, t.capture);
                ++r ? e.length = r : delete this.__on
            }
        }
    }

    function de(u, f, s) {
        var l = ue.hasOwnProperty(u.type) ? fe : se;
        return function(e, t, n) {
            var r, i = this.__on,
                a = l(f, t, n);
            if (i)
                for (var o = 0, c = i.length; o < c; ++o)
                    if ((r = i[o]).type === u.type && r.name === u.name) return this.removeEventListener(r.type, r.listener, r.capture), this.addEventListener(r.type, r.listener = a, r.capture = s), void(r.value = f);
            this.addEventListener(u.type, a, s), r = {
                type: u.type,
                name: u.name,
                value: f,
                listener: a,
                capture: s
            }, i ? i.push(r) : this.__on = [r]
        }
    }

    function he(e, t, n) {
        var r = W(e),
            i = r.CustomEvent;
        "function" == typeof i ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i)
    }
    var pe = [null];

    function be(e, t) {
        this._groups = e, this._parents = t
    }

    function ge() {
        return new be([
            [document.documentElement]
        ], pe)
    }

    function ve(e) {
        return "string" == typeof e ? new be([
            [document.querySelector(e)]
        ], [document.documentElement]) : new be([
            [e]
        ], pe)
    }

    function me(e) {
        return "string" == typeof e ? new be([document.querySelectorAll(e)], [document.documentElement]) : new be([null == e ? [] : e], pe)
    }

    function ye(e, t, n) {
        e.prototype = t.prototype = n, n.constructor = e
    }

    function _e(e, t) {
        var n = Object.create(e.prototype);
        for (var r in t) n[r] = t[r];
        return n
    }

    function we() {}
    be.prototype = ge.prototype = {
        constructor: be,
        select: function(e) {
            "function" != typeof e && (e = F(e));
            for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
                for (var a, o, c = t[i], u = c.length, f = r[i] = new Array(u), s = 0; s < u; ++s)(a = c[s]) && (o = e.call(a, a.__data__, s, c)) && ("__data__" in a && (o.__data__ = a.__data__), f[s] = o);
            return new be(r, this._parents)
        },
        selectAll: function(e) {
            "function" != typeof e && (e = H(e));
            for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a)
                for (var o, c = t[a], u = c.length, f = 0; f < u; ++f)(o = c[f]) && (r.push(e.call(o, o.__data__, f, c)), i.push(o));
            return new be(r, i)
        },
        filter: function(e) {
            "function" != typeof e && (e = I(e));
            for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
                for (var a, o = t[i], c = o.length, u = r[i] = [], f = 0; f < c; ++f)(a = o[f]) && e.call(a, a.__data__, f, o) && u.push(a);
            return new be(r, this._parents)
        },
        data: function(e, t) {
            if (!e) return h = new Array(this.size()), f = -1, this.each(function(e) {
                h[++f] = e
            }), h;
            var n = t ? V : z,
                r = this._parents,
                i = this._groups;
            "function" != typeof e && (e = function(e) {
                return function() {
                    return e
                }
            }(e));
            for (var a = i.length, o = new Array(a), c = new Array(a), u = new Array(a), f = 0; f < a; ++f) {
                var s = r[f],
                    l = i[f],
                    d = l.length,
                    h = e.call(s, s && s.__data__, f, r),
                    p = h.length,
                    b = c[f] = new Array(p),
                    g = o[f] = new Array(p);
                n(s, l, b, g, u[f] = new Array(d), h, t);
                for (var v, m, y = 0, _ = 0; y < p; ++y)
                    if (v = b[y]) {
                        for (_ <= y && (_ = y + 1); !(m = g[_]) && ++_ < p;);
                        v._next = m || null
                    }
            }
            return (o = new be(o, r))._enter = c, o._exit = u, o
        },
        enter: function() {
            return new be(this._enter || this._groups.map(q), this._parents)
        },
        exit: function() {
            return new be(this._exit || this._groups.map(q), this._parents)
        },
        merge: function(e) {
            for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = new Array(r), c = 0; c < a; ++c)
                for (var u, f = t[c], s = n[c], l = f.length, d = o[c] = new Array(l), h = 0; h < l; ++h)(u = f[h] || s[h]) && (d[h] = u);
            for (; c < r; ++c) o[c] = t[c];
            return new be(o, this._parents)
        },
        order: function() {
            for (var e = this._groups, t = -1, n = e.length; ++t < n;)
                for (var r, i = e[t], a = i.length - 1, o = i[a]; 0 <= --a;)(r = i[a]) && (o && o !== r.nextSibling && o.parentNode.insertBefore(r, o), o = r);
            return this
        },
        sort: function(n) {
            function e(e, t) {
                return e && t ? n(e.__data__, t.__data__) : !e - !t
            }
            n || (n = X);
            for (var t = this._groups, r = t.length, i = new Array(r), a = 0; a < r; ++a) {
                for (var o, c = t[a], u = c.length, f = i[a] = new Array(u), s = 0; s < u; ++s)(o = c[s]) && (f[s] = o);
                f.sort(e)
            }
            return new be(i, this._parents).order()
        },
        call: function() {
            var e = arguments[0];
            return arguments[0] = this, e.apply(null, arguments), this
        },
        nodes: function() {
            var e = new Array(this.size()),
                t = -1;
            return this.each(function() {
                e[++t] = this
            }), e
        },
        node: function() {
            for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
                for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
                    var o = r[i];
                    if (o) return o
                }
            return null
        },
        size: function() {
            var e = 0;
            return this.each(function() {
                ++e
            }), e
        },
        empty: function() {
            return !this.node()
        },
        each: function(e) {
            for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
                for (var i, a = t[n], o = 0, c = a.length; o < c; ++o)(i = a[o]) && e.call(i, i.__data__, o, a);
            return this
        },
        attr: function(e, t) {
            var n = U(e);
            if (arguments.length < 2) {
                var r = this.node();
                return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n)
            }
            return this.each((null == t ? n.local ? function(e) {
                return function() {
                    this.removeAttributeNS(e.space, e.local)
                }
            } : function(e) {
                return function() {
                    this.removeAttribute(e)
                }
            } : "function" == typeof t ? n.local ? function(t, n) {
                return function() {
                    var e = n.apply(this, arguments);
                    null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
                }
            } : function(t, n) {
                return function() {
                    var e = n.apply(this, arguments);
                    null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
                }
            } : n.local ? function(e, t) {
                return function() {
                    this.setAttributeNS(e.space, e.local, t)
                }
            } : function(e, t) {
                return function() {
                    this.setAttribute(e, t)
                }
            })(n, t))
        },
        style: function(e, t, n) {
            return 1 < arguments.length ? this.each((null == t ? function(e) {
                return function() {
                    this.style.removeProperty(e)
                }
            } : "function" == typeof t ? function(t, n, r) {
                return function() {
                    var e = n.apply(this, arguments);
                    null == e ? this.style.removeProperty(t) : this.style.setProperty(t, e, r)
                }
            } : function(e, t, n) {
                return function() {
                    this.style.setProperty(e, t, n)
                }
            })(e, t, null == n ? "" : n)) : $(this.node(), e)
        },
        property: function(e, t) {
            return 1 < arguments.length ? this.each((null == t ? function(e) {
                return function() {
                    delete this[e]
                }
            } : "function" == typeof t ? function(t, n) {
                return function() {
                    var e = n.apply(this, arguments);
                    null == e ? delete this[t] : this[t] = e
                }
            } : function(e, t) {
                return function() {
                    this[e] = t
                }
            })(e, t)) : this.node()[e]
        },
        classed: function(e, t) {
            var n = J(e + "");
            if (arguments.length < 2) {
                for (var r = Z(this.node()), i = -1, a = n.length; ++i < a;)
                    if (!r.contains(n[i])) return !1;
                return !0
            }
            return this.each(("function" == typeof t ? function(e, t) {
                return function() {
                    (t.apply(this, arguments) ? Q : K)(this, e)
                }
            } : t ? function(e) {
                return function() {
                    Q(this, e)
                }
            } : function(e) {
                return function() {
                    K(this, e)
                }
            })(n, t))
        },
        text: function(e) {
            return arguments.length ? this.each(null == e ? ee : ("function" == typeof e ? function(t) {
                return function() {
                    var e = t.apply(this, arguments);
                    this.textContent = null == e ? "" : e
                }
            } : function(e) {
                return function() {
                    this.textContent = e
                }
            })(e)) : this.node().textContent
        },
        html: function(e) {
            return arguments.length ? this.each(null == e ? te : ("function" == typeof e ? function(t) {
                return function() {
                    var e = t.apply(this, arguments);
                    this.innerHTML = null == e ? "" : e
                }
            } : function(e) {
                return function() {
                    this.innerHTML = e
                }
            })(e)) : this.node().innerHTML
        },
        raise: function() {
            return this.each(ne)
        },
        lower: function() {
            return this.each(re)
        },
        append: function(e) {
            var t = "function" == typeof e ? e : O(e);
            return this.select(function() {
                return this.appendChild(t.apply(this, arguments))
            })
        },
        insert: function(e, t) {
            var n = "function" == typeof e ? e : O(e),
                r = null == t ? ie : "function" == typeof t ? t : F(t);
            return this.select(function() {
                return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null)
            })
        },
        remove: function() {
            return this.each(ae)
        },
        clone: function(e) {
            return this.select(e ? ce : oe)
        },
        datum: function(e) {
            return arguments.length ? this.property("__data__", e) : this.node().__data__
        },
        on: function(e, t, n) {
            var r, i, a = function(e) {
                    return e.trim().split(/^|\s+/).map(function(e) {
                        var t = "",
                            n = e.indexOf(".");
                        return 0 <= n && (t = e.slice(n + 1), e = e.slice(0, n)), {
                            type: e,
                            name: t
                        }
                    })
                }(e + ""),
                o = a.length;
            if (!(arguments.length < 2)) {
                for (c = t ? de : le, null == n && (n = !1), r = 0; r < o; ++r) this.each(c(a[r], t, n));
                return this
            }
            var c = this.node().__on;
            if (c)
                for (var u, f = 0, s = c.length; f < s; ++f)
                    for (r = 0, u = c[f]; r < o; ++r)
                        if ((i = a[r]).type === u.type && i.name === u.name) return u.value
        },
        dispatch: function(e, t) {
            return this.each(("function" == typeof t ? function(e, t) {
                return function() {
                    return he(this, e, t.apply(this, arguments))
                }
            } : function(e, t) {
                return function() {
                    return he(this, e, t)
                }
            })(e, t))
        }
    };
    var xe = 1 / .7,
        Te = "\\s*([+-]?\\d+)\\s*",
        Se = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        ke = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Ce = /^#([0-9a-f]{3})$/,
        Me = /^#([0-9a-f]{6})$/,
        Ee = new RegExp("^rgb\\(" + [Te, Te, Te] + "\\)$"),
        Ae = new RegExp("^rgb\\(" + [ke, ke, ke] + "\\)$"),
        De = new RegExp("^rgba\\(" + [Te, Te, Te, Se] + "\\)$"),
        Ue = new RegExp("^rgba\\(" + [ke, ke, ke, Se] + "\\)$"),
        Oe = new RegExp("^hsl\\(" + [Se, ke, ke] + "\\)$"),
        Ne = new RegExp("^hsla\\(" + [Se, ke, ke, Se] + "\\)$"),
        Fe = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function je(e) {
        var t;
        return e = (e + "").trim().toLowerCase(), (t = Ce.exec(e)) ? new Ie((t = parseInt(t[1], 16)) >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, (15 & t) << 4 | 15 & t, 1) : (t = Me.exec(e)) ? He(parseInt(t[1], 16)) : (t = Ee.exec(e)) ? new Ie(t[1], t[2], t[3], 1) : (t = Ae.exec(e)) ? new Ie(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, 1) : (t = De.exec(e)) ? Re(t[1], t[2], t[3], t[4]) : (t = Ue.exec(e)) ? Re(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = Oe.exec(e)) ? Ye(t[1], t[2] / 100, t[3] / 100, 1) : (t = Ne.exec(e)) ? Ye(t[1], t[2] / 100, t[3] / 100, t[4]) : Fe.hasOwnProperty(e) ? He(Fe[e]) : "transparent" === e ? new Ie(NaN, NaN, NaN, 0) : null
    }

    function He(e) {
        return new Ie(e >> 16 & 255, e >> 8 & 255, 255 & e, 1)
    }

    function Re(e, t, n, r) {
        return r <= 0 && (e = t = n = NaN), new Ie(e, t, n, r)
    }

    function Pe(e) {
        return e instanceof we || (e = je(e)), e ? new Ie((e = e.rgb()).r, e.g, e.b, e.opacity) : new Ie
    }

    function Le(e, t, n, r) {
        return 1 === arguments.length ? Pe(e) : new Ie(e, t, n, null == r ? 1 : r)
    }

    function Ie(e, t, n, r) {
        this.r = +e, this.g = +t, this.b = +n, this.opacity = +r
    }

    function qe(e) {
        return ((e = Math.max(0, Math.min(255, Math.round(e) || 0))) < 16 ? "0" : "") + e.toString(16)
    }

    function Ye(e, t, n, r) {
        return r <= 0 ? e = t = n = NaN : n <= 0 || 1 <= n ? e = t = NaN : t <= 0 && (e = NaN), new Be(e, t, n, r)
    }

    function Be(e, t, n, r) {
        this.h = +e, this.s = +t, this.l = +n, this.opacity = +r
    }

    function ze(e, t, n) {
        return 255 * (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t)
    }
    ye(we, je, {
        displayable: function() {
            return this.rgb().displayable()
        },
        hex: function() {
            return this.rgb().hex()
        },
        toString: function() {
            return this.rgb() + ""
        }
    }), ye(Ie, Le, _e(we, {
        brighter: function(e) {
            return e = null == e ? xe : Math.pow(xe, e), new Ie(this.r * e, this.g * e, this.b * e, this.opacity)
        },
        darker: function(e) {
            return e = null == e ? .7 : Math.pow(.7, e), new Ie(this.r * e, this.g * e, this.b * e, this.opacity)
        },
        rgb: function() {
            return this
        },
        displayable: function() {
            return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: function() {
            return "#" + qe(this.r) + qe(this.g) + qe(this.b)
        },
        toString: function() {
            var e = this.opacity;
            return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === e ? ")" : ", " + e + ")")
        }
    })), ye(Be, function(e, t, n, r) {
        return 1 === arguments.length ? function(e) {
            if (e instanceof Be) return new Be(e.h, e.s, e.l, e.opacity);
            if (e instanceof we || (e = je(e)), !e) return new Be;
            if (e instanceof Be) return e;
            var t = (e = e.rgb()).r / 255,
                n = e.g / 255,
                r = e.b / 255,
                i = Math.min(t, n, r),
                a = Math.max(t, n, r),
                o = NaN,
                c = a - i,
                u = (a + i) / 2;
            return c ? (o = t === a ? (n - r) / c + 6 * (n < r) : n === a ? (r - t) / c + 2 : (t - n) / c + 4, c /= u < .5 ? a + i : 2 - a - i, o *= 60) : c = 0 < u && u < 1 ? 0 : o, new Be(o, c, u, e.opacity)
        }(e) : new Be(e, t, n, null == r ? 1 : r)
    }, _e(we, {
        brighter: function(e) {
            return e = null == e ? xe : Math.pow(xe, e), new Be(this.h, this.s, this.l * e, this.opacity)
        },
        darker: function(e) {
            return e = null == e ? .7 : Math.pow(.7, e), new Be(this.h, this.s, this.l * e, this.opacity)
        },
        rgb: function() {
            var e = this.h % 360 + 360 * (this.h < 0),
                t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
                n = this.l,
                r = n + (n < .5 ? n : 1 - n) * t,
                i = 2 * n - r;
            return new Ie(ze(240 <= e ? e - 240 : 120 + e, i, r), ze(e, i, r), ze(e < 120 ? 240 + e : e - 120, i, r), this.opacity)
        },
        displayable: function() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        }
    }));
    var Ve = Math.PI / 180,
        Xe = 180 / Math.PI,
        We = .96422,
        $e = 1,
        Je = .82521,
        Ze = 4 / 29,
        Ge = 6 / 29,
        Qe = 3 * Ge * Ge,
        Ke = Ge * Ge * Ge;

    function et(e) {
        if (e instanceof tt) return new tt(e.l, e.a, e.b, e.opacity);
        if (e instanceof ot) {
            if (isNaN(e.h)) return new tt(e.l, 0, 0, e.opacity);
            var t = e.h * Ve;
            return new tt(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity)
        }
        e instanceof Ie || (e = Pe(e));
        var n, r, i = at(e.r),
            a = at(e.g),
            o = at(e.b),
            c = nt((.2225045 * i + .7168786 * a + .0606169 * o) / $e);
        return i === a && a === o ? n = r = c : (n = nt((.4360747 * i + .3850649 * a + .1430804 * o) / We), r = nt((.0139322 * i + .0971045 * a + .7141733 * o) / Je)), new tt(116 * c - 16, 500 * (n - c), 200 * (c - r), e.opacity)
    }

    function tt(e, t, n, r) {
        this.l = +e, this.a = +t, this.b = +n, this.opacity = +r
    }

    function nt(e) {
        return Ke < e ? Math.pow(e, 1 / 3) : e / Qe + Ze
    }

    function rt(e) {
        return Ge < e ? e * e * e : Qe * (e - Ze)
    }

    function it(e) {
        return 255 * (e <= .0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055)
    }

    function at(e) {
        return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
    }

    function ot(e, t, n, r) {
        this.h = +e, this.c = +t, this.l = +n, this.opacity = +r
    }
    ye(tt, function(e, t, n, r) {
        return 1 === arguments.length ? et(e) : new tt(e, t, n, null == r ? 1 : r)
    }, _e(we, {
        brighter: function(e) {
            return new tt(this.l + 18 * (null == e ? 1 : e), this.a, this.b, this.opacity)
        },
        darker: function(e) {
            return new tt(this.l - 18 * (null == e ? 1 : e), this.a, this.b, this.opacity)
        },
        rgb: function() {
            var e = (this.l + 16) / 116,
                t = isNaN(this.a) ? e : e + this.a / 500,
                n = isNaN(this.b) ? e : e - this.b / 200;
            return new Ie(it(3.1338561 * (t = We * rt(t)) - 1.6168667 * (e = $e * rt(e)) - .4906146 * (n = Je * rt(n))), it(-.9787684 * t + 1.9161415 * e + .033454 * n), it(.0719453 * t - .2289914 * e + 1.4052427 * n), this.opacity)
        }
    })), ye(ot, function(e, t, n, r) {
        return 1 === arguments.length ? function(e) {
            if (e instanceof ot) return new ot(e.h, e.c, e.l, e.opacity);
            if (e instanceof tt || (e = et(e)), 0 === e.a && 0 === e.b) return new ot(NaN, 0, e.l, e.opacity);
            var t = Math.atan2(e.b, e.a) * Xe;
            return new ot(t < 0 ? 360 + t : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity)
        }(e) : new ot(e, t, n, null == r ? 1 : r)
    }, _e(we, {
        brighter: function(e) {
            return new ot(this.h, this.c, this.l + 18 * (null == e ? 1 : e), this.opacity)
        },
        darker: function(e) {
            return new ot(this.h, this.c, this.l - 18 * (null == e ? 1 : e), this.opacity)
        },
        rgb: function() {
            return et(this).rgb()
        }
    }));
    var ct = 1.78277,
        ut = -.29227,
        ft = -.90649,
        st = 1.97294,
        lt = st * ft,
        dt = st * ct,
        ht = ct * ut - -.14861 * ft;

    function pt(e, t, n, r) {
        return 1 === arguments.length ? function(e) {
            if (e instanceof bt) return new bt(e.h, e.s, e.l, e.opacity);
            e instanceof Ie || (e = Pe(e));
            var t = e.r / 255,
                n = e.g / 255,
                r = e.b / 255,
                i = (ht * r + lt * t - dt * n) / (ht + lt - dt),
                a = r - i,
                o = (st * (n - i) - ut * a) / ft,
                c = Math.sqrt(o * o + a * a) / (st * i * (1 - i)),
                u = c ? Math.atan2(o, a) * Xe - 120 : NaN;
            return new bt(u < 0 ? u + 360 : u, c, i, e.opacity)
        }(e) : new bt(e, t, n, null == r ? 1 : r)
    }

    function bt(e, t, n, r) {
        this.h = +e, this.s = +t, this.l = +n, this.opacity = +r
    }

    function gt(e) {
        return function() {
            return e
        }
    }

    function vt(t, n) {
        return function(e) {
            return t + e * n
        }
    }

    function mt(n) {
        return 1 == (n = +n) ? yt : function(e, t) {
            return t - e ? function(t, n, r) {
                return t = Math.pow(t, r), n = Math.pow(n, r) - t, r = 1 / r,
                    function(e) {
                        return Math.pow(t + e * n, r)
                    }
            }(e, t, n) : gt(isNaN(e) ? t : e)
        }
    }

    function yt(e, t) {
        var n = t - e;
        return n ? vt(e, n) : gt(isNaN(e) ? t : e)
    }
    ye(bt, pt, _e(we, {
        brighter: function(e) {
            return e = null == e ? xe : Math.pow(xe, e), new bt(this.h, this.s, this.l * e, this.opacity)
        },
        darker: function(e) {
            return e = null == e ? .7 : Math.pow(.7, e), new bt(this.h, this.s, this.l * e, this.opacity)
        },
        rgb: function() {
            var e = isNaN(this.h) ? 0 : (this.h + 120) * Ve,
                t = +this.l,
                n = isNaN(this.s) ? 0 : this.s * t * (1 - t),
                r = Math.cos(e),
                i = Math.sin(e);
            return new Ie(255 * (t + n * (-.14861 * r + ct * i)), 255 * (t + n * (ut * r + ft * i)), 255 * (t + st * r * n), this.opacity)
        }
    }));
    var _t = function e(t) {
        var o = mt(t);

        function n(t, e) {
            var n = o((t = Le(t)).r, (e = Le(e)).r),
                r = o(t.g, e.g),
                i = o(t.b, e.b),
                a = yt(t.opacity, e.opacity);
            return function(e) {
                return t.r = n(e), t.g = r(e), t.b = i(e), t.opacity = a(e), t + ""
            }
        }
        return n.gamma = e, n
    }(1);
    var wt, xt = (wt = function(o) {
        var c = o.length - 1;
        return function(e) {
            var t = e <= 0 ? e = 0 : 1 <= e ? c - (e = 1) : Math.floor(e * c),
                n = o[t],
                r = o[t + 1],
                i = 0 < t ? o[t - 1] : 2 * n - r,
                a = t < c - 1 ? o[t + 2] : 2 * r - n;
            return function(e, t, n, r, i) {
                var a = e * e,
                    o = a * e;
                return ((1 - 3 * e + 3 * a - o) * t + (4 - 6 * a + 3 * o) * n + (1 + 3 * e + 3 * a - 3 * o) * r + o * i) / 6
            }((e - t / c) * c, i, n, r, a)
        }
    }, function(e) {
        var t, n, r = e.length,
            i = new Array(r),
            a = new Array(r),
            o = new Array(r);
        for (t = 0; t < r; ++t) n = Le(e[t]), i[t] = n.r || 0, a[t] = n.g || 0, o[t] = n.b || 0;
        return i = wt(i), a = wt(a), o = wt(o), n.opacity = 1,
            function(e) {
                return n.r = i(e), n.g = a(e), n.b = o(e), n + ""
            }
    });

    function Tt(t, n) {
        return n -= t = +t,
            function(e) {
                return t + n * e
            }
    }
    var St = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        kt = new RegExp(St.source, "g");
    var Ct, Mt, Et, At, Dt = 180 / Math.PI,
        Ut = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1
        };

    function Ot(e, t, n, r, i, a) {
        var o, c, u;
        return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (u = e * n + t * r) && (n -= e * u, r -= t * u), (c = Math.sqrt(n * n + r * r)) && (n /= c, r /= c, u /= c), e * r < t * n && (e = -e, t = -t, u = -u, o = -o), {
            translateX: i,
            translateY: a,
            rotate: Math.atan2(t, e) * Dt,
            skewX: Math.atan(u) * Dt,
            scaleX: o,
            scaleY: c
        }
    }

    function Nt(n, c, u, o) {
        function f(e) {
            return e.length ? e.pop() + " " : ""
        }
        return function(e, t) {
            var i = [],
                a = [];
            return e = n(e), t = n(t),
                function(e, t, n, r, i, a) {
                    if (e !== n || t !== r) {
                        var o = i.push("translate(", null, c, null, u);
                        a.push({
                            i: o - 4,
                            x: Tt(e, n)
                        }, {
                            i: o - 2,
                            x: Tt(t, r)
                        })
                    } else(n || r) && i.push("translate(" + n + c + r + u)
                }(e.translateX, e.translateY, t.translateX, t.translateY, i, a),
                function(e, t, n, r) {
                    e !== t ? (180 < e - t ? t += 360 : 180 < t - e && (e += 360), r.push({
                        i: n.push(f(n) + "rotate(", null, o) - 2,
                        x: Tt(e, t)
                    })) : t && n.push(f(n) + "rotate(" + t + o)
                }(e.rotate, t.rotate, i, a),
                function(e, t, n, r) {
                    e !== t ? r.push({
                        i: n.push(f(n) + "skewX(", null, o) - 2,
                        x: Tt(e, t)
                    }) : t && n.push(f(n) + "skewX(" + t + o)
                }(e.skewX, t.skewX, i, a),
                function(e, t, n, r, i, a) {
                    if (e !== n || t !== r) {
                        var o = i.push(f(i) + "scale(", null, ",", null, ")");
                        a.push({
                            i: o - 4,
                            x: Tt(e, n)
                        }, {
                            i: o - 2,
                            x: Tt(t, r)
                        })
                    } else 1 === n && 1 === r || i.push(f(i) + "scale(" + n + "," + r + ")")
                }(e.scaleX, e.scaleY, t.scaleX, t.scaleY, i, a), e = t = null,
                function(e) {
                    for (var t, n = -1, r = a.length; ++n < r;) i[(t = a[n]).i] = t.x(e);
                    return i.join("")
                }
        }
    }
    var Ft = Nt(function(e) {
            return "none" === e ? Ut : (Ct || (Ct = document.createElement("DIV"), Mt = document.documentElement, Et = document.defaultView), Ct.style.transform = e, e = Et.getComputedStyle(Mt.appendChild(Ct), null).getPropertyValue("transform"), Mt.removeChild(Ct), Ot(+(e = e.slice(7, -1).split(","))[0], +e[1], +e[2], +e[3], +e[4], +e[5]))
        }, "px, ", "px)", "deg)"),
        jt = Nt(function(e) {
            return null == e ? Ut : (At || (At = document.createElementNS("http://www.w3.org/2000/svg", "g")), At.setAttribute("transform", e), (e = At.transform.baseVal.consolidate()) ? Ot((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f) : Ut)
        }, ", ", ")", ")");
    Math.SQRT2;

    function Ht(c) {
        return function e(o) {
            function t(t, e) {
                var n = c((t = pt(t)).h, (e = pt(e)).h),
                    r = yt(t.s, e.s),
                    i = yt(t.l, e.l),
                    a = yt(t.opacity, e.opacity);
                return function(e) {
                    return t.h = n(e), t.s = r(e), t.l = i(Math.pow(e, o)), t.opacity = a(e), t + ""
                }
            }
            return o = +o, t.gamma = e, t
        }(1)
    }
    Ht(function(e, t) {
        var n = t - e;
        return n ? vt(e, 180 < n || n < -180 ? n - 360 * Math.round(n / 360) : n) : gt(isNaN(e) ? t : e)
    });
    var Rt, Pt, Lt = Ht(yt),
        It = 0,
        qt = 0,
        Yt = 0,
        Bt = 1e3,
        zt = 0,
        Vt = 0,
        Xt = 0,
        Wt = "object" == typeof performance && performance.now ? performance : Date,
        $t = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
            setTimeout(e, 17)
        };

    function Jt() {
        return Vt || ($t(Zt), Vt = Wt.now() + Xt)
    }

    function Zt() {
        Vt = 0
    }

    function Gt() {
        this._call = this._time = this._next = null
    }

    function Qt(e, t, n) {
        var r = new Gt;
        return r.restart(e, t, n), r
    }

    function Kt() {
        Vt = (zt = Wt.now()) + Xt, It = qt = 0;
        try {
            ! function() {
                Jt(), ++It;
                for (var e, t = Rt; t;) 0 <= (e = Vt - t._time) && t._call.call(null, e), t = t._next;
                --It
            }()
        } finally {
            It = 0,
                function() {
                    var e, t, n = Rt,
                        r = 1 / 0;
                    for (; n;) n = n._call ? (r > n._time && (r = n._time), (e = n)._next) : (t = n._next, n._next = null, e ? e._next = t : Rt = t);
                    Pt = e, tn(r)
                }(), Vt = 0
        }
    }

    function en() {
        var e = Wt.now(),
            t = e - zt;
        Bt < t && (Xt -= t, zt = e)
    }

    function tn(e) {
        It || (qt && (qt = clearTimeout(qt)), 24 < e - Vt ? (e < 1 / 0 && (qt = setTimeout(Kt, e - Wt.now() - Xt)), Yt && (Yt = clearInterval(Yt))) : (Yt || (zt = Wt.now(), Yt = setInterval(en, Bt)), It = 1, $t(Kt)))
    }

    function nn(t, n, e) {
        var r = new Gt;
        return n = null == n ? 0 : +n, r.restart(function(e) {
            r.stop(), t(e + n)
        }, n, e), r
    }
    Gt.prototype = Qt.prototype = {
        constructor: Gt,
        restart: function(e, t, n) {
            if ("function" != typeof e) throw new TypeError("callback is not a function");
            n = (null == n ? Jt() : +n) + (null == t ? 0 : +t), this._next || Pt === this || (Pt ? Pt._next = this : Rt = this, Pt = this), this._call = e, this._time = n, tn()
        },
        stop: function() {
            this._call && (this._call = null, this._time = 1 / 0, tn())
        }
    };
    var rn = b("start", "end", "interrupt"),
        an = [],
        on = 0,
        cn = 1,
        un = 2,
        fn = 3,
        sn = 4,
        ln = 5,
        dn = 6;

    function hn(e, t, n, r, i, a) {
        var o = e.__transition;
        if (o) {
            if (n in o) return
        } else e.__transition = {};
        ! function(a, o, c) {
            var u, f = a.__transition;

            function s(e) {
                var t, n, r, i;
                if (c.state !== cn) return d();
                for (t in f)
                    if ((i = f[t]).name === c.name) {
                        if (i.state === fn) return nn(s);
                        i.state === sn ? (i.state = dn, i.timer.stop(), i.on.call("interrupt", a, a.__data__, i.index, i.group), delete f[t]) : +t < o && (i.state = dn, i.timer.stop(), delete f[t])
                    }
                if (nn(function() {
                        c.state === fn && (c.state = sn, c.timer.restart(l, c.delay, c.time), l(e))
                    }), c.state = un, c.on.call("start", a, a.__data__, c.index, c.group), c.state === un) {
                    for (c.state = fn, u = new Array(r = c.tween.length), t = 0, n = -1; t < r; ++t)(i = c.tween[t].value.call(a, a.__data__, c.index, c.group)) && (u[++n] = i);
                    u.length = n + 1
                }
            }

            function l(e) {
                for (var t = e < c.duration ? c.ease.call(null, e / c.duration) : (c.timer.restart(d), c.state = ln, 1), n = -1, r = u.length; ++n < r;) u[n].call(null, t);
                c.state === ln && (c.on.call("end", a, a.__data__, c.index, c.group), d())
            }

            function d() {
                for (var e in c.state = dn, c.timer.stop(), delete f[o], f) return;
                delete a.__transition
            }(f[o] = c).timer = Qt(function(e) {
                c.state = cn, c.timer.restart(s, c.delay, c.time), c.delay <= e && s(e - c.delay)
            }, 0, c.time)
        }(e, n, {
            name: t,
            index: r,
            group: i,
            on: rn,
            tween: an,
            time: a.time,
            delay: a.delay,
            duration: a.duration,
            ease: a.ease,
            timer: null,
            state: on
        })
    }

    function pn(e, t) {
        var n = gn(e, t);
        if (n.state > on) throw new Error("too late; already scheduled");
        return n
    }

    function bn(e, t) {
        var n = gn(e, t);
        if (n.state > un) throw new Error("too late; already started");
        return n
    }

    function gn(e, t) {
        var n = e.__transition;
        if (!n || !(n = n[t])) throw new Error("transition not found");
        return n
    }

    function vn(e, t, n) {
        var r = e._id;
        return e.each(function() {
                var e = bn(this, r);
                (e.value || (e.value = {}))[t] = n.apply(this, arguments)
            }),
            function(e) {
                return gn(e, r).value[t]
            }
    }

    function mn(e, t) {
        var n;
        return ("number" == typeof t ? Tt : t instanceof je ? _t : (n = je(t)) ? (t = n, _t) : function(e, r) {
            var t, n, i, a = St.lastIndex = kt.lastIndex = 0,
                o = -1,
                c = [],
                u = [];
            for (e += "", r += "";
                (t = St.exec(e)) && (n = kt.exec(r));)(i = n.index) > a && (i = r.slice(a, i), c[o] ? c[o] += i : c[++o] = i), (t = t[0]) === (n = n[0]) ? c[o] ? c[o] += n : c[++o] = n : (c[++o] = null, u.push({
                i: o,
                x: Tt(t, n)
            })), a = kt.lastIndex;
            return a < r.length && (i = r.slice(a), c[o] ? c[o] += i : c[++o] = i), c.length < 2 ? u[0] ? function(t) {
                return function(e) {
                    return t(e) + ""
                }
            }(u[0].x) : function(e) {
                return function() {
                    return e
                }
            }(r) : (r = u.length, function(e) {
                for (var t, n = 0; n < r; ++n) c[(t = u[n]).i] = t.x(e);
                return c.join("")
            })
        })(e, t)
    }
    var yn = ge.prototype.constructor;
    var _n = 0;

    function wn(e, t, n, r) {
        this._groups = e, this._parents = t, this._name = n, this._id = r
    }

    function xn() {
        return ++_n
    }
    var Tn = ge.prototype;
    wn.prototype = function(e) {
        return ge().transition(e)
    }.prototype = {
        constructor: wn,
        select: function(e) {
            var t = this._name,
                n = this._id;
            "function" != typeof e && (e = F(e));
            for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
                for (var c, u, f = r[o], s = f.length, l = a[o] = new Array(s), d = 0; d < s; ++d)(c = f[d]) && (u = e.call(c, c.__data__, d, f)) && ("__data__" in c && (u.__data__ = c.__data__), l[d] = u, hn(l[d], t, n, d, l, gn(c, n)));
            return new wn(a, this._parents, t, n)
        },
        selectAll: function(e) {
            var t = this._name,
                n = this._id;
            "function" != typeof e && (e = H(e));
            for (var r = this._groups, i = r.length, a = [], o = [], c = 0; c < i; ++c)
                for (var u, f = r[c], s = f.length, l = 0; l < s; ++l)
                    if (u = f[l]) {
                        for (var d, h = e.call(u, u.__data__, l, f), p = gn(u, n), b = 0, g = h.length; b < g; ++b)(d = h[b]) && hn(d, t, n, b, h, p);
                        a.push(h), o.push(u)
                    }
            return new wn(a, o, t, n)
        },
        filter: function(e) {
            "function" != typeof e && (e = I(e));
            for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
                for (var a, o = t[i], c = o.length, u = r[i] = [], f = 0; f < c; ++f)(a = o[f]) && e.call(a, a.__data__, f, o) && u.push(a);
            return new wn(r, this._parents, this._name, this._id)
        },
        merge: function(e) {
            if (e._id !== this._id) throw new Error;
            for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = new Array(r), c = 0; c < a; ++c)
                for (var u, f = t[c], s = n[c], l = f.length, d = o[c] = new Array(l), h = 0; h < l; ++h)(u = f[h] || s[h]) && (d[h] = u);
            for (; c < r; ++c) o[c] = t[c];
            return new wn(o, this._parents, this._name, this._id)
        },
        selection: function() {
            return new yn(this._groups, this._parents)
        },
        transition: function() {
            for (var e = this._name, t = this._id, n = xn(), r = this._groups, i = r.length, a = 0; a < i; ++a)
                for (var o, c = r[a], u = c.length, f = 0; f < u; ++f)
                    if (o = c[f]) {
                        var s = gn(o, t);
                        hn(o, e, n, f, c, {
                            time: s.time + s.delay + s.duration,
                            delay: 0,
                            duration: s.duration,
                            ease: s.ease
                        })
                    }
            return new wn(r, this._parents, e, n)
        },
        call: Tn.call,
        nodes: Tn.nodes,
        node: Tn.node,
        size: Tn.size,
        empty: Tn.empty,
        each: Tn.each,
        on: function(e, t) {
            var n = this._id;
            return arguments.length < 2 ? gn(this.node(), n).on.on(e) : this.each(function(n, r, i) {
                var a, o, c = function(e) {
                    return (e + "").trim().split(/^|\s+/).every(function(e) {
                        var t = e.indexOf(".");
                        return 0 <= t && (e = e.slice(0, t)), !e || "start" === e
                    })
                }(r) ? pn : bn;
                return function() {
                    var e = c(this, n),
                        t = e.on;
                    t !== a && (o = (a = t).copy()).on(r, i), e.on = o
                }
            }(n, e, t))
        },
        attr: function(e, t) {
            var n = U(e),
                r = "transform" === n ? jt : mn;
            return this.attrTween(e, "function" == typeof t ? (n.local ? function(n, r, i) {
                var a, o, c;
                return function() {
                    var e, t = i(this);
                    if (null != t) return (e = this.getAttributeNS(n.space, n.local)) === t ? null : e === a && t === o ? c : c = r(a = e, o = t);
                    this.removeAttributeNS(n.space, n.local)
                }
            } : function(n, r, i) {
                var a, o, c;
                return function() {
                    var e, t = i(this);
                    if (null != t) return (e = this.getAttribute(n)) === t ? null : e === a && t === o ? c : c = r(a = e, o = t);
                    this.removeAttribute(n)
                }
            })(n, r, vn(this, "attr." + e, t)) : null == t ? (n.local ? function(e) {
                return function() {
                    this.removeAttributeNS(e.space, e.local)
                }
            } : function(e) {
                return function() {
                    this.removeAttribute(e)
                }
            })(n) : (n.local ? function(t, n, r) {
                var i, a;
                return function() {
                    var e = this.getAttributeNS(t.space, t.local);
                    return e === r ? null : e === i ? a : a = n(i = e, r)
                }
            } : function(t, n, r) {
                var i, a;
                return function() {
                    var e = this.getAttribute(t);
                    return e === r ? null : e === i ? a : a = n(i = e, r)
                }
            })(n, r, t + ""))
        },
        attrTween: function(e, t) {
            var n = "attr." + e;
            if (arguments.length < 2) return (n = this.tween(n)) && n._value;
            if (null == t) return this.tween(n, null);
            if ("function" != typeof t) throw new Error;
            var r = U(e);
            return this.tween(n, (r.local ? function(r, e) {
                function t() {
                    var t = this,
                        n = e.apply(t, arguments);
                    return n && function(e) {
                        t.setAttributeNS(r.space, r.local, n(e))
                    }
                }
                return t._value = e, t
            } : function(r, e) {
                function t() {
                    var t = this,
                        n = e.apply(t, arguments);
                    return n && function(e) {
                        t.setAttribute(r, n(e))
                    }
                }
                return t._value = e, t
            })(r, t))
        },
        style: function(e, t, n) {
            var r = "transform" == (e += "") ? Ft : mn;
            return null == t ? this.styleTween(e, function(n, r) {
                var i, a, o;
                return function() {
                    var e = $(this, n),
                        t = (this.style.removeProperty(n), $(this, n));
                    return e === t ? null : e === i && t === a ? o : o = r(i = e, a = t)
                }
            }(e, r)).on("end.style." + e, function(e) {
                return function() {
                    this.style.removeProperty(e)
                }
            }(e)) : this.styleTween(e, "function" == typeof t ? function(n, r, i) {
                var a, o, c;
                return function() {
                    var e = $(this, n),
                        t = i(this);
                    return null == t && (this.style.removeProperty(n), t = $(this, n)), e === t ? null : e === a && t === o ? c : c = r(a = e, o = t)
                }
            }(e, r, vn(this, "style." + e, t)) : function(t, n, r) {
                var i, a;
                return function() {
                    var e = $(this, t);
                    return e === r ? null : e === i ? a : a = n(i = e, r)
                }
            }(e, r, t + ""), n)
        },
        styleTween: function(e, t, n) {
            var r = "style." + (e += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == t) return this.tween(r, null);
            if ("function" != typeof t) throw new Error;
            return this.tween(r, function(r, e, i) {
                function t() {
                    var t = this,
                        n = e.apply(t, arguments);
                    return n && function(e) {
                        t.style.setProperty(r, n(e), i)
                    }
                }
                return t._value = e, t
            }(e, t, null == n ? "" : n))
        },
        text: function(e) {
            return this.tween("text", "function" == typeof e ? function(t) {
                return function() {
                    var e = t(this);
                    this.textContent = null == e ? "" : e
                }
            }(vn(this, "text", e)) : function(e) {
                return function() {
                    this.textContent = e
                }
            }(null == e ? "" : e + ""))
        },
        remove: function() {
            return this.on("end.remove", function(n) {
                return function() {
                    var e = this.parentNode;
                    for (var t in this.__transition)
                        if (+t !== n) return;
                    e && e.removeChild(this)
                }
            }(this._id))
        },
        tween: function(e, t) {
            var n = this._id;
            if (e += "", arguments.length < 2) {
                for (var r, i = gn(this.node(), n).tween, a = 0, o = i.length; a < o; ++a)
                    if ((r = i[a]).name === e) return r.value;
                return null
            }
            return this.each((null == t ? function(i, a) {
                var o, c;
                return function() {
                    var e = bn(this, i),
                        t = e.tween;
                    if (t !== o)
                        for (var n = 0, r = (c = o = t).length; n < r; ++n)
                            if (c[n].name === a) {
                                (c = c.slice()).splice(n, 1);
                                break
                            }
                    e.tween = c
                }
            } : function(a, o, c) {
                var u, f;
                if ("function" != typeof c) throw new Error;
                return function() {
                    var e = bn(this, a),
                        t = e.tween;
                    if (t !== u) {
                        f = (u = t).slice();
                        for (var n = {
                                name: o,
                                value: c
                            }, r = 0, i = f.length; r < i; ++r)
                            if (f[r].name === o) {
                                f[r] = n;
                                break
                            }
                        r === i && f.push(n)
                    }
                    e.tween = f
                }
            })(n, e, t))
        },
        delay: function(e) {
            var t = this._id;
            return arguments.length ? this.each(("function" == typeof e ? function(e, t) {
                return function() {
                    pn(this, e).delay = +t.apply(this, arguments)
                }
            } : function(e, t) {
                return t = +t,
                    function() {
                        pn(this, e).delay = t
                    }
            })(t, e)) : gn(this.node(), t).delay
        },
        duration: function(e) {
            var t = this._id;
            return arguments.length ? this.each(("function" == typeof e ? function(e, t) {
                return function() {
                    bn(this, e).duration = +t.apply(this, arguments)
                }
            } : function(e, t) {
                return t = +t,
                    function() {
                        bn(this, e).duration = t
                    }
            })(t, e)) : gn(this.node(), t).duration
        },
        ease: function(e) {
            var t = this._id;
            return arguments.length ? this.each(function(e, t) {
                if ("function" != typeof t) throw new Error;
                return function() {
                    bn(this, e).ease = t
                }
            }(t, e)) : gn(this.node(), t).ease
        }
    };
    Math.PI, Math.PI;
    var Sn = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function(e) {
            return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2
        }
    };

    function kn(e, t) {
        for (var n; !(n = e.__transition) || !(n = n[t]);)
            if (!(e = e.parentNode)) return Sn.time = Jt(), Sn;
        return n
    }
    ge.prototype.interrupt = function(e) {
        return this.each(function() {
            ! function(e, t) {
                var n, r, i, a = e.__transition,
                    o = !0;
                if (a) {
                    for (i in t = null == t ? null : t + "", a)(n = a[i]).name === t ? (r = n.state > un && n.state < ln, n.state = dn, n.timer.stop(), r && n.on.call("interrupt", e, e.__data__, n.index, n.group), delete a[i]) : o = !1;
                    o && delete e.__transition
                }
            }(this, e)
        })
    }, ge.prototype.transition = function(e) {
        var t, n;
        e = e instanceof wn ? (t = e._id, e._name) : (t = xn(), (n = Sn).time = Jt(), null == e ? null : e + "");
        for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
            for (var o, c = r[a], u = c.length, f = 0; f < u; ++f)(o = c[f]) && hn(o, e, t, f, c, n || kn(o, t));
        return new wn(r, this._parents, e, t)
    };
    Math.PI, Math.PI;

    function Cn(e, t, n, r) {
        if (isNaN(t) || isNaN(n)) return e;
        var i, a, o, c, u, f, s, l, d, h = e._root,
            p = {
                data: r
            },
            b = e._x0,
            g = e._y0,
            v = e._x1,
            m = e._y1;
        if (!h) return e._root = p, e;
        for (; h.length;)
            if ((f = t >= (a = (b + v) / 2)) ? b = a : v = a, (s = n >= (o = (g + m) / 2)) ? g = o : m = o, !(h = (i = h)[l = s << 1 | f])) return i[l] = p, e;
        if (c = +e._x.call(null, h.data), u = +e._y.call(null, h.data), t === c && n === u) return p.next = h, i ? i[l] = p : e._root = p, e;
        for (; i = i ? i[l] = new Array(4) : e._root = new Array(4), (f = t >= (a = (b + v) / 2)) ? b = a : v = a, (s = n >= (o = (g + m) / 2)) ? g = o : m = o, (l = s << 1 | f) == (d = (o <= u) << 1 | a <= c););
        return i[d] = h, i[l] = p, e
    }

    function Mn(e, t, n, r, i) {
        this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i
    }

    function En(e) {
        return e[0]
    }

    function An(e) {
        return e[1]
    }

    function Dn(e, t, n, r, i, a) {
        this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this._root = void 0
    }

    function Un(e) {
        for (var t = {
                data: e.data
            }, n = t; e = e.next;) n = n.next = {
            data: e.data
        };
        return t
    }
    var On = function(e, t, n) {
        var r = new Dn(null == t ? En : t, null == n ? An : n, NaN, NaN, NaN, NaN);
        return null == e ? r : r.addAll(e)
    }.prototype = Dn.prototype;
    On.copy = function() {
        var e, t, n = new Dn(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
            r = this._root;
        if (!r) return n;
        if (!r.length) return n._root = Un(r), n;
        for (e = [{
                source: r,
                target: n._root = new Array(4)
            }]; r = e.pop();)
            for (var i = 0; i < 4; ++i)(t = r.source[i]) && (t.length ? e.push({
                source: t,
                target: r.target[i] = new Array(4)
            }) : r.target[i] = Un(t));
        return n
    }, On.add = function(e) {
        var t = +this._x.call(null, e),
            n = +this._y.call(null, e);
        return Cn(this.cover(t, n), t, n, e)
    }, On.addAll = function(e) {
        var t, n, r, i, a = e.length,
            o = new Array(a),
            c = new Array(a),
            u = 1 / 0,
            f = 1 / 0,
            s = -1 / 0,
            l = -1 / 0;
        for (n = 0; n < a; ++n) isNaN(r = +this._x.call(null, t = e[n])) || isNaN(i = +this._y.call(null, t)) || ((o[n] = r) < u && (u = r), s < r && (s = r), (c[n] = i) < f && (f = i), l < i && (l = i));
        for (s < u && (u = this._x0, s = this._x1), l < f && (f = this._y0, l = this._y1), this.cover(u, f).cover(s, l), n = 0; n < a; ++n) Cn(this, o[n], c[n], e[n]);
        return this
    }, On.cover = function(e, t) {
        if (isNaN(e = +e) || isNaN(t = +t)) return this;
        var n = this._x0,
            r = this._y0,
            i = this._x1,
            a = this._y1;
        if (isNaN(n)) i = (n = Math.floor(e)) + 1, a = (r = Math.floor(t)) + 1;
        else {
            if (!(e < n || i < e || t < r || a < t)) return this;
            var o, c, u = i - n,
                f = this._root;
            switch (c = (t < (r + a) / 2) << 1 | e < (n + i) / 2) {
                case 0:
                    for (;
                        (o = new Array(4))[c] = f, f = o, a = r + (u *= 2), (i = n + u) < e || a < t;);
                    break;
                case 1:
                    for (;
                        (o = new Array(4))[c] = f, f = o, a = r + (u *= 2), e < (n = i - u) || a < t;);
                    break;
                case 2:
                    for (;
                        (o = new Array(4))[c] = f, f = o, r = a - (u *= 2), (i = n + u) < e || t < r;);
                    break;
                case 3:
                    for (;
                        (o = new Array(4))[c] = f, f = o, r = a - (u *= 2), e < (n = i - u) || t < r;);
            }
            this._root && this._root.length && (this._root = f)
        }
        return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = a, this
    }, On.data = function() {
        var t = [];
        return this.visit(function(e) {
            if (!e.length)
                for (; t.push(e.data), e = e.next;);
        }), t
    }, On.extent = function(e) {
        return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [
            [this._x0, this._y0],
            [this._x1, this._y1]
        ]
    }, On.find = function(e, t, n) {
        var r, i, a, o, c, u, f, s = this._x0,
            l = this._y0,
            d = this._x1,
            h = this._y1,
            p = [],
            b = this._root;
        for (b && p.push(new Mn(b, s, l, d, h)), null == n ? n = 1 / 0 : (s = e - n, l = t - n, d = e + n, h = t + n, n *= n); u = p.pop();)
            if (!(!(b = u.node) || (i = u.x0) > d || (a = u.y0) > h || (o = u.x1) < s || (c = u.y1) < l))
                if (b.length) {
                    var g = (i + o) / 2,
                        v = (a + c) / 2;
                    p.push(new Mn(b[3], g, v, o, c), new Mn(b[2], i, v, g, c), new Mn(b[1], g, a, o, v), new Mn(b[0], i, a, g, v)), (f = (v <= t) << 1 | g <= e) && (u = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - f], p[p.length - 1 - f] = u)
                } else {
                    var m = e - +this._x.call(null, b.data),
                        y = t - +this._y.call(null, b.data),
                        _ = m * m + y * y;
                    if (_ < n) {
                        var w = Math.sqrt(n = _);
                        s = e - w, l = t - w, d = e + w, h = t + w, r = b.data
                    }
                }
        return r
    }, On.remove = function(e) {
        if (isNaN(a = +this._x.call(null, e)) || isNaN(o = +this._y.call(null, e))) return this;
        var t, n, r, i, a, o, c, u, f, s, l, d, h = this._root,
            p = this._x0,
            b = this._y0,
            g = this._x1,
            v = this._y1;
        if (!h) return this;
        if (h.length)
            for (;;) {
                if ((f = a >= (c = (p + g) / 2)) ? p = c : g = c, (s = o >= (u = (b + v) / 2)) ? b = u : v = u, !(h = (t = h)[l = s << 1 | f])) return this;
                if (!h.length) break;
                (t[l + 1 & 3] || t[l + 2 & 3] || t[l + 3 & 3]) && (n = t, d = l)
            }
        for (; h.data !== e;)
            if (!(h = (r = h).next)) return this;
        return (i = h.next) && delete h.next, r ? i ? r.next = i : delete r.next : t ? (i ? t[l] = i : delete t[l], (h = t[0] || t[1] || t[2] || t[3]) && h === (t[3] || t[2] || t[1] || t[0]) && !h.length && (n ? n[d] = h : this._root = h)) : this._root = i, this
    }, On.removeAll = function(e) {
        for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
        return this
    }, On.root = function() {
        return this._root
    }, On.size = function() {
        var t = 0;
        return this.visit(function(e) {
            if (!e.length)
                for (; ++t, e = e.next;);
        }), t
    }, On.visit = function(e) {
        var t, n, r, i, a, o, c = [],
            u = this._root;
        for (u && c.push(new Mn(u, this._x0, this._y0, this._x1, this._y1)); t = c.pop();)
            if (!e(u = t.node, r = t.x0, i = t.y0, a = t.x1, o = t.y1) && u.length) {
                var f = (r + a) / 2,
                    s = (i + o) / 2;
                (n = u[3]) && c.push(new Mn(n, f, s, a, o)), (n = u[2]) && c.push(new Mn(n, r, s, f, o)), (n = u[1]) && c.push(new Mn(n, f, i, a, s)), (n = u[0]) && c.push(new Mn(n, r, i, f, s))
            }
        return this
    }, On.visitAfter = function(e) {
        var t, n = [],
            r = [];
        for (this._root && n.push(new Mn(this._root, this._x0, this._y0, this._x1, this._y1)); t = n.pop();) {
            var i = t.node;
            if (i.length) {
                var a, o = t.x0,
                    c = t.y0,
                    u = t.x1,
                    f = t.y1,
                    s = (o + u) / 2,
                    l = (c + f) / 2;
                (a = i[0]) && n.push(new Mn(a, o, c, s, l)), (a = i[1]) && n.push(new Mn(a, s, c, u, l)), (a = i[2]) && n.push(new Mn(a, o, l, s, f)), (a = i[3]) && n.push(new Mn(a, s, l, u, f))
            }
            r.push(t)
        }
        for (; t = r.pop();) e(t.node, t.x0, t.y0, t.x1, t.y1);
        return this
    }, On.x = function(e) {
        return arguments.length ? (this._x = e, this) : this._x
    }, On.y = function(e) {
        return arguments.length ? (this._y = e, this) : this._y
    };
    Math.PI, Math.sqrt(5);

    function Nn(e, t) {
        if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
        var n, r = e.slice(0, n);
        return [1 < r.length ? r[0] + r.slice(2) : r, +e.slice(n + 1)]
    }
    var Fn, jn = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function Hn(e) {
        return new Rn(e)
    }

    function Rn(e) {
        if (!(t = jn.exec(e))) throw new Error("invalid format: " + e);
        var t;
        this.fill = t[1] || " ", this.align = t[2] || ">", this.sign = t[3] || "-", this.symbol = t[4] || "", this.zero = !!t[5], this.width = t[6] && +t[6], this.comma = !!t[7], this.precision = t[8] && +t[8].slice(1), this.trim = !!t[9], this.type = t[10] || ""
    }

    function Pn(e, t) {
        var n = Nn(e, t);
        if (!n) return e + "";
        var r = n[0],
            i = n[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    Hn.prototype = Rn.prototype, Rn.prototype.toString = function() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
    };
    var Ln = {
        "%": function(e, t) {
            return (100 * e).toFixed(t)
        },
        b: function(e) {
            return Math.round(e).toString(2)
        },
        c: function(e) {
            return e + ""
        },
        d: function(e) {
            return Math.round(e).toString(10)
        },
        e: function(e, t) {
            return e.toExponential(t)
        },
        f: function(e, t) {
            return e.toFixed(t)
        },
        g: function(e, t) {
            return e.toPrecision(t)
        },
        o: function(e) {
            return Math.round(e).toString(8)
        },
        p: function(e, t) {
            return Pn(100 * e, t)
        },
        r: Pn,
        s: function(e, t) {
            var n = Nn(e, t);
            if (!n) return e + "";
            var r = n[0],
                i = n[1],
                a = i - (Fn = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                o = r.length;
            return a === o ? r : o < a ? r + new Array(a - o + 1).join("0") : 0 < a ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Nn(e, Math.max(0, t + a - 1))[0]
        },
        X: function(e) {
            return Math.round(e).toString(16).toUpperCase()
        },
        x: function(e) {
            return Math.round(e).toString(16)
        }
    };

    function In(e) {
        return e
    }
    var qn, Yn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function Bn(e) {
        var x = e.grouping && e.thousands ? function(c, u) {
                return function(e, t) {
                    for (var n = e.length, r = [], i = 0, a = c[0], o = 0; 0 < n && 0 < a && (t < o + a + 1 && (a = Math.max(1, t - o)), r.push(e.substring(n -= a, n + a)), !((o += a + 1) > t));) a = c[i = (i + 1) % c.length];
                    return r.reverse().join(u)
                }
            }(e.grouping, e.thousands) : In,
            r = e.currency,
            T = e.decimal,
            S = e.numerals ? function(t) {
                return function(e) {
                    return e.replace(/[0-9]/g, function(e) {
                        return t[+e]
                    })
                }
            }(e.numerals) : In,
            i = e.percent || "%";

        function o(e) {
            var f = (e = Hn(e)).fill,
                s = e.align,
                l = e.sign,
                t = e.symbol,
                d = e.zero,
                h = e.width,
                p = e.comma,
                b = e.precision,
                g = e.trim,
                v = e.type;
            "n" === v ? (p = !0, v = "g") : Ln[v] || (null == b && (b = 12), g = !0, v = "g"), (d || "0" === f && "=" === s) && (d = !0, f = "0", s = "=");
            var m = "$" === t ? r[0] : "#" === t && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "",
                y = "$" === t ? r[1] : /[%p]/.test(v) ? i : "",
                _ = Ln[v],
                w = /[defgprs%]/.test(v);

            function n(e) {
                var t, n, r, i = m,
                    a = y;
                if ("c" === v) a = _(e) + a, e = "";
                else {
                    var o = (e = +e) < 0;
                    if (e = _(Math.abs(e), b), g && (e = function(e) {
                            e: for (var t, n = e.length, r = 1, i = -1; r < n; ++r) switch (e[r]) {
                                case ".":
                                    i = t = r;
                                    break;
                                case "0":
                                    0 === i && (i = r), t = r;
                                    break;
                                default:
                                    if (0 < i) {
                                        if (!+e[r]) break e;
                                        i = 0
                                    }
                            }
                            return 0 < i ? e.slice(0, i) + e.slice(t + 1) : e
                        }(e)), o && 0 == +e && (o = !1), i = (o ? "(" === l ? l : "-" : "-" === l || "(" === l ? "" : l) + i, a = ("s" === v ? Yn[8 + Fn / 3] : "") + a + (o && "(" === l ? ")" : ""), w)
                        for (t = -1, n = e.length; ++t < n;)
                            if ((r = e.charCodeAt(t)) < 48 || 57 < r) {
                                a = (46 === r ? T + e.slice(t + 1) : e.slice(t)) + a, e = e.slice(0, t);
                                break
                            }
                }
                p && !d && (e = x(e, 1 / 0));
                var c = i.length + e.length + a.length,
                    u = c < h ? new Array(h - c + 1).join(f) : "";
                switch (p && d && (e = x(u + e, u.length ? h - a.length : 1 / 0), u = ""), s) {
                    case "<":
                        e = i + e + a + u;
                        break;
                    case "=":
                        e = i + u + e + a;
                        break;
                    case "^":
                        e = u.slice(0, c = u.length >> 1) + i + e + a + u.slice(c);
                        break;
                    default:
                        e = u + i + e + a
                }
                return S(e)
            }
            return b = null == b ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, b)) : Math.max(0, Math.min(20, b)), n.toString = function() {
                return e + ""
            }, n
        }
        return {
            format: o,
            formatPrefix: function(e, t) {
                var n = o(((e = Hn(e)).type = "f", e)),
                    r = 3 * Math.max(-8, Math.min(8, Math.floor(function(e) {
                        return (e = Nn(Math.abs(e))) ? e[1] : NaN
                    }(t) / 3))),
                    i = Math.pow(10, -r),
                    a = Yn[8 + r / 3];
                return function(e) {
                    return n(i * e) + a
                }
            }
        }
    }

    function zn() {
        return new Vn
    }

    function Vn() {
        this.reset()
    }
    qn = Bn({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), qn.format, qn.formatPrefix, Vn.prototype = {
        constructor: Vn,
        reset: function() {
            this.s = this.t = 0
        },
        add: function(e) {
            Wn(Xn, e, this.t), Wn(this, Xn.s, this.s), this.s ? this.t += Xn.t : this.s = Xn.t
        },
        valueOf: function() {
            return this.s
        }
    };
    var Xn = new Vn;

    function Wn(e, t, n) {
        var r = e.s = t + n,
            i = r - t,
            a = r - i;
        e.t = t - a + (n - i)
    }
    Math.PI, zn(), zn(), zn(), zn(), zn(), zn(), zn(), zn();

    function $n(e, t) {
        return e < t ? -1 : t < e ? 1 : t <= e ? 0 : NaN
    }
    var Jn, Zn, Gn;
    1 === (Zn = $n).length && (Jn = Zn, Zn = function(e, t) {
        return $n(Jn(e), t)
    }), Math.PI, Math.SQRT2;

    function Qn(e, t) {
        if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
        var n, r = e.slice(0, n);
        return [1 < r.length ? r[0] + r.slice(2) : r, +e.slice(n + 1)]
    }

    function Kn(e, t) {
        var n = Qn(e, t);
        if (!n) return e + "";
        var r = n[0],
            i = n[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    var er = {
            "": function(e, t) {
                e: for (var n, r = (e = e.toPrecision(t)).length, i = 1, a = -1; i < r; ++i) switch (e[i]) {
                    case ".":
                        a = n = i;
                        break;
                    case "0":
                        0 === a && (a = i), n = i;
                        break;
                    case "e":
                        break e;
                    default:
                        0 < a && (a = 0)
                }
                return 0 < a ? e.slice(0, a) + e.slice(n + 1) : e
            },
            "%": function(e, t) {
                return (100 * e).toFixed(t)
            },
            b: function(e) {
                return Math.round(e).toString(2)
            },
            c: function(e) {
                return e + ""
            },
            d: function(e) {
                return Math.round(e).toString(10)
            },
            e: function(e, t) {
                return e.toExponential(t)
            },
            f: function(e, t) {
                return e.toFixed(t)
            },
            g: function(e, t) {
                return e.toPrecision(t)
            },
            o: function(e) {
                return Math.round(e).toString(8)
            },
            p: function(e, t) {
                return Kn(100 * e, t)
            },
            r: Kn,
            s: function(e, t) {
                var n = Qn(e, t);
                if (!n) return e + "";
                var r = n[0],
                    i = n[1],
                    a = i - (Gn = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                    o = r.length;
                return a === o ? r : o < a ? r + new Array(a - o + 1).join("0") : 0 < a ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Qn(e, Math.max(0, t + a - 1))[0]
            },
            X: function(e) {
                return Math.round(e).toString(16).toUpperCase()
            },
            x: function(e) {
                return Math.round(e).toString(16)
            }
        },
        tr = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

    function nr(e) {
        return new rr(e)
    }

    function rr(e) {
        if (!(t = tr.exec(e))) throw new Error("invalid format: " + e);
        var t, n = t[1] || " ",
            r = t[2] || ">",
            i = t[3] || "-",
            a = t[4] || "",
            o = !!t[5],
            c = t[6] && +t[6],
            u = !!t[7],
            f = t[8] && +t[8].slice(1),
            s = t[9] || "";
        "n" === s ? (u = !0, s = "g") : er[s] || (s = ""), (o || "0" === n && "=" === r) && (o = !0, n = "0", r = "="), this.fill = n, this.align = r, this.sign = i, this.symbol = a, this.zero = o, this.width = c, this.comma = u, this.precision = f, this.type = s
    }

    function ir(e) {
        return e
    }
    nr.prototype = rr.prototype, rr.prototype.toString = function() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type
    };
    var ar, or = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function cr(e) {
        var w = e.grouping && e.thousands ? function(c, u) {
                return function(e, t) {
                    for (var n = e.length, r = [], i = 0, a = c[0], o = 0; 0 < n && 0 < a && (t < o + a + 1 && (a = Math.max(1, t - o)), r.push(e.substring(n -= a, n + a)), !((o += a + 1) > t));) a = c[i = (i + 1) % c.length];
                    return r.reverse().join(u)
                }
            }(e.grouping, e.thousands) : ir,
            r = e.currency,
            x = e.decimal,
            T = e.numerals ? function(t) {
                return function(e) {
                    return e.replace(/[0-9]/g, function(e) {
                        return t[+e]
                    })
                }
            }(e.numerals) : ir,
            i = e.percent || "%";

        function o(e) {
            var f = (e = nr(e)).fill,
                s = e.align,
                l = e.sign,
                t = e.symbol,
                d = e.zero,
                h = e.width,
                p = e.comma,
                b = e.precision,
                g = e.type,
                v = "$" === t ? r[0] : "#" === t && /[boxX]/.test(g) ? "0" + g.toLowerCase() : "",
                m = "$" === t ? r[1] : /[%p]/.test(g) ? i : "",
                y = er[g],
                _ = !g || /[defgprs%]/.test(g);

            function n(e) {
                var t, n, r, i = v,
                    a = m;
                if ("c" === g) a = y(e) + a, e = "";
                else {
                    var o = (e = +e) < 0;
                    if (e = y(Math.abs(e), b), o && 0 == +e && (o = !1), i = (o ? "(" === l ? l : "-" : "-" === l || "(" === l ? "" : l) + i, a = a + ("s" === g ? or[8 + Gn / 3] : "") + (o && "(" === l ? ")" : ""), _)
                        for (t = -1, n = e.length; ++t < n;)
                            if ((r = e.charCodeAt(t)) < 48 || 57 < r) {
                                a = (46 === r ? x + e.slice(t + 1) : e.slice(t)) + a, e = e.slice(0, t);
                                break
                            }
                }
                p && !d && (e = w(e, 1 / 0));
                var c = i.length + e.length + a.length,
                    u = c < h ? new Array(h - c + 1).join(f) : "";
                switch (p && d && (e = w(u + e, u.length ? h - a.length : 1 / 0), u = ""), s) {
                    case "<":
                        e = i + e + a + u;
                        break;
                    case "=":
                        e = i + u + e + a;
                        break;
                    case "^":
                        e = u.slice(0, c = u.length >> 1) + i + e + a + u.slice(c);
                        break;
                    default:
                        e = u + i + e + a
                }
                return T(e)
            }
            return b = null == b ? g ? 6 : 12 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, b)) : Math.max(0, Math.min(20, b)), n.toString = function() {
                return e + ""
            }, n
        }
        return {
            format: o,
            formatPrefix: function(e, t) {
                var n = o(((e = nr(e)).type = "f", e)),
                    r = 3 * Math.max(-8, Math.min(8, Math.floor(function(e) {
                        return (e = Qn(Math.abs(e))) ? e[1] : NaN
                    }(t) / 3))),
                    i = Math.pow(10, -r),
                    a = or[8 + r / 3];
                return function(e) {
                    return n(i * e) + a
                }
            }
        }
    }
    ar = cr({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), ar.format, ar.formatPrefix;
    var ur = new Date,
        fr = new Date;

    function sr(i, a, n, r) {
        function o(e) {
            return i(e = new Date(+e)), e
        }
        return (o.floor = o).ceil = function(e) {
            return i(e = new Date(e - 1)), a(e, 1), i(e), e
        }, o.round = function(e) {
            var t = o(e),
                n = o.ceil(e);
            return e - t < n - e ? t : n
        }, o.offset = function(e, t) {
            return a(e = new Date(+e), null == t ? 1 : Math.floor(t)), e
        }, o.range = function(e, t, n) {
            var r = [];
            if (e = o.ceil(e), n = null == n ? 1 : Math.floor(n), !(e < t && 0 < n)) return r;
            for (; r.push(new Date(+e)), a(e, n), i(e), e < t;);
            return r
        }, o.filter = function(n) {
            return sr(function(e) {
                if (e <= e)
                    for (; i(e), !n(e);) e.setTime(e - 1)
            }, function(e, t) {
                if (e <= e)
                    if (t < 0)
                        for (; ++t <= 0;)
                            for (; a(e, -1), !n(e););
                    else
                        for (; 0 <= --t;)
                            for (; a(e, 1), !n(e););
            })
        }, n && (o.count = function(e, t) {
            return ur.setTime(+e), fr.setTime(+t), i(ur), i(fr), Math.floor(n(ur, fr))
        }, o.every = function(t) {
            return t = Math.floor(t), isFinite(t) && 0 < t ? 1 < t ? o.filter(r ? function(e) {
                return r(e) % t == 0
            } : function(e) {
                return o.count(0, e) % t == 0
            }) : o : null
        }), o
    }
    var lr = sr(function() {}, function(e, t) {
        e.setTime(+e + t)
    }, function(e, t) {
        return t - e
    });
    lr.every = function(n) {
        return n = Math.floor(n), isFinite(n) && 0 < n ? 1 < n ? sr(function(e) {
            e.setTime(Math.floor(e / n) * n)
        }, function(e, t) {
            e.setTime(+e + t * n)
        }, function(e, t) {
            return (t - e) / n
        }) : lr : null
    };
    var dr = 6e4,
        hr = 36e5,
        pr = (sr(function(e) {
            e.setTime(1e3 * Math.floor(e / 1e3))
        }, function(e, t) {
            e.setTime(+e + 1e3 * t)
        }, function(e, t) {
            return (t - e) / 1e3
        }, function(e) {
            return e.getUTCSeconds()
        }), sr(function(e) {
            e.setTime(Math.floor(e / dr) * dr)
        }, function(e, t) {
            e.setTime(+e + t * dr)
        }, function(e, t) {
            return (t - e) / dr
        }, function(e) {
            return e.getMinutes()
        }), sr(function(e) {
            var t = e.getTimezoneOffset() * dr % hr;
            t < 0 && (t += hr), e.setTime(Math.floor((+e - t) / hr) * hr + t)
        }, function(e, t) {
            e.setTime(+e + t * hr)
        }, function(e, t) {
            return (t - e) / hr
        }, function(e) {
            return e.getHours()
        }), sr(function(e) {
            e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setDate(e.getDate() + t)
        }, function(e, t) {
            return (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * dr) / 864e5
        }, function(e) {
            return e.getDate() - 1
        }));

    function br(t) {
        return sr(function(e) {
            e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setDate(e.getDate() + 7 * t)
        }, function(e, t) {
            return (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * dr) / 6048e5
        })
    }
    var gr = br(0),
        vr = br(1),
        mr = (br(2), br(3), br(4)),
        yr = (br(5), br(6), sr(function(e) {
            e.setDate(1), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setMonth(e.getMonth() + t)
        }, function(e, t) {
            return t.getMonth() - e.getMonth() + 12 * (t.getFullYear() - e.getFullYear())
        }, function(e) {
            return e.getMonth()
        }), sr(function(e) {
            e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setFullYear(e.getFullYear() + t)
        }, function(e, t) {
            return t.getFullYear() - e.getFullYear()
        }, function(e) {
            return e.getFullYear()
        }));
    yr.every = function(n) {
        return isFinite(n = Math.floor(n)) && 0 < n ? sr(function(e) {
            e.setFullYear(Math.floor(e.getFullYear() / n) * n), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setFullYear(e.getFullYear() + t * n)
        }) : null
    };
    sr(function(e) {
        e.setUTCSeconds(0, 0)
    }, function(e, t) {
        e.setTime(+e + t * dr)
    }, function(e, t) {
        return (t - e) / dr
    }, function(e) {
        return e.getUTCMinutes()
    }), sr(function(e) {
        e.setUTCMinutes(0, 0, 0)
    }, function(e, t) {
        e.setTime(+e + t * hr)
    }, function(e, t) {
        return (t - e) / hr
    }, function(e) {
        return e.getUTCHours()
    });
    var _r = sr(function(e) {
        e.setUTCHours(0, 0, 0, 0)
    }, function(e, t) {
        e.setUTCDate(e.getUTCDate() + t)
    }, function(e, t) {
        return (t - e) / 864e5
    }, function(e) {
        return e.getUTCDate() - 1
    });

    function wr(t) {
        return sr(function(e) {
            e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCDate(e.getUTCDate() + 7 * t)
        }, function(e, t) {
            return (t - e) / 6048e5
        })
    }
    var xr = wr(0),
        Tr = wr(1),
        Sr = (wr(2), wr(3), wr(4)),
        kr = (wr(5), wr(6), sr(function(e) {
            e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCMonth(e.getUTCMonth() + t)
        }, function(e, t) {
            return t.getUTCMonth() - e.getUTCMonth() + 12 * (t.getUTCFullYear() - e.getUTCFullYear())
        }, function(e) {
            return e.getUTCMonth()
        }), sr(function(e) {
            e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCFullYear(e.getUTCFullYear() + t)
        }, function(e, t) {
            return t.getUTCFullYear() - e.getUTCFullYear()
        }, function(e) {
            return e.getUTCFullYear()
        }));

    function Cr(e) {
        if (0 <= e.y && e.y < 100) {
            var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
            return t.setFullYear(e.y), t
        }
        return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
    }

    function Mr(e) {
        if (0 <= e.y && e.y < 100) {
            var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
            return t.setUTCFullYear(e.y), t
        }
        return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
    }

    function Er(e) {
        return {
            y: e,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
        }
    }
    kr.every = function(n) {
        return isFinite(n = Math.floor(n)) && 0 < n ? sr(function(e) {
            e.setUTCFullYear(Math.floor(e.getUTCFullYear() / n) * n), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCFullYear(e.getUTCFullYear() + t * n)
        }) : null
    };
    var Ar, Dr, Ur, Or, Nr, Fr, jr, Hr, Rr, Pr, Lr, Ir, qr, Yr, Br, zr, Vr, Xr, Wr, $r, Jr, Zr, Gr, Qr, Kr, ei = {
            "-": "",
            _: " ",
            0: "0"
        },
        ti = /^\s*\d+/,
        ni = /^%/,
        ri = /[\\^$*+?|[\]().{}]/g;

    function ii(e, t, n) {
        var r = e < 0 ? "-" : "",
            i = (r ? -e : e) + "",
            a = i.length;
        return r + (a < n ? new Array(n - a + 1).join(t) + i : i)
    }

    function ai(e) {
        return e.replace(ri, "\\$&")
    }

    function oi(e) {
        return new RegExp("^(?:" + e.map(ai).join("|") + ")", "i")
    }

    function ci(e) {
        for (var t = {}, n = -1, r = e.length; ++n < r;) t[e[n].toLowerCase()] = n;
        return t
    }

    function ui(e, t, n) {
        var r = ti.exec(t.slice(n, n + 1));
        return r ? (e.w = +r[0], n + r[0].length) : -1
    }

    function fi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 1));
        return r ? (e.u = +r[0], n + r[0].length) : -1
    }

    function si(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.U = +r[0], n + r[0].length) : -1
    }

    function li(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.V = +r[0], n + r[0].length) : -1
    }

    function di(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.W = +r[0], n + r[0].length) : -1
    }

    function hi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 4));
        return r ? (e.y = +r[0], n + r[0].length) : -1
    }

    function pi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.y = +r[0] + (68 < +r[0] ? 1900 : 2e3), n + r[0].length) : -1
    }

    function bi(e, t, n) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
        return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1
    }

    function gi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.m = r[0] - 1, n + r[0].length) : -1
    }

    function vi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.d = +r[0], n + r[0].length) : -1
    }

    function mi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 3));
        return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1
    }

    function yi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.H = +r[0], n + r[0].length) : -1
    }

    function _i(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.M = +r[0], n + r[0].length) : -1
    }

    function wi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 2));
        return r ? (e.S = +r[0], n + r[0].length) : -1
    }

    function xi(e, t, n) {
        var r = ti.exec(t.slice(n, n + 3));
        return r ? (e.L = +r[0], n + r[0].length) : -1
    }

    function Ti(e, t, n) {
        var r = ti.exec(t.slice(n, n + 6));
        return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1
    }

    function Si(e, t, n) {
        var r = ni.exec(t.slice(n, n + 1));
        return r ? n + r[0].length : -1
    }

    function ki(e, t, n) {
        var r = ti.exec(t.slice(n));
        return r ? (e.Q = +r[0], n + r[0].length) : -1
    }

    function Ci(e, t, n) {
        var r = ti.exec(t.slice(n));
        return r ? (e.Q = 1e3 * +r[0], n + r[0].length) : -1
    }

    function Mi(e, t) {
        return ii(e.getDate(), t, 2)
    }

    function Ei(e, t) {
        return ii(e.getHours(), t, 2)
    }

    function Ai(e, t) {
        return ii(e.getHours() % 12 || 12, t, 2)
    }

    function Di(e, t) {
        return ii(1 + pr.count(yr(e), e), t, 3)
    }

    function Ui(e, t) {
        return ii(e.getMilliseconds(), t, 3)
    }

    function Oi(e, t) {
        return Ui(e, t) + "000"
    }

    function Ni(e, t) {
        return ii(e.getMonth() + 1, t, 2)
    }

    function Fi(e, t) {
        return ii(e.getMinutes(), t, 2)
    }

    function ji(e, t) {
        return ii(e.getSeconds(), t, 2)
    }

    function Hi(e) {
        var t = e.getDay();
        return 0 === t ? 7 : t
    }

    function Ri(e, t) {
        return ii(gr.count(yr(e), e), t, 2)
    }

    function Pi(e, t) {
        var n = e.getDay();
        return e = 4 <= n || 0 === n ? mr(e) : mr.ceil(e), ii(mr.count(yr(e), e) + (4 === yr(e).getDay()), t, 2)
    }

    function Li(e) {
        return e.getDay()
    }

    function Ii(e, t) {
        return ii(vr.count(yr(e), e), t, 2)
    }

    function qi(e, t) {
        return ii(e.getFullYear() % 100, t, 2)
    }

    function Yi(e, t) {
        return ii(e.getFullYear() % 1e4, t, 4)
    }

    function Bi(e) {
        var t = e.getTimezoneOffset();
        return (0 < t ? "-" : (t *= -1, "+")) + ii(t / 60 | 0, "0", 2) + ii(t % 60, "0", 2)
    }

    function zi(e, t) {
        return ii(e.getUTCDate(), t, 2)
    }

    function Vi(e, t) {
        return ii(e.getUTCHours(), t, 2)
    }

    function Xi(e, t) {
        return ii(e.getUTCHours() % 12 || 12, t, 2)
    }

    function Wi(e, t) {
        return ii(1 + _r.count(kr(e), e), t, 3)
    }

    function $i(e, t) {
        return ii(e.getUTCMilliseconds(), t, 3)
    }

    function Ji(e, t) {
        return $i(e, t) + "000"
    }

    function Zi(e, t) {
        return ii(e.getUTCMonth() + 1, t, 2)
    }

    function Gi(e, t) {
        return ii(e.getUTCMinutes(), t, 2)
    }

    function Qi(e, t) {
        return ii(e.getUTCSeconds(), t, 2)
    }

    function Ki(e) {
        var t = e.getUTCDay();
        return 0 === t ? 7 : t
    }

    function ea(e, t) {
        return ii(xr.count(kr(e), e), t, 2)
    }

    function ta(e, t) {
        var n = e.getUTCDay();
        return e = 4 <= n || 0 === n ? Sr(e) : Sr.ceil(e), ii(Sr.count(kr(e), e) + (4 === kr(e).getUTCDay()), t, 2)
    }

    function na(e) {
        return e.getUTCDay()
    }

    function ra(e, t) {
        return ii(Tr.count(kr(e), e), t, 2)
    }

    function ia(e, t) {
        return ii(e.getUTCFullYear() % 100, t, 2)
    }

    function aa(e, t) {
        return ii(e.getUTCFullYear() % 1e4, t, 4)
    }

    function oa() {
        return "+0000"
    }

    function ca() {
        return "%"
    }

    function ua(e) {
        return +e
    }

    function fa(e) {
        return Math.floor(+e / 1e3)
    }

    function sa(u, f) {
        return function(e) {
            var t, n, r, i = [],
                a = -1,
                o = 0,
                c = u.length;
            for (e instanceof Date || (e = new Date(+e)); ++a < c;) 37 === u.charCodeAt(a) && (i.push(u.slice(o, a)), null != (n = ei[t = u.charAt(++a)]) ? t = u.charAt(++a) : n = "e" === t ? " " : "0", (r = f[t]) && (t = r(e, n)), i.push(t), o = a + 1);
            return i.push(u.slice(o, a)), i.join("")
        }
    }

    function la(i, a) {
        return function(e) {
            var t, n, r = Er(1900);
            if (da(r, i, e += "", 0) != e.length) return null;
            if ("Q" in r) return new Date(r.Q);
            if ("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r) {
                if (r.V < 1 || 53 < r.V) return null;
                "w" in r || (r.w = 1), "Z" in r ? (t = 4 < (n = (t = Mr(Er(r.y))).getUTCDay()) || 0 === n ? Tr.ceil(t) : Tr(t), t = _r.offset(t, 7 * (r.V - 1)), r.y = t.getUTCFullYear(), r.m = t.getUTCMonth(), r.d = t.getUTCDate() + (r.w + 6) % 7) : (t = 4 < (n = (t = a(Er(r.y))).getDay()) || 0 === n ? vr.ceil(t) : vr(t), t = pr.offset(t, 7 * (r.V - 1)), r.y = t.getFullYear(), r.m = t.getMonth(), r.d = t.getDate() + (r.w + 6) % 7)
            } else("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0), n = "Z" in r ? Mr(Er(r.y)).getUTCDay() : a(Er(r.y)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + 7 * r.W - (n + 5) % 7 : r.w + 7 * r.U - (n + 6) % 7);
            return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, Mr(r)) : a(r)
        }
    }

    function da(e, t, n, r) {
        for (var i, a, o = 0, c = t.length, u = n.length; o < c;) {
            if (u <= r) return -1;
            if (37 === (i = t.charCodeAt(o++))) {
                if (i = t.charAt(o++), !(a = Kr[i in ei ? t.charAt(o++) : i]) || (r = a(e, n, r)) < 0) return -1
            } else if (i != n.charCodeAt(r++)) return -1
        }
        return r
    }
    Nr = (Or = {
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }).dateTime, Fr = Or.date, jr = Or.time, Hr = Or.periods, Rr = Or.days, Pr = Or.shortDays, Lr = Or.months, Ir = Or.shortMonths, qr = oi(Hr), Yr = ci(Hr), Br = oi(Rr), zr = ci(Rr), Vr = oi(Pr), Xr = ci(Pr), Wr = oi(Lr), $r = ci(Lr), Jr = oi(Ir), Zr = ci(Ir), Qr = {
        a: function(e) {
            return Pr[e.getUTCDay()]
        },
        A: function(e) {
            return Rr[e.getUTCDay()]
        },
        b: function(e) {
            return Ir[e.getUTCMonth()]
        },
        B: function(e) {
            return Lr[e.getUTCMonth()]
        },
        c: null,
        d: zi,
        e: zi,
        f: Ji,
        H: Vi,
        I: Xi,
        j: Wi,
        L: $i,
        m: Zi,
        M: Gi,
        p: function(e) {
            return Hr[+(12 <= e.getUTCHours())]
        },
        Q: ua,
        s: fa,
        S: Qi,
        u: Ki,
        U: ea,
        V: ta,
        w: na,
        W: ra,
        x: null,
        X: null,
        y: ia,
        Y: aa,
        Z: oa,
        "%": ca
    }, Kr = {
        a: function(e, t, n) {
            var r = Vr.exec(t.slice(n));
            return r ? (e.w = Xr[r[0].toLowerCase()], n + r[0].length) : -1
        },
        A: function(e, t, n) {
            var r = Br.exec(t.slice(n));
            return r ? (e.w = zr[r[0].toLowerCase()], n + r[0].length) : -1
        },
        b: function(e, t, n) {
            var r = Jr.exec(t.slice(n));
            return r ? (e.m = Zr[r[0].toLowerCase()], n + r[0].length) : -1
        },
        B: function(e, t, n) {
            var r = Wr.exec(t.slice(n));
            return r ? (e.m = $r[r[0].toLowerCase()], n + r[0].length) : -1
        },
        c: function(e, t, n) {
            return da(e, Nr, t, n)
        },
        d: vi,
        e: vi,
        f: Ti,
        H: yi,
        I: yi,
        j: mi,
        L: xi,
        m: gi,
        M: _i,
        p: function(e, t, n) {
            var r = qr.exec(t.slice(n));
            return r ? (e.p = Yr[r[0].toLowerCase()], n + r[0].length) : -1
        },
        Q: ki,
        s: Ci,
        S: wi,
        u: fi,
        U: si,
        V: li,
        w: ui,
        W: di,
        x: function(e, t, n) {
            return da(e, Fr, t, n)
        },
        X: function(e, t, n) {
            return da(e, jr, t, n)
        },
        y: pi,
        Y: hi,
        Z: bi,
        "%": Si
    }, (Gr = {
        a: function(e) {
            return Pr[e.getDay()]
        },
        A: function(e) {
            return Rr[e.getDay()]
        },
        b: function(e) {
            return Ir[e.getMonth()]
        },
        B: function(e) {
            return Lr[e.getMonth()]
        },
        c: null,
        d: Mi,
        e: Mi,
        f: Oi,
        H: Ei,
        I: Ai,
        j: Di,
        L: Ui,
        m: Ni,
        M: Fi,
        p: function(e) {
            return Hr[+(12 <= e.getHours())]
        },
        Q: ua,
        s: fa,
        S: ji,
        u: Hi,
        U: Ri,
        V: Pi,
        w: Li,
        W: Ii,
        x: null,
        X: null,
        y: qi,
        Y: Yi,
        Z: Bi,
        "%": ca
    }).x = sa(Fr, Gr), Gr.X = sa(jr, Gr), Gr.c = sa(Nr, Gr), Qr.x = sa(Fr, Qr), Qr.X = sa(jr, Qr), Qr.c = sa(Nr, Qr), Ar = {
        format: function(e) {
            var t = sa(e += "", Gr);
            return t.toString = function() {
                return e
            }, t
        },
        parse: function(e) {
            var t = la(e += "", Cr);
            return t.toString = function() {
                return e
            }, t
        },
        utcFormat: function(e) {
            var t = sa(e += "", Qr);
            return t.toString = function() {
                return e
            }, t
        },
        utcParse: function(e) {
            var t = la(e, Mr);
            return t.toString = function() {
                return e
            }, t
        }
    }, Ar.parse, Dr = Ar.utcFormat, Ur = Ar.utcParse;
    var ha = "%Y-%m-%dT%H:%M:%S.%LZ";
    Date.prototype.toISOString || Dr(ha); + new Date("2000-01-01T00:00:00.000Z") || Ur(ha);

    function pa(e) {
        for (var t = e.length / 6 | 0, n = new Array(t), r = 0; r < t;) n[r] = "#" + e.slice(6 * r, 6 * ++r);
        return n
    }

    function ba(e) {
        return xt(e[e.length - 1])
    }
    pa("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), pa("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), pa("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), pa("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), pa("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), pa("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), pa("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), pa("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), pa("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), ba(new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(pa)), ba(new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(pa)), ba(new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(pa)), ba(new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(pa)), ba(new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(pa)), ba(new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(pa)), ba(new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(pa)), ba(new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(pa)), ba(new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(pa)), ba(new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(pa)), ba(new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(pa)), ba(new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(pa)), ba(new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(pa)), ba(new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(pa)), ba(new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(pa)), ba(new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(pa)), ba(new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(pa)), ba(new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(pa)), ba(new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(pa)), ba(new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(pa)), ba(new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(pa)), ba(new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(pa)), ba(new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(pa)), ba(new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(pa)), ba(new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(pa)), ba(new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(pa)), ba(new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(pa)), Lt(pt(300, .5, 0), pt(-240, .5, 1));
    Lt(pt(-100, .75, .35), pt(80, 1.5, .8)), Lt(pt(260, .75, .35), pt(80, 1.5, .8)), pt();

    function va(t) {
        var n = t.length;
        return function(e) {
            return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
        }
    }
    va(pa("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
    va(pa("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), va(pa("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), va(pa("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")), Math.PI;

    function ma(e) {
        return e < 0 ? -1 : 1
    }

    function ya(e, t, n) {
        var r = e._x1 - e._x0,
            i = t - e._x1,
            a = (e._y1 - e._y0) / (r || i < 0 && -0),
            o = (n - e._y1) / (i || r < 0 && -0),
            c = (a * i + o * r) / (r + i);
        return (ma(a) + ma(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(c)) || 0
    }

    function _a(e, t) {
        var n = e._x1 - e._x0;
        return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t
    }

    function wa(e, t, n) {
        var r = e._x0,
            i = e._y0,
            a = e._x1,
            o = e._y1,
            c = (a - r) / 3;
        e._context.bezierCurveTo(r + c, i + c * t, a - c, o - c * n, a, o)
    }

    function xa(e) {
        this._context = e
    }

    function Ta(e) {
        this._context = e
    }
    xa.prototype = {
        areaStart: function() {
            this._line = 0
        },
        areaEnd: function() {
            this._line = NaN
        },
        lineStart: function() {
            this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
        },
        lineEnd: function() {
            switch (this._point) {
                case 2:
                    this._context.lineTo(this._x1, this._y1);
                    break;
                case 3:
                    wa(this, this._t0, _a(this, this._t0))
            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        },
        point: function(e, t) {
            var n = NaN;
            if (t = +t, (e = +e) !== this._x1 || t !== this._y1) {
                switch (this._point) {
                    case 0:
                        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
                        break;
                    case 1:
                        this._point = 2;
                        break;
                    case 2:
                        this._point = 3, wa(this, _a(this, n = ya(this, e, t)), n);
                        break;
                    default:
                        wa(this, this._t0, n = ya(this, e, t))
                }
                this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n
            }
        }
    }, (function(e) {
        this._context = new Ta(e)
    }.prototype = Object.create(xa.prototype)).point = function(e, t) {
        xa.prototype.point.call(this, t, e)
    }, Ta.prototype = {
        moveTo: function(e, t) {
            this._context.moveTo(t, e)
        },
        closePath: function() {
            this._context.closePath()
        },
        lineTo: function(e, t) {
            this._context.lineTo(t, e)
        },
        bezierCurveTo: function(e, t, n, r, i, a) {
            this._context.bezierCurveTo(t, e, r, n, a, i)
        }
    };
    var Sa = new Date,
        ka = new Date;

    function Ca(a, o, n, r) {
        function c(e) {
            return a(e = new Date(+e)), e
        }
        return (c.floor = c).ceil = function(e) {
            return a(e = new Date(e - 1)), o(e, 1), a(e), e
        }, c.round = function(e) {
            var t = c(e),
                n = c.ceil(e);
            return e - t < n - e ? t : n
        }, c.offset = function(e, t) {
            return o(e = new Date(+e), null == t ? 1 : Math.floor(t)), e
        }, c.range = function(e, t, n) {
            var r, i = [];
            if (e = c.ceil(e), n = null == n ? 1 : Math.floor(n), !(e < t && 0 < n)) return i;
            for (; i.push(r = new Date(+e)), o(e, n), a(e), r < e && e < t;);
            return i
        }, c.filter = function(n) {
            return Ca(function(e) {
                if (e <= e)
                    for (; a(e), !n(e);) e.setTime(e - 1)
            }, function(e, t) {
                if (e <= e)
                    if (t < 0)
                        for (; ++t <= 0;)
                            for (; o(e, -1), !n(e););
                    else
                        for (; 0 <= --t;)
                            for (; o(e, 1), !n(e););
            })
        }, n && (c.count = function(e, t) {
            return Sa.setTime(+e), ka.setTime(+t), a(Sa), a(ka), Math.floor(n(Sa, ka))
        }, c.every = function(t) {
            return t = Math.floor(t), isFinite(t) && 0 < t ? 1 < t ? c.filter(r ? function(e) {
                return r(e) % t == 0
            } : function(e) {
                return c.count(0, e) % t == 0
            }) : c : null
        }), c
    }
    var Ma = Ca(function() {}, function(e, t) {
        e.setTime(+e + t)
    }, function(e, t) {
        return t - e
    });
    Ma.every = function(n) {
        return n = Math.floor(n), isFinite(n) && 0 < n ? 1 < n ? Ca(function(e) {
            e.setTime(Math.floor(e / n) * n)
        }, function(e, t) {
            e.setTime(+e + t * n)
        }, function(e, t) {
            return (t - e) / n
        }) : Ma : null
    };
    var Ea = 6e4,
        Aa = 36e5,
        Da = (Ca(function(e) {
            e.setTime(1e3 * Math.floor(e / 1e3))
        }, function(e, t) {
            e.setTime(+e + 1e3 * t)
        }, function(e, t) {
            return (t - e) / 1e3
        }, function(e) {
            return e.getUTCSeconds()
        }), Ca(function(e) {
            e.setTime(Math.floor(e / Ea) * Ea)
        }, function(e, t) {
            e.setTime(+e + t * Ea)
        }, function(e, t) {
            return (t - e) / Ea
        }, function(e) {
            return e.getMinutes()
        }), Ca(function(e) {
            var t = e.getTimezoneOffset() * Ea % Aa;
            t < 0 && (t += Aa), e.setTime(Math.floor((+e - t) / Aa) * Aa + t)
        }, function(e, t) {
            e.setTime(+e + t * Aa)
        }, function(e, t) {
            return (t - e) / Aa
        }, function(e) {
            return e.getHours()
        }), Ca(function(e) {
            e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setDate(e.getDate() + t)
        }, function(e, t) {
            return (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ea) / 864e5
        }, function(e) {
            return e.getDate() - 1
        }));

    function Ua(t) {
        return Ca(function(e) {
            e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setDate(e.getDate() + 7 * t)
        }, function(e, t) {
            return (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ea) / 6048e5
        })
    }
    var Oa = Ua(0),
        Na = Ua(1),
        Fa = (Ua(2), Ua(3), Ua(4)),
        ja = (Ua(5), Ua(6), Ca(function(e) {
            e.setDate(1), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setMonth(e.getMonth() + t)
        }, function(e, t) {
            return t.getMonth() - e.getMonth() + 12 * (t.getFullYear() - e.getFullYear())
        }, function(e) {
            return e.getMonth()
        }), Ca(function(e) {
            e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setFullYear(e.getFullYear() + t)
        }, function(e, t) {
            return t.getFullYear() - e.getFullYear()
        }, function(e) {
            return e.getFullYear()
        }));
    ja.every = function(n) {
        return isFinite(n = Math.floor(n)) && 0 < n ? Ca(function(e) {
            e.setFullYear(Math.floor(e.getFullYear() / n) * n), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setFullYear(e.getFullYear() + t * n)
        }) : null
    };
    Ca(function(e) {
        e.setUTCSeconds(0, 0)
    }, function(e, t) {
        e.setTime(+e + t * Ea)
    }, function(e, t) {
        return (t - e) / Ea
    }, function(e) {
        return e.getUTCMinutes()
    }), Ca(function(e) {
        e.setUTCMinutes(0, 0, 0)
    }, function(e, t) {
        e.setTime(+e + t * Aa)
    }, function(e, t) {
        return (t - e) / Aa
    }, function(e) {
        return e.getUTCHours()
    });
    var Ha = Ca(function(e) {
        e.setUTCHours(0, 0, 0, 0)
    }, function(e, t) {
        e.setUTCDate(e.getUTCDate() + t)
    }, function(e, t) {
        return (t - e) / 864e5
    }, function(e) {
        return e.getUTCDate() - 1
    });

    function Ra(t) {
        return Ca(function(e) {
            e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCDate(e.getUTCDate() + 7 * t)
        }, function(e, t) {
            return (t - e) / 6048e5
        })
    }
    var Pa = Ra(0),
        La = Ra(1),
        Ia = (Ra(2), Ra(3), Ra(4)),
        qa = (Ra(5), Ra(6), Ca(function(e) {
            e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCMonth(e.getUTCMonth() + t)
        }, function(e, t) {
            return t.getUTCMonth() - e.getUTCMonth() + 12 * (t.getUTCFullYear() - e.getUTCFullYear())
        }, function(e) {
            return e.getUTCMonth()
        }), Ca(function(e) {
            e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCFullYear(e.getUTCFullYear() + t)
        }, function(e, t) {
            return t.getUTCFullYear() - e.getUTCFullYear()
        }, function(e) {
            return e.getUTCFullYear()
        }));

    function Ya(e) {
        if (0 <= e.y && e.y < 100) {
            var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
            return t.setFullYear(e.y), t
        }
        return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
    }

    function Ba(e) {
        if (0 <= e.y && e.y < 100) {
            var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
            return t.setUTCFullYear(e.y), t
        }
        return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
    }

    function za(e) {
        return {
            y: e,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
        }
    }
    qa.every = function(n) {
        return isFinite(n = Math.floor(n)) && 0 < n ? Ca(function(e) {
            e.setUTCFullYear(Math.floor(e.getUTCFullYear() / n) * n), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }, function(e, t) {
            e.setUTCFullYear(e.getUTCFullYear() + t * n)
        }) : null
    };
    var Va, Xa, Wa, $a, Ja, Za, Ga, Qa, Ka, eo, to, no, ro, io, ao, oo, co, uo, fo, so, lo, ho, po, bo, go, vo = {
            "-": "",
            _: " ",
            0: "0"
        },
        mo = /^\s*\d+/,
        yo = /^%/,
        _o = /[\\^$*+?|[\]().{}]/g;

    function wo(e, t, n) {
        var r = e < 0 ? "-" : "",
            i = (r ? -e : e) + "",
            a = i.length;
        return r + (a < n ? new Array(n - a + 1).join(t) + i : i)
    }

    function xo(e) {
        return e.replace(_o, "\\$&")
    }

    function To(e) {
        return new RegExp("^(?:" + e.map(xo).join("|") + ")", "i")
    }

    function So(e) {
        for (var t = {}, n = -1, r = e.length; ++n < r;) t[e[n].toLowerCase()] = n;
        return t
    }

    function ko(e, t, n) {
        var r = mo.exec(t.slice(n, n + 1));
        return r ? (e.w = +r[0], n + r[0].length) : -1
    }

    function Co(e, t, n) {
        var r = mo.exec(t.slice(n, n + 1));
        return r ? (e.u = +r[0], n + r[0].length) : -1
    }

    function Mo(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.U = +r[0], n + r[0].length) : -1
    }

    function Eo(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.V = +r[0], n + r[0].length) : -1
    }

    function Ao(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.W = +r[0], n + r[0].length) : -1
    }

    function Do(e, t, n) {
        var r = mo.exec(t.slice(n, n + 4));
        return r ? (e.y = +r[0], n + r[0].length) : -1
    }

    function Uo(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.y = +r[0] + (68 < +r[0] ? 1900 : 2e3), n + r[0].length) : -1
    }

    function Oo(e, t, n) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
        return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1
    }

    function No(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.m = r[0] - 1, n + r[0].length) : -1
    }

    function Fo(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.d = +r[0], n + r[0].length) : -1
    }

    function jo(e, t, n) {
        var r = mo.exec(t.slice(n, n + 3));
        return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1
    }

    function Ho(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.H = +r[0], n + r[0].length) : -1
    }

    function Ro(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.M = +r[0], n + r[0].length) : -1
    }

    function Po(e, t, n) {
        var r = mo.exec(t.slice(n, n + 2));
        return r ? (e.S = +r[0], n + r[0].length) : -1
    }

    function Lo(e, t, n) {
        var r = mo.exec(t.slice(n, n + 3));
        return r ? (e.L = +r[0], n + r[0].length) : -1
    }

    function Io(e, t, n) {
        var r = mo.exec(t.slice(n, n + 6));
        return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1
    }

    function qo(e, t, n) {
        var r = yo.exec(t.slice(n, n + 1));
        return r ? n + r[0].length : -1
    }

    function Yo(e, t, n) {
        var r = mo.exec(t.slice(n));
        return r ? (e.Q = +r[0], n + r[0].length) : -1
    }

    function Bo(e, t, n) {
        var r = mo.exec(t.slice(n));
        return r ? (e.Q = 1e3 * +r[0], n + r[0].length) : -1
    }

    function zo(e, t) {
        return wo(e.getDate(), t, 2)
    }

    function Vo(e, t) {
        return wo(e.getHours(), t, 2)
    }

    function Xo(e, t) {
        return wo(e.getHours() % 12 || 12, t, 2)
    }

    function Wo(e, t) {
        return wo(1 + Da.count(ja(e), e), t, 3)
    }

    function $o(e, t) {
        return wo(e.getMilliseconds(), t, 3)
    }

    function Jo(e, t) {
        return $o(e, t) + "000"
    }

    function Zo(e, t) {
        return wo(e.getMonth() + 1, t, 2)
    }

    function Go(e, t) {
        return wo(e.getMinutes(), t, 2)
    }

    function Qo(e, t) {
        return wo(e.getSeconds(), t, 2)
    }

    function Ko(e) {
        var t = e.getDay();
        return 0 === t ? 7 : t
    }

    function ec(e, t) {
        return wo(Oa.count(ja(e), e), t, 2)
    }

    function tc(e, t) {
        var n = e.getDay();
        return e = 4 <= n || 0 === n ? Fa(e) : Fa.ceil(e), wo(Fa.count(ja(e), e) + (4 === ja(e).getDay()), t, 2)
    }

    function nc(e) {
        return e.getDay()
    }

    function rc(e, t) {
        return wo(Na.count(ja(e), e), t, 2)
    }

    function ic(e, t) {
        return wo(e.getFullYear() % 100, t, 2)
    }

    function ac(e, t) {
        return wo(e.getFullYear() % 1e4, t, 4)
    }

    function oc(e) {
        var t = e.getTimezoneOffset();
        return (0 < t ? "-" : (t *= -1, "+")) + wo(t / 60 | 0, "0", 2) + wo(t % 60, "0", 2)
    }

    function cc(e, t) {
        return wo(e.getUTCDate(), t, 2)
    }

    function uc(e, t) {
        return wo(e.getUTCHours(), t, 2)
    }

    function fc(e, t) {
        return wo(e.getUTCHours() % 12 || 12, t, 2)
    }

    function sc(e, t) {
        return wo(1 + Ha.count(qa(e), e), t, 3)
    }

    function lc(e, t) {
        return wo(e.getUTCMilliseconds(), t, 3)
    }

    function dc(e, t) {
        return lc(e, t) + "000"
    }

    function hc(e, t) {
        return wo(e.getUTCMonth() + 1, t, 2)
    }

    function pc(e, t) {
        return wo(e.getUTCMinutes(), t, 2)
    }

    function bc(e, t) {
        return wo(e.getUTCSeconds(), t, 2)
    }

    function gc(e) {
        var t = e.getUTCDay();
        return 0 === t ? 7 : t
    }

    function vc(e, t) {
        return wo(Pa.count(qa(e), e), t, 2)
    }

    function mc(e, t) {
        var n = e.getUTCDay();
        return e = 4 <= n || 0 === n ? Ia(e) : Ia.ceil(e), wo(Ia.count(qa(e), e) + (4 === qa(e).getUTCDay()), t, 2)
    }

    function yc(e) {
        return e.getUTCDay()
    }

    function _c(e, t) {
        return wo(La.count(qa(e), e), t, 2)
    }

    function wc(e, t) {
        return wo(e.getUTCFullYear() % 100, t, 2)
    }

    function xc(e, t) {
        return wo(e.getUTCFullYear() % 1e4, t, 4)
    }

    function Tc() {
        return "+0000"
    }

    function Sc() {
        return "%"
    }

    function kc(e) {
        return +e
    }

    function Cc(e) {
        return Math.floor(+e / 1e3)
    }

    function Mc(u, f) {
        return function(e) {
            var t, n, r, i = [],
                a = -1,
                o = 0,
                c = u.length;
            for (e instanceof Date || (e = new Date(+e)); ++a < c;) 37 === u.charCodeAt(a) && (i.push(u.slice(o, a)), null != (n = vo[t = u.charAt(++a)]) ? t = u.charAt(++a) : n = "e" === t ? " " : "0", (r = f[t]) && (t = r(e, n)), i.push(t), o = a + 1);
            return i.push(u.slice(o, a)), i.join("")
        }
    }

    function Ec(i, a) {
        return function(e) {
            var t, n, r = za(1900);
            if (Ac(r, i, e += "", 0) != e.length) return null;
            if ("Q" in r) return new Date(r.Q);
            if ("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r) {
                if (r.V < 1 || 53 < r.V) return null;
                "w" in r || (r.w = 1), "Z" in r ? (t = 4 < (n = (t = Ba(za(r.y))).getUTCDay()) || 0 === n ? La.ceil(t) : La(t), t = Ha.offset(t, 7 * (r.V - 1)), r.y = t.getUTCFullYear(), r.m = t.getUTCMonth(), r.d = t.getUTCDate() + (r.w + 6) % 7) : (t = 4 < (n = (t = a(za(r.y))).getDay()) || 0 === n ? Na.ceil(t) : Na(t), t = Da.offset(t, 7 * (r.V - 1)), r.y = t.getFullYear(), r.m = t.getMonth(), r.d = t.getDate() + (r.w + 6) % 7)
            } else("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0), n = "Z" in r ? Ba(za(r.y)).getUTCDay() : a(za(r.y)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + 7 * r.W - (n + 5) % 7 : r.w + 7 * r.U - (n + 6) % 7);
            return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, Ba(r)) : a(r)
        }
    }

    function Ac(e, t, n, r) {
        for (var i, a, o = 0, c = t.length, u = n.length; o < c;) {
            if (u <= r) return -1;
            if (37 === (i = t.charCodeAt(o++))) {
                if (i = t.charAt(o++), !(a = go[i in vo ? t.charAt(o++) : i]) || (r = a(e, n, r)) < 0) return -1
            } else if (i != n.charCodeAt(r++)) return -1
        }
        return r
    }
    Ja = ($a = {
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }).dateTime, Za = $a.date, Ga = $a.time, Qa = $a.periods, Ka = $a.days, eo = $a.shortDays, to = $a.months, no = $a.shortMonths, ro = To(Qa), io = So(Qa), ao = To(Ka), oo = So(Ka), co = To(eo), uo = So(eo), fo = To(to), so = So(to), lo = To(no), ho = So(no), bo = {
        a: function(e) {
            return eo[e.getUTCDay()]
        },
        A: function(e) {
            return Ka[e.getUTCDay()]
        },
        b: function(e) {
            return no[e.getUTCMonth()]
        },
        B: function(e) {
            return to[e.getUTCMonth()]
        },
        c: null,
        d: cc,
        e: cc,
        f: dc,
        H: uc,
        I: fc,
        j: sc,
        L: lc,
        m: hc,
        M: pc,
        p: function(e) {
            return Qa[+(12 <= e.getUTCHours())]
        },
        Q: kc,
        s: Cc,
        S: bc,
        u: gc,
        U: vc,
        V: mc,
        w: yc,
        W: _c,
        x: null,
        X: null,
        y: wc,
        Y: xc,
        Z: Tc,
        "%": Sc
    }, go = {
        a: function(e, t, n) {
            var r = co.exec(t.slice(n));
            return r ? (e.w = uo[r[0].toLowerCase()], n + r[0].length) : -1
        },
        A: function(e, t, n) {
            var r = ao.exec(t.slice(n));
            return r ? (e.w = oo[r[0].toLowerCase()], n + r[0].length) : -1
        },
        b: function(e, t, n) {
            var r = lo.exec(t.slice(n));
            return r ? (e.m = ho[r[0].toLowerCase()], n + r[0].length) : -1
        },
        B: function(e, t, n) {
            var r = fo.exec(t.slice(n));
            return r ? (e.m = so[r[0].toLowerCase()], n + r[0].length) : -1
        },
        c: function(e, t, n) {
            return Ac(e, Ja, t, n)
        },
        d: Fo,
        e: Fo,
        f: Io,
        H: Ho,
        I: Ho,
        j: jo,
        L: Lo,
        m: No,
        M: Ro,
        p: function(e, t, n) {
            var r = ro.exec(t.slice(n));
            return r ? (e.p = io[r[0].toLowerCase()], n + r[0].length) : -1
        },
        Q: Yo,
        s: Bo,
        S: Po,
        u: Co,
        U: Mo,
        V: Eo,
        w: ko,
        W: Ao,
        x: function(e, t, n) {
            return Ac(e, Za, t, n)
        },
        X: function(e, t, n) {
            return Ac(e, Ga, t, n)
        },
        y: Uo,
        Y: Do,
        Z: Oo,
        "%": qo
    }, (po = {
        a: function(e) {
            return eo[e.getDay()]
        },
        A: function(e) {
            return Ka[e.getDay()]
        },
        b: function(e) {
            return no[e.getMonth()]
        },
        B: function(e) {
            return to[e.getMonth()]
        },
        c: null,
        d: zo,
        e: zo,
        f: Jo,
        H: Vo,
        I: Xo,
        j: Wo,
        L: $o,
        m: Zo,
        M: Go,
        p: function(e) {
            return Qa[+(12 <= e.getHours())]
        },
        Q: kc,
        s: Cc,
        S: Qo,
        u: Ko,
        U: ec,
        V: tc,
        w: nc,
        W: rc,
        x: null,
        X: null,
        y: ic,
        Y: ac,
        Z: oc,
        "%": Sc
    }).x = Mc(Za, po), po.X = Mc(Ga, po), po.c = Mc(Ja, po), bo.x = Mc(Za, bo), bo.X = Mc(Ga, bo), bo.c = Mc(Ja, bo), Va = {
        format: function(e) {
            var t = Mc(e += "", po);
            return t.toString = function() {
                return e
            }, t
        },
        parse: function(e) {
            var t = Ec(e += "", Ya);
            return t.toString = function() {
                return e
            }, t
        },
        utcFormat: function(e) {
            var t = Mc(e += "", bo);
            return t.toString = function() {
                return e
            }, t
        },
        utcParse: function(e) {
            var t = Ec(e, Ba);
            return t.toString = function() {
                return e
            }, t
        }
    }, Va.parse, Xa = Va.utcFormat, Wa = Va.utcParse;
    var Dc = "%Y-%m-%dT%H:%M:%S.%LZ";
    Date.prototype.toISOString || Xa(Dc); + new Date("2000-01-01T00:00:00.000Z") || Wa(Dc);

    function Uc(e, t) {
        var n = [],
            r = [],
            i = 0,
            a = [];
        for (var o in a.column_names = {}, e)
            if (void 0 !== e[o].columns || void 0 !== e[o].column) {
                var c = e[o];
                if (c.key = o, c.data_table_id in t) {
                    var u = t[c.data_table_id];
                    if (0 != u.length) {
                        if ("columns" in c && null != c.columns) {
                            var f = u[0].length;
                            c.columns = c.columns.filter(function(e) {
                                return e < f
                            }), a.column_names[o] = c.columns.map(function(e) {
                                return t[c.data_table_id][0][e]
                            })
                        } else {
                            if (!("column" in c && null != c.column)) throw new Error("Data binding includes no column(s) specification: " + JSON.stringify(c));
                            a.column_names[o] = u[0][c.column]
                        } - 1 == r.indexOf(c.data_table_id) && (r.push(c.data_table_id), i = Math.max(i, t[c.data_table_id].length - 1)), n.push(c)
                    } else console.warn("Empty data table")
                } else {
                    var s = [];
                    for (var l in t) s.push(l);
                    console.error("Data table id " + c.data_table_id + " not in " + JSON.stringify(s))
                }
            }
        for (var d = 0; d < i; d++) {
            for (var h = {}, p = 0; p < n.length; p++) {
                c = n[p];
                var b = t[c.data_table_id];
                d + 1 >= b.length || ("columns" in c && null != c.columns ? h[c.key] = c.columns.filter(function(e) {
                    return e < b[d + 1].length
                }).map(function(e) {
                    return b[d + 1][e]
                }) : "column" in c && null != c.column && (c.column >= b[d + 1].length ? h[c.key] = "" : h[c.key] = b[d + 1][c.column]))
            }
            a.push(h)
        }
        return a
    }

    function Oc(t, e, n) {
        m(this, "object" == typeof e ? (n = e).id : e, void 0, n, {
            getVersionNumber: function() {
                return t.version_number
            },
            setVersionNumber: function(e) {
                t.version_number = e
            }
        }), this.visualisation = t, this.api_prefix = "/api/data_table"
    }

    function Nc(e) {
        return e.map(function(e) {
            return null != e && "object" == typeof e && "map" in e ? Nc(e) : e
        })
    }

    function Fc(e) {
        this.id = e
    }

    function jc(e) {
        var t = {};
        for (var n in e) {
            for (var r = t, i = n.indexOf("."), a = 0; 0 <= i; i = n.indexOf(".", a = i + 1)) {
                var o = n.substring(a, i);
                o in r || (r[o] = {}), r = r[o]
            }
            r[n.substring(a)] = e[n]
        }
        return t
    }

    function Hc(e, t, n) {
        if (m(this, e, t, n), this.api_prefix = "/api/visualisation", this.data_tables) {
            var r = this;
            this.data_tables = this.data_tables.map(function(e) {
                return new Oc(r, e)
            })
        }
    }

    function Rc(o, c, u) {
        x({
            url: o.api_prefix + "/" + o.id + "/data_bindings",
            method: "POST",
            payload: function() {
                return {
                    version_number: o.version_number,
                    data_bindings: c
                }
            },
            callback: function(e, t) {
                if (e) return u(e);
                o.version_number = t.version_number, o.data_bindings || (o.data_bindings = {}), o.template_id in o.data_bindings || (o.data_bindings[o.template_id] = {});
                var n = o.data_bindings[o.template_id];
                for (var r in c)
                    for (var i in c[r]) {
                        var a = c[r][i];
                        n[r] || (n[r] = {}), n[r][i] = a
                    }
                u(void 0)
            }
        })
    }

    function Pc(a, o, c) {
        x({
            url: a.api_prefix + "/" + a.id + "/settings",
            payload: function() {
                return {
                    version_number: a.version_number,
                    settings: o
                }
            },
            callback: function(e, t) {
                if (e) return c(e);
                a.version_number = t.version_number, a.settings || (a.settings = {}), a.template_id in a.settings || (a.settings[a.template_id] = {});
                var n = a.settings[a.template_id];
                for (var r in o) {
                    var i = o[r];
                    n[r] = i
                }
                c(void 0)
            }
        })
    }

    function Lc(r, i, a) {
        x({
            url: "/api/data_table",
            method: "PUT",
            payload: function() {
                var e = {};
                for (var t in i) e[t] = i[t];
                return e.visualisation_id = r.id, e.version_number = r.getVersionNumber(), e
            },
            callback: function(e, t) {
                if (e) return a(e);
                var n = new Oc(r, t.id, i);
                r.version_number = t.version_number, r.data_tables.push(n), r.data_table_names && (r.data_table_names[n.id] = n.name), r.data_table_ids && (r.data_table_ids[n.name] = n.id), a(void 0, n)
            }
        })
    }

    function Ic(t, n, r) {
        var i = t.data_tables[n];
        i.delete(function(e) {
            e || (t.data_tables.splice(n, 1), t.data_table_names && delete t.data_table_names[i.id], t.data_table_ids && delete t.data_table_ids[i.name]), r(e)
        })
    }

    function qc(n, r, e) {
        x({
            url: n.api_prefix + "/" + n.id + "/publish",
            payload: function() {
                return {
                    password: e
                }
            },
            callback: function(e, t) {
                if (e) return r(e);
                n.version_number = t.version_number, n.embed_url = t.embed_url, n.showcase_url = t.showcase_url, n.is_password_protected = t.is_password_protected, r(void 0, t)
            }
        })
    }

    function Yc(e, t, n) {
        this.story = e, m(this, t, void 0, n, {
            getVersionNumber: function() {
                return this.story.version_number
            },
            setVersionNumber: function(e) {
                this.story.version_number = e
            }
        }), this.api_prefix = "/api/slide"
    }

    function Bc(e, t, n, r, i) {
        m(this, e, t, n), this.api_prefix = "/api/story", this.slides = r, this.slides_by_id = {};
        for (var a = 0; a < r.length; a++) {
            var o = r[a];
            (o.story = this).slides_by_id[o.id] = o
        }
        this.status = i
    }

    function zc(e) {
        if (!(e.length <= 2)) return "set" === e[0] ? e[2] = "" + e[2] : "send" === e[0] && "event" === e[1] && ("string" == typeof e[2] || e[2] instanceof String ? 5 <= e.length && (e[4] = "" + e[4]) : "eventLabel" in e[2] && (e[2].eventLabel = "" + e[2].eventLabel)), e
    }
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e) {
            if (null == this) throw new TypeError("this is null or not defined");
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError("predicate must be a function");
            for (var r = arguments[1], i = 0; i < n;) {
                var a = t[i];
                if (e.call(r, a, i, t)) return i;
                i++
            }
            return -1
        },
        configurable: !0,
        writable: !0
    }), Oc.prototype.csv = function(n) {
        if (this.cached_data) n(void 0, Nc(this.cached_data));
        else {
            var r = this;
            x({
                url: this.api_prefix + "/" + this.id + "/csv",
                response_type: "text/csv; charset=utf-8",
                method: "GET",
                callback: function(e, t) {
                    if (e) return n(e);
                    r.cached_data = g(t), n(void 0, Nc(r.cached_data))
                }
            }, "load-data")
        }
    }, Oc.prototype.saveData = function(e, n) {
        var r = this,
            i = function(e) {
                for (var t = e.length; 0 < t-- && (!e[t] || !e[t].length || -1 == e[t].findIndex(function(e) {
                        return null !== e && "" !== e
                    }));) e.splice(t, 1);
                return e
            }(Nc(e));
        x({
            url: this.api_prefix + "/" + this.id + "/csv",
            payload: function() {
                return {
                    version_number: r.getVersionNumber(),
                    data: v(i)
                }
            },
            callback: function(e, t) {
                if (e) return n(e);
                r.setVersionNumber(t.version_number), r.cached_data = i, n(void 0)
            }
        })
    }, Oc.prototype.save = function(e, t) {
        return S(this, e, t)
    }, Oc.prototype.delete = function(e) {
        return k(this, e)
    }, Fc.prototype.getSettings = function(n) {
        if (this.settings) n(void 0, this.settings);
        else {
            var r = this;
            x({
                url: "/api/template/" + this.id + "/settings",
                method: "GET",
                callback: function(e, t) {
                    if (e) return n(e);
                    r.settings = t.settings, n(void 0, r.settings)
                }
            })
        }
    }, Fc.prototype.getDataBindings = function(e) {
        x({
            url: "/api/template/" + this.id + "/data_bindings",
            method: "GET",
            callback: e
        })
    }, Hc.prototype.save = function(e, t) {
        this.is_listed || (e.is_listed = !0), S(this, e, t)
    }, Hc.prototype.setTemplateId = function(e, t) {
        S(this, {
            template_id: e
        }, t)
    }, Hc.prototype.getTemplate = function() {
        return this.template_id ? (this._template && this.template_id == this._template.id || (this._template = new Fc(this.template_id)), this._template) : null
    }, Hc.prototype.settingsForCurrentTemplate = function() {
        return this.settings && this.template_id in this.settings ? this.settings[this.template_id] : {}
    }, Hc.prototype.getState = function(a) {
        this.template_id || a({});
        var o = this.settingsForCurrentTemplate();
        this.getTemplate().getSettings(function(e, t) {
            if (e) throw e;
            for (var n = {}, r = 0; r < t.length; r++) {
                var i = t[r];
                i.property in o && (n[i.property] = o[i.property])
            }
            a(jc(n))
        })
    }, Hc.prototype.dataBindingsForCurrentTemplate = function() {
        return this.data_bindings && this.template_id in this.data_bindings ? this.data_bindings[this.template_id] : {}
    }, Hc.prototype.refreshDataBindings = function(n) {
        var r = this;
        x({
            url: this.api_prefix + "/" + this.id + "/data_bindings",
            method: "GET",
            callback: function(e, t) {
                if (e) return n(e);
                r.data_bindings = t, n()
            }
        })
    }, Hc.prototype.resetToTheme = function(n) {
        var r = this;
        x({
            url: this.api_prefix + "/" + this.id + "/reset_to_theme",
            method: "POST",
            payload: function() {
                return {
                    version_number: r.version_number
                }
            },
            callback: function(e, t) {
                if (e) return n(e);
                r.version_number = t.version_number, n(void 0)
            }
        })
    }, Hc.prototype.updateDataBindings = function(t, n) {
        var r = this;
        if (this.is_listed) return Rc(r, t, n);
        this.save({
            is_listed: !0
        }, function(e) {
            return e ? n(e) : Rc(r, t, n)
        })
    }, Hc.prototype.updateSettings = function(t, n) {
        var r = this;
        if (this.is_listed) return Pc(r, t, n);
        this.save({
            is_listed: !0
        }, function(e) {
            return e ? n(e) : Pc(r, t, n)
        })
    }, Hc.prototype.refreshSettings = function(n) {
        var r = this;
        x({
            url: this.api_prefix + "/" + this.id + "/settings",
            method: "GET",
            callback: function(e, t) {
                if (e) return n(e);
                r.settings = t, n()
            }
        })
    }, Hc.prototype.getThemeFontsAndColors = function(n) {
        x({
            url: this.api_prefix + "/" + this.id + "/theme-fonts-and-colors",
            method: "GET",
            callback: function(e, t) {
                if (e) return n(e);
                n(void 0, t.fonts, t.colors)
            }
        })
    }, Hc.prototype.getDataTables = function(n) {
        x({
            url: this.api_prefix + "/" + this.id + "/data",
            method: "GET",
            callback: function(e, t) {
                return e ? n(e) : n(void 0, t.data)
            }
        })
    }, Hc.prototype.dataTables = function(e) {
        var r = this;
        r.data_tables ? e(void 0, r.data_tables) : (r.after_loading_data_tables || (r.after_loading_data_tables = []), r.after_loading_data_tables.push(e), 1 < r.after_loading_data_tables.length || r.getDataTables(function(e, t) {
            if (e) {
                for (var n = 0; n < r.after_loading_data_tables.length; n++) r.after_loading_data_tables[n](e);
                r.after_loading_data_tables = []
            } else {
                r.data_tables = t.map(function(e) {
                    return new Oc(r, e)
                });
                for (n = 0; n < r.after_loading_data_tables.length; n++) r.after_loading_data_tables[n](void 0, r.data_tables);
                r.after_loading_data_tables = []
            }
        }))
    }, Hc.prototype.refreshDataTables = function() {
        this.data_tables = void 0, this.dataTablesHaveChanged()
    }, Hc.prototype.prepareData = function(f) {
        var s = this;
        if (!s.data_bindings) throw new Error("No data bindings loaded");
        var l = s.template_id;
        s.dataTables(function(e, o) {
            if (e) return f(e);
            if (s.template_id == l) {
                for (var c = {}, u = 0, t = 0; t < o.length; t++) ! function(a) {
                    a.csv(function(e, t) {
                        if (e) throw e;
                        if (s.template_id == l && (c[a.id] = t, ++u == o.length)) {
                            var n = {},
                                r = s.dataBindingsForCurrentTemplate();
                            for (var i in r) n[i] = Uc(r[i], c);
                            s.getTemplate().getDataBindings(function(e, t) {
                                t.forEach(function(e) {
                                    "string" != typeof e && (n[e.dataset] || (n[e.dataset] = [], n[e.dataset].column_names = {}))
                                }), f(void 0, n)
                            })
                        }
                    })
                }(o[t]);
                0 == o.length && f(void 0, {})
            }
        })
    }, Hc.prototype.delete = function(e) {
        k(this, e)
    }, Hc.prototype.createDataTable = function(t, n) {
        var r = this;
        if (this.is_listed) return Lc(r, t, n);
        this.save({
            is_listed: !0
        }, function(e) {
            return e ? n(e) : Lc(r, t, n)
        })
    }, Hc.prototype.deleteDataTable = function(t, n) {
        var r = this;
        if (this.is_listed) return Ic(r, t, n);
        this.save({
            is_listed: !0
        }, function(e) {
            return e ? n(e) : Ic(r, t, n)
        })
    }, Hc.prototype.getDataTableNames = function() {
        return void 0 === this.data_table_names && (this.data_table_names = function(e) {
            for (var t = {}, n = 0; n < e.length; n++) {
                var r = e[n];
                t[r.id] = r.name
            }
            return t
        }(this.data_tables)), this.data_table_names
    }, Hc.prototype.getDataTableIds = function() {
        return void 0 === this.data_table_ids && (this.data_table_ids = function(e) {
            for (var t = {}, n = 0; n < e.length; n++) {
                var r = e[n];
                t[r.name] = r.id
            }
            return t
        }(this.data_tables)), this.data_table_ids
    }, Hc.prototype.dataTablesHaveChanged = function() {
        this.data_table_names = this.data_table_ids = void 0
    }, Hc.prototype.duplicate = function(e) {
        x({
            url: this.api_prefix + "/" + this.id + "/duplicate",
            callback: e
        })
    }, Hc.prototype.publish = function(t, n) {
        var r = this;
        if (this.is_listed) return qc(r, t, n);
        this.save({
            is_listed: !0
        }, function(e) {
            return e ? t(e) : qc(r, t, n)
        })
    }, Hc.prototype.unpublish = function(n) {
        var r = this;
        x({
            url: this.api_prefix + "/" + this.id + "/unpublish",
            callback: function(e, t) {
                if (e) return n(e);
                r.version_number = t.version_number, r.embed_url = t.embed_url, r.showcase_url = t.showcase_url, n(void 0, t)
            }
        })
    }, Hc.prototype.published = function() {
        return !!this.showcase_url
    }, Hc.prototype.sendForReview = function(e, t, n) {
        var r = this;
        x({
            url: "/api/reviews",
            payload: function() {
                return {
                    project_id: r.id,
                    project_type: "visualisation",
                    reviewers: e,
                    message: t
                }
            },
            callback: function(e, t) {
                r.status = t, n(e, t)
            }
        })
    }, Hc.prototype.approve = function(e, n) {
        var r = this;
        x({
            url: "/api/review/" + e + "/approve",
            callback: function(e, t) {
                return r.status = t, n(e, t)
            }
        })
    }, Hc.prototype.decline = function(e, t, n) {
        var r = this;
        x({
            url: "/api/review/" + e + "/decline",
            payload: function() {
                return {
                    message: t
                }
            },
            callback: function(e, t) {
                r.status = t, n(e, t)
            }
        })
    }, Hc.prototype.cancelReview = function(e, n) {
        var r = this;
        x({
            url: "/api/review/" + e + "/cancel",
            callback: function(e, t) {
                r.status = t, n(e, t)
            }
        })
    }, Hc.list = function(e) {
        x({
            url: "/api/visualisations",
            method: "GET",
            callback: e
        })
    }, Hc.getById = function(n, r) {
        x({
            url: "/api/visualisation/" + n,
            method: "GET",
            callback: function(e, t) {
                if (e) return r(e);
                r(void 0, new Hc(n, t.version_number, t))
            }
        })
    }, Hc.getByTemplateId = function(e, t) {
        x({
            url: "/api/template/" + e + "/visualisations",
            method: "GET",
            callback: t
        })
    }, Hc.createFromTemplate = function(e, t) {
        x({
            url: "/api/template/" + e + "/visualisations",
            method: "PUT",
            callback: t
        })
    }, Hc.createFromVisualisation = function(e, t) {
        x({
            url: "/api/visualisation/" + e + "/duplicate",
            callback: t
        })
    }, Hc.setAsStaffPick = function(e, t) {
        x({
            url: "/api/visualisation/" + e + "/set_staff_pick",
            method: "POST",
            callback: t
        })
    }, Hc.unsetAsStaffPick = function(e, t) {
        x({
            url: "/api/visualisation/" + e + "/unset_staff_pick",
            method: "POST",
            callback: t
        })
    }, Yc.prototype.save = function(e, t) {
        S(this, e, !0, t)
    }, Yc.prototype.delete = function(e) {
        k(this, e)
    }, Yc.prototype.move = function(e, n) {
        var r = this;
        x({
            url: "/api/slide/" + r.id + "/move",
            payload: function() {
                return {
                    version_number: r.getVersionNumber(),
                    index: e
                }
            },
            callback: function(e, t) {
                if (e) return n(e);
                r.setVersionNumber(t.version_number), n()
            }
        })
    }, Bc.prototype.save = function(e, t) {
        S(this, e, t)
    }, Bc.prototype.delete = function(e) {
        k(this, e)
    }, Bc.prototype.addSlide = function(r, i, a) {
        var o = this;
        x({
            url: "/api/slide",
            method: "PUT",
            payload: function() {
                return {
                    version_number: o.version_number,
                    story_id: o.id,
                    index: r,
                    fields: i
                }
            },
            callback: function(e, t) {
                if (e) return a(e);
                o.version_number = t.version_number;
                var n = new Yc(o, t.id, i);
                n.index = r, o.slides_by_id[t.id] = n, o.slides.slice(r).forEach(function(e) {
                    e.index++
                }), o.slides.splice(r, 0, n), a(void 0, n)
            }
        })
    }, Bc.prototype.deleteSlide = function(e, n) {
        var r = this,
            t = r.slides_by_id[e],
            i = r.slides.indexOf(t);
        r.slides_by_id[e] && (r.slides_by_id[e].delete(function(e, t) {
            if (e) return n(e);
            r.version_number = t.version_number, n()
        }), delete r.slides_by_id[t.id], r.slides.splice(i, 1), r.slides.slice(i).forEach(function(e) {
            e.index--
        }))
    }, Bc.prototype.moveSlide = function(e, t, n) {
        var r = e.index;
        e.move(t, function(e) {
            if (e) return n(e);
            n()
        }), this.slides.splice(r, 1), this.slides.splice(t, 0, e), this.slides.forEach(function(e, t) {
            e.index = t
        })
    }, Bc.prototype.duplicate = function(e) {
        x({
            url: this.api_prefix + "/" + this.id + "/duplicate",
            callback: e
        })
    }, Bc.prototype.publish = function(n, e) {
        var r = this;
        x({
            url: this.api_prefix + "/" + this.id + "/publish",
            payload: function() {
                return {
                    password: e
                }
            },
            callback: function(e, t) {
                if (e) return n(e);
                r.version_number = t.version_number, r.embed_url = t.embed_url, r.showcase_url = t.showcase_url, r.is_password_protected = t.is_password_protected, n(void 0, t)
            }
        })
    }, Bc.prototype.unpublish = function(n) {
        var r = this;
        x({
            url: this.api_prefix + "/" + this.id + "/unpublish",
            callback: function(e, t) {
                if (e) return n(e);
                r.version_number = t.version_number, r.embed_url = t.embed_url, r.showcase_url = t.showcase_url, n(void 0, t)
            }
        })
    }, Bc.prototype.sendForReview = function(e, t, n) {
        var r = this;
        x({
            url: "/api/reviews",
            payload: function() {
                return {
                    project_id: r.id,
                    project_type: "story",
                    reviewers: e,
                    message: t
                }
            },
            callback: function(e, t) {
                r.status = t, n(e, t)
            }
        })
    }, Bc.prototype.approve = function(e, n) {
        var r = this;
        x({
            url: "/api/review/" + e + "/approve",
            callback: function(e, t) {
                return r.status = t, n(e, t)
            }
        })
    }, Bc.prototype.decline = function(e, t, n) {
        var r = this;
        x({
            url: "/api/review/" + e + "/decline",
            payload: function() {
                return {
                    message: t
                }
            },
            callback: function(e, t) {
                r.status = t, n(e, t)
            }
        })
    }, Bc.prototype.cancelReview = function(e, n) {
        var r = this;
        x({
            url: "/api/review/" + e + "/cancel",
            callback: function(e, t) {
                r.status = t, n(e, t)
            }
        })
    }, Bc.setAsStaffPick = function(e, t) {
        x({
            url: "/api/story/" + e + "/set_staff_pick",
            method: "POST",
            callback: t
        })
    };
    var Vc, Xc, Wc, $c, Jc, Zc = !(Bc.unsetAsStaffPick = function(e, t) {
        x({
            url: "/api/story/" + e + "/unset_staff_pick",
            method: "POST",
            callback: t
        })
    });

    function Gc() {
        this._current_time = 0, this.paused = !0, this._listeners = []
    }

    function Qc() {
        var e = ve(".play-pause.small").node().getBoundingClientRect();
        ve(".play-pause.large").transition().duration(1e3).style("left", (e.left || 0) + "px").style("top", (e.top || 0) + "px").style("transform", "scale(1)").style("background", "rgba(0,0,0,0.3)").remove()
    }

    function Kc() {
        Xc.paused ? eu() : tu()
    }

    function eu() {
        nu(Xc.currentTime) >= Vc.story.slides.length && (Xc.currentTime = 0), Xc.play(), me("nav .play-pause").classed("playing", !0), Zc || Qc(), Zc = !0
    }

    function tu() {
        Xc.pause(), me("nav .play-pause").classed("playing", !1)
    }

    function nu(e) {
        for (var t = Wc.length - 1; 0 <= t; t--)
            if (e >= Wc[t].timecode) return t
    }

    function ru() {
        var e = nu(this.currentTime);
        Vc.current_slide.index !== Wc[e].index && (e < Vc.story.slides.length ? Vc.loadSlide(Wc[e].index) : (tu(), Vc.story.loops_at_end && eu()))
    }

    function iu() {
        Xc && Xc.removeEventListener("timeupdate", ru), Vc.story.is_timed ? (Xc = Vc.story.audio_url ? document.getElementById("story-audio-file") : new Gc).addEventListener("timeupdate", ru) : Xc = null
    }

    function au() {
        var r = 0;
        (Wc = Vc.story.slides.map(function(e, t) {
            var n = null == e.duration ? Vc.story.default_slide_duration : e.duration;
            return {
                timecode: r += n,
                index: t + 1
            }
        })).unshift({
            timecode: 0,
            index: 0
        })
    }

    function ou(e) {
        Xc && (Xc.currentTime = Wc[e].timecode)
    }

    function cu(e) {
        if (!e) return !1;
        var t = e.tagName;
        if ("TEXTAREA" === t || "INPUT" === t) return !0;
        for (; e.parentNode;) {
            if (e.isContentEditable) return !0;
            e = e.parentNode
        }
        return !1
    }

    function uu(e) {
        cu(e.target) || 32 != e.keyCode && 38 != e.keyCode && 40 != e.keyCode && 33 != e.keyCode && 34 != e.keyCode || e.preventDefault()
    }

    function fu(e) {
        cu(e.target) || (39 != e.keyCode && 40 != e.keyCode && 32 != e.keyCode && 34 != e.keyCode || Jc(), 37 != e.keyCode && 38 != e.keyCode && 33 != e.keyCode || $c())
    }(Gc.prototype = {
        get currentTime() {
            return this._current_time
        },
        set currentTime(e) {
            void 0 !== this._played_from && (this._played_from += e - this._current_time), this._current_time = e
        }
    }).addEventListener = function(e, t) {
            if ("timeupdate" !== e) throw new Error("Event type unsupported - must be timeupdate, not " + e);
            this._listeners.push(t)
        }, Gc.prototype.removeEventListener = function(e, t) {
            if ("timeupdate" !== e) throw new Error("Event type unsupported - must be timeupdate, not " + e);
            this._listeners = []
        }, Gc.prototype.play = function() {
            var n = this;
            this.paused = !1, this._played_from = n._current_time, this._t0 = null, requestAnimationFrame(function e(t) {
                n.paused || (null == n._t0 && (n._t0 = t), n._current_time = n._played_from + (t - n._t0) / 1e3, n._listeners.forEach(function(e) {
                    e.call(n)
                }), requestAnimationFrame(e))
            }), Zc || Qc(), Zc = !0
        }, Gc.prototype.pause = function() {
            this.paused = !0
        },
        function(e) {
            if ("object" == typeof t && "undefined" != typeof module) module.exports = e();
            else if ("function" == typeof define && define.amd) define([], e);
            else {
                ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = e()
            }
        }(function() {
            return function a(o, c, u) {
                function f(n, e) {
                    if (!c[n]) {
                        if (!o[n]) {
                            var t = "function" == typeof require && require;
                            if (!e && t) return t(n, !0);
                            if (s) return s(n, !0);
                            var r = new Error("Cannot find module '" + n + "'");
                            throw r.code = "MODULE_NOT_FOUND", r
                        }
                        var i = c[n] = {
                            exports: {}
                        };
                        o[n][0].call(i.exports, function(e) {
                            var t = o[n][1][e];
                            return f(t || e)
                        }, i, i.exports, a, o, c, u)
                    }
                    return c[n].exports
                }
                for (var s = "function" == typeof require && require, e = 0; e < u.length; e++) f(u[e]);
                return f
            }({
                1: [function(e, t, n) {
                    function r(e) {
                        this.name = "RavenConfigError", this.message = e
                    }(r.prototype = new Error).constructor = r, t.exports = r
                }, {}],
                2: [function(e, t, n) {
                    var u = e(5);
                    t.exports = {
                        wrapMethod: function(e, r, i) {
                            var a = e[r],
                                o = e;
                            if (r in e) {
                                var c = "warn" === r ? "warning" : r;
                                e[r] = function() {
                                    var e = [].slice.call(arguments),
                                        t = u.safeJoin(e, " "),
                                        n = {
                                            level: c,
                                            logger: "console",
                                            extra: {
                                                arguments: e
                                            }
                                        };
                                    "assert" === r ? !1 === e[0] && (t = "Assertion failed: " + (u.safeJoin(e.slice(1), " ") || "console.assert"), n.extra.arguments = e.slice(1), i && i(t, n)) : i && i(t, n), a && Function.prototype.apply.call(a, o, e)
                                }
                            }
                        }
                    }
                }, {
                    5: 5
                }],
                3: [function(z, V, e) {
                    (function(e) {
                        var u = z(6),
                            c = z(7),
                            i = z(8),
                            f = z(1),
                            t = z(5),
                            a = t.isErrorEvent,
                            o = t.isDOMError,
                            s = t.isDOMException,
                            l = t.isError,
                            d = t.isObject,
                            h = t.isPlainObject,
                            n = t.isUndefined,
                            p = t.isFunction,
                            b = t.isString,
                            g = t.isArray,
                            v = t.isEmptyObject,
                            m = t.each,
                            y = t.objectMerge,
                            _ = t.truncate,
                            w = t.objectFrozen,
                            x = t.hasKey,
                            T = t.joinRegExp,
                            S = t.urlencode,
                            r = t.uuid4,
                            k = t.htmlTreeAsString,
                            C = t.isSameException,
                            M = t.isSameStacktrace,
                            E = t.parseUrl,
                            A = t.fill,
                            D = t.supportsFetch,
                            U = t.supportsReferrerPolicy,
                            O = t.serializeKeysForMessage,
                            N = t.serializeException,
                            F = t.sanitize,
                            j = z(2).wrapMethod,
                            H = "source protocol user pass host port path".split(" "),
                            R = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

                        function P() {
                            return +new Date
                        }
                        var L = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {},
                            I = L.document,
                            q = L.navigator;

                        function Y(t, n) {
                            return p(n) ? function(e) {
                                return n(e, t)
                            } : n
                        }

                        function B() {
                            for (var e in this._hasJSON = !("object" != typeof JSON || !JSON.stringify), this._hasDocument = !n(I), this._hasNavigator = !n(q), this._lastCapturedException = null, this._lastData = null, this._lastEventId = null, this._globalServer = null, this._globalKey = null, this._globalProject = null, this._globalContext = {}, this._globalOptions = {
                                    release: L.SENTRY_RELEASE && L.SENTRY_RELEASE.id,
                                    logger: "javascript",
                                    ignoreErrors: [],
                                    ignoreUrls: [],
                                    whitelistUrls: [],
                                    includePaths: [],
                                    headers: null,
                                    collectWindowErrors: !0,
                                    captureUnhandledRejections: !0,
                                    maxMessageLength: 0,
                                    maxUrlLength: 250,
                                    stackTraceLimit: 50,
                                    autoBreadcrumbs: !0,
                                    instrument: !0,
                                    sampleRate: 1,
                                    sanitizeKeys: []
                                }, this._fetchDefaults = {
                                    method: "POST",
                                    referrerPolicy: U() ? "origin" : ""
                                }, this._ignoreOnError = 0, this._isRavenInstalled = !1, this._originalErrorStackTraceLimit = Error.stackTraceLimit, this._originalConsole = L.console || {}, this._originalConsoleMethods = {}, this._plugins = [], this._startTime = P(), this._wrappedBuiltIns = [], this._breadcrumbs = [], this._lastCapturedEvent = null, this._keypressTimeout, this._location = L.location, this._lastHref = this._location && this._location.href, this._resetBackoff(), this._originalConsole) this._originalConsoleMethods[e] = this._originalConsole[e]
                        }(B.prototype = {
                            VERSION: "3.27.2",
                            debug: !1,
                            TraceKit: u,
                            config: function(e, t) {
                                var n = this;
                                if (n._globalServer) return this._logDebug("error", "Error: Raven has already been configured"), n;
                                if (!e) return n;
                                var r = n._globalOptions;
                                t && m(t, function(e, t) {
                                    "tags" === e || "extra" === e || "user" === e ? n._globalContext[e] = t : r[e] = t
                                }), n.setDSN(e), r.ignoreErrors.push(/^Script error\.?$/), r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), r.ignoreErrors = T(r.ignoreErrors), r.ignoreUrls = !!r.ignoreUrls.length && T(r.ignoreUrls), r.whitelistUrls = !!r.whitelistUrls.length && T(r.whitelistUrls), r.includePaths = T(r.includePaths), r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                                var i = {
                                        xhr: !0,
                                        console: !0,
                                        dom: !0,
                                        location: !0,
                                        sentry: !0
                                    },
                                    a = r.autoBreadcrumbs;
                                "[object Object]" === {}.toString.call(a) ? a = y(i, a) : !1 !== a && (a = i), r.autoBreadcrumbs = a;
                                var o = {
                                        tryCatch: !0
                                    },
                                    c = r.instrument;
                                return "[object Object]" === {}.toString.call(c) ? c = y(o, c) : !1 !== c && (c = o), r.instrument = c, u.collectWindowErrors = !!r.collectWindowErrors, n
                            },
                            install: function() {
                                var e = this;
                                return e.isSetup() && !e._isRavenInstalled && (u.report.subscribe(function() {
                                    e._handleOnErrorStackInfo.apply(e, arguments)
                                }), e._globalOptions.captureUnhandledRejections && e._attachPromiseRejectionHandler(), e._patchFunctionToString(), e._globalOptions.instrument && e._globalOptions.instrument.tryCatch && e._instrumentTryCatch(), e._globalOptions.autoBreadcrumbs && e._instrumentBreadcrumbs(), e._drainPlugins(), e._isRavenInstalled = !0), Error.stackTraceLimit = e._globalOptions.stackTraceLimit, this
                            },
                            setDSN: function(e) {
                                var t = this,
                                    n = t._parseDSN(e),
                                    r = n.path.lastIndexOf("/"),
                                    i = n.path.substr(1, r);
                                t._dsn = e, t._globalKey = n.user, t._globalSecret = n.pass && n.pass.substr(1), t._globalProject = n.path.substr(r + 1), t._globalServer = t._getGlobalServer(n), t._globalEndpoint = t._globalServer + "/" + i + "api/" + t._globalProject + "/store/", this._resetBackoff()
                            },
                            context: function(e, t, n) {
                                return p(e) && (n = t || [], t = e, e = {}), this.wrap(e, t).apply(this, n)
                            },
                            wrap: function(r, i, a) {
                                var o = this;
                                if (n(i) && !p(r)) return r;
                                if (p(r) && (i = r, r = void 0), !p(i)) return i;
                                try {
                                    if (i.__raven__) return i;
                                    if (i.__raven_wrapper__) return i.__raven_wrapper__
                                } catch (e) {
                                    return i
                                }

                                function e() {
                                    var e = [],
                                        t = arguments.length,
                                        n = !r || r && !1 !== r.deep;
                                    for (a && p(a) && a.apply(this, arguments); t--;) e[t] = n ? o.wrap(r, arguments[t]) : arguments[t];
                                    try {
                                        return i.apply(this, e)
                                    } catch (e) {
                                        throw o._ignoreNextOnError(), o.captureException(e, r), e
                                    }
                                }
                                for (var t in i) x(i, t) && (e[t] = i[t]);
                                return e.prototype = i.prototype, (i.__raven_wrapper__ = e).__raven__ = !0, e.__orig__ = i, e
                            },
                            uninstall: function() {
                                return u.report.uninstall(), this._detachPromiseRejectionHandler(), this._unpatchFunctionToString(), this._restoreBuiltIns(), this._restoreConsole(), Error.stackTraceLimit = this._originalErrorStackTraceLimit, this._isRavenInstalled = !1, this
                            },
                            _promiseRejectionHandler: function(e) {
                                this._logDebug("debug", "Raven caught unhandled promise rejection:", e), this.captureException(e.reason, {
                                    mechanism: {
                                        type: "onunhandledrejection",
                                        handled: !1
                                    }
                                })
                            },
                            _attachPromiseRejectionHandler: function() {
                                return this._promiseRejectionHandler = this._promiseRejectionHandler.bind(this), L.addEventListener && L.addEventListener("unhandledrejection", this._promiseRejectionHandler), this
                            },
                            _detachPromiseRejectionHandler: function() {
                                return L.removeEventListener && L.removeEventListener("unhandledrejection", this._promiseRejectionHandler), this
                            },
                            captureException: function(t, e) {
                                if (e = y({
                                        trimHeadFrames: 0
                                    }, e || {}), a(t) && t.error) t = t.error;
                                else {
                                    if (o(t) || s(t)) {
                                        var n = t.name || (o(t) ? "DOMError" : "DOMException"),
                                            r = t.message ? n + ": " + t.message : n;
                                        return this.captureMessage(r, y(e, {
                                            stacktrace: !0,
                                            trimHeadFrames: e.trimHeadFrames + 1
                                        }))
                                    }
                                    if (l(t)) t = t;
                                    else {
                                        if (!h(t)) return this.captureMessage(t, y(e, {
                                            stacktrace: !0,
                                            trimHeadFrames: e.trimHeadFrames + 1
                                        }));
                                        e = this._getCaptureExceptionOptionsFromPlainObject(e, t), t = new Error(e.message)
                                    }
                                }
                                this._lastCapturedException = t;
                                try {
                                    var i = u.computeStackTrace(t);
                                    this._handleStackInfo(i, e)
                                } catch (e) {
                                    if (t !== e) throw e
                                }
                                return this
                            },
                            _getCaptureExceptionOptionsFromPlainObject: function(e, t) {
                                var n = Object.keys(t).sort(),
                                    r = y(e, {
                                        message: "Non-Error exception captured with keys: " + O(n),
                                        fingerprint: [i(n)],
                                        extra: e.extra || {}
                                    });
                                return r.extra.__serialized__ = N(t), r
                            },
                            captureMessage: function(e, t) {
                                if (!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(e)) {
                                    var n, r = y({
                                        message: e += ""
                                    }, t = t || {});
                                    try {
                                        throw new Error(e)
                                    } catch (e) {
                                        n = e
                                    }
                                    n.name = null;
                                    var i = u.computeStackTrace(n),
                                        a = g(i.stack) && i.stack[1];
                                    a && "Raven.captureException" === a.func && (a = i.stack[2]);
                                    var o = a && a.url || "";
                                    if ((!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(o)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(o))) {
                                        if (this._globalOptions.stacktrace || t.stacktrace || "" === r.message) {
                                            r.fingerprint = null == r.fingerprint ? e : r.fingerprint, (t = y({
                                                trimHeadFrames: 0
                                            }, t)).trimHeadFrames += 1;
                                            var c = this._prepareFrames(i, t);
                                            r.stacktrace = {
                                                frames: c.reverse()
                                            }
                                        }
                                        return r.fingerprint && (r.fingerprint = g(r.fingerprint) ? r.fingerprint : [r.fingerprint]), this._send(r), this
                                    }
                                }
                            },
                            captureBreadcrumb: function(e) {
                                var t = y({
                                    timestamp: P() / 1e3
                                }, e);
                                if (p(this._globalOptions.breadcrumbCallback)) {
                                    var n = this._globalOptions.breadcrumbCallback(t);
                                    if (d(n) && !v(n)) t = n;
                                    else if (!1 === n) return this
                                }
                                return this._breadcrumbs.push(t), this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(), this
                            },
                            addPlugin: function(e) {
                                var t = [].slice.call(arguments, 1);
                                return this._plugins.push([e, t]), this._isRavenInstalled && this._drainPlugins(), this
                            },
                            setUserContext: function(e) {
                                return this._globalContext.user = e, this
                            },
                            setExtraContext: function(e) {
                                return this._mergeContext("extra", e), this
                            },
                            setTagsContext: function(e) {
                                return this._mergeContext("tags", e), this
                            },
                            clearContext: function() {
                                return this._globalContext = {}, this
                            },
                            getContext: function() {
                                return JSON.parse(c(this._globalContext))
                            },
                            setEnvironment: function(e) {
                                return this._globalOptions.environment = e, this
                            },
                            setRelease: function(e) {
                                return this._globalOptions.release = e, this
                            },
                            setDataCallback: function(e) {
                                var t = this._globalOptions.dataCallback;
                                return this._globalOptions.dataCallback = Y(t, e), this
                            },
                            setBreadcrumbCallback: function(e) {
                                var t = this._globalOptions.breadcrumbCallback;
                                return this._globalOptions.breadcrumbCallback = Y(t, e), this
                            },
                            setShouldSendCallback: function(e) {
                                var t = this._globalOptions.shouldSendCallback;
                                return this._globalOptions.shouldSendCallback = Y(t, e), this
                            },
                            setTransport: function(e) {
                                return this._globalOptions.transport = e, this
                            },
                            lastException: function() {
                                return this._lastCapturedException
                            },
                            lastEventId: function() {
                                return this._lastEventId
                            },
                            isSetup: function() {
                                return !!this._hasJSON && (!!this._globalServer || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this._logDebug("error", "Error: Raven has not been configured.")), !1))
                            },
                            afterLoad: function() {
                                var e = L.RavenConfig;
                                e && this.config(e.dsn, e.config).install()
                            },
                            showReportDialog: function(e) {
                                if (I) {
                                    if (!(e = y({
                                            eventId: this.lastEventId(),
                                            dsn: this._dsn,
                                            user: this._globalContext.user || {}
                                        }, e)).eventId) throw new f("Missing eventId");
                                    if (!e.dsn) throw new f("Missing DSN");
                                    var t = encodeURIComponent,
                                        n = [];
                                    for (var r in e)
                                        if ("user" === r) {
                                            var i = e.user;
                                            i.name && n.push("name=" + t(i.name)), i.email && n.push("email=" + t(i.email))
                                        } else n.push(t(r) + "=" + t(e[r]));
                                    var a = this._getGlobalServer(this._parseDSN(e.dsn)),
                                        o = I.createElement("script");
                                    o.async = !0, o.src = a + "/api/embed/error-page/?" + n.join("&"), (I.head || I.body).appendChild(o)
                                }
                            },
                            _ignoreNextOnError: function() {
                                var e = this;
                                this._ignoreOnError += 1, setTimeout(function() {
                                    e._ignoreOnError -= 1
                                })
                            },
                            _triggerEvent: function(e, t) {
                                var n, r;
                                if (this._hasDocument) {
                                    for (r in t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), I.createEvent ? (n = I.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = I.createEventObject()).eventType = e, t) x(t, r) && (n[r] = t[r]);
                                    if (I.createEvent) I.dispatchEvent(n);
                                    else try {
                                        I.fireEvent("on" + n.eventType.toLowerCase(), n)
                                    } catch (e) {}
                                }
                            },
                            _breadcrumbEventHandler: function(n) {
                                var r = this;
                                return function(e) {
                                    if (r._keypressTimeout = null, r._lastCapturedEvent !== e) {
                                        var t;
                                        r._lastCapturedEvent = e;
                                        try {
                                            t = k(e.target)
                                        } catch (e) {
                                            t = "<unknown>"
                                        }
                                        r.captureBreadcrumb({
                                            category: "ui." + n,
                                            message: t
                                        })
                                    }
                                }
                            },
                            _keypressEventHandler: function() {
                                var i = this;
                                return function(e) {
                                    var t;
                                    try {
                                        t = e.target
                                    } catch (e) {
                                        return
                                    }
                                    var n = t && t.tagName;
                                    if (n && ("INPUT" === n || "TEXTAREA" === n || t.isContentEditable)) {
                                        var r = i._keypressTimeout;
                                        r || i._breadcrumbEventHandler("input")(e), clearTimeout(r), i._keypressTimeout = setTimeout(function() {
                                            i._keypressTimeout = null
                                        }, 1e3)
                                    }
                                }
                            },
                            _captureUrlChange: function(e, t) {
                                var n = E(this._location.href),
                                    r = E(t),
                                    i = E(e);
                                this._lastHref = t, n.protocol === r.protocol && n.host === r.host && (t = r.relative), n.protocol === i.protocol && n.host === i.host && (e = i.relative), this.captureBreadcrumb({
                                    category: "navigation",
                                    data: {
                                        to: t,
                                        from: e
                                    }
                                })
                            },
                            _patchFunctionToString: function() {
                                var e = this;
                                e._originalFunctionToString = Function.prototype.toString, Function.prototype.toString = function() {
                                    return "function" == typeof this && this.__raven__ ? e._originalFunctionToString.apply(this.__orig__, arguments) : e._originalFunctionToString.apply(this, arguments)
                                }
                            },
                            _unpatchFunctionToString: function() {
                                this._originalFunctionToString && (Function.prototype.toString = this._originalFunctionToString)
                            },
                            _instrumentTryCatch: function() {
                                var f = this,
                                    t = f._wrappedBuiltIns;

                                function e(a) {
                                    return function(e, t) {
                                        for (var n = new Array(arguments.length), r = 0; r < n.length; ++r) n[r] = arguments[r];
                                        var i = n[0];
                                        return p(i) && (n[0] = f.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    function: a.name || "<anonymous>"
                                                }
                                            }
                                        }, i)), a.apply ? a.apply(this, n) : a(n[0], n[1])
                                    }
                                }
                                var s = this._globalOptions.autoBreadcrumbs;

                                function n(u) {
                                    var e = L[u] && L[u].prototype;
                                    e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (A(e, "addEventListener", function(c) {
                                        return function(e, t, n, r) {
                                            try {
                                                t && t.handleEvent && (t.handleEvent = f.wrap({
                                                    mechanism: {
                                                        type: "instrument",
                                                        data: {
                                                            target: u,
                                                            function: "handleEvent",
                                                            handler: t && t.name || "<anonymous>"
                                                        }
                                                    }
                                                }, t.handleEvent))
                                            } catch (e) {}
                                            var i, a, o;
                                            return s && s.dom && ("EventTarget" === u || "Node" === u) && (a = f._breadcrumbEventHandler("click"), o = f._keypressEventHandler(), i = function(e) {
                                                if (e) {
                                                    var t;
                                                    try {
                                                        t = e.type
                                                    } catch (e) {
                                                        return
                                                    }
                                                    return "click" === t ? a(e) : "keypress" === t ? o(e) : void 0
                                                }
                                            }), c.call(this, e, f.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        target: u,
                                                        function: "addEventListener",
                                                        handler: t && t.name || "<anonymous>"
                                                    }
                                                }
                                            }, t, i), n, r)
                                        }
                                    }, t), A(e, "removeEventListener", function(i) {
                                        return function(e, t, n, r) {
                                            try {
                                                t = t && (t.__raven_wrapper__ ? t.__raven_wrapper__ : t)
                                            } catch (e) {}
                                            return i.call(this, e, t, n, r)
                                        }
                                    }, t))
                                }
                                A(L, "setTimeout", e, t), A(L, "setInterval", e, t), L.requestAnimationFrame && A(L, "requestAnimationFrame", function(t) {
                                    return function(e) {
                                        return t(f.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    function: "requestAnimationFrame",
                                                    handler: t && t.name || "<anonymous>"
                                                }
                                            }
                                        }, e))
                                    }
                                }, t);
                                for (var r = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], i = 0; i < r.length; i++) n(r[i])
                            },
                            _instrumentBreadcrumbs: function() {
                                var c = this,
                                    e = this._globalOptions.autoBreadcrumbs,
                                    t = c._wrappedBuiltIns;

                                function a(t, e) {
                                    t in e && p(e[t]) && A(e, t, function(e) {
                                        return c.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    function: t,
                                                    handler: e && e.name || "<anonymous>"
                                                }
                                            }
                                        }, e)
                                    })
                                }
                                if (e.xhr && "XMLHttpRequest" in L) {
                                    var n = L.XMLHttpRequest && L.XMLHttpRequest.prototype;
                                    A(n, "open", function(n) {
                                        return function(e, t) {
                                            return b(t) && -1 === t.indexOf(c._globalKey) && (this.__raven_xhr = {
                                                method: e,
                                                url: t,
                                                status_code: null
                                            }), n.apply(this, arguments)
                                        }
                                    }, t), A(n, "send", function(i) {
                                        return function() {
                                            var e = this;

                                            function t() {
                                                if (e.__raven_xhr && 4 === e.readyState) {
                                                    try {
                                                        e.__raven_xhr.status_code = e.status
                                                    } catch (e) {}
                                                    c.captureBreadcrumb({
                                                        type: "http",
                                                        category: "xhr",
                                                        data: e.__raven_xhr
                                                    })
                                                }
                                            }
                                            for (var n = ["onload", "onerror", "onprogress"], r = 0; r < n.length; r++) a(n[r], e);
                                            return "onreadystatechange" in e && p(e.onreadystatechange) ? A(e, "onreadystatechange", function(e) {
                                                return c.wrap({
                                                    mechanism: {
                                                        type: "instrument",
                                                        data: {
                                                            function: "onreadystatechange",
                                                            handler: e && e.name || "<anonymous>"
                                                        }
                                                    }
                                                }, e, t)
                                            }) : e.onreadystatechange = t, i.apply(this, arguments)
                                        }
                                    }, t)
                                }
                                e.xhr && D() && A(L, "fetch", function(o) {
                                    return function() {
                                        for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
                                        var n, r = e[0],
                                            i = "GET";
                                        if ("string" == typeof r ? n = r : "Request" in L && r instanceof L.Request ? (n = r.url, r.method && (i = r.method)) : n = "" + r, -1 !== n.indexOf(c._globalKey)) return o.apply(this, e);
                                        e[1] && e[1].method && (i = e[1].method);
                                        var a = {
                                            method: i,
                                            url: n,
                                            status_code: null
                                        };
                                        return o.apply(this, e).then(function(e) {
                                            return a.status_code = e.status, c.captureBreadcrumb({
                                                type: "http",
                                                category: "fetch",
                                                data: a
                                            }), e
                                        }).catch(function(e) {
                                            throw c.captureBreadcrumb({
                                                type: "http",
                                                category: "fetch",
                                                data: a,
                                                level: "error"
                                            }), e
                                        })
                                    }
                                }, t), e.dom && this._hasDocument && (I.addEventListener ? (I.addEventListener("click", c._breadcrumbEventHandler("click"), !1), I.addEventListener("keypress", c._keypressEventHandler(), !1)) : I.attachEvent && (I.attachEvent("onclick", c._breadcrumbEventHandler("click")), I.attachEvent("onkeypress", c._keypressEventHandler())));
                                var r = L.chrome,
                                    i = !(r && r.app && r.app.runtime) && L.history && L.history.pushState && L.history.replaceState;
                                if (e.location && i) {
                                    var o = L.onpopstate;
                                    L.onpopstate = function() {
                                        var e = c._location.href;
                                        if (c._captureUrlChange(c._lastHref, e), o) return o.apply(this, arguments)
                                    };
                                    var u = function(t) {
                                        return function() {
                                            var e = 2 < arguments.length ? arguments[2] : void 0;
                                            return e && c._captureUrlChange(c._lastHref, e + ""), t.apply(this, arguments)
                                        }
                                    };
                                    A(L.history, "pushState", u, t), A(L.history, "replaceState", u, t)
                                }
                                if (e.console && "console" in L && console.log) {
                                    var f = function(e, t) {
                                        c.captureBreadcrumb({
                                            message: e,
                                            level: t.level,
                                            category: "console"
                                        })
                                    };
                                    m(["debug", "info", "warn", "error", "log"], function(e, t) {
                                        j(console, t, f)
                                    })
                                }
                            },
                            _restoreBuiltIns: function() {
                                for (var e; this._wrappedBuiltIns.length;) {
                                    var t = (e = this._wrappedBuiltIns.shift())[0],
                                        n = e[1],
                                        r = e[2];
                                    t[n] = r
                                }
                            },
                            _restoreConsole: function() {
                                for (var e in this._originalConsoleMethods) this._originalConsole[e] = this._originalConsoleMethods[e]
                            },
                            _drainPlugins: function() {
                                var i = this;
                                m(this._plugins, function(e, t) {
                                    var n = t[0],
                                        r = t[1];
                                    n.apply(i, [i].concat(r))
                                })
                            },
                            _parseDSN: function(t) {
                                var e = R.exec(t),
                                    n = {},
                                    r = 7;
                                try {
                                    for (; r--;) n[H[r]] = e[r] || ""
                                } catch (e) {
                                    throw new f("Invalid DSN: " + t)
                                }
                                if (n.pass && !this._globalOptions.allowSecretKey) throw new f("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                                return n
                            },
                            _getGlobalServer: function(e) {
                                var t = "//" + e.host + (e.port ? ":" + e.port : "");
                                return e.protocol && (t = e.protocol + ":" + t), t
                            },
                            _handleOnErrorStackInfo: function(e, t) {
                                (t = t || {}).mechanism = t.mechanism || {
                                    type: "onerror",
                                    handled: !1
                                }, this._ignoreOnError || this._handleStackInfo(e, t)
                            },
                            _handleStackInfo: function(e, t) {
                                var n = this._prepareFrames(e, t);
                                this._triggerEvent("handle", {
                                    stackInfo: e,
                                    options: t
                                }), this._processException(e.name, e.message, e.url, e.lineno, n, t)
                            },
                            _prepareFrames: function(r, e) {
                                var i = this,
                                    a = [];
                                if (r.stack && r.stack.length && (m(r.stack, function(e, t) {
                                        var n = i._normalizeFrame(t, r.url);
                                        n && a.push(n)
                                    }), e && e.trimHeadFrames))
                                    for (var t = 0; t < e.trimHeadFrames && t < a.length; t++) a[t].in_app = !1;
                                return a = a.slice(0, this._globalOptions.stackTraceLimit)
                            },
                            _normalizeFrame: function(e, t) {
                                var n = {
                                    filename: e.url,
                                    lineno: e.line,
                                    colno: e.column,
                                    function: e.func || "?"
                                };
                                return e.url || (n.filename = t), n.in_app = !(this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n.function) || /raven\.(min\.)?js$/.test(n.filename)), n
                            },
                            _processException: function(e, t, n, r, i, a) {
                                var o, c = (e ? e + ": " : "") + (t || "");
                                if ((!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(t) && !this._globalOptions.ignoreErrors.test(c)) && (i && i.length ? (n = i[0].filename || n, i.reverse(), o = {
                                        frames: i
                                    }) : n && (o = {
                                        frames: [{
                                            filename: n,
                                            lineno: r,
                                            in_app: !0
                                        }]
                                    }), (!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(n)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(n)))) {
                                    var u = y({
                                            exception: {
                                                values: [{
                                                    type: e,
                                                    value: t,
                                                    stacktrace: o
                                                }]
                                            },
                                            transaction: n
                                        }, a),
                                        f = u.exception.values[0];
                                    null == f.type && "" === f.value && (f.value = "Unrecoverable error caught"), !u.exception.mechanism && u.mechanism && (u.exception.mechanism = u.mechanism, delete u.mechanism), u.exception.mechanism = y({
                                        type: "generic",
                                        handled: !0
                                    }, u.exception.mechanism || {}), this._send(u)
                                }
                            },
                            _trimPacket: function(e) {
                                var t = this._globalOptions.maxMessageLength;
                                if (e.message && (e.message = _(e.message, t)), e.exception) {
                                    var n = e.exception.values[0];
                                    n.value = _(n.value, t)
                                }
                                var r = e.request;
                                return r && (r.url && (r.url = _(r.url, this._globalOptions.maxUrlLength)), r.Referer && (r.Referer = _(r.Referer, this._globalOptions.maxUrlLength))), e.breadcrumbs && e.breadcrumbs.values && this._trimBreadcrumbs(e.breadcrumbs), e
                            },
                            _trimBreadcrumbs: function(e) {
                                for (var t, n, r, i = ["to", "from", "url"], a = 0; a < e.values.length; ++a)
                                    if ((n = e.values[a]).hasOwnProperty("data") && d(n.data) && !w(n.data)) {
                                        r = y({}, n.data);
                                        for (var o = 0; o < i.length; ++o) t = i[o], r.hasOwnProperty(t) && r[t] && (r[t] = _(r[t], this._globalOptions.maxUrlLength));
                                        e.values[a].data = r
                                    }
                            },
                            _getHttpData: function() {
                                if (this._hasNavigator || this._hasDocument) {
                                    var e = {};
                                    return this._hasNavigator && q.userAgent && (e.headers = {
                                        "User-Agent": q.userAgent
                                    }), L.location && L.location.href && (e.url = L.location.href), this._hasDocument && I.referrer && (e.headers || (e.headers = {}), e.headers.Referer = I.referrer), e
                                }
                            },
                            _resetBackoff: function() {
                                this._backoffDuration = 0, this._backoffStart = null
                            },
                            _shouldBackoff: function() {
                                return this._backoffDuration && P() - this._backoffStart < this._backoffDuration
                            },
                            _isRepeatData: function(e) {
                                var t = this._lastData;
                                return !(!t || e.message !== t.message || e.transaction !== t.transaction) && (e.stacktrace || t.stacktrace ? M(e.stacktrace, t.stacktrace) : e.exception || t.exception ? C(e.exception, t.exception) : !e.fingerprint && !t.fingerprint || Boolean(e.fingerprint && t.fingerprint) && JSON.stringify(e.fingerprint) === JSON.stringify(t.fingerprint))
                            },
                            _setBackoffState: function(e) {
                                if (!this._shouldBackoff()) {
                                    var t = e.status;
                                    if (400 === t || 401 === t || 429 === t) {
                                        var n;
                                        try {
                                            n = D() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After"), n = 1e3 * parseInt(n, 10)
                                        } catch (e) {}
                                        this._backoffDuration = n || (2 * this._backoffDuration || 1e3), this._backoffStart = P()
                                    }
                                }
                            },
                            _send: function(t) {
                                var e = this._globalOptions,
                                    n = {
                                        project: this._globalProject,
                                        logger: e.logger,
                                        platform: "javascript"
                                    },
                                    r = this._getHttpData();
                                r && (n.request = r), t.trimHeadFrames && delete t.trimHeadFrames, (t = y(n, t)).tags = y(y({}, this._globalContext.tags), t.tags), t.extra = y(y({}, this._globalContext.extra), t.extra), t.extra["session:duration"] = P() - this._startTime, this._breadcrumbs && 0 < this._breadcrumbs.length && (t.breadcrumbs = {
                                    values: [].slice.call(this._breadcrumbs, 0)
                                }), this._globalContext.user && (t.user = this._globalContext.user), e.environment && (t.environment = e.environment), e.release && (t.release = e.release), e.serverName && (t.server_name = e.serverName), t = this._sanitizeData(t), Object.keys(t).forEach(function(e) {
                                    null != t[e] && "" !== t[e] && !v(t[e]) || delete t[e]
                                }), p(e.dataCallback) && (t = e.dataCallback(t) || t), t && !v(t) && (p(e.shouldSendCallback) && !e.shouldSendCallback(t) || (this._shouldBackoff() ? this._logDebug("warn", "Raven dropped error due to backoff: ", t) : "number" == typeof e.sampleRate ? Math.random() < e.sampleRate && this._sendProcessedPayload(t) : this._sendProcessedPayload(t)))
                            },
                            _sanitizeData: function(e) {
                                return F(e, this._globalOptions.sanitizeKeys)
                            },
                            _getUuid: function() {
                                return r()
                            },
                            _sendProcessedPayload: function(t, n) {
                                var r = this,
                                    e = this._globalOptions;
                                if (this.isSetup())
                                    if (t = this._trimPacket(t), this._globalOptions.allowDuplicates || !this._isRepeatData(t)) {
                                        this._lastEventId = t.event_id || (t.event_id = this._getUuid()), this._lastData = t, this._logDebug("debug", "Raven about to send:", t);
                                        var i = {
                                            sentry_version: "7",
                                            sentry_client: "raven-js/" + this.VERSION,
                                            sentry_key: this._globalKey
                                        };
                                        this._globalSecret && (i.sentry_secret = this._globalSecret);
                                        var a = t.exception && t.exception.values[0];
                                        this._globalOptions.autoBreadcrumbs && this._globalOptions.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                            category: "sentry",
                                            message: a ? (a.type ? a.type + ": " : "") + a.value : t.message,
                                            event_id: t.event_id,
                                            level: t.level || "error"
                                        });
                                        var o = this._globalEndpoint;
                                        (e.transport || this._makeRequest).call(this, {
                                            url: o,
                                            auth: i,
                                            data: t,
                                            options: e,
                                            onSuccess: function() {
                                                r._resetBackoff(), r._triggerEvent("success", {
                                                    data: t,
                                                    src: o
                                                }), n && n()
                                            },
                                            onError: function(e) {
                                                r._logDebug("error", "Raven transport failed to send: ", e), e.request && r._setBackoffState(e.request), r._triggerEvent("failure", {
                                                    data: t,
                                                    src: o
                                                }), e = e || new Error("Raven send failed (no additional details provided)"), n && n(e)
                                            }
                                        })
                                    } else this._logDebug("warn", "Raven dropped repeat event: ", t)
                            },
                            _makeRequest: function(n) {
                                var e = n.url + "?" + S(n.auth),
                                    t = null,
                                    r = {};
                                if (n.options.headers && (t = this._evaluateHash(n.options.headers)), n.options.fetchParameters && (r = this._evaluateHash(n.options.fetchParameters)), D()) {
                                    r.body = c(n.data);
                                    var i = y({}, this._fetchDefaults),
                                        a = y(i, r);
                                    return t && (a.headers = t), L.fetch(e, a).then(function(e) {
                                        if (e.ok) n.onSuccess && n.onSuccess();
                                        else {
                                            var t = new Error("Sentry error code: " + e.status);
                                            t.request = e, n.onError && n.onError(t)
                                        }
                                    }).catch(function() {
                                        n.onError && n.onError(new Error("Sentry error code: network unavailable"))
                                    })
                                }
                                var o = L.XMLHttpRequest && new L.XMLHttpRequest;
                                o && ("withCredentials" in o || "undefined" != typeof XDomainRequest) && ("withCredentials" in o ? o.onreadystatechange = function() {
                                    if (4 === o.readyState)
                                        if (200 === o.status) n.onSuccess && n.onSuccess();
                                        else if (n.onError) {
                                        var e = new Error("Sentry error code: " + o.status);
                                        e.request = o, n.onError(e)
                                    }
                                } : (o = new XDomainRequest, e = e.replace(/^https?:/, ""), n.onSuccess && (o.onload = n.onSuccess), n.onError && (o.onerror = function() {
                                    var e = new Error("Sentry error code: XDomainRequest");
                                    e.request = o, n.onError(e)
                                })), o.open("POST", e), t && m(t, function(e, t) {
                                    o.setRequestHeader(e, t)
                                }), o.send(c(n.data)))
                            },
                            _evaluateHash: function(e) {
                                var t = {};
                                for (var n in e)
                                    if (e.hasOwnProperty(n)) {
                                        var r = e[n];
                                        t[n] = "function" == typeof r ? r() : r
                                    }
                                return t
                            },
                            _logDebug: function(e) {
                                this._originalConsoleMethods[e] && (this.debug || this._globalOptions.debug) && Function.prototype.apply.call(this._originalConsoleMethods[e], this._originalConsole, [].slice.call(arguments, 1))
                            },
                            _mergeContext: function(e, t) {
                                n(t) ? delete this._globalContext[e] : this._globalContext[e] = y(this._globalContext[e] || {}, t)
                            }
                        }).setUser = B.prototype.setUserContext, B.prototype.setReleaseContext = B.prototype.setRelease, V.exports = B
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    1: 1,
                    2: 2,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8
                }],
                4: [function(a, o, e) {
                    (function(e) {
                        var t = a(3),
                            n = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {},
                            r = n.Raven,
                            i = new t;
                        i.noConflict = function() {
                            return n.Raven = r, i
                        }, i.afterLoad(), o.exports = i, o.exports.Client = t
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    3: 3
                }],
                5: [function(y, _, e) {
                    (function(e) {
                        var o = y(7),
                            r = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {};

                        function i(e) {
                            return void 0 === e
                        }

                        function c(e) {
                            return "[object Object]" === Object.prototype.toString.call(e)
                        }

                        function u(e) {
                            return "[object String]" === Object.prototype.toString.call(e)
                        }

                        function f(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }

                        function t() {
                            if (!("fetch" in r)) return !1;
                            try {
                                return new Headers, new Request(""), new Response, !0
                            } catch (e) {
                                return !1
                            }
                        }

                        function a(e, t) {
                            var n, r;
                            if (i(e.length))
                                for (n in e) s(e, n) && t.call(null, n, e[n]);
                            else if (r = e.length)
                                for (n = 0; n < r; n++) t.call(null, n, e[n])
                        }

                        function n(e, t) {
                            if ("number" != typeof t) throw new Error("2nd argument to `truncate` function should be a number");
                            return "string" != typeof e || 0 === t ? e : e.length <= t ? e : e.substr(0, t) + "…"
                        }

                        function s(e, t) {
                            return Object.prototype.hasOwnProperty.call(e, t)
                        }

                        function l(e) {
                            for (var t, n = [], r = 0, i = e.length; r < i; r++) u(t = e[r]) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
                            return new RegExp(n.join("|"), "i")
                        }

                        function d(e) {
                            var t, n, r, i, a, o = [];
                            if (!e || !e.tagName) return "";
                            if (o.push(e.tagName.toLowerCase()), e.id && o.push("#" + e.id), (t = e.className) && u(t))
                                for (n = t.split(/\s+/), a = 0; a < n.length; a++) o.push("." + n[a]);
                            var c = ["type", "name", "title", "alt"];
                            for (a = 0; a < c.length; a++) r = c[a], (i = e.getAttribute(r)) && o.push("[" + r + '="' + i + '"]');
                            return o.join("")
                        }

                        function h(e, t) {
                            return !!(!!e ^ !!t)
                        }

                        function p(e, t) {
                            if (h(e, t)) return !1;
                            var n, r, i = e.frames,
                                a = t.frames;
                            if (void 0 === i || void 0 === a) return !1;
                            if (i.length !== a.length) return !1;
                            for (var o = 0; o < i.length; o++)
                                if (n = i[o], r = a[o], n.filename !== r.filename || n.lineno !== r.lineno || n.colno !== r.colno || n.function !== r.function) return !1;
                            return !0
                        }
                        var b = 3,
                            g = 51200;

                        function v(e) {
                            return function(e) {
                                return ~-encodeURI(e).split(/%..|./).length
                            }(JSON.stringify(e))
                        }

                        function m(e) {
                            if ("string" == typeof e) {
                                return n(e, 40)
                            }
                            if ("number" == typeof e || "boolean" == typeof e || void 0 === e) return e;
                            var t = Object.prototype.toString.call(e);
                            return "[object Object]" === t ? "[Object]" : "[object Array]" === t ? "[Array]" : "[object Function]" === t ? e.name ? "[Function: " + e.name + "]" : "[Function]" : e
                        }
                        _.exports = {
                            isObject: function(e) {
                                return "object" == typeof e && null !== e
                            },
                            isError: function(e) {
                                switch (Object.prototype.toString.call(e)) {
                                    case "[object Error]":
                                    case "[object Exception]":
                                    case "[object DOMException]":
                                        return !0;
                                    default:
                                        return e instanceof Error
                                }
                            },
                            isErrorEvent: function(e) {
                                return "[object ErrorEvent]" === Object.prototype.toString.call(e)
                            },
                            isDOMError: function(e) {
                                return "[object DOMError]" === Object.prototype.toString.call(e)
                            },
                            isDOMException: function(e) {
                                return "[object DOMException]" === Object.prototype.toString.call(e)
                            },
                            isUndefined: i,
                            isFunction: function(e) {
                                return "function" == typeof e
                            },
                            isPlainObject: c,
                            isString: u,
                            isArray: f,
                            isEmptyObject: function(e) {
                                if (!c(e)) return !1;
                                for (var t in e)
                                    if (e.hasOwnProperty(t)) return !1;
                                return !0
                            },
                            supportsErrorEvent: function() {
                                try {
                                    return new ErrorEvent(""), !0
                                } catch (e) {
                                    return !1
                                }
                            },
                            supportsDOMError: function() {
                                try {
                                    return new DOMError(""), !0
                                } catch (e) {
                                    return !1
                                }
                            },
                            supportsDOMException: function() {
                                try {
                                    return new DOMException(""), !0
                                } catch (e) {
                                    return !1
                                }
                            },
                            supportsFetch: t,
                            supportsReferrerPolicy: function() {
                                if (!t()) return !1;
                                try {
                                    return new Request("pickleRick", {
                                        referrerPolicy: "origin"
                                    }), !0
                                } catch (e) {
                                    return !1
                                }
                            },
                            supportsPromiseRejectionEvent: function() {
                                return "function" == typeof PromiseRejectionEvent
                            },
                            wrappedCallback: function(r) {
                                return function(e, t) {
                                    var n = r(e) || e;
                                    return t && t(n) || n
                                }
                            },
                            each: a,
                            objectMerge: function(n, e) {
                                return e && a(e, function(e, t) {
                                    n[e] = t
                                }), n
                            },
                            truncate: n,
                            objectFrozen: function(e) {
                                return !!Object.isFrozen && Object.isFrozen(e)
                            },
                            hasKey: s,
                            joinRegExp: l,
                            urlencode: function(e) {
                                var n = [];
                                return a(e, function(e, t) {
                                    n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
                                }), n.join("&")
                            },
                            uuid4: function() {
                                var e = r.crypto || r.msCrypto;
                                if (i(e) || !e.getRandomValues) return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                                    var t = 16 * Math.random() | 0;
                                    return ("x" === e ? t : 3 & t | 8).toString(16)
                                });
                                var t = new Uint16Array(8);

                                function n(e) {
                                    for (var t = e.toString(16); t.length < 4;) t = "0" + t;
                                    return t
                                }
                                return e.getRandomValues(t), t[3] = 4095 & t[3] | 16384, t[4] = 16383 & t[4] | 32768, n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
                            },
                            htmlTreeAsString: function(e) {
                                for (var t, n = [], r = 0, i = 0, a = " > ".length; e && r++ < 5 && !("html" === (t = d(e)) || 1 < r && 80 <= i + n.length * a + t.length);) n.push(t), i += t.length, e = e.parentNode;
                                return n.reverse().join(" > ")
                            },
                            htmlElementAsString: d,
                            isSameException: function(e, t) {
                                return !h(e, t) && (e = e.values[0], t = t.values[0], e.type === t.type && e.value === t.value && ! function(e, t) {
                                    return i(e) && i(t)
                                }(e.stacktrace, t.stacktrace) && p(e.stacktrace, t.stacktrace))
                            },
                            isSameStacktrace: p,
                            parseUrl: function(e) {
                                if ("string" != typeof e) return {};
                                var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                                    n = t[6] || "",
                                    r = t[8] || "";
                                return {
                                    protocol: t[2],
                                    host: t[4],
                                    path: t[5],
                                    relative: t[5] + n + r
                                }
                            },
                            fill: function(e, t, n, r) {
                                if (null != e) {
                                    var i = e[t];
                                    e[t] = n(i), e[t].__raven__ = !0, e[t].__orig__ = i, r && r.push([e, t, i])
                                }
                            },
                            safeJoin: function(e, t) {
                                if (!f(e)) return "";
                                for (var n = [], r = 0; r < e.length; r++) try {
                                    n.push(String(e[r]))
                                } catch (e) {
                                    n.push("[value cannot be serialized]")
                                }
                                return n.join(t)
                            },
                            serializeException: function e(t, n, r) {
                                if (!c(t)) return t;
                                r = "number" != typeof(n = "number" != typeof n ? b : n) ? g : r;
                                var i = function n(r, i) {
                                    return 0 === i ? m(r) : c(r) ? Object.keys(r).reduce(function(e, t) {
                                        return e[t] = n(r[t], i - 1), e
                                    }, {}) : Array.isArray(r) ? r.map(function(e) {
                                        return n(e, i - 1)
                                    }) : m(r)
                                }(t, n);
                                return v(o(i)) > r ? e(t, n - 1) : i
                            },
                            serializeKeysForMessage: function(e, t) {
                                if ("number" == typeof e || "string" == typeof e) return e.toString();
                                if (!Array.isArray(e)) return "";
                                if (0 === (e = e.filter(function(e) {
                                        return "string" == typeof e
                                    })).length) return "[object has no keys]";
                                if (t = "number" != typeof t ? 40 : t, e[0].length >= t) return e[0];
                                for (var n = e.length; 0 < n; n--) {
                                    var r = e.slice(0, n).join(", ");
                                    if (!(r.length > t)) return n === e.length ? r : r + "…"
                                }
                                return ""
                            },
                            sanitize: function(t, e) {
                                if (!f(e) || f(e) && 0 === e.length) return t;
                                var n, i = l(e),
                                    a = "********";
                                try {
                                    n = JSON.parse(o(t))
                                } catch (e) {
                                    return t
                                }
                                return function n(r) {
                                    return f(r) ? r.map(function(e) {
                                        return n(e)
                                    }) : c(r) ? Object.keys(r).reduce(function(e, t) {
                                        return i.test(t) ? e[t] = a : e[t] = n(r[t]), e
                                    }, {}) : r
                                }(n)
                            }
                        }
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    7: 7
                }],
                6: [function(w, x, e) {
                    (function(e) {
                        var s, t, i, a, o, l, d = w(5),
                            h = {
                                collectWindowErrors: !0,
                                debug: !1
                            },
                            n = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {},
                            c = [].slice,
                            p = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

                        function m() {
                            return "undefined" == typeof document || null == document.location ? "" : document.location.href
                        }

                        function b(e, t) {
                            var n = null;
                            if (!t || h.collectWindowErrors) {
                                for (var r in i)
                                    if (i.hasOwnProperty(r)) try {
                                        i[r].apply(null, [e].concat(c.call(arguments, 2)))
                                    } catch (e) {
                                        n = e
                                    }
                                if (n) throw n
                            }
                        }

                        function r(e, t, n, r, i) {
                            var a = d.isErrorEvent(i) ? i.error : i,
                                o = d.isErrorEvent(e) ? e.message : e;
                            if (l) h.computeStackTrace.augmentStackTraceWithInitialElement(l, t, n, o), g();
                            else if (a && d.isError(a)) b(h.computeStackTrace(a), !0);
                            else {
                                var c, u = {
                                        url: t,
                                        line: n,
                                        column: r
                                    },
                                    f = void 0;
                                if ("[object String]" === {}.toString.call(o))(c = o.match(p)) && (f = c[1], o = c[2]);
                                u.func = "?", b({
                                    name: f,
                                    message: o,
                                    url: m(),
                                    stack: [u]
                                }, !0)
                            }
                            return !!s && s.apply(this, arguments)
                        }

                        function g() {
                            var e = l,
                                t = a;
                            b.apply(o = l = a = null, [e, !1].concat(t))
                        }

                        function u(e, t) {
                            var n = c.call(arguments, 1);
                            if (l) {
                                if (o === e) return;
                                g()
                            }
                            var r = h.computeStackTrace(e);
                            if (l = r, o = e, a = n, setTimeout(function() {
                                    o === e && g()
                                }, r.incomplete ? 2e3 : 0), !1 !== t) throw e
                        }

                        function f(e) {
                            if (void 0 !== e.stack && e.stack) {
                                for (var t, n, r, i = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, o = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, c = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, u = /\((\S*)(?::(\d+))(?::(\d+))\)/, f = e.stack.split("\n"), s = [], l = (/^(.*) is undefined$/.exec(e.message), 0), d = f.length; l < d; ++l) {
                                    if (n = i.exec(f[l])) {
                                        var h = n[2] && 0 === n[2].indexOf("native");
                                        n[2] && 0 === n[2].indexOf("eval") && (t = u.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), r = {
                                            url: h ? null : n[2],
                                            func: n[1] || "?",
                                            args: h ? [n[2]] : [],
                                            line: n[3] ? +n[3] : null,
                                            column: n[4] ? +n[4] : null
                                        }
                                    } else if (n = a.exec(f[l])) r = {
                                        url: n[2],
                                        func: n[1] || "?",
                                        args: [],
                                        line: +n[3],
                                        column: n[4] ? +n[4] : null
                                    };
                                    else {
                                        if (!(n = o.exec(f[l]))) continue;
                                        n[3] && -1 < n[3].indexOf(" > eval") && (t = c.exec(n[3])) ? (n[3] = t[1], n[4] = t[2], n[5] = null) : 0 !== l || n[5] || void 0 === e.columnNumber || (s[0].column = e.columnNumber + 1), r = {
                                            url: n[3],
                                            func: n[1] || "?",
                                            args: n[2] ? n[2].split(",") : [],
                                            line: n[4] ? +n[4] : null,
                                            column: n[5] ? +n[5] : null
                                        }
                                    }
                                    if (!r.func && r.line && (r.func = "?"), r.url && "blob:" === r.url.substr(0, 5)) {
                                        var p = new XMLHttpRequest;
                                        if (p.open("GET", r.url, !1), p.send(null), 200 === p.status) {
                                            var b = p.responseText || "",
                                                g = (b = b.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                            if (g) {
                                                var v = g[1];
                                                "~" === v.charAt(0) && (v = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + v.slice(1)), r.url = v.slice(0, -4)
                                            }
                                        }
                                    }
                                    s.push(r)
                                }
                                return s.length ? {
                                    name: e.name,
                                    message: e.message,
                                    url: m(),
                                    stack: s
                                } : null
                            }
                        }

                        function v(e, t, n, r) {
                            var i = {
                                url: t,
                                line: n
                            };
                            if (i.url && i.line) {
                                if (e.incomplete = !1, i.func || (i.func = "?"), 0 < e.stack.length && e.stack[0].url === i.url) {
                                    if (e.stack[0].line === i.line) return !1;
                                    if (!e.stack[0].line && e.stack[0].func === i.func) return e.stack[0].line = i.line, !1
                                }
                                return e.stack.unshift(i), e.partial = !0
                            }
                            return !(e.incomplete = !0)
                        }

                        function y(e, t) {
                            for (var n, r, i = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, a = [], o = {}, c = !1, u = y.caller; u && !c; u = u.caller)
                                if (u !== _ && u !== h.report) {
                                    if (r = {
                                            url: null,
                                            func: "?",
                                            line: null,
                                            column: null
                                        }, u.name ? r.func = u.name : (n = i.exec(u.toString())) && (r.func = n[1]), void 0 === r.func) try {
                                        r.func = n.input.substring(0, n.input.indexOf("{"))
                                    } catch (e) {}
                                    o["" + u] ? c = !0 : o["" + u] = !0, a.push(r)
                                }
                            t && a.splice(0, t);
                            var f = {
                                name: e.name,
                                message: e.message,
                                url: m(),
                                stack: a
                            };
                            return v(f, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), f
                        }

                        function _(e, t) {
                            var n = null;
                            t = null == t ? 0 : +t;
                            try {
                                if (n = f(e)) return n
                            } catch (e) {
                                if (h.debug) throw e
                            }
                            try {
                                if (n = y(e, t + 1)) return n
                            } catch (e) {
                                if (h.debug) throw e
                            }
                            return {
                                name: e.name,
                                message: e.message,
                                url: m()
                            }
                        }
                        h.report = (i = [], l = o = a = null, u.subscribe = function(e) {
                            t || (s = n.onerror, n.onerror = r, t = !0), i.push(e)
                        }, u.unsubscribe = function(e) {
                            for (var t = i.length - 1; 0 <= t; --t) i[t] === e && i.splice(t, 1)
                        }, u.uninstall = function() {
                            t && (n.onerror = s, t = !1, s = void 0), i = []
                        }, u), h.computeStackTrace = (_.augmentStackTraceWithInitialElement = v, _.computeStackTraceFromStackProp = f, _), x.exports = h
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    5: 5
                }],
                7: [function(e, t, n) {
                    function c(e, t) {
                        for (var n = 0; n < e.length; ++n)
                            if (e[n] === t) return n;
                        return -1
                    }

                    function i(r, i) {
                        var a = [],
                            o = [];
                        return null == i && (i = function(e, t) {
                                return a[0] === t ? "[Circular ~]" : "[Circular ~." + o.slice(0, c(a, t)).join(".") + "]"
                            }),
                            function(e, t) {
                                if (0 < a.length) {
                                    var n = c(a, this);
                                    ~n ? a.splice(n + 1) : a.push(this), ~n ? o.splice(n, 1 / 0, e) : o.push(e), ~c(a, t) && (t = i.call(this, e, t))
                                } else a.push(t);
                                return null == r ? t instanceof Error ? function(e) {
                                    var t = {
                                        stack: e.stack,
                                        message: e.message,
                                        name: e.name
                                    };
                                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                                    return t
                                }(t) : t : r.call(this, e, t)
                            }
                    }(t.exports = function(e, t, n, r) {
                        return JSON.stringify(e, i(t, r), n)
                    }).getSerialize = i
                }, {}],
                8: [function(e, t, n) {
                    function l(e, t) {
                        var n = (65535 & e) + (65535 & t);
                        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                    }

                    function c(e, t, n, r, i, a) {
                        return l(function(e, t) {
                            return e << t | e >>> 32 - t
                        }(l(l(t, e), l(r, a)), i), n)
                    }

                    function d(e, t, n, r, i, a, o) {
                        return c(t & n | ~t & r, e, t, i, a, o)
                    }

                    function h(e, t, n, r, i, a, o) {
                        return c(t & r | n & ~r, e, t, i, a, o)
                    }

                    function p(e, t, n, r, i, a, o) {
                        return c(t ^ n ^ r, e, t, i, a, o)
                    }

                    function b(e, t, n, r, i, a, o) {
                        return c(n ^ (t | ~r), e, t, i, a, o)
                    }

                    function u(e, t) {
                        var n, r, i, a, o;
                        e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
                        var c = 1732584193,
                            u = -271733879,
                            f = -1732584194,
                            s = 271733878;
                        for (n = 0; n < e.length; n += 16) u = b(u = b(u = b(u = b(u = p(u = p(u = p(u = p(u = h(u = h(u = h(u = h(u = d(u = d(u = d(u = d(i = u, f = d(a = f, s = d(o = s, c = d(r = c, u, f, s, e[n], 7, -680876936), u, f, e[n + 1], 12, -389564586), c, u, e[n + 2], 17, 606105819), s, c, e[n + 3], 22, -1044525330), f = d(f, s = d(s, c = d(c, u, f, s, e[n + 4], 7, -176418897), u, f, e[n + 5], 12, 1200080426), c, u, e[n + 6], 17, -1473231341), s, c, e[n + 7], 22, -45705983), f = d(f, s = d(s, c = d(c, u, f, s, e[n + 8], 7, 1770035416), u, f, e[n + 9], 12, -1958414417), c, u, e[n + 10], 17, -42063), s, c, e[n + 11], 22, -1990404162), f = d(f, s = d(s, c = d(c, u, f, s, e[n + 12], 7, 1804603682), u, f, e[n + 13], 12, -40341101), c, u, e[n + 14], 17, -1502002290), s, c, e[n + 15], 22, 1236535329), f = h(f, s = h(s, c = h(c, u, f, s, e[n + 1], 5, -165796510), u, f, e[n + 6], 9, -1069501632), c, u, e[n + 11], 14, 643717713), s, c, e[n], 20, -373897302), f = h(f, s = h(s, c = h(c, u, f, s, e[n + 5], 5, -701558691), u, f, e[n + 10], 9, 38016083), c, u, e[n + 15], 14, -660478335), s, c, e[n + 4], 20, -405537848), f = h(f, s = h(s, c = h(c, u, f, s, e[n + 9], 5, 568446438), u, f, e[n + 14], 9, -1019803690), c, u, e[n + 3], 14, -187363961), s, c, e[n + 8], 20, 1163531501), f = h(f, s = h(s, c = h(c, u, f, s, e[n + 13], 5, -1444681467), u, f, e[n + 2], 9, -51403784), c, u, e[n + 7], 14, 1735328473), s, c, e[n + 12], 20, -1926607734), f = p(f, s = p(s, c = p(c, u, f, s, e[n + 5], 4, -378558), u, f, e[n + 8], 11, -2022574463), c, u, e[n + 11], 16, 1839030562), s, c, e[n + 14], 23, -35309556), f = p(f, s = p(s, c = p(c, u, f, s, e[n + 1], 4, -1530992060), u, f, e[n + 4], 11, 1272893353), c, u, e[n + 7], 16, -155497632), s, c, e[n + 10], 23, -1094730640), f = p(f, s = p(s, c = p(c, u, f, s, e[n + 13], 4, 681279174), u, f, e[n], 11, -358537222), c, u, e[n + 3], 16, -722521979), s, c, e[n + 6], 23, 76029189), f = p(f, s = p(s, c = p(c, u, f, s, e[n + 9], 4, -640364487), u, f, e[n + 12], 11, -421815835), c, u, e[n + 15], 16, 530742520), s, c, e[n + 2], 23, -995338651), f = b(f, s = b(s, c = b(c, u, f, s, e[n], 6, -198630844), u, f, e[n + 7], 10, 1126891415), c, u, e[n + 14], 15, -1416354905), s, c, e[n + 5], 21, -57434055), f = b(f, s = b(s, c = b(c, u, f, s, e[n + 12], 6, 1700485571), u, f, e[n + 3], 10, -1894986606), c, u, e[n + 10], 15, -1051523), s, c, e[n + 1], 21, -2054922799), f = b(f, s = b(s, c = b(c, u, f, s, e[n + 8], 6, 1873313359), u, f, e[n + 15], 10, -30611744), c, u, e[n + 6], 15, -1560198380), s, c, e[n + 13], 21, 1309151649), f = b(f, s = b(s, c = b(c, u, f, s, e[n + 4], 6, -145523070), u, f, e[n + 11], 10, -1120210379), c, u, e[n + 2], 15, 718787259), s, c, e[n + 9], 21, -343485551), c = l(c, r), u = l(u, i), f = l(f, a), s = l(s, o);
                        return [c, u, f, s]
                    }

                    function f(e) {
                        var t, n = "",
                            r = 32 * e.length;
                        for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                        return n
                    }

                    function s(e) {
                        var t, n = [];
                        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
                        var r = 8 * e.length;
                        for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                        return n
                    }

                    function r(e) {
                        var t, n, r = "0123456789abcdef",
                            i = "";
                        for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
                        return i
                    }

                    function i(e) {
                        return unescape(encodeURIComponent(e))
                    }

                    function a(e) {
                        return function(e) {
                            return f(u(s(e), 8 * e.length))
                        }(i(e))
                    }

                    function o(e, t) {
                        return function(e, t) {
                            var n, r, i = s(e),
                                a = [],
                                o = [];
                            for (a[15] = o[15] = void 0, 16 < i.length && (i = u(i, 8 * e.length)), n = 0; n < 16; n += 1) a[n] = 909522486 ^ i[n], o[n] = 1549556828 ^ i[n];
                            return r = u(a.concat(s(t)), 512 + 8 * t.length), f(u(o.concat(r), 640))
                        }(i(e), i(t))
                    }
                    t.exports = function(e, t, n) {
                        return t ? n ? o(t, e) : function(e, t) {
                            return r(o(e, t))
                        }(t, e) : n ? a(e) : function(e) {
                            return r(a(e))
                        }(e)
                    }
                }, {}]
            }, {}, [4])(4)
        });
    var su, lu;

    function du() {
        if (null == su) {
            var e = function() {
                var e = window.location;
                "about:srcdoc" == e.href && (e = window.parent.location);
                var r = {};
                return function(e, t, n) {
                    for (; n = t.exec(e);) r[decodeURIComponent(n[1])] = decodeURIComponent(n[2])
                }(e.search.substring(1).replace(/\+/g, "%20"), /([^&=]+)=?([^&]*)/g), r
            }();
            su = "referrer" in e ? /^https:\/\/medium.com\//.test(e.referrer) : !("auto" in e)
        }
        return su
    }

    function hu(e) {
        var t = e || window.innerWidth;
        return 999 < t ? 650 : 599 < t ? 575 : 400
    }

    function pu(e, t) {
        if (window.top !== window.self) {
            var n = window;
            if ("srcdoc" == n.location.pathname && (n = n.parent), lu) return e = parseInt(e, 10), void n.parent.postMessage({
                sentinel: "amp",
                type: "embed-size",
                height: e
            }, "*");
            var r = {
                sender: "Flourish",
                context: "iframe.resize",
                method: "resize",
                height: e,
                src: n.location.toString()
            };
            if (t)
                for (var i in t) r[i] = t[i];
            n.parent.postMessage(JSON.stringify(r), "*")
        }
    }

    function bu() {
        return (-1 !== navigator.userAgent.indexOf("Safari") || -1 !== navigator.userAgent.indexOf("iPhone")) && -1 == navigator.userAgent.indexOf("Chrome")
    }

    function gu(i) {
        window.addEventListener("message", function(t) {
            if (null != t.source && (t.origin === document.location.origin || t.origin.match(/\/\/localhost:\d+$|\/\/flourish-api\.com$|\.flourish\.(?:local(:\d+)?|net|rocks|studio)$/))) {
                var e;
                try {
                    e = JSON.parse(t.data)
                } catch (e) {
                    return void console.warn("Unexpected non-JSON message: " + JSON.stringify(t.data))
                }
                if ("Flourish" === e.sender) {
                    for (var n = document.querySelectorAll("iframe"), r = 0; r < n.length; r++)
                        if (n[r].contentWindow == t.source || n[r].contentWindow == t.source.parent) return void i(e, n[r]);
                    console.warn("could not find frame", e)
                }
            }
        }), bu() && (window.addEventListener("resize", vu), vu())
    }

    function vu() {
        for (var e = document.querySelectorAll(".flourish-embed"), t = 0; t < e.length; t++) {
            var n = e[t];
            if (!n.getAttribute("data-width")) {
                var r = n.querySelector("iframe"),
                    i = window.getComputedStyle(n),
                    a = n.offsetWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight);
                r.style.width = a + "px"
            }
        }
    }

    function mu(e, t, n, r) {
        n && "number" == typeof n && (n += "px"), r && "number" == typeof r && (r += "px"), r || (e.match(/\?/) ? e += "&auto=1" : e += "?auto=1", r = hu(n) + "px");
        var i = document.createElement("iframe");
        return i.setAttribute("scrolling", "no"), i.setAttribute("frameborder", "0"), i.setAttribute("src", e), t.appendChild(i), n ? i.style.width = n : bu() ? i.style.width = t.offsetWidth + "px" : i.style.width = "100%", r && ("%" === r.charAt(r.length - 1) && (r = parseFloat(r) / 100 * t.parentNode.offsetHeight + "px"), i.style.height = r), i
    }

    function yu() {
        return lu = "#amp=1" == window.location.hash, {
            createEmbedIframe: mu,
            isFixedHeight: du,
            getHeightForBreakpoint: hu,
            startEventListeners: gu,
            notifyParentWindow: pu,
            isSafari: bu
        }
    }
    var _u = {
        start: function() {
            document.body.classList.add("loading")
        },
        clear: function() {
            document.body.classList.remove("loading")
        }
    };

    function wu(e, t, n, r, i) {
        null == n && (n = [{
            text: "Okay",
            keyCode: 13
        }]);
        var a, o = ve("body").append("div").attr("class", "dialog"),
            c = o.append("div").attr("class", "dialog-inner"),
            u = c.append("div").classed("text", !0);
        if (u.append("h1").text(e), "string" == typeof t) a = r ? u.append("div").html(t) : u.append("p").text(t);
        else if ("object" == typeof t) {
            if (a = u.append(t.type), t.value && (a.node().value = t.value), t.attributes)
                for (var f in t.attributes) a.attr(f, t.attributes[f]);
            a.node().focus()
        }
        var s = c;
        null != i && "object" == typeof i && function(e, t, n, r) {
            r && e.classed("business", !0);
            var i = e.append("div").attr("class", "text");
            i.append("p").text(t), i.append("ul").selectAll("li").data(n).enter().append("li").html(function(e) {
                return e
            }).append("i").attr("class", "fa fa-check")
        }(s = s.append("div").attr("class", "upgrade"), i.message, i.list, i.is_business);
        var l = s.append("div").attr("class", "btns"),
            d = {};

        function h(e) {
            if (e.which in d) {
                var t = d[e.which];
                document.removeEventListener("keydown", h), t.callback && t.callback(a.node().value), o.remove(), e.preventDefault()
            }
        }
        return n.forEach(function(e) {
            var t = l.append(e.tag_name || "div").attr("class", "btn").style("margin-right", "0.75em").text(e.text).on("click", function() {
                document.removeEventListener("keydown", h), e.callback && e.callback(a.node().value), o.remove()
            });
            e.class && t.classed(e.class, !0), e.keyCode && (d[e.keyCode] = e), e.href && t.attr("href", e.href)
        }), document.addEventListener("keydown", h), o
    }
    var xu, Tu, Su, ku, Cu, Mu, Eu, Au, Du, Uu, Ou = "⬆︎",
        Nu = "/api/file/upload";

    function Fu(e) {
        (e || document).querySelectorAll("input[type=url]").forEach(function(e) {
            ju(e)
        })
    }

    function ju(e) {
        var t = e.ownerDocument.createElement("button");
        t.type = "button", t.className = "upload", t.setAttribute("title", "Upload a file from your computer"), t.innerHTML = Ou, e.insertAdjacentElement("afterend", t), t.onclick = Hu
    }

    function Hu() {
        var n = this.previousSibling,
            e = n.getAttribute("accept");
        n.disabled = !0, n.classList.toggle("uploading", !0), Ru({
            accept: e,
            success: function(e) {
                var t;
                n.disabled = !1, n.classList.toggle("uploading", !1), n.value = e, "createEvent" in document ? (t = document.createEvent("Event")).initEvent("change", !0, !0) : t = new Event("change", {
                    bubbles: !0
                }), n.dispatchEvent(t)
            },
            failure: function() {
                n.disabled = !1, n.classList.toggle("uploading", !1)
            }
        })
    }

    function Ru(e) {
        var t = document.createElement("input");
        t.type = "file", e.accept && t.setAttribute("accept", e.accept), document.body.appendChild(t), t.onchange = function() {
            _u.start(),
                function(e, r, i) {
                    var a = e[0];
                    ! function(e, n) {
                        var t = {
                            filename: e.name,
                            content_type: e.type,
                            size: e.size
                        };
                        Pu(Nu, t, function(e, t) {
                            return e ? n(e) : n(null, JSON.parse(t.responseText))
                        })
                    }(a, function(e, n) {
                        if (e) return _u.clear(), wu("Upload error", "There was a problem uploading your file: " + e), void console.error(e);
                        var t = function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var r in n) e[r] = n[r]
                            }
                            return e
                        }({
                            file: a
                        }, n.fields);
                        Pu(n.upload_url, t, function(e, t) {
                            _u.clear(), e ? (wu("Upload error", "There was a problem uploading your file (" + t.status + ")."), console.error(e), i && i()) : r(n.file_url)
                        })
                    })
                }(t.files, e.success, e.failure), t.parentNode.removeChild(t)
        }, t.click()
    }

    function Pu(t, e, n) {
        var r = new XMLHttpRequest,
            i = new FormData;
        if ("object" == typeof e) {
            for (var a in e) e.hasOwnProperty(a) && "file" !== a && i.append(a, e[a]);
            e.hasOwnProperty("file") && i.append("file", e.file)
        }
        r.onload = function() {
            if (200 <= r.status && r.status < 300) n(null, r);
            else try {
                var e = JSON.parse(r.responseText).error;
                n(e, r)
            } catch (e) {
                n(new Error("POST " + t + " received status code: " + r.status), r)
            }
        }, r.open("POST", t, !0), r.send(i)
    }

    function Lu() {
        Su && Su.preview_pane && Su.preview_pane.setFixedHeight && Su.preview_pane.setFixedHeight(function() {
            if (!xu) return null;
            var e = xu.nodes()[1].value;
            if ("custom" !== Tu || "" == e) return null;
            var t = parseInt(e, 10);
            return isNaN(t) ? null : t
        }())
    }
    var Iu, qu, Yu, Bu, zu, Vu = null;

    function Xu() {
        return "MessageChannel" in window
    }

    function Wu(e, t, n) {
        return Du = !1, Vu = null, (Uu = e) && e.template_id ? ku.on("load", function(e, r, i) {
            var a = e.template_id;
            return function() {
                Lu(), Uu && Uu.template_id == a && (ku.on("load", null), ef(function(e, n) {
                    e ? console.error("Failed to get default state") : Uu && Uu.template_id == a && tf(function(e, t) {
                        e ? console.error("Failed to call hasData") : Uu && Uu.template_id == a && (t ? Uu.refreshDataBindings(function(e) {
                            e ? console.error("Failed to refresh data bindings") : Uu && Uu.template_id == a && Uu.prepareData(function(e, t) {
                                e ? console.error("Failed to prepare data for template") : Uu && Uu.template_id == a && lf({
                                    data: t,
                                    state: r,
                                    draw: !0
                                }, function(e, t) {
                                    Vu = n, i(e, t)
                                })
                            })
                        }) : lf({
                            state: r,
                            draw: !0
                        }, function(e, t) {
                            Vu = n, i(e, t)
                        }))
                    })
                }))
            }
        }(e, t, n)).attr("src", "/template/" + e.template_id + "/embed/?auto=1&environment=" + Mu) : ku.on("load", null).attr("src", "about:blank")
    }

    function $u(e, t, n, r) {
        var i = "about:blank" === ku.attr("src");
        if (Du = !1, t) {
            var a = e[t] || "/template/" + t + "/embed";
            a += "?environment=" + Mu, r && (a += "&auto=1"), i ? o() : ku.transition().duration(250).style("opacity", 0).on("end", o)
        } else ku.transition().duration(250).style("opacity", 0).on("end", function() {
            ku.on("load", null).attr("src", "about:blank")
        });

        function o() {
            ku.on("load", function(n) {
                return function() {
                    ef(function(e, t) {
                        e ? console.error("Failed to get default state") : (Vu = t, n())
                    })
                }
            }(function() {
                n(), i || ku.transition().duration(250).style("opacity", 1)
            })).attr("src", a)
        }
    }

    function Ju(t, n) {
        var r = t.template_id;
        t.refreshDataBindings(function(e) {
            e ? console.error("Failed to fetch data bindings") : t.prepareData(function(e, t) {
                if (Uu && Uu.template_id == r) return e ? (console.error("Failed to prepare data for template"), void n(e)) : void n(void 0, t)
            })
        })
    }

    function Zu(e, n) {
        Ju(e, function(e, t) {
            if (e) return n(e);
            lf({
                data: t,
                update: !0
            }, n)
        })
    }

    function Gu(e, n, r) {
        Ju(e, function(e, t) {
            if (e) return r(e);
            lf({
                data: t,
                state: n,
                overwrite_state: !0,
                update: !0
            }, r)
        })
    }

    function Qu(e, t, n) {
        if (Xu()) {
            var r = new MessageChannel;
            r.port1.onmessage = function(e) {
                var t = e.data;
                if ("string" == typeof t) {
                    if (!n) return;
                    return n(void 0, JSON.parse(t))
                }
                if ("object" == typeof t) {
                    if ("result" in t) {
                        if (!n) return;
                        return n(void 0, t.result)
                    }
                    if ("error" in t) {
                        if (!n) return;
                        return n(t.error)
                    }
                    console.error("Unrecognised response to message", t)
                } else console.error("Unrecognised response to message", t)
            }, Cu.contentWindow.postMessage({
                sender: "Flourish",
                method: e,
                argument: t
            }, "*", [r.port2])
        }
    }

    function Ku(e, t) {
        Qu("setState", jc(e), t)
    }

    function ef(e, t) {
        "function" != typeof e ? Qu("getState", e, t) : Qu("getState", void 0, e)
    }

    function tf(e) {
        Qu("hasData", void 0, e)
    }

    function nf(e, t) {
        Qu("setData", e, t)
    }

    function rf(e) {
        Qu("getData", void 0, e)
    }

    function af(e) {
        Qu("draw", void 0, e), Du = !0
    }

    function of(e) {
        Du && Qu("update", void 0, e)
    }

    function cf(e, t) {
        Qu("snapshot", e, t)
    }

    function uf() {
        return function e(t) {
            if (null == t) return t;
            var n, r = {};
            for (var i in t) Array.isArray(t[i]) ? r[i] = t[i].slice() : (n = t[i], Array.isArray(n) || "object" != typeof n || null == n ? r[i] = t[i] : r[i] = e(t[i]));
            return r
        }(Vu)
    }

    function ff(e, t) {
        Qu("setFixedHeight", e, t)
    }

    function sf(e) {
        if (Cu.parentNode.offsetWidth) {
            if (void 0 !== e) qu = null != e;
            else if (qu) return;
            var t = e || Au && Au.responsive_menu && Au.responsive_menu.getHeightSetting() || Eu.getHeightForBreakpoint(Cu.offsetWidth);
            "number" == typeof t && (t += "px"), Cu.style.height = t
        }
    }

    function lf(n, r) {
        Du ? delete n.draw : n.draw && (Du = !0), n.state && (n.state = jc(n.state)), Qu("sync", n, function(e, t) {
            null != e || "success" !== t ? (n.draw && (Du = !1), function e(t) {
                t ? r && r(t) : function(e, t) {
                    return e.data ? (nf(e.data, t), delete e.data, !1) : e.state ? (Ku(e.state, t), delete e.state, !1) : e.draw ? (af(t), delete e.draw, !1) : !e.update || (of(t), delete e.update, !1)
                }(n, e) && r && r(void 0)
            }(e)) : r && r(void 0)
        })
    }

    function df(e, t, n) {
        return ku = ve(e), Cu = ku.node(), Mu = t, Au = n, Iu = {
            setup: Fu,
            addButton: ju,
            startUpload: Ru
        }, Eu = yu(), Cu.style.height = Eu.getHeightForBreakpoint(Cu.offsetWidth) + "px", Eu.startEventListeners(function(e) {
            "resize" == e.method ? sf(e.height) : "request-upload" == e.method && function(n, e) {
                Iu.startUpload({
                    accept: e || "image/*,video/*",
                    success: function(e) {
                        var t = {};
                        t[n] = e, lf({
                            state: t,
                            update: !0
                        })
                    },
                    failure: function(e) {
                        console.error("Upload failed", e)
                    }
                })
            }(e.name, e.accept)
        }), Xu() || function(e) {
            e && ve(e).append("div").attr("class", "unsupported-notice").html("<h3>Please update your browser</h3><p>This page only works with newer versions of your browser.</p>")
        }(Cu.parentNode), {
            loadVisualisation: Wu,
            loadTemplate: $u,
            updateData: Zu,
            updateDataAndState: Gu,
            setState: Ku,
            getState: ef,
            getDefaultState: uf,
            hasData: tf,
            setData: nf,
            getData: rf,
            draw: af,
            update: of,
            snapshot: cf,
            setFixedHeight: ff,
            resize: sf,
            sync: lf
        }
    }

    function hf(e, t) {
        for (var n in t) "object" != typeof e[n] || null == e[n] || Array.isArray(e[n]) || "object" != typeof t[n] || null == t[n] || Array.isArray(t[n]) ? e[n] = t[n] : hf(e[n], t[n])
    }

    function pf(e, t, n, r, i) {
        var a = this;
        if (a.story = e, a.visualisations = t, a.data = n, a.template_paths = r || {}, a.auto_resize = !Bu.isFixedHeight(), a.analytics = function(e, t) {
                if (!window.location.hostname.match(/\.flourish\.studio$/)) return window.ga = function(e) {
                    if (!e || "function" != typeof e) {
                        var t = Array.prototype.slice.call(arguments, 0);
                        if (t.unshift("Analytics:"), console.log.apply(console, t), "send" == e)
                            for (var n = 1; n < t.length; n++) "object" == typeof t[n] && "hitCallback" in t[n] && t[n].hitCallback()
                    }
                };
                var n, r, i, a, o;
                n = window, r = document, i = "ga", n.GoogleAnalyticsObject = i, n.ga = n.ga || function() {
                    var e = Array.prototype.slice.call(arguments);
                    (n.ga.q = n.ga.q || []).push(zc(e))
                }, n.ga.l = 1 * new Date, a = r.createElement("script"), o = r.getElementsByTagName("script")[0], a.async = 1, a.src = "", o.parentNode.insertBefore(a, o);
                var c = {
                    cookieDomain: "flourish.studio"
                };
                void 0 === t ? (c.storage = "none", c.storeGac = !1) : c.userId = t.id, ga("create", "UA-44635456-19", "auto", c), ga("set", "transport", "beacon"), void 0 !== t && (ga("set", "dimension1", t.id), t.company_type ? ga("set", "dimension3", "other" == t.company_type ? "corporate" : t.company_type) : ga("set", "dimension3", t.has_active_subscription ? "personal" : "free"));
                var u = new Date;
                return ga("set", "dimension2", u.toISOString()), ga("send", "pageview", e),
                    function() {
                        4 <= arguments.length && "event" === arguments[1] && (window._mfq = window._mfq || [], window._mfq.push(["setVariable", arguments[2], arguments[3]])), window.ga.apply(window.ga, zc(Array.prototype.slice.call(arguments)))
                    }
            }("/story/" + e.id, i), a.analytics("send", "event", "story", "play", e.id), 0 < e.slides.length) {
            for (var o = 0; o < e.slides.length; o++) {
                var c = e.slides[o];
                c.visualisation_id && (c.visualisation = t[c.visualisation_id])
            }
            window.location.hash && "#amp=1" != window.location.hash || (window.location.hash = "#slide-0"), a.loadSlideFromHash()
        }

        function u() {
            a.previous()
        }

        function f() {
            a.next()
        }! function(e, t) {
            $c = e, Jc = t
        }(u, f), window.addEventListener("keydown", uu), window.addEventListener("keyup", fu), a.auto_resize ? function() {
            var t = document.querySelector("iframe"),
                n = t.offsetHeight,
                r = document.querySelector(".story-furniture");
            Bu.startEventListeners(function(e) {
                "resize" === e.method && e.height !== n && ("number" != typeof(n = e.height) && (n = parseInt(n, 10)), t.style.height = n + "px", bf(t.offsetHeight + (r ? r.offsetHeight : 0)))
            })
        }() : a.updateHeight();
        var s = !0;
        zu = function(e) {
            return Vc = e, iu(), au(), {
                update: iu,
                play: eu,
                pause: tu,
                playPause: Kc,
                updateTimecodes: au,
                jumpToSlide: ou
            }
        }(a), ve(".first").on("click", function() {
            a.first()
        }), ve(".previous").on("click", u), me(".play-pause").on("click", function() {
            s && (s = !1, zu.jumpToSlide(a.current_slide.index)), zu.playPause()
        }), ve(".next").on("click", f), ve(".last").on("click", function() {
            a.last()
        })
    }

    function bf(e) {
        e && Bu.notifyParentWindow(e, {
            player: !0
        })
    }
    return pf.prototype.noSlidesBefore = function() {
        return !this.current_slide || this.current_slide.index < 1
    }, pf.prototype.noSlidesAfter = function() {
        return !this.current_slide || this.current_slide.index == this.story.slides.length - 1
    }, pf.prototype.previous = function() {
        this.noSlidesBefore() || (this.analytics("send", "event", "story", "previous", this.current_slide.index), window.location.hash = "#slide-" + (this.current_slide.index - 1))
    }, pf.prototype.next = function() {
        this.noSlidesAfter() || (this.analytics("send", "event", "story", "next", this.current_slide.index), window.location.hash = "#slide-" + (this.current_slide.index + 1))
    }, pf.prototype.first = function() {
        this.noSlidesBefore() || (this.analytics("send", "event", "story", "first", this.current_slide.index), window.location.hash = "#slide-0")
    }, pf.prototype.last = function() {
        this.noSlidesAfter() || (this.analytics("send", "event", "story", "last", this.current_slide.index), window.location.hash = "#slide-" + (this.story.slides.length - 1))
    }, pf.prototype.populateStateAndData = function(e, t) {
        var n = this.current_slide,
            r = n.visualisation,
            i = {};
        hf(i, Yu.getDefaultState()), hf(i, jc(r.settingsForCurrentTemplate())), hf(i, n.state);
        var a = {
            state: i,
            overwrite_state: !0
        };
        t && (a.data = this.data[r.id]), a[e] = !0, Yu.sync(a)
    }, pf.prototype.loadSlide = function(e) {
        var n = this;
        e < 0 && (e = 0), e >= n.story.slides.length && (e = n.story.slides.length - 1);
        var t = n.story.slides[e],
            r = t.visualisation,
            i = r && r.template_id,
            a = n.current_slide,
            o = n.loaded_visualisation,
            c = n.loaded_template_id;

        function u(e, t) {
            return function() {
                n.loaded_visualisation = r, n.loaded_template_id = i,
                    function(e) {
                        null == e && (e = ""), ve(".story-furniture .caption").html(e)
                    }(n.current_slide && n.current_slide.caption_text), i && (n.populateStateAndData(e, t), n.updateHeight())
            }
        }
        n.current_slide = t, n.updateControls(), n.updateSlideCount(), this.analytics("send", "event", "story", "load_slide", e), t === a || (r === o ? u("update", !1)() : i === c ? u("update", !0)() : Yu.loadTemplate(n.template_paths, i, u("draw", !0), n.auto_resize))
    }, pf.prototype.updateControls = function() {
        var e, t = this.current_slide;
        e = this.story.slides.length < 2 ? 0 : t.index / (this.story.slides.length - 1), ve(".progress span, .progress-indicator .progress").style("width", 100 * e + "%");
        var n = document.querySelector("nav") ? "property" : "classed";
        ve(".previous")[n]("disabled", this.noSlidesBefore()), ve(".next")[n]("disabled", this.noSlidesAfter()), ve(".first")[n]("disabled", this.noSlidesBefore()), ve(".last")[n]("disabled", this.noSlidesAfter()), ve(".story-furniture").classed("has-caption", null == t ? "" : t.caption_text)
    }, pf.prototype.updateSlideCount = function() {
        ve(".count .current, .count-current").html(this.current_slide.index + 1), ve(".count .total, .count-total").text(this.story.slides.length)
    }, pf.prototype.loadSlideFromHash = function() {
        var e = window.location.hash;
        if (e && e.match(/^#slide-/)) {
            var t = parseInt(e.substr("#slide-".length));
            this.loadSlide(t), zu && zu.jumpToSlide(t)
        }
    }, pf.prototype.updateHeight = function() {
        var e = document.querySelector("iframe"),
            t = document.querySelector(".story-furniture");
        if (this.auto_resize) {
            bf(e.offsetHeight + (t ? t.offsetHeight : 0))
        } else {
            var n = document.body.offsetHeight - (t ? t.offsetHeight : 0);
            n !== e.offsetHeight && (e.style.height = n + "px")
        }
    }, t.Slide = Yc, t.Story = Bc, t.Visualisation = Hc, t.initStoryPlayer = function(e, t, n, r, i) {
        ! function(e) {
            window.location.href.match(/^https?:\/\/(localhost|[a-zA-Z0-9-.]+\.local)(:\d+)?(\/|$)/) ? console.log("Not installing error logging on development server") : (Raven.config("https://30a96ee1f96d4d91b927a276b25703ce@sentry.io/150033").install(), e && Raven.setUserContext({
                id: e.id
            }))
        }(e), Yu = df("#story iframe", "story_player"), Bu = yu(), window.Flourish = window.Flourish || {};
        var a = window.Flourish.app = new pf(t, n, r, i, e);
        window.addEventListener("hashchange", function() {
            a.loadSlideFromHash()
        })
    }, t
}({});