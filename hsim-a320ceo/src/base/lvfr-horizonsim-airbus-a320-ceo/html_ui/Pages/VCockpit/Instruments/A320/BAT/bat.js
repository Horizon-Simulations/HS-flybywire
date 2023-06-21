'use strict';
/* global BaseInstrument */
/* global registerInstrument */
class InstrumentLogic extends BaseInstrument {
    constructor() {
        super();
        let lastTime = this._lastTime;
        this.getDeltaTime = () => {
            const nowTime = Date.now();
            const deltaTime = nowTime - lastTime;
            lastTime = nowTime;
            return deltaTime;
        };
    }

    get templateID() {
        return 'BAT';
    }

    get isInteractive() {
        return true;
    }

    get IsGlassCockpit() {
        return true;
    }

    connectedCallback() {
        super.connectedCallback();
        (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ../node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "../node_modules/object-assign/index.js"(exports, module2) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // ../node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "../node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = require_object_assign();
      var n = 60103;
      var p = 60106;
      exports.Fragment = 60107;
      exports.StrictMode = 60108;
      exports.Profiler = 60114;
      var q = 60109;
      var r = 60110;
      var t = 60112;
      exports.Suspense = 60113;
      var u = 60115;
      var v = 60116;
      if ("function" === typeof Symbol && Symbol.for) {
        w = Symbol.for;
        n = w("react.element");
        p = w("react.portal");
        exports.Fragment = w("react.fragment");
        exports.StrictMode = w("react.strict_mode");
        exports.Profiler = w("react.profiler");
        q = w("react.provider");
        r = w("react.context");
        t = w("react.forward_ref");
        exports.Suspense = w("react.suspense");
        u = w("react.memo");
        v = w("react.lazy");
      }
      var w;
      var x = "function" === typeof Symbol && Symbol.iterator;
      function y(a) {
        if (null === a || "object" !== typeof a)
          return null;
        a = x && a[x] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      function z(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
          b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var A = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var B = {};
      function C(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      C.prototype.isReactComponent = {};
      C.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a)
          throw Error(z(85));
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      C.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function D() {
      }
      D.prototype = C.prototype;
      function E(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      var F = E.prototype = new D();
      F.constructor = E;
      l(F, C.prototype);
      F.isPureReactComponent = true;
      var G = { current: null };
      var H = Object.prototype.hasOwnProperty;
      var I = { key: true, ref: true, __self: true, __source: true };
      function J(a, b, c) {
        var e, d = {}, k = null, h = null;
        if (null != b)
          for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
            H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
        var g = arguments.length - 2;
        if (1 === g)
          d.children = c;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++)
            f[m] = arguments[m + 2];
          d.children = f;
        }
        if (a && a.defaultProps)
          for (e in g = a.defaultProps, g)
            void 0 === d[e] && (d[e] = g[e]);
        return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
      }
      function K(a, b) {
        return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function L(a) {
        return "object" === typeof a && null !== a && a.$$typeof === n;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var M = /\/+/g;
      function N(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function O(a, b, c, e, d) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k)
          a = null;
        var h = false;
        if (null === a)
          h = true;
        else
          switch (k) {
            case "string":
            case "number":
              h = true;
              break;
            case "object":
              switch (a.$$typeof) {
                case n:
                case p:
                  h = true;
              }
          }
        if (h)
          return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
            return a2;
          })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
        h = 0;
        e = "" === e ? "." : e + ":";
        if (Array.isArray(a))
          for (var g = 0; g < a.length; g++) {
            k = a[g];
            var f = e + N(k, g);
            h += O(k, b, c, f, d);
          }
        else if (f = y(a), "function" === typeof f)
          for (a = f.call(a), g = 0; !(k = a.next()).done; )
            k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
        else if ("object" === k)
          throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
        return h;
      }
      function P(a, b, c) {
        if (null == a)
          return a;
        var e = [], d = 0;
        O(a, e, "", "", function(a2) {
          return b.call(c, a2, d++);
        });
        return e;
      }
      function Q(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          a._status = 0;
          a._result = b;
          b.then(function(b2) {
            0 === a._status && (b2 = b2.default, a._status = 1, a._result = b2);
          }, function(b2) {
            0 === a._status && (a._status = 2, a._result = b2);
          });
        }
        if (1 === a._status)
          return a._result;
        throw a._result;
      }
      var R = { current: null };
      function S() {
        var a = R.current;
        if (null === a)
          throw Error(z(321));
        return a;
      }
      var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
      exports.Children = { map: P, forEach: function(a, b, c) {
        P(a, function() {
          b.apply(this, arguments);
        }, c);
      }, count: function(a) {
        var b = 0;
        P(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return P(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!L(a))
          throw Error(z(143));
        return a;
      } };
      exports.Component = C;
      exports.PureComponent = E;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
      exports.cloneElement = function(a, b, c) {
        if (null === a || void 0 === a)
          throw Error(z(267, a));
        var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = G.current);
          void 0 !== b.key && (d = "" + b.key);
          if (a.type && a.type.defaultProps)
            var g = a.type.defaultProps;
          for (f in b)
            H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f)
          e.children = c;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++)
            g[m] = arguments[m + 2];
          e.children = g;
        }
        return {
          $$typeof: n,
          type: a.type,
          key: d,
          ref: k,
          props: e,
          _owner: h
        };
      };
      exports.createContext = function(a, b) {
        void 0 === b && (b = null);
        a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
        a.Provider = { $$typeof: q, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = J;
      exports.createFactory = function(a) {
        var b = J.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: t, render: a };
      };
      exports.isValidElement = L;
      exports.lazy = function(a) {
        return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
      };
      exports.memo = function(a, b) {
        return { $$typeof: u, type: a, compare: void 0 === b ? null : b };
      };
      exports.useCallback = function(a, b) {
        return S().useCallback(a, b);
      };
      exports.useContext = function(a, b) {
        return S().useContext(a, b);
      };
      exports.useDebugValue = function() {
      };
      exports.useEffect = function(a, b) {
        return S().useEffect(a, b);
      };
      exports.useImperativeHandle = function(a, b, c) {
        return S().useImperativeHandle(a, b, c);
      };
      exports.useLayoutEffect = function(a, b) {
        return S().useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return S().useMemo(a, b);
      };
      exports.useReducer = function(a, b, c) {
        return S().useReducer(a, b, c);
      };
      exports.useRef = function(a) {
        return S().useRef(a);
      };
      exports.useState = function(a) {
        return S().useState(a);
      };
      exports.version = "17.0.2";
    }
  });

  // ../node_modules/react/index.js
  var require_react = __commonJS({
    "../node_modules/react/index.js"(exports, module2) {
      "use strict";
      if (true) {
        module2.exports = require_react_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // ../node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "../node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      var f;
      var g;
      var h;
      var k;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
        t = null, u = null, w = function() {
          if (null !== t)
            try {
              var a = exports.unstable_now();
              t(true, a);
              t = null;
            } catch (b) {
              throw setTimeout(w, 0), b;
            }
        };
        f = function(a) {
          null !== t ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
        };
        g = function(a, b) {
          u = setTimeout(a, b);
        };
        h = function() {
          clearTimeout(u);
        };
        exports.unstable_shouldYield = function() {
          return false;
        };
        k = exports.unstable_forceFrameRate = function() {
        };
      } else {
        x = window.setTimeout, y = window.clearTimeout;
        if ("undefined" !== typeof console) {
          z = window.cancelAnimationFrame;
          "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
          "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        }
        A = false, B = null, C = -1, D = 5, E = 0;
        exports.unstable_shouldYield = function() {
          return exports.unstable_now() >= E;
        };
        k = function() {
        };
        exports.unstable_forceFrameRate = function(a) {
          0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1e3 / a) : 5;
        };
        F = new MessageChannel(), G = F.port2;
        F.port1.onmessage = function() {
          if (null !== B) {
            var a = exports.unstable_now();
            E = a + D;
            try {
              B(true, a) ? G.postMessage(null) : (A = false, B = null);
            } catch (b) {
              throw G.postMessage(null), b;
            }
          } else
            A = false;
        };
        f = function(a) {
          B = a;
          A || (A = true, G.postMessage(null));
        };
        g = function(a, b) {
          C = x(function() {
            a(exports.unstable_now());
          }, b);
        };
        h = function() {
          y(C);
          C = -1;
        };
      }
      var t;
      var u;
      var w;
      var x;
      var y;
      var z;
      var A;
      var B;
      var C;
      var D;
      var E;
      var F;
      var G;
      function H(a, b) {
        var c = a.length;
        a.push(b);
        a:
          for (; ; ) {
            var d = c - 1 >>> 1, e = a[d];
            if (void 0 !== e && 0 < I(e, b))
              a[d] = b, a[c] = e, c = d;
            else
              break a;
          }
      }
      function J(a) {
        a = a[0];
        return void 0 === a ? null : a;
      }
      function K(a) {
        var b = a[0];
        if (void 0 !== b) {
          var c = a.pop();
          if (c !== b) {
            a[0] = c;
            a:
              for (var d = 0, e = a.length; d < e; ) {
                var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
                if (void 0 !== n && 0 > I(n, c))
                  void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
                else if (void 0 !== r && 0 > I(r, c))
                  a[d] = r, a[v] = c, d = v;
                else
                  break a;
              }
          }
          return b;
        }
        return null;
      }
      function I(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      var L = [];
      var M = [];
      var N = 1;
      var O = null;
      var P = 3;
      var Q = false;
      var R = false;
      var S = false;
      function T(a) {
        for (var b = J(M); null !== b; ) {
          if (null === b.callback)
            K(M);
          else if (b.startTime <= a)
            K(M), b.sortIndex = b.expirationTime, H(L, b);
          else
            break;
          b = J(M);
        }
      }
      function U(a) {
        S = false;
        T(a);
        if (!R)
          if (null !== J(L))
            R = true, f(V);
          else {
            var b = J(M);
            null !== b && g(U, b.startTime - a);
          }
      }
      function V(a, b) {
        R = false;
        S && (S = false, h());
        Q = true;
        var c = P;
        try {
          T(b);
          for (O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
            var d = O.callback;
            if ("function" === typeof d) {
              O.callback = null;
              P = O.priorityLevel;
              var e = d(O.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? O.callback = e : O === J(L) && K(L);
              T(b);
            } else
              K(L);
            O = J(L);
          }
          if (null !== O)
            var m = true;
          else {
            var n = J(M);
            null !== n && g(U, n.startTime - b);
            m = false;
          }
          return m;
        } finally {
          O = null, P = c, Q = false;
        }
      }
      var W = k;
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        R || Q || (R = true, f(V));
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return P;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return J(L);
      };
      exports.unstable_next = function(a) {
        switch (P) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = P;
        }
        var c = P;
        P = b;
        try {
          return a();
        } finally {
          P = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = W;
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = P;
        P = a;
        try {
          return b();
        } finally {
          P = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: N++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = true, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = true, f(V)));
        return a;
      };
      exports.unstable_wrapCallback = function(a) {
        var b = P;
        return function() {
          var c = P;
          P = b;
          try {
            return a.apply(this, arguments);
          } finally {
            P = c;
          }
        };
      };
    }
  });

  // ../node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "../node_modules/scheduler/index.js"(exports, module2) {
      "use strict";
      if (true) {
        module2.exports = require_scheduler_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // ../node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "../node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var m = require_object_assign();
      var r = require_scheduler();
      function y(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
          b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      if (!aa)
        throw Error(y(227));
      var ba = /* @__PURE__ */ new Set();
      var ca = {};
      function da(a, b) {
        ea(a, b);
        ea(a + "Capture", b);
      }
      function ea(a, b) {
        ca[a] = b;
        for (a = 0; a < b.length; a++)
          ba.add(b[a]);
      }
      var fa = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var ia = Object.prototype.hasOwnProperty;
      var ja = {};
      var ka = {};
      function la(a) {
        if (ia.call(ka, a))
          return true;
        if (ia.call(ja, a))
          return false;
        if (ha.test(a))
          return ka[a] = true;
        ja[a] = true;
        return false;
      }
      function ma(a, b, c, d) {
        if (null !== c && 0 === c.type)
          return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d)
              return false;
            if (null !== c)
              return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function na(a, b, c, d) {
        if (null === b || "undefined" === typeof b || ma(a, b, c, d))
          return true;
        if (d)
          return false;
        if (null !== c)
          switch (c.type) {
            case 3:
              return !b;
            case 4:
              return false === b;
            case 5:
              return isNaN(b);
            case 6:
              return isNaN(b) || 1 > b;
          }
        return false;
      }
      function B(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var D = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        D[a] = new B(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        D[b] = new B(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        D[a] = new B(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        D[a] = new B(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        D[a] = new B(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        D[a] = new B(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        D[a] = new B(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        D[a] = new B(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        D[a] = new B(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var oa = /[\-:]([a-z])/g;
      function pa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          oa,
          pa
        );
        D[b] = new B(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        D[a] = new B(a, 1, false, a.toLowerCase(), null, false, false);
      });
      D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        D[a] = new B(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function qa(a, b, c, d) {
        var e = D.hasOwnProperty(b) ? D[b] : null;
        var f = null !== e ? 0 === e.type : d ? false : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? false : true;
        f || (na(b, c, e, d) && (c = null), d || null === e ? la(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
      }
      var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var sa = 60103;
      var ta = 60106;
      var ua = 60107;
      var wa = 60108;
      var xa = 60114;
      var ya = 60109;
      var za = 60110;
      var Aa = 60112;
      var Ba = 60113;
      var Ca = 60120;
      var Da = 60115;
      var Ea = 60116;
      var Fa = 60121;
      var Ga = 60128;
      var Ha = 60129;
      var Ia = 60130;
      var Ja = 60131;
      if ("function" === typeof Symbol && Symbol.for) {
        E = Symbol.for;
        sa = E("react.element");
        ta = E("react.portal");
        ua = E("react.fragment");
        wa = E("react.strict_mode");
        xa = E("react.profiler");
        ya = E("react.provider");
        za = E("react.context");
        Aa = E("react.forward_ref");
        Ba = E("react.suspense");
        Ca = E("react.suspense_list");
        Da = E("react.memo");
        Ea = E("react.lazy");
        Fa = E("react.block");
        E("react.scope");
        Ga = E("react.opaque.id");
        Ha = E("react.debug_trace_mode");
        Ia = E("react.offscreen");
        Ja = E("react.legacy_hidden");
      }
      var E;
      var Ka = "function" === typeof Symbol && Symbol.iterator;
      function La(a) {
        if (null === a || "object" !== typeof a)
          return null;
        a = Ka && a[Ka] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var Ma;
      function Na(a) {
        if (void 0 === Ma)
          try {
            throw Error();
          } catch (c) {
            var b = c.stack.trim().match(/\n( *(at )?)/);
            Ma = b && b[1] || "";
          }
        return "\n" + Ma + a;
      }
      var Oa = false;
      function Pa(a, b) {
        if (!a || Oa)
          return "";
        Oa = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b)
            if (b = function() {
              throw Error();
            }, Object.defineProperty(b.prototype, "props", { set: function() {
              throw Error();
            } }), "object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (k) {
                var d = k;
              }
              Reflect.construct(a, [], b);
            } else {
              try {
                b.call();
              } catch (k) {
                d = k;
              }
              a.call(b.prototype);
            }
          else {
            try {
              throw Error();
            } catch (k) {
              d = k;
            }
            a();
          }
        } catch (k) {
          if (k && d && "string" === typeof k.stack) {
            for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
              h--;
            for (; 1 <= g && 0 <= h; g--, h--)
              if (e[g] !== f[h]) {
                if (1 !== g || 1 !== h) {
                  do
                    if (g--, h--, 0 > h || e[g] !== f[h])
                      return "\n" + e[g].replace(" at new ", " at ");
                  while (1 <= g && 0 <= h);
                }
                break;
              }
          }
        } finally {
          Oa = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
      }
      function Qa(a) {
        switch (a.tag) {
          case 5:
            return Na(a.type);
          case 16:
            return Na("Lazy");
          case 13:
            return Na("Suspense");
          case 19:
            return Na("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Pa(a.type, false), a;
          case 11:
            return a = Pa(a.type.render, false), a;
          case 22:
            return a = Pa(a.type._render, false), a;
          case 1:
            return a = Pa(a.type, true), a;
          default:
            return "";
        }
      }
      function Ra(a) {
        if (null == a)
          return null;
        if ("function" === typeof a)
          return a.displayName || a.name || null;
        if ("string" === typeof a)
          return a;
        switch (a) {
          case ua:
            return "Fragment";
          case ta:
            return "Portal";
          case xa:
            return "Profiler";
          case wa:
            return "StrictMode";
          case Ba:
            return "Suspense";
          case Ca:
            return "SuspenseList";
        }
        if ("object" === typeof a)
          switch (a.$$typeof) {
            case za:
              return (a.displayName || "Context") + ".Consumer";
            case ya:
              return (a._context.displayName || "Context") + ".Provider";
            case Aa:
              var b = a.render;
              b = b.displayName || b.name || "";
              return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
            case Da:
              return Ra(a.type);
            case Fa:
              return Ra(a._render);
            case Ea:
              b = a._payload;
              a = a._init;
              try {
                return Ra(a(b));
              } catch (c) {
              }
          }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "undefined":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a)
          return false;
        var b = a._valueTracker;
        if (!b)
          return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a)
          return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return m({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function $a(a, b) {
        b = b.checked;
        null != b && qa(a, "checked", b, false);
      }
      function ab(a, b) {
        $a(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c)
          if ("number" === d) {
            if (0 === c && "" === a.value || a.value != c)
              a.value = "" + c;
          } else
            a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function cb(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
            return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function bb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a)
          null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      function db(a) {
        var b = "";
        aa.Children.forEach(a, function(a2) {
          null != a2 && (b += a2);
        });
        return b;
      }
      function eb(a, b) {
        a = m({ children: void 0 }, b);
        if (b = db(b.children))
          a.children = b;
        return a;
      }
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++)
            b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++)
            e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML)
          throw Error(y(91));
        return m({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b)
              throw Error(y(92));
            if (Array.isArray(c)) {
              if (!(1 >= c.length))
                throw Error(y(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      var kb = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
      function lb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function mb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? lb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var nb;
      var ob = function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if (a.namespaceURI !== kb.svg || "innerHTML" in a)
          a.innerHTML = b;
        else {
          nb = nb || document.createElement("div");
          nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = nb.firstChild; a.firstChild; )
            a.removeChild(a.firstChild);
          for (; b.firstChild; )
            a.appendChild(b.firstChild);
        }
      });
      function pb(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var qb = {
        animationIterationCount: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var rb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(qb).forEach(function(a) {
        rb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          qb[b] = qb[a];
        });
      });
      function sb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
      }
      function tb(a, b) {
        a = a.style;
        for (var c in b)
          if (b.hasOwnProperty(c)) {
            var d = 0 === c.indexOf("--"), e = sb(c, b[c], d);
            "float" === c && (c = "cssFloat");
            d ? a.setProperty(c, e) : a[c] = e;
          }
      }
      var ub = m({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function vb(a, b) {
        if (b) {
          if (ub[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
            throw Error(y(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children)
              throw Error(y(60));
            if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML))
              throw Error(y(61));
          }
          if (null != b.style && "object" !== typeof b.style)
            throw Error(y(62));
        }
      }
      function wb(a, b) {
        if (-1 === a.indexOf("-"))
          return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb)
            throw Error(y(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b)
            for (a = 0; a < b.length; a++)
              Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb(a, b, c, d, e) {
        return a(b, c, d, e);
      }
      function Ib() {
      }
      var Jb = Gb;
      var Kb = false;
      var Lb = false;
      function Mb() {
        if (null !== zb || null !== Ab)
          Ib(), Fb();
      }
      function Nb(a, b, c) {
        if (Lb)
          return a(b, c);
        Lb = true;
        try {
          return Jb(a, b, c);
        } finally {
          Lb = false, Mb();
        }
      }
      function Ob(a, b) {
        var c = a.stateNode;
        if (null === c)
          return null;
        var d = Db(c);
        if (null === d)
          return null;
        c = d[b];
        a:
          switch (b) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
              a = !d;
              break a;
            default:
              a = false;
          }
        if (a)
          return null;
        if (c && "function" !== typeof c)
          throw Error(y(231, b, typeof c));
        return c;
      }
      var Pb = false;
      if (fa)
        try {
          Qb = {};
          Object.defineProperty(Qb, "passive", { get: function() {
            Pb = true;
          } });
          window.addEventListener("test", Qb, Qb);
          window.removeEventListener("test", Qb, Qb);
        } catch (a) {
          Pb = false;
        }
      var Qb;
      function Rb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (n) {
          this.onError(n);
        }
      }
      var Sb = false;
      var Tb = null;
      var Ub = false;
      var Vb = null;
      var Wb = { onError: function(a) {
        Sb = true;
        Tb = a;
      } };
      function Xb(a, b, c, d, e, f, g, h, k) {
        Sb = false;
        Tb = null;
        Rb.apply(Wb, arguments);
      }
      function Yb(a, b, c, d, e, f, g, h, k) {
        Xb.apply(this, arguments);
        if (Sb) {
          if (Sb) {
            var l = Tb;
            Sb = false;
            Tb = null;
          } else
            throw Error(y(198));
          Ub || (Ub = true, Vb = l);
        }
      }
      function Zb(a) {
        var b = a, c = a;
        if (a.alternate)
          for (; b.return; )
            b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 1026) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function $b(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b)
            return b.dehydrated;
        }
        return null;
      }
      function ac(a) {
        if (Zb(a) !== a)
          throw Error(y(188));
      }
      function bc(a) {
        var b = a.alternate;
        if (!b) {
          b = Zb(a);
          if (null === b)
            throw Error(y(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e)
            break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c)
                return ac(e), a;
              if (f === d)
                return ac(e), b;
              f = f.sibling;
            }
            throw Error(y(188));
          }
          if (c.return !== d.return)
            c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g)
                throw Error(y(189));
            }
          }
          if (c.alternate !== d)
            throw Error(y(190));
        }
        if (3 !== c.tag)
          throw Error(y(188));
        return c.stateNode.current === c ? a : b;
      }
      function cc(a) {
        a = bc(a);
        if (!a)
          return null;
        for (var b = a; ; ) {
          if (5 === b.tag || 6 === b.tag)
            return b;
          if (b.child)
            b.child.return = b, b = b.child;
          else {
            if (b === a)
              break;
            for (; !b.sibling; ) {
              if (!b.return || b.return === a)
                return null;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return null;
      }
      function dc(a, b) {
        for (var c = a.alternate; null !== b; ) {
          if (b === a || b === c)
            return true;
          b = b.return;
        }
        return false;
      }
      var ec;
      var fc;
      var gc;
      var hc;
      var ic = false;
      var jc = [];
      var kc = null;
      var lc = null;
      var mc = null;
      var nc = /* @__PURE__ */ new Map();
      var oc = /* @__PURE__ */ new Map();
      var pc = [];
      var qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function rc(a, b, c, d, e) {
        return { blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d] };
      }
      function sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            kc = null;
            break;
          case "dragenter":
          case "dragleave":
            lc = null;
            break;
          case "mouseover":
          case "mouseout":
            mc = null;
            break;
          case "pointerover":
          case "pointerout":
            nc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            oc.delete(b.pointerId);
        }
      }
      function tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f)
          return a = rc(b, c, d, e, f), null !== b && (b = Cb(b), null !== b && fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return kc = tc(kc, a, b, c, d, e), true;
          case "dragenter":
            return lc = tc(lc, a, b, c, d, e), true;
          case "mouseover":
            return mc = tc(mc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            nc.set(f, tc(nc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function vc(a) {
        var b = wc(a.target);
        if (null !== b) {
          var c = Zb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = $b(c), null !== b) {
                a.blockedOn = b;
                hc(a.lanePriority, function() {
                  r.unstable_runWithPriority(a.priority, function() {
                    gc(c);
                  });
                });
                return;
              }
            } else if (3 === b && c.stateNode.hydrate) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function xc(a) {
        if (null !== a.blockedOn)
          return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null !== c)
            return b = Cb(c), null !== b && fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function zc(a, b, c) {
        xc(a) && c.delete(b);
      }
      function Ac() {
        for (ic = false; 0 < jc.length; ) {
          var a = jc[0];
          if (null !== a.blockedOn) {
            a = Cb(a.blockedOn);
            null !== a && ec(a);
            break;
          }
          for (var b = a.targetContainers; 0 < b.length; ) {
            var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
            if (null !== c) {
              a.blockedOn = c;
              break;
            }
            b.shift();
          }
          null === a.blockedOn && jc.shift();
        }
        null !== kc && xc(kc) && (kc = null);
        null !== lc && xc(lc) && (lc = null);
        null !== mc && xc(mc) && (mc = null);
        nc.forEach(zc);
        oc.forEach(zc);
      }
      function Bc(a, b) {
        a.blockedOn === b && (a.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
      }
      function Cc(a) {
        function b(b2) {
          return Bc(b2, a);
        }
        if (0 < jc.length) {
          Bc(jc[0], a);
          for (var c = 1; c < jc.length; c++) {
            var d = jc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== kc && Bc(kc, a);
        null !== lc && Bc(lc, a);
        null !== mc && Bc(mc, a);
        nc.forEach(b);
        oc.forEach(b);
        for (c = 0; c < pc.length; c++)
          d = pc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < pc.length && (c = pc[0], null === c.blockedOn); )
          vc(c), null === c.blockedOn && pc.shift();
      }
      function Dc(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var Ec = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") };
      var Fc = {};
      var Gc = {};
      fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
      function Hc(a) {
        if (Fc[a])
          return Fc[a];
        if (!Ec[a])
          return a;
        var b = Ec[a], c;
        for (c in b)
          if (b.hasOwnProperty(c) && c in Gc)
            return Fc[a] = b[c];
        return a;
      }
      var Ic = Hc("animationend");
      var Jc = Hc("animationiteration");
      var Kc = Hc("animationstart");
      var Lc = Hc("transitionend");
      var Mc = /* @__PURE__ */ new Map();
      var Nc = /* @__PURE__ */ new Map();
      var Oc = [
        "abort",
        "abort",
        Ic,
        "animationEnd",
        Jc,
        "animationIteration",
        Kc,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        Lc,
        "transitionEnd",
        "waiting",
        "waiting"
      ];
      function Pc(a, b) {
        for (var c = 0; c < a.length; c += 2) {
          var d = a[c], e = a[c + 1];
          e = "on" + (e[0].toUpperCase() + e.slice(1));
          Nc.set(d, b);
          Mc.set(d, e);
          da(e, [d]);
        }
      }
      var Qc = r.unstable_now;
      Qc();
      var F = 8;
      function Rc(a) {
        if (0 !== (1 & a))
          return F = 15, 1;
        if (0 !== (2 & a))
          return F = 14, 2;
        if (0 !== (4 & a))
          return F = 13, 4;
        var b = 24 & a;
        if (0 !== b)
          return F = 12, b;
        if (0 !== (a & 32))
          return F = 11, 32;
        b = 192 & a;
        if (0 !== b)
          return F = 10, b;
        if (0 !== (a & 256))
          return F = 9, 256;
        b = 3584 & a;
        if (0 !== b)
          return F = 8, b;
        if (0 !== (a & 4096))
          return F = 7, 4096;
        b = 4186112 & a;
        if (0 !== b)
          return F = 6, b;
        b = 62914560 & a;
        if (0 !== b)
          return F = 5, b;
        if (a & 67108864)
          return F = 4, 67108864;
        if (0 !== (a & 134217728))
          return F = 3, 134217728;
        b = 805306368 & a;
        if (0 !== b)
          return F = 2, b;
        if (0 !== (1073741824 & a))
          return F = 1, 1073741824;
        F = 8;
        return a;
      }
      function Sc(a) {
        switch (a) {
          case 99:
            return 15;
          case 98:
            return 10;
          case 97:
          case 96:
            return 8;
          case 95:
            return 2;
          default:
            return 0;
        }
      }
      function Tc(a) {
        switch (a) {
          case 15:
          case 14:
            return 99;
          case 13:
          case 12:
          case 11:
          case 10:
            return 98;
          case 9:
          case 8:
          case 7:
          case 6:
          case 4:
          case 5:
            return 97;
          case 3:
          case 2:
          case 1:
            return 95;
          case 0:
            return 90;
          default:
            throw Error(y(358, a));
        }
      }
      function Uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c)
          return F = 0;
        var d = 0, e = 0, f = a.expiredLanes, g = a.suspendedLanes, h = a.pingedLanes;
        if (0 !== f)
          d = f, e = F = 15;
        else if (f = c & 134217727, 0 !== f) {
          var k = f & ~g;
          0 !== k ? (d = Rc(k), e = F) : (h &= f, 0 !== h && (d = Rc(h), e = F));
        } else
          f = c & ~g, 0 !== f ? (d = Rc(f), e = F) : 0 !== h && (d = Rc(h), e = F);
        if (0 === d)
          return 0;
        d = 31 - Vc(d);
        d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
        if (0 !== b && b !== d && 0 === (b & g)) {
          Rc(b);
          if (e <= F)
            return b;
          F = e;
        }
        b = a.entangledLanes;
        if (0 !== b)
          for (a = a.entanglements, b &= d; 0 < b; )
            c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function Wc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function Xc(a, b) {
        switch (a) {
          case 15:
            return 1;
          case 14:
            return 2;
          case 12:
            return a = Yc(24 & ~b), 0 === a ? Xc(10, b) : a;
          case 10:
            return a = Yc(192 & ~b), 0 === a ? Xc(8, b) : a;
          case 8:
            return a = Yc(3584 & ~b), 0 === a && (a = Yc(4186112 & ~b), 0 === a && (a = 512)), a;
          case 2:
            return b = Yc(805306368 & ~b), 0 === b && (b = 268435456), b;
        }
        throw Error(y(358, a));
      }
      function Yc(a) {
        return a & -a;
      }
      function Zc(a) {
        for (var b = [], c = 0; 31 > c; c++)
          b.push(a);
        return b;
      }
      function $c(a, b, c) {
        a.pendingLanes |= b;
        var d = b - 1;
        a.suspendedLanes &= d;
        a.pingedLanes &= d;
        a = a.eventTimes;
        b = 31 - Vc(b);
        a[b] = c;
      }
      var Vc = Math.clz32 ? Math.clz32 : ad;
      var bd = Math.log;
      var cd = Math.LN2;
      function ad(a) {
        return 0 === a ? 32 : 31 - (bd(a) / cd | 0) | 0;
      }
      var dd = r.unstable_UserBlockingPriority;
      var ed = r.unstable_runWithPriority;
      var fd = true;
      function gd(a, b, c, d) {
        Kb || Ib();
        var e = hd, f = Kb;
        Kb = true;
        try {
          Hb(e, a, b, c, d);
        } finally {
          (Kb = f) || Mb();
        }
      }
      function id(a, b, c, d) {
        ed(dd, hd.bind(null, a, b, c, d));
      }
      function hd(a, b, c, d) {
        if (fd) {
          var e;
          if ((e = 0 === (b & 4)) && 0 < jc.length && -1 < qc.indexOf(a))
            a = rc(null, a, b, c, d), jc.push(a);
          else {
            var f = yc(a, b, c, d);
            if (null === f)
              e && sc(a, d);
            else {
              if (e) {
                if (-1 < qc.indexOf(a)) {
                  a = rc(f, a, b, c, d);
                  jc.push(a);
                  return;
                }
                if (uc(f, a, b, c, d))
                  return;
                sc(a, d);
              }
              jd(a, b, d, null, c);
            }
          }
        }
      }
      function yc(a, b, c, d) {
        var e = xb(d);
        e = wc(e);
        if (null !== e) {
          var f = Zb(e);
          if (null === f)
            e = null;
          else {
            var g = f.tag;
            if (13 === g) {
              e = $b(f);
              if (null !== e)
                return e;
              e = null;
            } else if (3 === g) {
              if (f.stateNode.hydrate)
                return 3 === f.tag ? f.stateNode.containerInfo : null;
              e = null;
            } else
              f !== e && (e = null);
          }
        }
        jd(a, b, d, e, c);
        return null;
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md)
          return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++)
          ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
          ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a)
            a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        m(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = m({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = m({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a)
          return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = m({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = m({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = m({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = m({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = m({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = m({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b)
            return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = m({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = m({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = m({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = m({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = fa && "CompositionEvent" in window;
      var be = null;
      fa && "documentMode" in document && (be = document.documentMode);
      var ce = fa && "TextEvent" in window && !be;
      var de = fa && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which)
              return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie)
          return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length)
                return b.char;
              if (b.which)
                return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b))
          return a;
      }
      function ve(a, b) {
        if ("change" === a)
          return b;
      }
      var we = false;
      if (fa) {
        if (fa) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else
          xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          a = re;
          if (Kb)
            a(b);
          else {
            Kb = true;
            try {
              Gb(a, b);
            } finally {
              Kb = false, Mb();
            }
          }
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a)
          return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a)
          return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a)
          return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      var Ie = Object.prototype.hasOwnProperty;
      function Je(a, b) {
        if (He(a, b))
          return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
          return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length)
          return false;
        for (d = 0; d < c.length; d++)
          if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]]))
            return false;
        return true;
      }
      function Ke(a) {
        for (; a && a.firstChild; )
          a = a.firstChild;
        return a;
      }
      function Le(a, b) {
        var c = Ke(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b)
              return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Ke(c);
        }
      }
      function Me(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Ne() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c)
            a = b.contentWindow;
          else
            break;
          b = Xa(a.document);
        }
        return b;
      }
      function Oe(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      var Pe = fa && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      Pc(
        "cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
        0
      );
      Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
      Pc(Oc, 2);
      for (Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
        Nc.set(Ve[We], 0);
      var Ve;
      var We;
      ea("onMouseEnter", ["mouseout", "mouseover"]);
      ea("onMouseLeave", ["mouseout", "mouseover"]);
      ea("onPointerEnter", ["pointerout", "pointerover"]);
      ea("onPointerLeave", ["pointerout", "pointerover"]);
      da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
      function Ze(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Yb(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b)
              for (var g = d.length - 1; 0 <= g; g--) {
                var h = d[g], k = h.instance, l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                Ze(e, h, l);
                f = k;
              }
            else
              for (g = 0; g < d.length; g++) {
                h = d[g];
                k = h.instance;
                l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                Ze(e, h, l);
                f = k;
              }
          }
        }
        if (Ub)
          throw a = Vb, Ub = false, Vb = null, a;
      }
      function G(a, b) {
        var c = $e(b), d = a + "__bubble";
        c.has(d) || (af(b, a, 2, false), c.add(d));
      }
      var bf = "_reactListening" + Math.random().toString(36).slice(2);
      function cf(a) {
        a[bf] || (a[bf] = true, ba.forEach(function(b) {
          Ye.has(b) || df(b, false, a, null);
          df(b, true, a, null);
        }));
      }
      function df(a, b, c, d) {
        var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, f = c;
        "selectionchange" === a && 9 !== c.nodeType && (f = c.ownerDocument);
        if (null !== d && !b && Ye.has(a)) {
          if ("scroll" !== a)
            return;
          e |= 2;
          f = d;
        }
        var g = $e(f), h = a + "__" + (b ? "capture" : "bubble");
        g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
      }
      function af(a, b, c, d) {
        var e = Nc.get(b);
        switch (void 0 === e ? 2 : e) {
          case 0:
            e = gd;
            break;
          case 1:
            e = id;
            break;
          default:
            e = hd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Pb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function jd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d)
          a:
            for (; ; ) {
              if (null === d)
                return;
              var g = d.tag;
              if (3 === g || 4 === g) {
                var h = d.stateNode.containerInfo;
                if (h === e || 8 === h.nodeType && h.parentNode === e)
                  break;
                if (4 === g)
                  for (g = d.return; null !== g; ) {
                    var k = g.tag;
                    if (3 === k || 4 === k) {
                      if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                        return;
                    }
                    g = g.return;
                  }
                for (; null !== h; ) {
                  g = wc(h);
                  if (null === g)
                    return;
                  k = g.tag;
                  if (5 === k || 6 === k) {
                    d = f = g;
                    continue a;
                  }
                  h = h.parentNode;
                }
              }
              d = d.return;
            }
        Nb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = Mc.get(a);
            if (void 0 !== h2) {
              var k2 = td, x = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c))
                    break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  x = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  x = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button)
                    break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case Ic:
                case Jc:
                case Kc:
                  k2 = Hd;
                  break;
                case Lc:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var w = 0 !== (b & 4), z = !w && "scroll" === a, u = w ? null !== h2 ? h2 + "Capture" : null : h2;
              w = [];
              for (var t = d2, q; null !== t; ) {
                q = t;
                var v = q.stateNode;
                5 === q.tag && null !== v && (q = v, null !== u && (v = Ob(t, u), null != v && w.push(ef(t, v, q))));
                if (z)
                  break;
                t = t.return;
              }
              0 < w.length && (h2 = new k2(h2, x, null, c, e2), g2.push({ event: h2, listeners: w }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && 0 === (b & 16) && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff]))
                break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (x = c.relatedTarget || c.toElement, k2 = d2, x = x ? wc(x) : null, null !== x && (z = Zb(x), x !== z || 5 !== x.tag && 6 !== x.tag))
                    x = null;
                } else
                  k2 = null, x = d2;
                if (k2 !== x) {
                  w = Bd;
                  v = "onMouseLeave";
                  u = "onMouseEnter";
                  t = "mouse";
                  if ("pointerout" === a || "pointerover" === a)
                    w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
                  z = null == k2 ? h2 : ue(k2);
                  q = null == x ? h2 : ue(x);
                  h2 = new w(v, t + "leave", k2, c, e2);
                  h2.target = z;
                  h2.relatedTarget = q;
                  v = null;
                  wc(e2) === d2 && (w = new w(u, t + "enter", x, c, e2), w.target = q, w.relatedTarget = z, v = w);
                  z = v;
                  if (k2 && x)
                    b: {
                      w = k2;
                      u = x;
                      t = 0;
                      for (q = w; q; q = gf(q))
                        t++;
                      q = 0;
                      for (v = u; v; v = gf(v))
                        q++;
                      for (; 0 < t - q; )
                        w = gf(w), t--;
                      for (; 0 < q - t; )
                        u = gf(u), q--;
                      for (; t--; ) {
                        if (w === u || null !== u && w === u.alternate)
                          break b;
                        w = gf(w);
                        u = gf(u);
                      }
                      w = null;
                    }
                  else
                    w = null;
                  null !== k2 && hf(g2, h2, k2, w, false);
                  null !== x && null !== z && hf(g2, z, x, w, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type)
                var J = ve;
              else if (me(h2))
                if (we)
                  J = Fe;
                else {
                  J = De;
                  var K = Ce;
                }
              else
                (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (J = Ee);
              if (J && (J = J(a, d2))) {
                ne(g2, J, c, e2);
                break a;
              }
              K && K(a, h2, d2);
              "focusout" === a && (K = h2._wrapperState) && K.controlled && "number" === h2.type && bb(h2, "number", h2.value);
            }
            K = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(K) || "true" === K.contentEditable)
                  Qe = K, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe)
                  break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var Q;
            if (ae)
              b: {
                switch (a) {
                  case "compositionstart":
                    var L = "onCompositionStart";
                    break b;
                  case "compositionend":
                    L = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    L = "onCompositionUpdate";
                    break b;
                }
                L = void 0;
              }
            else
              ie ? ge(a, c) && (L = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (L = "onCompositionStart");
            L && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== L ? "onCompositionEnd" === L && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a, null, c, e2), g2.push({ event: L, listeners: K }), Q ? L.data = Q : (Q = he(c), null !== Q && (L.data = Q))));
            if (Q = ce ? je(a, c) : ke(a, c))
              d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld(
                "onBeforeInput",
                "beforeinput",
                null,
                c,
                e2
              ), g2.push({ event: e2, listeners: d2 }), e2.data = Q);
          }
          se(g2, b);
        });
      }
      function ef(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Ob(a, c), null != f && d.unshift(ef(a, f, e)), f = Ob(a, b), null != f && d.push(ef(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function gf(a) {
        if (null === a)
          return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function hf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d)
            break;
          5 === h.tag && null !== l && (h = l, e ? (k = Ob(c, f), null != k && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), null != k && g.push(ef(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      function jf() {
      }
      var kf = null;
      var lf = null;
      function mf(a, b) {
        switch (a) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            return !!b.autoFocus;
        }
        return false;
      }
      function nf(a, b) {
        return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var of = "function" === typeof setTimeout ? setTimeout : void 0;
      var pf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      function qf(a) {
        1 === a.nodeType ? a.textContent = "" : 9 === a.nodeType && (a = a.body, null != a && (a.textContent = ""));
      }
      function rf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b)
            break;
        }
        return a;
      }
      function sf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b)
                return a;
              b--;
            } else
              "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var tf = 0;
      function uf(a) {
        return { $$typeof: Ga, toString: a, valueOf: a };
      }
      var vf = Math.random().toString(36).slice(2);
      var wf = "__reactFiber$" + vf;
      var xf = "__reactProps$" + vf;
      var ff = "__reactContainer$" + vf;
      var yf = "__reactEvents$" + vf;
      function wc(a) {
        var b = a[wf];
        if (b)
          return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[ff] || c[wf]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child)
              for (a = sf(a); null !== a; ) {
                if (c = a[wf])
                  return c;
                a = sf(a);
              }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[wf] || a[ff];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag)
          return a.stateNode;
        throw Error(y(33));
      }
      function Db(a) {
        return a[xf] || null;
      }
      function $e(a) {
        var b = a[yf];
        void 0 === b && (b = a[yf] = /* @__PURE__ */ new Set());
        return b;
      }
      var zf = [];
      var Af = -1;
      function Bf(a) {
        return { current: a };
      }
      function H(a) {
        0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
      }
      function I(a, b) {
        Af++;
        zf[Af] = a.current;
        a.current = b;
      }
      var Cf = {};
      var M = Bf(Cf);
      var N = Bf(false);
      var Df = Cf;
      function Ef(a, b) {
        var c = a.type.contextTypes;
        if (!c)
          return Cf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
          return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c)
          e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Ff(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function Gf() {
        H(N);
        H(M);
      }
      function Hf(a, b, c) {
        if (M.current !== Cf)
          throw Error(y(168));
        I(M, b);
        I(N, c);
      }
      function If(a, b, c) {
        var d = a.stateNode;
        a = b.childContextTypes;
        if ("function" !== typeof d.getChildContext)
          return c;
        d = d.getChildContext();
        for (var e in d)
          if (!(e in a))
            throw Error(y(108, Ra(b) || "Unknown", e));
        return m({}, c, d);
      }
      function Jf(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
        Df = M.current;
        I(M, a);
        I(N, N.current);
        return true;
      }
      function Kf(a, b, c) {
        var d = a.stateNode;
        if (!d)
          throw Error(y(169));
        c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
        I(N, c);
      }
      var Lf = null;
      var Mf = null;
      var Nf = r.unstable_runWithPriority;
      var Of = r.unstable_scheduleCallback;
      var Pf = r.unstable_cancelCallback;
      var Qf = r.unstable_shouldYield;
      var Rf = r.unstable_requestPaint;
      var Sf = r.unstable_now;
      var Tf = r.unstable_getCurrentPriorityLevel;
      var Uf = r.unstable_ImmediatePriority;
      var Vf = r.unstable_UserBlockingPriority;
      var Wf = r.unstable_NormalPriority;
      var Xf = r.unstable_LowPriority;
      var Yf = r.unstable_IdlePriority;
      var Zf = {};
      var $f = void 0 !== Rf ? Rf : function() {
      };
      var ag = null;
      var bg = null;
      var cg = false;
      var dg = Sf();
      var O = 1e4 > dg ? Sf : function() {
        return Sf() - dg;
      };
      function eg() {
        switch (Tf()) {
          case Uf:
            return 99;
          case Vf:
            return 98;
          case Wf:
            return 97;
          case Xf:
            return 96;
          case Yf:
            return 95;
          default:
            throw Error(y(332));
        }
      }
      function fg(a) {
        switch (a) {
          case 99:
            return Uf;
          case 98:
            return Vf;
          case 97:
            return Wf;
          case 96:
            return Xf;
          case 95:
            return Yf;
          default:
            throw Error(y(332));
        }
      }
      function gg(a, b) {
        a = fg(a);
        return Nf(a, b);
      }
      function hg(a, b, c) {
        a = fg(a);
        return Of(a, b, c);
      }
      function ig() {
        if (null !== bg) {
          var a = bg;
          bg = null;
          Pf(a);
        }
        jg();
      }
      function jg() {
        if (!cg && null !== ag) {
          cg = true;
          var a = 0;
          try {
            var b = ag;
            gg(99, function() {
              for (; a < b.length; a++) {
                var c = b[a];
                do
                  c = c(true);
                while (null !== c);
              }
            });
            ag = null;
          } catch (c) {
            throw null !== ag && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
          } finally {
            cg = false;
          }
        }
      }
      var kg = ra.ReactCurrentBatchConfig;
      function lg(a, b) {
        if (a && a.defaultProps) {
          b = m({}, b);
          a = a.defaultProps;
          for (var c in a)
            void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      var mg = Bf(null);
      var ng = null;
      var og = null;
      var pg = null;
      function qg() {
        pg = og = ng = null;
      }
      function rg(a) {
        var b = mg.current;
        H(mg);
        a.type._context._currentValue = b;
      }
      function sg(a, b) {
        for (; null !== a; ) {
          var c = a.alternate;
          if ((a.childLanes & b) === b)
            if (null === c || (c.childLanes & b) === b)
              break;
            else
              c.childLanes |= b;
          else
            a.childLanes |= b, null !== c && (c.childLanes |= b);
          a = a.return;
        }
      }
      function tg(a, b) {
        ng = a;
        pg = og = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (ug = true), a.firstContext = null);
      }
      function vg(a, b) {
        if (pg !== a && false !== b && 0 !== b) {
          if ("number" !== typeof b || 1073741823 === b)
            pg = a, b = 1073741823;
          b = { context: a, observedBits: b, next: null };
          if (null === og) {
            if (null === ng)
              throw Error(y(308));
            og = b;
            ng.dependencies = { lanes: 0, firstContext: b, responders: null };
          } else
            og = og.next = b;
        }
        return a._currentValue;
      }
      var wg = false;
      function xg(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
      }
      function yg(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function zg(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function Ag(a, b) {
        a = a.updateQueue;
        if (null !== a) {
          a = a.shared;
          var c = a.pending;
          null === c ? b.next = b : (b.next = c.next, c.next = b);
          a.pending = b;
        }
      }
      function Bg(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else
            e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function Cg(a, b, c, d) {
        var e = a.updateQueue;
        wg = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var n = a.alternate;
          if (null !== n) {
            n = n.updateQueue;
            var A = n.lastBaseUpdate;
            A !== g && (null === A ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
          }
        }
        if (null !== f) {
          A = e.baseState;
          g = 0;
          n = l = k = null;
          do {
            h = f.lane;
            var p = f.eventTime;
            if ((d & h) === h) {
              null !== n && (n = n.next = {
                eventTime: p,
                lane: 0,
                tag: f.tag,
                payload: f.payload,
                callback: f.callback,
                next: null
              });
              a: {
                var C = a, x = f;
                h = b;
                p = c;
                switch (x.tag) {
                  case 1:
                    C = x.payload;
                    if ("function" === typeof C) {
                      A = C.call(p, A, h);
                      break a;
                    }
                    A = C;
                    break a;
                  case 3:
                    C.flags = C.flags & -4097 | 64;
                  case 0:
                    C = x.payload;
                    h = "function" === typeof C ? C.call(p, A, h) : C;
                    if (null === h || void 0 === h)
                      break a;
                    A = m({}, A, h);
                    break a;
                  case 2:
                    wg = true;
                }
              }
              null !== f.callback && (a.flags |= 32, h = e.effects, null === h ? e.effects = [f] : h.push(f));
            } else
              p = { eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, null === n ? (l = n = p, k = A) : n = n.next = p, g |= h;
            f = f.next;
            if (null === f)
              if (h = e.shared.pending, null === h)
                break;
              else
                f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
          } while (1);
          null === n && (k = A);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = n;
          Dg |= g;
          a.lanes = g;
          a.memoizedState = A;
        }
      }
      function Eg(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a)
          for (b = 0; b < a.length; b++) {
            var d = a[b], e = d.callback;
            if (null !== e) {
              d.callback = null;
              d = c;
              if ("function" !== typeof e)
                throw Error(y(191, e));
              e.call(d);
            }
          }
      }
      var Fg = new aa.Component().refs;
      function Gg(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : m({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Kg = { isMounted: function(a) {
        return (a = a._reactInternals) ? Zb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = Hg(), e = Ig(a), f = zg(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        Ag(a, f);
        Jg(a, e, d);
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = Hg(), e = Ig(a), f = zg(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        Ag(a, f);
        Jg(a, e, d);
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = Hg(), d = Ig(a), e = zg(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        Ag(a, e);
        Jg(a, d, c);
      } };
      function Lg(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : true;
      }
      function Mg(a, b, c) {
        var d = false, e = Cf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Ef(a, e) : Cf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Kg;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Ng(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
      }
      function Og(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = Fg;
        xg(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f));
        Cg(a, c, e, d);
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Gg(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4);
      }
      var Pg = Array.isArray;
      function Qg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag)
                throw Error(y(309));
              var d = c.stateNode;
            }
            if (!d)
              throw Error(y(147, a));
            var e = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e)
              return b.ref;
            b = function(a2) {
              var b2 = d.refs;
              b2 === Fg && (b2 = d.refs = {});
              null === a2 ? delete b2[e] : b2[e] = a2;
            };
            b._stringRef = e;
            return b;
          }
          if ("string" !== typeof a)
            throw Error(y(284));
          if (!c._owner)
            throw Error(y(290, a));
        }
        return a;
      }
      function Rg(a, b) {
        if ("textarea" !== a.type)
          throw Error(y(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
      }
      function Sg(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.lastEffect;
            null !== d2 ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
            c2.nextEffect = null;
            c2.flags = 8;
          }
        }
        function c(c2, d2) {
          if (!a)
            return null;
          for (; null !== d2; )
            b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
            null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Tg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a)
            return c2;
          d2 = b2.alternate;
          if (null !== d2)
            return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
          b2.flags = 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags = 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag)
            return b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          if (null !== b2 && b2.elementType === c2.type)
            return d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2;
          d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Qg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
            return b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function n(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag)
            return b2 = Xg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function A(a2, b2, c2) {
          if ("string" === typeof b2 || "number" === typeof b2)
            return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case sa:
                return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
              case ta:
                return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
            }
            if (Pg(b2) || La(b2))
              return b2 = Xg(
                b2,
                a2.mode,
                c2,
                null
              ), b2.return = a2, b2;
            Rg(a2, b2);
          }
          return null;
        }
        function p(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 || "number" === typeof c2)
            return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case sa:
                return c2.key === e2 ? c2.type === ua ? n(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
              case ta:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            }
            if (Pg(c2) || La(c2))
              return null !== e2 ? null : n(a2, b2, c2, d2, null);
            Rg(a2, c2);
          }
          return null;
        }
        function C(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 || "number" === typeof d2)
            return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case sa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, d2.type === ua ? n(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
              case ta:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            }
            if (Pg(d2) || La(d2))
              return a2 = a2.get(c2) || null, n(b2, a2, d2, e2, null);
            Rg(b2, d2);
          }
          return null;
        }
        function x(e2, g2, h2, k2) {
          for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; null !== u && z < h2.length; z++) {
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var n2 = p(e2, u, h2[z], k2);
            if (null === n2) {
              null === u && (u = q);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, z);
            null === t ? l2 = n2 : t.sibling = n2;
            t = n2;
            u = q;
          }
          if (z === h2.length)
            return c(e2, u), l2;
          if (null === u) {
            for (; z < h2.length; z++)
              u = A(e2, h2[z], k2), null !== u && (g2 = f(u, g2, z), null === t ? l2 = u : t.sibling = u, t = u);
            return l2;
          }
          for (u = d(e2, u); z < h2.length; z++)
            q = C(u, e2, z, h2[z], k2), null !== q && (a && null !== q.alternate && u.delete(null === q.key ? z : q.key), g2 = f(q, g2, z), null === t ? l2 = q : t.sibling = q, t = q);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        function w(e2, g2, h2, k2) {
          var l2 = La(h2);
          if ("function" !== typeof l2)
            throw Error(y(150));
          h2 = l2.call(h2);
          if (null == h2)
            throw Error(y(151));
          for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); null !== u && !n2.done; z++, n2 = h2.next()) {
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var w2 = p(e2, u, n2.value, k2);
            if (null === w2) {
              null === u && (u = q);
              break;
            }
            a && u && null === w2.alternate && b(e2, u);
            g2 = f(w2, g2, z);
            null === t ? l2 = w2 : t.sibling = w2;
            t = w2;
            u = q;
          }
          if (n2.done)
            return c(e2, u), l2;
          if (null === u) {
            for (; !n2.done; z++, n2 = h2.next())
              n2 = A(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, z), null === t ? l2 = n2 : t.sibling = n2, t = n2);
            return l2;
          }
          for (u = d(e2, u); !n2.done; z++, n2 = h2.next())
            n2 = C(u, e2, z, n2.value, k2), null !== n2 && (a && null !== n2.alternate && u.delete(null === n2.key ? z : n2.key), g2 = f(n2, g2, z), null === t ? l2 = n2 : t.sibling = n2, t = n2);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        return function(a2, d2, f2, h2) {
          var k2 = "object" === typeof f2 && null !== f2 && f2.type === ua && null === f2.key;
          k2 && (f2 = f2.props.children);
          var l2 = "object" === typeof f2 && null !== f2;
          if (l2)
            switch (f2.$$typeof) {
              case sa:
                a: {
                  l2 = f2.key;
                  for (k2 = d2; null !== k2; ) {
                    if (k2.key === l2) {
                      switch (k2.tag) {
                        case 7:
                          if (f2.type === ua) {
                            c(a2, k2.sibling);
                            d2 = e(k2, f2.props.children);
                            d2.return = a2;
                            a2 = d2;
                            break a;
                          }
                          break;
                        default:
                          if (k2.elementType === f2.type) {
                            c(a2, k2.sibling);
                            d2 = e(k2, f2.props);
                            d2.ref = Qg(a2, k2, f2);
                            d2.return = a2;
                            a2 = d2;
                            break a;
                          }
                      }
                      c(a2, k2);
                      break;
                    } else
                      b(a2, k2);
                    k2 = k2.sibling;
                  }
                  f2.type === ua ? (d2 = Xg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Qg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case ta:
                a: {
                  for (k2 = f2.key; null !== d2; ) {
                    if (d2.key === k2)
                      if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                        c(a2, d2.sibling);
                        d2 = e(d2, f2.children || []);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      } else {
                        c(a2, d2);
                        break;
                      }
                    else
                      b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Wg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
            }
          if ("string" === typeof f2 || "number" === typeof f2)
            return f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
          if (Pg(f2))
            return x(a2, d2, f2, h2);
          if (La(f2))
            return w(a2, d2, f2, h2);
          l2 && Rg(a2, f2);
          if ("undefined" === typeof f2 && !k2)
            switch (a2.tag) {
              case 1:
              case 22:
              case 0:
              case 11:
              case 15:
                throw Error(y(152, Ra(a2.type) || "Component"));
            }
          return c(a2, d2);
        };
      }
      var Yg = Sg(true);
      var Zg = Sg(false);
      var $g = {};
      var ah = Bf($g);
      var bh = Bf($g);
      var ch = Bf($g);
      function dh(a) {
        if (a === $g)
          throw Error(y(174));
        return a;
      }
      function eh(a, b) {
        I(ch, b);
        I(bh, a);
        I(ah, $g);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
        }
        H(ah);
        I(ah, b);
      }
      function fh() {
        H(ah);
        H(bh);
        H(ch);
      }
      function gh(a) {
        dh(ch.current);
        var b = dh(ah.current);
        var c = mb(b, a.type);
        b !== c && (I(bh, a), I(ah, c));
      }
      function hh(a) {
        bh.current === a && (H(ah), H(bh));
      }
      var P = Bf(0);
      function ih(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
              return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 64))
              return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a)
            break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a)
              return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var jh = null;
      var kh = null;
      var lh = false;
      function mh(a, b) {
        var c = nh(5, null, null, 0);
        c.elementType = "DELETED";
        c.type = "DELETED";
        c.stateNode = b;
        c.return = a;
        c.flags = 8;
        null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
      }
      function oh(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, true) : false;
          case 13:
            return false;
          default:
            return false;
        }
      }
      function ph(a) {
        if (lh) {
          var b = kh;
          if (b) {
            var c = b;
            if (!oh(a, b)) {
              b = rf(c.nextSibling);
              if (!b || !oh(a, b)) {
                a.flags = a.flags & -1025 | 2;
                lh = false;
                jh = a;
                return;
              }
              mh(jh, c);
            }
            jh = a;
            kh = rf(b.firstChild);
          } else
            a.flags = a.flags & -1025 | 2, lh = false, jh = a;
        }
      }
      function qh(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
          a = a.return;
        jh = a;
      }
      function rh(a) {
        if (a !== jh)
          return false;
        if (!lh)
          return qh(a), lh = true, false;
        var b = a.type;
        if (5 !== a.tag || "head" !== b && "body" !== b && !nf(b, a.memoizedProps))
          for (b = kh; b; )
            mh(a, b), b = rf(b.nextSibling);
        qh(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a)
            throw Error(y(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    kh = rf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else
                  "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            kh = null;
          }
        } else
          kh = jh ? rf(a.stateNode.nextSibling) : null;
        return true;
      }
      function sh() {
        kh = jh = null;
        lh = false;
      }
      var th = [];
      function uh() {
        for (var a = 0; a < th.length; a++)
          th[a]._workInProgressVersionPrimary = null;
        th.length = 0;
      }
      var vh = ra.ReactCurrentDispatcher;
      var wh = ra.ReactCurrentBatchConfig;
      var xh = 0;
      var R = null;
      var S = null;
      var T = null;
      var yh = false;
      var zh = false;
      function Ah() {
        throw Error(y(321));
      }
      function Bh(a, b) {
        if (null === b)
          return false;
        for (var c = 0; c < b.length && c < a.length; c++)
          if (!He(a[c], b[c]))
            return false;
        return true;
      }
      function Ch(a, b, c, d, e, f) {
        xh = f;
        R = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        vh.current = null === a || null === a.memoizedState ? Dh : Eh;
        a = c(d, e);
        if (zh) {
          f = 0;
          do {
            zh = false;
            if (!(25 > f))
              throw Error(y(301));
            f += 1;
            T = S = null;
            b.updateQueue = null;
            vh.current = Fh;
            a = c(d, e);
          } while (zh);
        }
        vh.current = Gh;
        b = null !== S && null !== S.next;
        xh = 0;
        T = S = R = null;
        yh = false;
        if (b)
          throw Error(y(300));
        return a;
      }
      function Hh() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === T ? R.memoizedState = T = a : T = T.next = a;
        return T;
      }
      function Ih() {
        if (null === S) {
          var a = R.alternate;
          a = null !== a ? a.memoizedState : null;
        } else
          a = S.next;
        var b = null === T ? R.memoizedState : T.next;
        if (null !== b)
          T = b, S = a;
        else {
          if (null === a)
            throw Error(y(310));
          S = a;
          a = { memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null };
          null === T ? R.memoizedState = T = a : T = T.next = a;
        }
        return T;
      }
      function Jh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Kh(a) {
        var b = Ih(), c = b.queue;
        if (null === c)
          throw Error(y(311));
        c.lastRenderedReducer = a;
        var d = S, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          e = e.next;
          d = d.baseState;
          var h = g = f = null, k = e;
          do {
            var l = k.lane;
            if ((xh & l) === l)
              null !== h && (h = h.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
            else {
              var n = {
                lane: l,
                action: k.action,
                eagerReducer: k.eagerReducer,
                eagerState: k.eagerState,
                next: null
              };
              null === h ? (g = h = n, f = d) : h = h.next = n;
              R.lanes |= l;
              Dg |= l;
            }
            k = k.next;
          } while (null !== k && k !== e);
          null === h ? f = d : h.next = g;
          He(d, b.memoizedState) || (ug = true);
          b.memoizedState = d;
          b.baseState = f;
          b.baseQueue = h;
          c.lastRenderedState = d;
        }
        return [b.memoizedState, c.dispatch];
      }
      function Lh(a) {
        var b = Ih(), c = b.queue;
        if (null === c)
          throw Error(y(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (ug = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Mh(a, b, c) {
        var d = b._getVersion;
        d = d(b._source);
        var e = b._workInProgressVersionPrimary;
        if (null !== e)
          a = e === d;
        else if (a = a.mutableReadLanes, a = (xh & a) === a)
          b._workInProgressVersionPrimary = d, th.push(b);
        if (a)
          return c(b._source);
        th.push(b);
        throw Error(y(350));
      }
      function Nh(a, b, c, d) {
        var e = U;
        if (null === e)
          throw Error(y(349));
        var f = b._getVersion, g = f(b._source), h = vh.current, k = h.useState(function() {
          return Mh(e, b, c);
        }), l = k[1], n = k[0];
        k = T;
        var A = a.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
        A = A.subscribe;
        var w = R;
        a.memoizedState = { refs: p, source: b, subscribe: d };
        h.useEffect(function() {
          p.getSnapshot = c;
          p.setSnapshot = l;
          var a2 = f(b._source);
          if (!He(g, a2)) {
            a2 = c(b._source);
            He(n, a2) || (l(a2), a2 = Ig(w), e.mutableReadLanes |= a2 & e.pendingLanes);
            a2 = e.mutableReadLanes;
            e.entangledLanes |= a2;
            for (var d2 = e.entanglements, h2 = a2; 0 < h2; ) {
              var k2 = 31 - Vc(h2), v = 1 << k2;
              d2[k2] |= a2;
              h2 &= ~v;
            }
          }
        }, [c, b, d]);
        h.useEffect(function() {
          return d(b._source, function() {
            var a2 = p.getSnapshot, c2 = p.setSnapshot;
            try {
              c2(a2(b._source));
              var d2 = Ig(w);
              e.mutableReadLanes |= d2 & e.pendingLanes;
            } catch (q) {
              c2(function() {
                throw q;
              });
            }
          });
        }, [b, d]);
        He(C, c) && He(x, b) && He(A, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n }, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n);
        return n;
      }
      function Ph(a, b, c) {
        var d = Ih();
        return Nh(d, a, b, c);
      }
      function Qh(a) {
        var b = Hh();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a };
        a = a.dispatch = Oh.bind(null, R, a);
        return [b.memoizedState, a];
      }
      function Rh(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = R.updateQueue;
        null === b ? (b = { lastEffect: null }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function Sh(a) {
        var b = Hh();
        a = { current: a };
        return b.memoizedState = a;
      }
      function Th() {
        return Ih().memoizedState;
      }
      function Uh(a, b, c, d) {
        var e = Hh();
        R.flags |= a;
        e.memoizedState = Rh(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function Vh(a, b, c, d) {
        var e = Ih();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== S) {
          var g = S.memoizedState;
          f = g.destroy;
          if (null !== d && Bh(d, g.deps)) {
            Rh(b, c, f, d);
            return;
          }
        }
        R.flags |= a;
        e.memoizedState = Rh(1 | b, c, f, d);
      }
      function Wh(a, b) {
        return Uh(516, 4, a, b);
      }
      function Xh(a, b) {
        return Vh(516, 4, a, b);
      }
      function Yh(a, b) {
        return Vh(4, 2, a, b);
      }
      function Zh(a, b) {
        if ("function" === typeof b)
          return a = a(), b(a), function() {
            b(null);
          };
        if (null !== b && void 0 !== b)
          return a = a(), b.current = a, function() {
            b.current = null;
          };
      }
      function $h(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return Vh(4, 2, Zh.bind(null, b, a), c);
      }
      function ai() {
      }
      function bi(a, b) {
        var c = Ih();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Bh(b, d[1]))
          return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ci(a, b) {
        var c = Ih();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Bh(b, d[1]))
          return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function di(a, b) {
        var c = eg();
        gg(98 > c ? 98 : c, function() {
          a(true);
        });
        gg(97 < c ? 97 : c, function() {
          var c2 = wh.transition;
          wh.transition = 1;
          try {
            a(false), b();
          } finally {
            wh.transition = c2;
          }
        });
      }
      function Oh(a, b, c) {
        var d = Hg(), e = Ig(a), f = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, g = b.pending;
        null === g ? f.next = f : (f.next = g.next, g.next = f);
        b.pending = f;
        g = a.alternate;
        if (a === R || null !== g && g === R)
          zh = yh = true;
        else {
          if (0 === a.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g))
            try {
              var h = b.lastRenderedState, k = g(h, c);
              f.eagerReducer = g;
              f.eagerState = k;
              if (He(k, h))
                return;
            } catch (l) {
            } finally {
            }
          Jg(a, e, d);
        }
      }
      var Gh = { readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false };
      var Dh = { readContext: vg, useCallback: function(a, b) {
        Hh().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return Uh(4, 2, Zh.bind(
          null,
          b,
          a
        ), c);
      }, useLayoutEffect: function(a, b) {
        return Uh(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Hh();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Hh();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        a = a.dispatch = Oh.bind(null, R, a);
        return [d.memoizedState, a];
      }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Qh(a), c = b[0], d = b[1];
        Wh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Qh(false), b = a[0];
        a = di.bind(null, a[1]);
        Sh(a);
        return [a, b];
      }, useMutableSource: function(a, b, c) {
        var d = Hh();
        d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
        return Nh(d, a, b, c);
      }, useOpaqueIdentifier: function() {
        if (lh) {
          var a = false, b = uf(function() {
            a || (a = true, c("r:" + (tf++).toString(36)));
            throw Error(y(355));
          }), c = Qh(b)[1];
          0 === (R.mode & 2) && (R.flags |= 516, Rh(
            5,
            function() {
              c("r:" + (tf++).toString(36));
            },
            void 0,
            null
          ));
          return b;
        }
        b = "r:" + (tf++).toString(36);
        Qh(b);
        return b;
      }, unstable_isNewReconciler: false };
      var Eh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
        return Kh(Jh);
      }, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Kh(Jh), c = b[0], d = b[1];
        Xh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Kh(Jh)[0];
        return [
          Th().current,
          a
        ];
      }, useMutableSource: Ph, useOpaqueIdentifier: function() {
        return Kh(Jh)[0];
      }, unstable_isNewReconciler: false };
      var Fh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
        return Lh(Jh);
      }, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Lh(Jh), c = b[0], d = b[1];
        Xh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Lh(Jh)[0];
        return [
          Th().current,
          a
        ];
      }, useMutableSource: Ph, useOpaqueIdentifier: function() {
        return Lh(Jh)[0];
      }, unstable_isNewReconciler: false };
      var ei = ra.ReactCurrentOwner;
      var ug = false;
      function fi(a, b, c, d) {
        b.child = null === a ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
      }
      function gi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        tg(b, e);
        d = Ch(a, b, c, d, f, e);
        if (null !== a && !ug)
          return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
        b.flags |= 1;
        fi(a, b, d, e);
        return b.child;
      }
      function ii(a, b, c, d, e, f) {
        if (null === a) {
          var g = c.type;
          if ("function" === typeof g && !ji(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps)
            return b.tag = 15, b.type = g, ki(a, b, g, d, e, f);
          a = Vg(c.type, null, d, b, b.mode, f);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        g = a.child;
        if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Je, c(e, d) && a.ref === b.ref))
          return hi(a, b, f);
        b.flags |= 1;
        a = Tg(g, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function ki(a, b, c, d, e, f) {
        if (null !== a && Je(a.memoizedProps, d) && a.ref === b.ref)
          if (ug = false, 0 !== (f & e))
            0 !== (a.flags & 16384) && (ug = true);
          else
            return b.lanes = a.lanes, hi(a, b, f);
        return li(a, b, c, d, f);
      }
      function mi(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode)
          if (0 === (b.mode & 4))
            b.memoizedState = { baseLanes: 0 }, ni(b, c);
          else if (0 !== (c & 1073741824))
            b.memoizedState = { baseLanes: 0 }, ni(b, null !== f ? f.baseLanes : c);
          else
            return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, ni(b, a), null;
        else
          null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
        fi(a, b, e, c);
        return b.child;
      }
      function oi(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c)
          b.flags |= 128;
      }
      function li(a, b, c, d, e) {
        var f = Ff(c) ? Df : M.current;
        f = Ef(b, f);
        tg(b, e);
        c = Ch(a, b, c, d, f, e);
        if (null !== a && !ug)
          return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
        b.flags |= 1;
        fi(a, b, c, e);
        return b.child;
      }
      function pi(a, b, c, d, e) {
        if (Ff(c)) {
          var f = true;
          Jf(b);
        } else
          f = false;
        tg(b, e);
        if (null === b.stateNode)
          null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
          var n = c.getDerivedStateFromProps, A = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
          A || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Ng(b, g, d, l);
          wg = false;
          var p = b.memoizedState;
          g.state = p;
          Cg(b, d, g, e);
          k = b.memoizedState;
          h !== d || p !== k || N.current || wg ? ("function" === typeof n && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = false);
        } else {
          g = b.stateNode;
          yg(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : lg(b.type, h);
          g.props = l;
          A = b.pendingProps;
          p = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
          var C = c.getDerivedStateFromProps;
          (n = "function" === typeof C || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== A || p !== k) && Ng(b, g, d, k);
          wg = false;
          p = b.memoizedState;
          g.state = p;
          Cg(b, d, g, e);
          var x = b.memoizedState;
          h !== A || p !== x || N.current || wg ? ("function" === typeof C && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(
            d,
            x,
            k
          ), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = false);
        }
        return qi(a, b, c, d, f, e);
      }
      function qi(a, b, c, d, e, f) {
        oi(a, b);
        var g = 0 !== (b.flags & 64);
        if (!d && !g)
          return e && Kf(b, c, false), hi(a, b, f);
        d = b.stateNode;
        ei.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f);
        b.memoizedState = d.state;
        e && Kf(b, c, true);
        return b.child;
      }
      function ri(a) {
        var b = a.stateNode;
        b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, false);
        eh(a, b.containerInfo);
      }
      var si = { dehydrated: null, retryLane: 0 };
      function ti(a, b, c) {
        var d = b.pendingProps, e = P.current, f = false, g;
        (g = 0 !== (b.flags & 64)) || (g = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        g ? (f = true, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || true === d.unstable_avoidThisFallback || (e |= 1);
        I(P, e & 1);
        if (null === a) {
          void 0 !== d.fallback && ph(b);
          a = d.children;
          e = d.fallback;
          if (f)
            return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, a;
          if ("number" === typeof d.unstable_expectedLoadTime)
            return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, b.lanes = 33554432, a;
          c = vi({ mode: "visible", children: a }, b.mode, c, null);
          c.return = b;
          return b.child = c;
        }
        if (null !== a.memoizedState) {
          if (f)
            return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
          c = xi(a, b, d.children, c);
          b.memoizedState = null;
          return c;
        }
        if (f)
          return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
        c = xi(a, b, d.children, c);
        b.memoizedState = null;
        return c;
      }
      function ui(a, b, c, d) {
        var e = a.mode, f = a.child;
        b = { mode: "hidden", children: b };
        0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
        c = Xg(c, e, d, null);
        f.return = a;
        c.return = a;
        f.sibling = c;
        a.child = f;
        return c;
      }
      function xi(a, b, c, d) {
        var e = a.child;
        a = e.sibling;
        c = Tg(e, { mode: "visible", children: c });
        0 === (b.mode & 2) && (c.lanes = d);
        c.return = b;
        c.sibling = null;
        null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
        return b.child = c;
      }
      function wi(a, b, c, d, e) {
        var f = b.mode, g = a.child;
        a = g.sibling;
        var h = { mode: "hidden", children: c };
        0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
        null !== a ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2);
        d.return = b;
        c.return = b;
        c.sibling = d;
        b.child = c;
        return d;
      }
      function yi(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        sg(a.return, b);
      }
      function zi(a, b, c, d, e, f) {
        var g = a.memoizedState;
        null === g ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
      }
      function Ai(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        fi(a, b, d.children, c);
        d = P.current;
        if (0 !== (d & 2))
          d = d & 1 | 2, b.flags |= 64;
        else {
          if (null !== a && 0 !== (a.flags & 64))
            a:
              for (a = b.child; null !== a; ) {
                if (13 === a.tag)
                  null !== a.memoizedState && yi(a, c);
                else if (19 === a.tag)
                  yi(a, c);
                else if (null !== a.child) {
                  a.child.return = a;
                  a = a.child;
                  continue;
                }
                if (a === b)
                  break a;
                for (; null === a.sibling; ) {
                  if (null === a.return || a.return === b)
                    break a;
                  a = a.return;
                }
                a.sibling.return = a.return;
                a = a.sibling;
              }
          d &= 1;
        }
        I(P, d);
        if (0 === (b.mode & 2))
          b.memoizedState = null;
        else
          switch (e) {
            case "forwards":
              c = b.child;
              for (e = null; null !== c; )
                a = c.alternate, null !== a && null === ih(a) && (e = c), c = c.sibling;
              c = e;
              null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
              zi(b, false, e, c, f, b.lastEffect);
              break;
            case "backwards":
              c = null;
              e = b.child;
              for (b.child = null; null !== e; ) {
                a = e.alternate;
                if (null !== a && null === ih(a)) {
                  b.child = e;
                  break;
                }
                a = e.sibling;
                e.sibling = c;
                c = e;
                e = a;
              }
              zi(b, true, c, null, f, b.lastEffect);
              break;
            case "together":
              zi(b, false, null, null, void 0, b.lastEffect);
              break;
            default:
              b.memoizedState = null;
          }
        return b.child;
      }
      function hi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        Dg |= b.lanes;
        if (0 !== (c & b.childLanes)) {
          if (null !== a && b.child !== a.child)
            throw Error(y(153));
          if (null !== b.child) {
            a = b.child;
            c = Tg(a, a.pendingProps);
            b.child = c;
            for (c.return = b; null !== a.sibling; )
              a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
            c.sibling = null;
          }
          return b.child;
        }
        return null;
      }
      var Bi;
      var Ci;
      var Di;
      var Ei;
      Bi = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag)
            a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b)
            break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b)
              return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Ci = function() {
      };
      Di = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          dh(ah.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "option":
              e = eb(a, e);
              d = eb(a, d);
              f = [];
              break;
            case "select":
              e = m({}, e, { value: void 0 });
              d = m({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = jf);
          }
          vb(c, d);
          var g;
          c = null;
          for (l in e)
            if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l])
              if ("style" === l) {
                var h = e[l];
                for (g in h)
                  h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
              } else
                "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h))
              if ("style" === l)
                if (h) {
                  for (g in h)
                    !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
                  for (g in k)
                    k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
                } else
                  c || (f || (f = []), f.push(l, c)), c = k;
              else
                "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ca.hasOwnProperty(l) ? (null != k && "onScroll" === l && G("scroll", a), f || h === k || (f = [])) : "object" === typeof k && null !== k && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
          }
          c && (f = f || []).push(
            "style",
            c
          );
          var l = f;
          if (b.updateQueue = l)
            b.flags |= 4;
        }
      };
      Ei = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Fi(a, b) {
        if (!lh)
          switch (a.tailMode) {
            case "hidden":
              b = a.tail;
              for (var c = null; null !== b; )
                null !== b.alternate && (c = b), b = b.sibling;
              null === c ? a.tail = null : c.sibling = null;
              break;
            case "collapsed":
              c = a.tail;
              for (var d = null; null !== c; )
                null !== c.alternate && (d = c), c = c.sibling;
              null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
          }
      }
      function Gi(a, b, c) {
        var d = b.pendingProps;
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return null;
          case 1:
            return Ff(b.type) && Gf(), null;
          case 3:
            fh();
            H(N);
            H(M);
            uh();
            d = b.stateNode;
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child)
              rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
            Ci(b);
            return null;
          case 5:
            hh(b);
            var e = dh(ch.current);
            c = b.type;
            if (null !== a && null != b.stateNode)
              Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
            else {
              if (!d) {
                if (null === b.stateNode)
                  throw Error(y(166));
                return null;
              }
              a = dh(ah.current);
              if (rh(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[wf] = b;
                d[xf] = f;
                switch (c) {
                  case "dialog":
                    G("cancel", d);
                    G("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    G("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (a = 0; a < Xe.length; a++)
                      G(Xe[a], d);
                    break;
                  case "source":
                    G("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    G("error", d);
                    G("load", d);
                    break;
                  case "details":
                    G("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    G("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    G("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), G("invalid", d);
                }
                vb(c, f);
                a = null;
                for (var g in f)
                  f.hasOwnProperty(g) && (e = f[g], "children" === g ? "string" === typeof e ? d.textContent !== e && (a = ["children", e]) : "number" === typeof e && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && null != e && "onScroll" === g && G("scroll", d));
                switch (c) {
                  case "input":
                    Va(d);
                    cb(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = jf);
                }
                d = a;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                a === kb.html && (a = lb(c));
                a === kb.html ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[wf] = b;
                a[xf] = d;
                Bi(a, b, false, false);
                b.stateNode = a;
                g = wb(c, d);
                switch (c) {
                  case "dialog":
                    G("cancel", a);
                    G("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    G("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < Xe.length; e++)
                      G(Xe[e], a);
                    e = d;
                    break;
                  case "source":
                    G("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    G("error", a);
                    G("load", a);
                    e = d;
                    break;
                  case "details":
                    G("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    G("invalid", a);
                    break;
                  case "option":
                    e = eb(a, d);
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = m({}, d, { value: void 0 });
                    G("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    G("invalid", a);
                    break;
                  default:
                    e = d;
                }
                vb(c, e);
                var h = e;
                for (f in h)
                  if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? tb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && ob(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && pb(a, k) : "number" === typeof k && pb(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ca.hasOwnProperty(f) ? null != k && "onScroll" === f && G("scroll", a) : null != k && qa(a, f, k, g));
                  }
                switch (c) {
                  case "input":
                    Va(a);
                    cb(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f = d.value;
                    null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, true);
                    break;
                  default:
                    "function" === typeof e.onClick && (a.onclick = jf);
                }
                mf(c, d) && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 128);
            }
            return null;
          case 6:
            if (a && null != b.stateNode)
              Ei(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode)
                throw Error(y(166));
              c = dh(ch.current);
              dh(ah.current);
              rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
            }
            return null;
          case 13:
            H(P);
            d = b.memoizedState;
            if (0 !== (b.flags & 64))
              return b.lanes = c, b;
            d = null !== d;
            c = false;
            null === a ? void 0 !== b.memoizedProps.fallback && rh(b) : c = null !== a.memoizedState;
            if (d && !c && 0 !== (b.mode & 2))
              if (null === a && true !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (P.current & 1))
                0 === V && (V = 3);
              else {
                if (0 === V || 3 === V)
                  V = 4;
                null === U || 0 === (Dg & 134217727) && 0 === (Hi & 134217727) || Ii(U, W);
              }
            if (d || c)
              b.flags |= 4;
            return null;
          case 4:
            return fh(), Ci(b), null === a && cf(b.stateNode.containerInfo), null;
          case 10:
            return rg(b), null;
          case 17:
            return Ff(b.type) && Gf(), null;
          case 19:
            H(P);
            d = b.memoizedState;
            if (null === d)
              return null;
            f = 0 !== (b.flags & 64);
            g = d.rendering;
            if (null === g)
              if (f)
                Fi(d, false);
              else {
                if (0 !== V || null !== a && 0 !== (a.flags & 64))
                  for (a = b.child; null !== a; ) {
                    g = ih(a);
                    if (null !== g) {
                      b.flags |= 64;
                      Fi(d, false);
                      f = g.updateQueue;
                      null !== f && (b.updateQueue = f, b.flags |= 4);
                      null === d.lastEffect && (b.firstEffect = null);
                      b.lastEffect = d.lastEffect;
                      d = c;
                      for (c = b.child; null !== c; )
                        f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                      I(P, P.current & 1 | 2);
                      return b.child;
                    }
                    a = a.sibling;
                  }
                null !== d.tail && O() > Ji && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
              }
            else {
              if (!f)
                if (a = ih(g), null !== a) {
                  if (b.flags |= 64, f = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Fi(d, true), null === d.tail && "hidden" === d.tailMode && !g.alternate && !lh)
                    return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
                } else
                  2 * O() - d.renderingStartTime > Ji && 1073741824 !== c && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
              d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, null !== c ? c.sibling = g : b.child = g, d.last = g);
            }
            return null !== d.tail ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
          case 23:
          case 24:
            return Ki(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
        }
        throw Error(y(156, b.tag));
      }
      function Li(a) {
        switch (a.tag) {
          case 1:
            Ff(a.type) && Gf();
            var b = a.flags;
            return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
          case 3:
            fh();
            H(N);
            H(M);
            uh();
            b = a.flags;
            if (0 !== (b & 64))
              throw Error(y(285));
            a.flags = b & -4097 | 64;
            return a;
          case 5:
            return hh(a), null;
          case 13:
            return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
          case 19:
            return H(P), null;
          case 4:
            return fh(), null;
          case 10:
            return rg(a), null;
          case 23:
          case 24:
            return Ki(), null;
          default:
            return null;
        }
      }
      function Mi(a, b) {
        try {
          var c = "", d = b;
          do
            c += Qa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e };
      }
      function Ni(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Oi = "function" === typeof WeakMap ? WeakMap : Map;
      function Pi(a, b, c) {
        c = zg(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Qi || (Qi = true, Ri = d);
          Ni(a, b);
        };
        return c;
      }
      function Si(a, b, c) {
        c = zg(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            Ni(a, b);
            return d(e);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          "function" !== typeof d && (null === Ti ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this), Ni(a, b));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      var Ui = "function" === typeof WeakSet ? WeakSet : Set;
      function Vi(a) {
        var b = a.ref;
        if (null !== b)
          if ("function" === typeof b)
            try {
              b(null);
            } catch (c) {
              Wi(a, c);
            }
          else
            b.current = null;
      }
      function Xi(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            return;
          case 1:
            if (b.flags & 256 && null !== a) {
              var c = a.memoizedProps, d = a.memoizedState;
              a = b.stateNode;
              b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
              a.__reactInternalSnapshotBeforeUpdate = b;
            }
            return;
          case 3:
            b.flags & 256 && qf(b.stateNode.containerInfo);
            return;
          case 5:
          case 6:
          case 4:
          case 17:
            return;
        }
        throw Error(y(163));
      }
      function Yi(a, b, c) {
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            b = c.updateQueue;
            b = null !== b ? b.lastEffect : null;
            if (null !== b) {
              a = b = b.next;
              do {
                if (3 === (a.tag & 3)) {
                  var d = a.create;
                  a.destroy = d();
                }
                a = a.next;
              } while (a !== b);
            }
            b = c.updateQueue;
            b = null !== b ? b.lastEffect : null;
            if (null !== b) {
              a = b = b.next;
              do {
                var e = a;
                d = e.next;
                e = e.tag;
                0 !== (e & 4) && 0 !== (e & 1) && (Zi(c, a), $i(c, a));
                a = d;
              } while (a !== b);
            }
            return;
          case 1:
            a = c.stateNode;
            c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(
              d,
              b.memoizedState,
              a.__reactInternalSnapshotBeforeUpdate
            )));
            b = c.updateQueue;
            null !== b && Eg(c, b, a);
            return;
          case 3:
            b = c.updateQueue;
            if (null !== b) {
              a = null;
              if (null !== c.child)
                switch (c.child.tag) {
                  case 5:
                    a = c.child.stateNode;
                    break;
                  case 1:
                    a = c.child.stateNode;
                }
              Eg(c, b, a);
            }
            return;
          case 5:
            a = c.stateNode;
            null === b && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
            return;
          case 6:
            return;
          case 4:
            return;
          case 12:
            return;
          case 13:
            null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Cc(c))));
            return;
          case 19:
          case 17:
          case 20:
          case 21:
          case 23:
          case 24:
            return;
        }
        throw Error(y(163));
      }
      function aj(a, b) {
        for (var c = a; ; ) {
          if (5 === c.tag) {
            var d = c.stateNode;
            if (b)
              d = d.style, "function" === typeof d.setProperty ? d.setProperty("display", "none", "important") : d.display = "none";
            else {
              d = c.stateNode;
              var e = c.memoizedProps.style;
              e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
              d.style.display = sb("display", e);
            }
          } else if (6 === c.tag)
            c.stateNode.nodeValue = b ? "" : c.memoizedProps;
          else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === a)
            break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === a)
              return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
      function bj(a, b) {
        if (Mf && "function" === typeof Mf.onCommitFiberUnmount)
          try {
            Mf.onCommitFiberUnmount(Lf, b);
          } catch (f) {
          }
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            a = b.updateQueue;
            if (null !== a && (a = a.lastEffect, null !== a)) {
              var c = a = a.next;
              do {
                var d = c, e = d.destroy;
                d = d.tag;
                if (void 0 !== e)
                  if (0 !== (d & 4))
                    Zi(b, c);
                  else {
                    d = b;
                    try {
                      e();
                    } catch (f) {
                      Wi(d, f);
                    }
                  }
                c = c.next;
              } while (c !== a);
            }
            break;
          case 1:
            Vi(b);
            a = b.stateNode;
            if ("function" === typeof a.componentWillUnmount)
              try {
                a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
              } catch (f) {
                Wi(
                  b,
                  f
                );
              }
            break;
          case 5:
            Vi(b);
            break;
          case 4:
            cj(a, b);
        }
      }
      function dj(a) {
        a.alternate = null;
        a.child = null;
        a.dependencies = null;
        a.firstEffect = null;
        a.lastEffect = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.return = null;
        a.updateQueue = null;
      }
      function ej(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function fj(a) {
        a: {
          for (var b = a.return; null !== b; ) {
            if (ej(b))
              break a;
            b = b.return;
          }
          throw Error(y(160));
        }
        var c = b;
        b = c.stateNode;
        switch (c.tag) {
          case 5:
            var d = false;
            break;
          case 3:
            b = b.containerInfo;
            d = true;
            break;
          case 4:
            b = b.containerInfo;
            d = true;
            break;
          default:
            throw Error(y(161));
        }
        c.flags & 16 && (pb(b, ""), c.flags &= -17);
        a:
          b:
            for (c = a; ; ) {
              for (; null === c.sibling; ) {
                if (null === c.return || ej(c.return)) {
                  c = null;
                  break a;
                }
                c = c.return;
              }
              c.sibling.return = c.return;
              for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag; ) {
                if (c.flags & 2)
                  continue b;
                if (null === c.child || 4 === c.tag)
                  continue b;
                else
                  c.child.return = c, c = c.child;
              }
              if (!(c.flags & 2)) {
                c = c.stateNode;
                break a;
              }
            }
        d ? gj(a, c, b) : hj(a, c, b);
      }
      function gj(a, b, c) {
        var d = a.tag, e = 5 === d || 6 === d;
        if (e)
          a = e ? a.stateNode : a.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = jf));
        else if (4 !== d && (a = a.child, null !== a))
          for (gj(a, b, c), a = a.sibling; null !== a; )
            gj(a, b, c), a = a.sibling;
      }
      function hj(a, b, c) {
        var d = a.tag, e = 5 === d || 6 === d;
        if (e)
          a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a))
          for (hj(a, b, c), a = a.sibling; null !== a; )
            hj(a, b, c), a = a.sibling;
      }
      function cj(a, b) {
        for (var c = b, d = false, e, f; ; ) {
          if (!d) {
            d = c.return;
            a:
              for (; ; ) {
                if (null === d)
                  throw Error(y(160));
                e = d.stateNode;
                switch (d.tag) {
                  case 5:
                    f = false;
                    break a;
                  case 3:
                    e = e.containerInfo;
                    f = true;
                    break a;
                  case 4:
                    e = e.containerInfo;
                    f = true;
                    break a;
                }
                d = d.return;
              }
            d = true;
          }
          if (5 === c.tag || 6 === c.tag) {
            a:
              for (var g = a, h = c, k = h; ; )
                if (bj(g, k), null !== k.child && 4 !== k.tag)
                  k.child.return = k, k = k.child;
                else {
                  if (k === h)
                    break a;
                  for (; null === k.sibling; ) {
                    if (null === k.return || k.return === h)
                      break a;
                    k = k.return;
                  }
                  k.sibling.return = k.return;
                  k = k.sibling;
                }
            f ? (g = e, h = c.stateNode, 8 === g.nodeType ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
          } else if (4 === c.tag) {
            if (null !== c.child) {
              e = c.stateNode.containerInfo;
              f = true;
              c.child.return = c;
              c = c.child;
              continue;
            }
          } else if (bj(a, c), null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b)
            break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b)
              return;
            c = c.return;
            4 === c.tag && (d = false);
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
      function ij(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            var c = b.updateQueue;
            c = null !== c ? c.lastEffect : null;
            if (null !== c) {
              var d = c = c.next;
              do
                3 === (d.tag & 3) && (a = d.destroy, d.destroy = void 0, void 0 !== a && a()), d = d.next;
              while (d !== c);
            }
            return;
          case 1:
            return;
          case 5:
            c = b.stateNode;
            if (null != c) {
              d = b.memoizedProps;
              var e = null !== a ? a.memoizedProps : d;
              a = b.type;
              var f = b.updateQueue;
              b.updateQueue = null;
              if (null !== f) {
                c[xf] = d;
                "input" === a && "radio" === d.type && null != d.name && $a(c, d);
                wb(a, e);
                b = wb(a, d);
                for (e = 0; e < f.length; e += 2) {
                  var g = f[e], h = f[e + 1];
                  "style" === g ? tb(c, h) : "dangerouslySetInnerHTML" === g ? ob(c, h) : "children" === g ? pb(c, h) : qa(c, g, h, b);
                }
                switch (a) {
                  case "input":
                    ab(c, d);
                    break;
                  case "textarea":
                    ib(c, d);
                    break;
                  case "select":
                    a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, null != f ? fb(c, !!d.multiple, f, false) : a !== !!d.multiple && (null != d.defaultValue ? fb(c, !!d.multiple, d.defaultValue, true) : fb(c, !!d.multiple, d.multiple ? [] : "", false));
                }
              }
            }
            return;
          case 6:
            if (null === b.stateNode)
              throw Error(y(162));
            b.stateNode.nodeValue = b.memoizedProps;
            return;
          case 3:
            c = b.stateNode;
            c.hydrate && (c.hydrate = false, Cc(c.containerInfo));
            return;
          case 12:
            return;
          case 13:
            null !== b.memoizedState && (jj = O(), aj(b.child, true));
            kj(b);
            return;
          case 19:
            kj(b);
            return;
          case 17:
            return;
          case 23:
          case 24:
            aj(b, null !== b.memoizedState);
            return;
        }
        throw Error(y(163));
      }
      function kj(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Ui());
          b.forEach(function(b2) {
            var d = lj.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function mj(a, b) {
        return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : false;
      }
      var nj = Math.ceil;
      var oj = ra.ReactCurrentDispatcher;
      var pj = ra.ReactCurrentOwner;
      var X = 0;
      var U = null;
      var Y = null;
      var W = 0;
      var qj = 0;
      var rj = Bf(0);
      var V = 0;
      var sj = null;
      var tj = 0;
      var Dg = 0;
      var Hi = 0;
      var uj = 0;
      var vj = null;
      var jj = 0;
      var Ji = Infinity;
      function wj() {
        Ji = O() + 500;
      }
      var Z = null;
      var Qi = false;
      var Ri = null;
      var Ti = null;
      var xj = false;
      var yj = null;
      var zj = 90;
      var Aj = [];
      var Bj = [];
      var Cj = null;
      var Dj = 0;
      var Ej = null;
      var Fj = -1;
      var Gj = 0;
      var Hj = 0;
      var Ij = null;
      var Jj = false;
      function Hg() {
        return 0 !== (X & 48) ? O() : -1 !== Fj ? Fj : Fj = O();
      }
      function Ig(a) {
        a = a.mode;
        if (0 === (a & 2))
          return 1;
        if (0 === (a & 4))
          return 99 === eg() ? 1 : 2;
        0 === Gj && (Gj = tj);
        if (0 !== kg.transition) {
          0 !== Hj && (Hj = null !== vj ? vj.pendingLanes : 0);
          a = Gj;
          var b = 4186112 & ~Hj;
          b &= -b;
          0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
          return b;
        }
        a = eg();
        0 !== (X & 4) && 98 === a ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
        return a;
      }
      function Jg(a, b, c) {
        if (50 < Dj)
          throw Dj = 0, Ej = null, Error(y(185));
        a = Kj(a, b);
        if (null === a)
          return null;
        $c(a, b, c);
        a === U && (Hi |= b, 4 === V && Ii(a, W));
        var d = eg();
        1 === b ? 0 !== (X & 8) && 0 === (X & 48) ? Lj(a) : (Mj(a, c), 0 === X && (wj(), ig())) : (0 === (X & 4) || 98 !== d && 99 !== d || (null === Cj ? Cj = /* @__PURE__ */ new Set([a]) : Cj.add(a)), Mj(a, c));
        vj = a;
      }
      function Kj(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; )
          a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      function Mj(a, b) {
        for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g; ) {
          var h = 31 - Vc(g), k = 1 << h, l = f[h];
          if (-1 === l) {
            if (0 === (k & d) || 0 !== (k & e)) {
              l = b;
              Rc(k);
              var n = F;
              f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
            }
          } else
            l <= b && (a.expiredLanes |= k);
          g &= ~k;
        }
        d = Uc(a, a === U ? W : 0);
        b = F;
        if (0 === d)
          null !== c && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
        else {
          if (null !== c) {
            if (a.callbackPriority === b)
              return;
            c !== Zf && Pf(c);
          }
          15 === b ? (c = Lj.bind(null, a), null === ag ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : 14 === b ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Nj(a) {
        Fj = -1;
        Hj = Gj = 0;
        if (0 !== (X & 48))
          throw Error(y(327));
        var b = a.callbackNode;
        if (Oj() && a.callbackNode !== b)
          return null;
        var c = Uc(a, a === U ? W : 0);
        if (0 === c)
          return null;
        var d = c;
        var e = X;
        X |= 16;
        var f = Pj();
        if (U !== a || W !== d)
          wj(), Qj(a, d);
        do
          try {
            Rj();
            break;
          } catch (h) {
            Sj(a, h);
          }
        while (1);
        qg();
        oj.current = f;
        X = e;
        null !== Y ? d = 0 : (U = null, W = 0, d = V);
        if (0 !== (tj & Hi))
          Qj(a, 0);
        else if (0 !== d) {
          2 === d && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), c = Wc(a), 0 !== c && (d = Tj(a, c)));
          if (1 === d)
            throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
          a.finishedWork = a.current.alternate;
          a.finishedLanes = c;
          switch (d) {
            case 0:
            case 1:
              throw Error(y(345));
            case 2:
              Uj(a);
              break;
            case 3:
              Ii(a, c);
              if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
                if (0 !== Uc(a, 0))
                  break;
                e = a.suspendedLanes;
                if ((e & c) !== c) {
                  Hg();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = of(Uj.bind(null, a), d);
                break;
              }
              Uj(a);
              break;
            case 4:
              Ii(a, c);
              if ((c & 4186112) === c)
                break;
              d = a.eventTimes;
              for (e = -1; 0 < c; ) {
                var g = 31 - Vc(c);
                f = 1 << g;
                g = d[g];
                g > e && (e = g);
                c &= ~f;
              }
              c = e;
              c = O() - c;
              c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
              if (10 < c) {
                a.timeoutHandle = of(Uj.bind(null, a), c);
                break;
              }
              Uj(a);
              break;
            case 5:
              Uj(a);
              break;
            default:
              throw Error(y(329));
          }
        }
        Mj(a, O());
        return a.callbackNode === b ? Nj.bind(null, a) : null;
      }
      function Ii(a, b) {
        b &= ~uj;
        b &= ~Hi;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - Vc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Lj(a) {
        if (0 !== (X & 48))
          throw Error(y(327));
        Oj();
        if (a === U && 0 !== (a.expiredLanes & W)) {
          var b = W;
          var c = Tj(a, b);
          0 !== (tj & Hi) && (b = Uc(a, b), c = Tj(a, b));
        } else
          b = Uc(a, 0), c = Tj(a, b);
        0 !== a.tag && 2 === c && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), b = Wc(a), 0 !== b && (c = Tj(a, b)));
        if (1 === c)
          throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Uj(a);
        Mj(a, O());
        return null;
      }
      function Vj() {
        if (null !== Cj) {
          var a = Cj;
          Cj = null;
          a.forEach(function(a2) {
            a2.expiredLanes |= 24 & a2.pendingLanes;
            Mj(a2, O());
          });
        }
        ig();
      }
      function Wj(a, b) {
        var c = X;
        X |= 1;
        try {
          return a(b);
        } finally {
          X = c, 0 === X && (wj(), ig());
        }
      }
      function Xj(a, b) {
        var c = X;
        X &= -2;
        X |= 8;
        try {
          return a(b);
        } finally {
          X = c, 0 === X && (wj(), ig());
        }
      }
      function ni(a, b) {
        I(rj, qj);
        qj |= b;
        tj |= b;
      }
      function Ki() {
        qj = rj.current;
        H(rj);
      }
      function Qj(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, pf(c));
        if (null !== Y)
          for (c = Y.return; null !== c; ) {
            var d = c;
            switch (d.tag) {
              case 1:
                d = d.type.childContextTypes;
                null !== d && void 0 !== d && Gf();
                break;
              case 3:
                fh();
                H(N);
                H(M);
                uh();
                break;
              case 5:
                hh(d);
                break;
              case 4:
                fh();
                break;
              case 13:
                H(P);
                break;
              case 19:
                H(P);
                break;
              case 10:
                rg(d);
                break;
              case 23:
              case 24:
                Ki();
            }
            c = c.return;
          }
        U = a;
        Y = Tg(a.current, null);
        W = qj = tj = b;
        V = 0;
        sj = null;
        uj = Hi = Dg = 0;
      }
      function Sj(a, b) {
        do {
          var c = Y;
          try {
            qg();
            vh.current = Gh;
            if (yh) {
              for (var d = R.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              yh = false;
            }
            xh = 0;
            T = S = R = null;
            zh = false;
            pj.current = null;
            if (null === c || null === c.return) {
              V = 1;
              sj = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = W;
              h.flags |= 2048;
              h.firstEffect = h.lastEffect = null;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k;
                if (0 === (h.mode & 2)) {
                  var n = h.alternate;
                  n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
                }
                var A = 0 !== (P.current & 1), p = g;
                do {
                  var C;
                  if (C = 13 === p.tag) {
                    var x = p.memoizedState;
                    if (null !== x)
                      C = null !== x.dehydrated ? true : false;
                    else {
                      var w = p.memoizedProps;
                      C = void 0 === w.fallback ? false : true !== w.unstable_avoidThisFallback ? true : A ? false : true;
                    }
                  }
                  if (C) {
                    var z = p.updateQueue;
                    if (null === z) {
                      var u = /* @__PURE__ */ new Set();
                      u.add(l);
                      p.updateQueue = u;
                    } else
                      z.add(l);
                    if (0 === (p.mode & 2)) {
                      p.flags |= 64;
                      h.flags |= 16384;
                      h.flags &= -2981;
                      if (1 === h.tag)
                        if (null === h.alternate)
                          h.tag = 17;
                        else {
                          var t = zg(-1, 1);
                          t.tag = 2;
                          Ag(h, t);
                        }
                      h.lanes |= 1;
                      break a;
                    }
                    k = void 0;
                    h = b;
                    var q = f.pingCache;
                    null === q ? (q = f.pingCache = new Oi(), k = /* @__PURE__ */ new Set(), q.set(l, k)) : (k = q.get(l), void 0 === k && (k = /* @__PURE__ */ new Set(), q.set(l, k)));
                    if (!k.has(h)) {
                      k.add(h);
                      var v = Yj.bind(null, f, l, h);
                      l.then(v, v);
                    }
                    p.flags |= 4096;
                    p.lanes = b;
                    break a;
                  }
                  p = p.return;
                } while (null !== p);
                k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
              }
              5 !== V && (V = 2);
              k = Mi(k, h);
              p = g;
              do {
                switch (p.tag) {
                  case 3:
                    f = k;
                    p.flags |= 4096;
                    b &= -b;
                    p.lanes |= b;
                    var J = Pi(p, f, b);
                    Bg(p, J);
                    break a;
                  case 1:
                    f = k;
                    var K = p.type, Q = p.stateNode;
                    if (0 === (p.flags & 64) && ("function" === typeof K.getDerivedStateFromError || null !== Q && "function" === typeof Q.componentDidCatch && (null === Ti || !Ti.has(Q)))) {
                      p.flags |= 4096;
                      b &= -b;
                      p.lanes |= b;
                      var L = Si(p, f, b);
                      Bg(p, L);
                      break a;
                    }
                }
                p = p.return;
              } while (null !== p);
            }
            Zj(c);
          } catch (va) {
            b = va;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Pj() {
        var a = oj.current;
        oj.current = Gh;
        return null === a ? Gh : a;
      }
      function Tj(a, b) {
        var c = X;
        X |= 16;
        var d = Pj();
        U === a && W === b || Qj(a, b);
        do
          try {
            ak();
            break;
          } catch (e) {
            Sj(a, e);
          }
        while (1);
        qg();
        X = c;
        oj.current = d;
        if (null !== Y)
          throw Error(y(261));
        U = null;
        W = 0;
        return V;
      }
      function ak() {
        for (; null !== Y; )
          bk(Y);
      }
      function Rj() {
        for (; null !== Y && !Qf(); )
          bk(Y);
      }
      function bk(a) {
        var b = ck(a.alternate, a, qj);
        a.memoizedProps = a.pendingProps;
        null === b ? Zj(a) : Y = b;
        pj.current = null;
      }
      function Zj(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 2048)) {
            c = Gi(c, b, qj);
            if (null !== c) {
              Y = c;
              return;
            }
            c = b;
            if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (qj & 1073741824) || 0 === (c.mode & 4)) {
              for (var d = 0, e = c.child; null !== e; )
                d |= e.lanes | e.childLanes, e = e.sibling;
              c.childLanes = d;
            }
            null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
          } else {
            c = Li(b);
            if (null !== c) {
              c.flags &= 2047;
              Y = c;
              return;
            }
            null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === V && (V = 5);
      }
      function Uj(a) {
        var b = eg();
        gg(99, dk.bind(null, a, b));
        return null;
      }
      function dk(a, b) {
        do
          Oj();
        while (null !== yj);
        if (0 !== (X & 48))
          throw Error(y(327));
        var c = a.finishedWork;
        if (null === c)
          return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current)
          throw Error(y(177));
        a.callbackNode = null;
        var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
        a.pendingLanes = e;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= e;
        a.mutableReadLanes &= e;
        a.entangledLanes &= e;
        e = a.entanglements;
        for (var g = a.eventTimes, h = a.expirationTimes; 0 < f; ) {
          var k = 31 - Vc(f), l = 1 << k;
          e[k] = 0;
          g[k] = -1;
          h[k] = -1;
          f &= ~l;
        }
        null !== Cj && 0 === (d & 24) && Cj.has(a) && Cj.delete(a);
        a === U && (Y = U = null, W = 0);
        1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
        if (null !== d) {
          e = X;
          X |= 32;
          pj.current = null;
          kf = fd;
          g = Ne();
          if (Oe(g)) {
            if ("selectionStart" in g)
              h = { start: g.selectionStart, end: g.selectionEnd };
            else
              a:
                if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && 0 !== l.rangeCount) {
                  h = l.anchorNode;
                  f = l.anchorOffset;
                  k = l.focusNode;
                  l = l.focusOffset;
                  try {
                    h.nodeType, k.nodeType;
                  } catch (va) {
                    h = null;
                    break a;
                  }
                  var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
                  b:
                    for (; ; ) {
                      for (var u; ; ) {
                        w !== h || 0 !== f && 3 !== w.nodeType || (A = n + f);
                        w !== k || 0 !== l && 3 !== w.nodeType || (p = n + l);
                        3 === w.nodeType && (n += w.nodeValue.length);
                        if (null === (u = w.firstChild))
                          break;
                        z = w;
                        w = u;
                      }
                      for (; ; ) {
                        if (w === g)
                          break b;
                        z === h && ++C === f && (A = n);
                        z === k && ++x === l && (p = n);
                        if (null !== (u = w.nextSibling))
                          break;
                        w = z;
                        z = w.parentNode;
                      }
                      w = u;
                    }
                  h = -1 === A || -1 === p ? null : { start: A, end: p };
                } else
                  h = null;
            h = h || { start: 0, end: 0 };
          } else
            h = null;
          lf = { focusedElem: g, selectionRange: h };
          fd = false;
          Ij = null;
          Jj = false;
          Z = d;
          do
            try {
              ek();
            } catch (va) {
              if (null === Z)
                throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (null !== Z);
          Ij = null;
          Z = d;
          do
            try {
              for (g = a; null !== Z; ) {
                var t = Z.flags;
                t & 16 && pb(Z.stateNode, "");
                if (t & 128) {
                  var q = Z.alternate;
                  if (null !== q) {
                    var v = q.ref;
                    null !== v && ("function" === typeof v ? v(null) : v.current = null);
                  }
                }
                switch (t & 1038) {
                  case 2:
                    fj(Z);
                    Z.flags &= -3;
                    break;
                  case 6:
                    fj(Z);
                    Z.flags &= -3;
                    ij(Z.alternate, Z);
                    break;
                  case 1024:
                    Z.flags &= -1025;
                    break;
                  case 1028:
                    Z.flags &= -1025;
                    ij(Z.alternate, Z);
                    break;
                  case 4:
                    ij(Z.alternate, Z);
                    break;
                  case 8:
                    h = Z;
                    cj(g, h);
                    var J = h.alternate;
                    dj(h);
                    null !== J && dj(J);
                }
                Z = Z.nextEffect;
              }
            } catch (va) {
              if (null === Z)
                throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (null !== Z);
          v = lf;
          q = Ne();
          t = v.focusedElem;
          g = v.selectionRange;
          if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
            null !== g && Oe(t) && (q = g.start, v = g.end, void 0 === v && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = void 0 === g.end ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (1 !== v.rangeCount || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
            q = [];
            for (v = t; v = v.parentNode; )
              1 === v.nodeType && q.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
            "function" === typeof t.focus && t.focus();
            for (t = 0; t < q.length; t++)
              v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
          }
          fd = !!kf;
          lf = kf = null;
          a.current = c;
          Z = d;
          do
            try {
              for (t = a; null !== Z; ) {
                var K = Z.flags;
                K & 36 && Yi(t, Z.alternate, Z);
                if (K & 128) {
                  q = void 0;
                  var Q = Z.ref;
                  if (null !== Q) {
                    var L = Z.stateNode;
                    switch (Z.tag) {
                      case 5:
                        q = L;
                        break;
                      default:
                        q = L;
                    }
                    "function" === typeof Q ? Q(q) : Q.current = q;
                  }
                }
                Z = Z.nextEffect;
              }
            } catch (va) {
              if (null === Z)
                throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (null !== Z);
          Z = null;
          $f();
          X = e;
        } else
          a.current = c;
        if (xj)
          xj = false, yj = a, zj = b;
        else
          for (Z = d; null !== Z; )
            b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
        d = a.pendingLanes;
        0 === d && (Ti = null);
        1 === d ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
        c = c.stateNode;
        if (Mf && "function" === typeof Mf.onCommitFiberRoot)
          try {
            Mf.onCommitFiberRoot(Lf, c, void 0, 64 === (c.current.flags & 64));
          } catch (va) {
          }
        Mj(a, O());
        if (Qi)
          throw Qi = false, a = Ri, Ri = null, a;
        if (0 !== (X & 8))
          return null;
        ig();
        return null;
      }
      function ek() {
        for (; null !== Z; ) {
          var a = Z.alternate;
          Jj || null === Ij || (0 !== (Z.flags & 8) ? dc(Z, Ij) && (Jj = true) : 13 === Z.tag && mj(a, Z) && dc(Z, Ij) && (Jj = true));
          var b = Z.flags;
          0 !== (b & 256) && Xi(a, Z);
          0 === (b & 512) || xj || (xj = true, hg(97, function() {
            Oj();
            return null;
          }));
          Z = Z.nextEffect;
        }
      }
      function Oj() {
        if (90 !== zj) {
          var a = 97 < zj ? 97 : zj;
          zj = 90;
          return gg(a, fk);
        }
        return false;
      }
      function $i(a, b) {
        Aj.push(b, a);
        xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
      }
      function Zi(a, b) {
        Bj.push(b, a);
        xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
      }
      function fk() {
        if (null === yj)
          return false;
        var a = yj;
        yj = null;
        if (0 !== (X & 48))
          throw Error(y(331));
        var b = X;
        X |= 32;
        var c = Bj;
        Bj = [];
        for (var d = 0; d < c.length; d += 2) {
          var e = c[d], f = c[d + 1], g = e.destroy;
          e.destroy = void 0;
          if ("function" === typeof g)
            try {
              g();
            } catch (k) {
              if (null === f)
                throw Error(y(330));
              Wi(f, k);
            }
        }
        c = Aj;
        Aj = [];
        for (d = 0; d < c.length; d += 2) {
          e = c[d];
          f = c[d + 1];
          try {
            var h = e.create;
            e.destroy = h();
          } catch (k) {
            if (null === f)
              throw Error(y(330));
            Wi(f, k);
          }
        }
        for (h = a.current.firstEffect; null !== h; )
          a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
        X = b;
        ig();
        return true;
      }
      function gk(a, b, c) {
        b = Mi(c, b);
        b = Pi(a, b, 1);
        Ag(a, b);
        b = Hg();
        a = Kj(a, 1);
        null !== a && ($c(a, 1, b), Mj(a, b));
      }
      function Wi(a, b) {
        if (3 === a.tag)
          gk(a, a, b);
        else
          for (var c = a.return; null !== c; ) {
            if (3 === c.tag) {
              gk(c, a, b);
              break;
            } else if (1 === c.tag) {
              var d = c.stateNode;
              if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) {
                a = Mi(b, a);
                var e = Si(c, a, 1);
                Ag(c, e);
                e = Hg();
                c = Kj(c, 1);
                if (null !== c)
                  $c(c, 1, e), Mj(c, e);
                else if ("function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d)))
                  try {
                    d.componentDidCatch(b, a);
                  } catch (f) {
                  }
                break;
              }
            }
            c = c.return;
          }
      }
      function Yj(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = Hg();
        a.pingedLanes |= a.suspendedLanes & c;
        U === a && (W & c) === c && (4 === V || 3 === V && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
        Mj(a, b);
      }
      function lj(a, b) {
        var c = a.stateNode;
        null !== c && c.delete(b);
        b = 0;
        0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === eg() ? 1 : 2 : (0 === Gj && (Gj = tj), b = Yc(62914560 & ~Gj), 0 === b && (b = 4194304)));
        c = Hg();
        a = Kj(a, b);
        null !== a && ($c(a, b, c), Mj(a, c));
      }
      var ck;
      ck = function(a, b, c) {
        var d = b.lanes;
        if (null !== a)
          if (a.memoizedProps !== b.pendingProps || N.current)
            ug = true;
          else if (0 !== (c & d))
            ug = 0 !== (a.flags & 16384) ? true : false;
          else {
            ug = false;
            switch (b.tag) {
              case 3:
                ri(b);
                sh();
                break;
              case 5:
                gh(b);
                break;
              case 1:
                Ff(b.type) && Jf(b);
                break;
              case 4:
                eh(b, b.stateNode.containerInfo);
                break;
              case 10:
                d = b.memoizedProps.value;
                var e = b.type._context;
                I(mg, e._currentValue);
                e._currentValue = d;
                break;
              case 13:
                if (null !== b.memoizedState) {
                  if (0 !== (c & b.child.childLanes))
                    return ti(a, b, c);
                  I(P, P.current & 1);
                  b = hi(a, b, c);
                  return null !== b ? b.sibling : null;
                }
                I(P, P.current & 1);
                break;
              case 19:
                d = 0 !== (c & b.childLanes);
                if (0 !== (a.flags & 64)) {
                  if (d)
                    return Ai(a, b, c);
                  b.flags |= 64;
                }
                e = b.memoizedState;
                null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
                I(P, P.current);
                if (d)
                  break;
                else
                  return null;
              case 23:
              case 24:
                return b.lanes = 0, mi(a, b, c);
            }
            return hi(a, b, c);
          }
        else
          ug = false;
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            d = b.type;
            null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
            a = b.pendingProps;
            e = Ef(b, M.current);
            tg(b, c);
            e = Ch(null, b, d, a, e, c);
            b.flags |= 1;
            if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
              b.tag = 1;
              b.memoizedState = null;
              b.updateQueue = null;
              if (Ff(d)) {
                var f = true;
                Jf(b);
              } else
                f = false;
              b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
              xg(b);
              var g = d.getDerivedStateFromProps;
              "function" === typeof g && Gg(b, d, g, a);
              e.updater = Kg;
              b.stateNode = e;
              e._reactInternals = b;
              Og(b, d, a, c);
              b = qi(null, b, d, true, f, c);
            } else
              b.tag = 0, fi(null, b, e, c), b = b.child;
            return b;
          case 16:
            e = b.elementType;
            a: {
              null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
              a = b.pendingProps;
              f = e._init;
              e = f(e._payload);
              b.type = e;
              f = b.tag = hk(e);
              a = lg(e, a);
              switch (f) {
                case 0:
                  b = li(null, b, e, a, c);
                  break a;
                case 1:
                  b = pi(null, b, e, a, c);
                  break a;
                case 11:
                  b = gi(null, b, e, a, c);
                  break a;
                case 14:
                  b = ii(null, b, e, lg(e.type, a), d, c);
                  break a;
              }
              throw Error(y(306, e, ""));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
          case 3:
            ri(b);
            d = b.updateQueue;
            if (null === a || null === d)
              throw Error(y(282));
            d = b.pendingProps;
            e = b.memoizedState;
            e = null !== e ? e.element : null;
            yg(a, b);
            Cg(b, d, null, c);
            d = b.memoizedState.element;
            if (d === e)
              sh(), b = hi(a, b, c);
            else {
              e = b.stateNode;
              if (f = e.hydrate)
                kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = true;
              if (f) {
                a = e.mutableSourceEagerHydrationData;
                if (null != a)
                  for (e = 0; e < a.length; e += 2)
                    f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
                c = Zg(b, null, d, c);
                for (b.child = c; c; )
                  c.flags = c.flags & -3 | 1024, c = c.sibling;
              } else
                fi(a, b, d, c), sh();
              b = b.child;
            }
            return b;
          case 5:
            return gh(b), null === a && ph(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : null !== f && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;
          case 6:
            return null === a && ph(b), null;
          case 13:
            return ti(a, b, c);
          case 4:
            return eh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
          case 7:
            return fi(a, b, b.pendingProps, c), b.child;
          case 8:
            return fi(
              a,
              b,
              b.pendingProps.children,
              c
            ), b.child;
          case 12:
            return fi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              g = b.memoizedProps;
              f = e.value;
              var h = b.type._context;
              I(mg, h._currentValue);
              h._currentValue = f;
              if (null !== g)
                if (h = g.value, f = He(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0, 0 === f) {
                  if (g.children === e.children && !N.current) {
                    b = hi(a, b, c);
                    break a;
                  }
                } else
                  for (h = b.child, null !== h && (h.return = b); null !== h; ) {
                    var k = h.dependencies;
                    if (null !== k) {
                      g = h.child;
                      for (var l = k.firstContext; null !== l; ) {
                        if (l.context === d && 0 !== (l.observedBits & f)) {
                          1 === h.tag && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                          h.lanes |= c;
                          l = h.alternate;
                          null !== l && (l.lanes |= c);
                          sg(h.return, c);
                          k.lanes |= c;
                          break;
                        }
                        l = l.next;
                      }
                    } else
                      g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;
                    if (null !== g)
                      g.return = h;
                    else
                      for (g = h; null !== g; ) {
                        if (g === b) {
                          g = null;
                          break;
                        }
                        h = g.sibling;
                        if (null !== h) {
                          h.return = g.return;
                          g = h;
                          break;
                        }
                        g = g.return;
                      }
                    h = g;
                  }
              fi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(
              e,
              f.unstable_observedBits
            ), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
          case 14:
            return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);
          case 15:
            return ki(a, b, b.type, b.pendingProps, d, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = true, Jf(b)) : a = false, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, true, a, c);
          case 19:
            return Ai(a, b, c);
          case 23:
            return mi(a, b, c);
          case 24:
            return mi(a, b, c);
        }
        throw Error(y(156, b.tag));
      };
      function ik(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.flags = 0;
        this.lastEffect = this.firstEffect = this.nextEffect = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function nh(a, b, c, d) {
        return new ik(a, b, c, d);
      }
      function ji(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function hk(a) {
        if ("function" === typeof a)
          return ji(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Aa)
            return 11;
          if (a === Da)
            return 14;
        }
        return 2;
      }
      function Tg(a, b) {
        var c = a.alternate;
        null === c ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Vg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a)
          ji(a) && (g = 1);
        else if ("string" === typeof a)
          g = 5;
        else
          a:
            switch (a) {
              case ua:
                return Xg(c.children, e, f, b);
              case Ha:
                g = 8;
                e |= 16;
                break;
              case wa:
                g = 8;
                e |= 1;
                break;
              case xa:
                return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;
              case Ba:
                return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;
              case Ca:
                return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;
              case Ia:
                return vi(c, e, f, b);
              case Ja:
                return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;
              default:
                if ("object" === typeof a && null !== a)
                  switch (a.$$typeof) {
                    case ya:
                      g = 10;
                      break a;
                    case za:
                      g = 9;
                      break a;
                    case Aa:
                      g = 11;
                      break a;
                    case Da:
                      g = 14;
                      break a;
                    case Ea:
                      g = 16;
                      d = null;
                      break a;
                    case Fa:
                      g = 22;
                      break a;
                  }
                throw Error(y(130, null == a ? a : typeof a, ""));
            }
        b = nh(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Xg(a, b, c, d) {
        a = nh(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function vi(a, b, c, d) {
        a = nh(23, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        return a;
      }
      function Ug(a, b, c) {
        a = nh(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Wg(a, b, c) {
        b = nh(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function jk(a, b, c) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.pendingContext = this.context = null;
        this.hydrate = c;
        this.callbackNode = null;
        this.callbackPriority = 0;
        this.eventTimes = Zc(0);
        this.expirationTimes = Zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = Zc(0);
        this.mutableSourceEagerHydrationData = null;
      }
      function kk(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: ta, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function lk(a, b, c, d) {
        var e = b.current, f = Hg(), g = Ig(e);
        a:
          if (c) {
            c = c._reactInternals;
            b: {
              if (Zb(c) !== c || 1 !== c.tag)
                throw Error(y(170));
              var h = c;
              do {
                switch (h.tag) {
                  case 3:
                    h = h.stateNode.context;
                    break b;
                  case 1:
                    if (Ff(h.type)) {
                      h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                      break b;
                    }
                }
                h = h.return;
              } while (null !== h);
              throw Error(y(171));
            }
            if (1 === c.tag) {
              var k = c.type;
              if (Ff(k)) {
                c = If(c, k, h);
                break a;
              }
            }
            c = h;
          } else
            c = Cf;
        null === b.context ? b.context = c : b.pendingContext = c;
        b = zg(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        Ag(e, b);
        Jg(e, g, f);
        return g;
      }
      function mk(a) {
        a = a.current;
        if (!a.child)
          return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function nk(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function ok(a, b) {
        nk(a, b);
        (a = a.alternate) && nk(a, b);
      }
      function pk() {
        return null;
      }
      function qk(a, b, c) {
        var d = null != c && null != c.hydrationOptions && c.hydrationOptions.mutableSources || null;
        c = new jk(a, b, null != c && true === c.hydrate);
        b = nh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
        c.current = b;
        b.stateNode = c;
        xg(b);
        a[ff] = c.current;
        cf(8 === a.nodeType ? a.parentNode : a);
        if (d)
          for (a = 0; a < d.length; a++) {
            b = d[a];
            var e = b._getVersion;
            e = e(b._source);
            null == c.mutableSourceEagerHydrationData ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
          }
        this._internalRoot = c;
      }
      qk.prototype.render = function(a) {
        lk(a, this._internalRoot, null, null);
      };
      qk.prototype.unmount = function() {
        var a = this._internalRoot, b = a.containerInfo;
        lk(null, a, null, function() {
          b[ff] = null;
        });
      };
      function rk(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function sk(a, b) {
        b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
        if (!b)
          for (var c; c = a.lastChild; )
            a.removeChild(c);
        return new qk(a, 0, b ? { hydrate: true } : void 0);
      }
      function tk(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f._internalRoot;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = mk(g);
              h.call(a2);
            };
          }
          lk(b, g, a, e);
        } else {
          f = c._reactRootContainer = sk(c, d);
          g = f._internalRoot;
          if ("function" === typeof e) {
            var k = e;
            e = function() {
              var a2 = mk(g);
              k.call(a2);
            };
          }
          Xj(function() {
            lk(b, g, a, e);
          });
        }
        return mk(g);
      }
      ec = function(a) {
        if (13 === a.tag) {
          var b = Hg();
          Jg(a, 4, b);
          ok(a, 4);
        }
      };
      fc = function(a) {
        if (13 === a.tag) {
          var b = Hg();
          Jg(a, 67108864, b);
          ok(a, 67108864);
        }
      };
      gc = function(a) {
        if (13 === a.tag) {
          var b = Hg(), c = Ig(a);
          Jg(a, c, b);
          ok(a, c);
        }
      };
      hc = function(a, b) {
        return b();
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            ab(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; )
                c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e)
                    throw Error(y(90));
                  Wa(d);
                  ab(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Wj;
      Hb = function(a, b, c, d, e) {
        var f = X;
        X |= 4;
        try {
          return gg(98, a.bind(null, b, c, d, e));
        } finally {
          X = f, 0 === X && (wj(), ig());
        }
      };
      Ib = function() {
        0 === (X & 49) && (Vj(), Oj());
      };
      Jb = function(a, b) {
        var c = X;
        X |= 2;
        try {
          return a(b);
        } finally {
          X = c, 0 === X && (wj(), ig());
        }
      };
      function uk(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!rk(b))
          throw Error(y(200));
        return kk(a, b, null, c);
      }
      var vk = { Events: [Cb, ue, Db, Eb, Fb, Oj, { current: false }] };
      var wk = { findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom" };
      var xk = { bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = cc(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!yk.isDisabled && yk.supportsFiber)
          try {
            Lf = yk.inject(xk), Mf = yk;
          } catch (a) {
          }
      }
      var yk;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
      exports.createPortal = uk;
      exports.findDOMNode = function(a) {
        if (null == a)
          return null;
        if (1 === a.nodeType)
          return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render)
            throw Error(y(188));
          throw Error(y(268, Object.keys(a)));
        }
        a = cc(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a, b) {
        var c = X;
        if (0 !== (c & 48))
          return a(b);
        X |= 1;
        try {
          if (a)
            return gg(99, a.bind(null, b));
        } finally {
          X = c, ig();
        }
      };
      exports.hydrate = function(a, b, c) {
        if (!rk(b))
          throw Error(y(200));
        return tk(null, a, b, true, c);
      };
      exports.render = function(a, b, c) {
        if (!rk(b))
          throw Error(y(200));
        return tk(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!rk(a))
          throw Error(y(40));
        return a._reactRootContainer ? (Xj(function() {
          tk(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[ff] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Wj;
      exports.unstable_createPortal = function(a, b) {
        return uk(a, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
      };
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!rk(c))
          throw Error(y(200));
        if (null == a || void 0 === a._reactInternals)
          throw Error(y(38));
        return tk(a, b, c, false, d);
      };
      exports.version = "17.0.2";
    }
  });

  // ../node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "../node_modules/react-dom/index.js"(exports, module2) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module2.exports = require_react_dom_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // ../node_modules/@sentry/browser/node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "../node_modules/@sentry/browser/node_modules/tslib/tslib.js"(exports, module2) {
      var __extends7;
      var __assign7;
      var __rest7;
      var __decorate7;
      var __param7;
      var __metadata7;
      var __awaiter7;
      var __generator7;
      var __exportStar7;
      var __values7;
      var __read7;
      var __spread7;
      var __spreadArrays7;
      var __await7;
      var __asyncGenerator7;
      var __asyncDelegator7;
      var __asyncValues7;
      var __makeTemplateObject7;
      var __importStar7;
      var __importDefault7;
      var __classPrivateFieldGet7;
      var __classPrivateFieldSet7;
      var __createBinding7;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module2 === "object" && typeof module2.exports === "object") {
          factory(createExporter(root, createExporter(module2.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends7 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign7 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest7 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate7 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param7 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata7 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter7 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator7 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding7 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar7 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values7 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read7 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread7 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read7(arguments[i]));
          return ar;
        };
        __spreadArrays7 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await7 = function(v) {
          return this instanceof __await7 ? (this.v = v, this) : new __await7(v);
        };
        __asyncGenerator7 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await7 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator7 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await7(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues7 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values7 === "function" ? __values7(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject7 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar7 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault7 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet7 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet7 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends7);
        exporter("__assign", __assign7);
        exporter("__rest", __rest7);
        exporter("__decorate", __decorate7);
        exporter("__param", __param7);
        exporter("__metadata", __metadata7);
        exporter("__awaiter", __awaiter7);
        exporter("__generator", __generator7);
        exporter("__exportStar", __exportStar7);
        exporter("__createBinding", __createBinding7);
        exporter("__values", __values7);
        exporter("__read", __read7);
        exporter("__spread", __spread7);
        exporter("__spreadArrays", __spreadArrays7);
        exporter("__await", __await7);
        exporter("__asyncGenerator", __asyncGenerator7);
        exporter("__asyncDelegator", __asyncDelegator7);
        exporter("__asyncValues", __asyncValues7);
        exporter("__makeTemplateObject", __makeTemplateObject7);
        exporter("__importStar", __importStar7);
        exporter("__importDefault", __importDefault7);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet7);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet7);
      });
    }
  });

  // ../node_modules/@sentry/minimal/node_modules/tslib/tslib.js
  var require_tslib2 = __commonJS({
    "../node_modules/@sentry/minimal/node_modules/tslib/tslib.js"(exports, module2) {
      var __extends7;
      var __assign7;
      var __rest7;
      var __decorate7;
      var __param7;
      var __metadata7;
      var __awaiter7;
      var __generator7;
      var __exportStar7;
      var __values7;
      var __read7;
      var __spread7;
      var __spreadArrays7;
      var __await7;
      var __asyncGenerator7;
      var __asyncDelegator7;
      var __asyncValues7;
      var __makeTemplateObject7;
      var __importStar7;
      var __importDefault7;
      var __classPrivateFieldGet7;
      var __classPrivateFieldSet7;
      var __createBinding7;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module2 === "object" && typeof module2.exports === "object") {
          factory(createExporter(root, createExporter(module2.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends7 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign7 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest7 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate7 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param7 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata7 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter7 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator7 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding7 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar7 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values7 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read7 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread7 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read7(arguments[i]));
          return ar;
        };
        __spreadArrays7 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await7 = function(v) {
          return this instanceof __await7 ? (this.v = v, this) : new __await7(v);
        };
        __asyncGenerator7 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await7 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator7 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await7(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues7 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values7 === "function" ? __values7(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject7 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar7 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault7 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet7 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet7 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends7);
        exporter("__assign", __assign7);
        exporter("__rest", __rest7);
        exporter("__decorate", __decorate7);
        exporter("__param", __param7);
        exporter("__metadata", __metadata7);
        exporter("__awaiter", __awaiter7);
        exporter("__generator", __generator7);
        exporter("__exportStar", __exportStar7);
        exporter("__createBinding", __createBinding7);
        exporter("__values", __values7);
        exporter("__read", __read7);
        exporter("__spread", __spread7);
        exporter("__spreadArrays", __spreadArrays7);
        exporter("__await", __await7);
        exporter("__asyncGenerator", __asyncGenerator7);
        exporter("__asyncDelegator", __asyncDelegator7);
        exporter("__asyncValues", __asyncValues7);
        exporter("__makeTemplateObject", __makeTemplateObject7);
        exporter("__importStar", __importStar7);
        exporter("__importDefault", __importDefault7);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet7);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet7);
      });
    }
  });

  // ../node_modules/@sentry/hub/node_modules/tslib/tslib.js
  var require_tslib3 = __commonJS({
    "../node_modules/@sentry/hub/node_modules/tslib/tslib.js"(exports, module2) {
      var __extends7;
      var __assign7;
      var __rest7;
      var __decorate7;
      var __param7;
      var __metadata7;
      var __awaiter7;
      var __generator7;
      var __exportStar7;
      var __values7;
      var __read7;
      var __spread7;
      var __spreadArrays7;
      var __await7;
      var __asyncGenerator7;
      var __asyncDelegator7;
      var __asyncValues7;
      var __makeTemplateObject7;
      var __importStar7;
      var __importDefault7;
      var __classPrivateFieldGet7;
      var __classPrivateFieldSet7;
      var __createBinding7;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module2 === "object" && typeof module2.exports === "object") {
          factory(createExporter(root, createExporter(module2.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends7 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign7 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest7 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate7 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param7 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata7 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter7 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator7 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding7 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar7 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values7 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read7 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread7 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read7(arguments[i]));
          return ar;
        };
        __spreadArrays7 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await7 = function(v) {
          return this instanceof __await7 ? (this.v = v, this) : new __await7(v);
        };
        __asyncGenerator7 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await7 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator7 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await7(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues7 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values7 === "function" ? __values7(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject7 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar7 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault7 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet7 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet7 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends7);
        exporter("__assign", __assign7);
        exporter("__rest", __rest7);
        exporter("__decorate", __decorate7);
        exporter("__param", __param7);
        exporter("__metadata", __metadata7);
        exporter("__awaiter", __awaiter7);
        exporter("__generator", __generator7);
        exporter("__exportStar", __exportStar7);
        exporter("__createBinding", __createBinding7);
        exporter("__values", __values7);
        exporter("__read", __read7);
        exporter("__spread", __spread7);
        exporter("__spreadArrays", __spreadArrays7);
        exporter("__await", __await7);
        exporter("__asyncGenerator", __asyncGenerator7);
        exporter("__asyncDelegator", __asyncDelegator7);
        exporter("__asyncValues", __asyncValues7);
        exporter("__makeTemplateObject", __makeTemplateObject7);
        exporter("__importStar", __importStar7);
        exporter("__importDefault", __importDefault7);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet7);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet7);
      });
    }
  });

  // ../node_modules/@sentry/utils/node_modules/tslib/tslib.js
  var require_tslib4 = __commonJS({
    "../node_modules/@sentry/utils/node_modules/tslib/tslib.js"(exports, module2) {
      var __extends7;
      var __assign7;
      var __rest7;
      var __decorate7;
      var __param7;
      var __metadata7;
      var __awaiter7;
      var __generator7;
      var __exportStar7;
      var __values7;
      var __read7;
      var __spread7;
      var __spreadArrays7;
      var __await7;
      var __asyncGenerator7;
      var __asyncDelegator7;
      var __asyncValues7;
      var __makeTemplateObject7;
      var __importStar7;
      var __importDefault7;
      var __classPrivateFieldGet7;
      var __classPrivateFieldSet7;
      var __createBinding7;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module2 === "object" && typeof module2.exports === "object") {
          factory(createExporter(root, createExporter(module2.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends7 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign7 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest7 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate7 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param7 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata7 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter7 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator7 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding7 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar7 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values7 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read7 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread7 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read7(arguments[i]));
          return ar;
        };
        __spreadArrays7 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await7 = function(v) {
          return this instanceof __await7 ? (this.v = v, this) : new __await7(v);
        };
        __asyncGenerator7 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await7 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator7 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await7(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues7 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values7 === "function" ? __values7(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject7 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar7 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault7 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet7 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet7 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends7);
        exporter("__assign", __assign7);
        exporter("__rest", __rest7);
        exporter("__decorate", __decorate7);
        exporter("__param", __param7);
        exporter("__metadata", __metadata7);
        exporter("__awaiter", __awaiter7);
        exporter("__generator", __generator7);
        exporter("__exportStar", __exportStar7);
        exporter("__createBinding", __createBinding7);
        exporter("__values", __values7);
        exporter("__read", __read7);
        exporter("__spread", __spread7);
        exporter("__spreadArrays", __spreadArrays7);
        exporter("__await", __await7);
        exporter("__asyncGenerator", __asyncGenerator7);
        exporter("__asyncDelegator", __asyncDelegator7);
        exporter("__asyncValues", __asyncValues7);
        exporter("__makeTemplateObject", __makeTemplateObject7);
        exporter("__importStar", __importStar7);
        exporter("__importDefault", __importDefault7);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet7);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet7);
      });
    }
  });

  // ../node_modules/@sentry/core/node_modules/tslib/tslib.js
  var require_tslib5 = __commonJS({
    "../node_modules/@sentry/core/node_modules/tslib/tslib.js"(exports, module2) {
      var __extends7;
      var __assign7;
      var __rest7;
      var __decorate7;
      var __param7;
      var __metadata7;
      var __awaiter7;
      var __generator7;
      var __exportStar7;
      var __values7;
      var __read7;
      var __spread7;
      var __spreadArrays7;
      var __await7;
      var __asyncGenerator7;
      var __asyncDelegator7;
      var __asyncValues7;
      var __makeTemplateObject7;
      var __importStar7;
      var __importDefault7;
      var __classPrivateFieldGet7;
      var __classPrivateFieldSet7;
      var __createBinding7;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module2 === "object" && typeof module2.exports === "object") {
          factory(createExporter(root, createExporter(module2.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends7 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign7 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest7 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate7 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param7 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata7 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter7 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator7 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding7 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar7 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values7 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read7 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread7 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read7(arguments[i]));
          return ar;
        };
        __spreadArrays7 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await7 = function(v) {
          return this instanceof __await7 ? (this.v = v, this) : new __await7(v);
        };
        __asyncGenerator7 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await7 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator7 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await7(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues7 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values7 === "function" ? __values7(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject7 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar7 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault7 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet7 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet7 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends7);
        exporter("__assign", __assign7);
        exporter("__rest", __rest7);
        exporter("__decorate", __decorate7);
        exporter("__param", __param7);
        exporter("__metadata", __metadata7);
        exporter("__awaiter", __awaiter7);
        exporter("__generator", __generator7);
        exporter("__exportStar", __exportStar7);
        exporter("__createBinding", __createBinding7);
        exporter("__values", __values7);
        exporter("__read", __read7);
        exporter("__spread", __spread7);
        exporter("__spreadArrays", __spreadArrays7);
        exporter("__await", __await7);
        exporter("__asyncGenerator", __asyncGenerator7);
        exporter("__asyncDelegator", __asyncDelegator7);
        exporter("__asyncValues", __asyncValues7);
        exporter("__makeTemplateObject", __makeTemplateObject7);
        exporter("__importStar", __importStar7);
        exporter("__importDefault", __importDefault7);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet7);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet7);
      });
    }
  });

  // ../node_modules/@sentry/tracing/node_modules/tslib/tslib.js
  var require_tslib6 = __commonJS({
    "../node_modules/@sentry/tracing/node_modules/tslib/tslib.js"(exports, module2) {
      var __extends7;
      var __assign7;
      var __rest7;
      var __decorate7;
      var __param7;
      var __metadata7;
      var __awaiter7;
      var __generator7;
      var __exportStar7;
      var __values7;
      var __read7;
      var __spread7;
      var __spreadArrays7;
      var __await7;
      var __asyncGenerator7;
      var __asyncDelegator7;
      var __asyncValues7;
      var __makeTemplateObject7;
      var __importStar7;
      var __importDefault7;
      var __classPrivateFieldGet7;
      var __classPrivateFieldSet7;
      var __createBinding7;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module2 === "object" && typeof module2.exports === "object") {
          factory(createExporter(root, createExporter(module2.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (b.hasOwnProperty(p))
              d[p] = b[p];
        };
        __extends7 = function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign7 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest7 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate7 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param7 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata7 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter7 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator7 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __createBinding7 = function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __exportStar7 = function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !exports2.hasOwnProperty(p))
              exports2[p] = m[p];
        };
        __values7 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read7 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread7 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read7(arguments[i]));
          return ar;
        };
        __spreadArrays7 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __await7 = function(v) {
          return this instanceof __await7 ? (this.v = v, this) : new __await7(v);
        };
        __asyncGenerator7 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await7 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator7 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await7(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues7 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values7 === "function" ? __values7(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject7 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        __importStar7 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
          }
          result["default"] = mod;
          return result;
        };
        __importDefault7 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet7 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet7 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        };
        exporter("__extends", __extends7);
        exporter("__assign", __assign7);
        exporter("__rest", __rest7);
        exporter("__decorate", __decorate7);
        exporter("__param", __param7);
        exporter("__metadata", __metadata7);
        exporter("__awaiter", __awaiter7);
        exporter("__generator", __generator7);
        exporter("__exportStar", __exportStar7);
        exporter("__createBinding", __createBinding7);
        exporter("__values", __values7);
        exporter("__read", __read7);
        exporter("__spread", __spread7);
        exporter("__spreadArrays", __spreadArrays7);
        exporter("__await", __await7);
        exporter("__asyncGenerator", __asyncGenerator7);
        exporter("__asyncDelegator", __asyncDelegator7);
        exporter("__asyncValues", __asyncValues7);
        exporter("__makeTemplateObject", __makeTemplateObject7);
        exporter("__importStar", __importStar7);
        exporter("__importDefault", __importDefault7);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet7);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet7);
      });
    }
  });

  // src/systems/instruments/src/BAT/index.tsx
  var import_react3 = __toESM(require_react());

  // src/systems/instruments/src/Common/index.tsx
  var import_react_dom = __toESM(require_react_dom());

  // src/systems/shared/src/persistence.ts
  var _NXDataStore = class {
    static get listener() {
      if (this.mListener === void 0) {
        this.mListener = RegisterViewListener("JS_LISTENER_SIMVARS", null, true);
      }
      return this.mListener;
    }
    static get(key, defaultVal) {
      const val = GetStoredData(`A32NX_${key}`);
      if (val === null || val.length === 0) {
        return defaultVal;
      }
      return val;
    }
    static set(key, val) {
      SetStoredData(`A32NX_${key}`, val);
      this.listener.triggerToAllSubscribers("A32NX_NXDATASTORE_UPDATE", key, val);
    }
    static subscribe(key, callback) {
      return Coherent.on("A32NX_NXDATASTORE_UPDATE", (updatedKey, value) => {
        if (key === "*" || key === updatedKey) {
          callback(updatedKey, value);
        }
      }).clear;
    }
    static getAndSubscribe(key, callback, defaultVal) {
      callback(key, _NXDataStore.get(key, defaultVal));
      return _NXDataStore.subscribe(key, callback);
    }
  };
  var NXDataStore = _NXDataStore;
  __publicField(NXDataStore, "mListener");

  // src/systems/shared/src/popup.ts
  var PopUpDialog = class {
    constructor() {
      __publicField(this, "params");
      __publicField(this, "popupListener");
      const title = "A32NX POPUP";
      const time = new Date().getTime();
      this.popupListener = void 0;
      this.params = {
        __Type: "SNotificationParams",
        buttons: [new NotificationButton("TT:MENU.YES", `A32NX_POP_${title}_${time}_YES`), new NotificationButton("TT:MENU.NO", `A32NX_POP_${title}_${time}_NO`)],
        style: "normal",
        displayGlobalPopup: true,
        contentData: "Default Message",
        contentUrl: "",
        contentTemplate: "",
        id: `${title}_${time}`,
        title,
        time
      };
    }
    _showPopUp(params = {}) {
      Coherent.trigger("SHOW_POP_UP", params);
    }
    showPopUp(title, message, style, callbackYes, callbackNo) {
      if (title) {
        this.params.title = title;
      }
      if (message) {
        this.params.contentData = message;
      }
      if (style) {
        this.params.style = style;
      }
      if (callbackYes) {
        const yes = typeof callbackYes === "function" ? callbackYes : () => callbackYes;
        Coherent.on(`A32NX_POP_${this.params.id}_YES`, () => {
          Coherent.off(`A32NX_POP_${this.params.id}_YES`, null, null);
          yes();
        });
      }
      if (callbackNo) {
        const no = typeof callbackNo === "function" ? callbackNo : () => callbackNo;
        Coherent.on(`A32NX_POP_${this.params.id}_NO`, () => {
          Coherent.off(`A32NX_POP_${this.params.id}_NO`, null, null);
          no();
        });
      }
      if (!this.popupListener) {
        this.popupListener = RegisterViewListener("JS_LISTENER_POPUP", this._showPopUp.bind(null, this.params));
      } else {
        this._showPopUp(this.params);
      }
    }
    showInformation(title, message, style, callback) {
      if (title) {
        this.params.title = title;
      }
      if (message) {
        this.params.contentData = message;
      }
      if (style) {
        this.params.style = style;
      }
      if (callback) {
        const yes = typeof callback === "function" ? callback : () => callback;
        Coherent.on(`A32NX_POP_${this.params.id}_YES`, () => {
          Coherent.off(`A32NX_POP_${this.params.id}_YES`, null, null);
          yes();
        });
      }
      this.params.buttons = [new NotificationButton("TT:MENU.OK", `A32NX_POP_${this.params.id}_YES`)];
      if (!this.popupListener) {
        this.popupListener = RegisterViewListener("JS_LISTENER_POPUP", this._showPopUp.bind(null, this.params));
      } else {
        this._showPopUp(this.params);
      }
    }
  };

  // ../node_modules/@sentry/browser/node_modules/tslib/modules/index.js
  var import_tslib = __toESM(require_tslib(), 1);
  var {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __exportStar,
    __createBinding,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet
  } = import_tslib.default;

  // ../node_modules/@sentry/types/esm/severity.js
  var Severity;
  (function(Severity2) {
    Severity2["Fatal"] = "fatal";
    Severity2["Error"] = "error";
    Severity2["Warning"] = "warning";
    Severity2["Log"] = "log";
    Severity2["Info"] = "info";
    Severity2["Debug"] = "debug";
    Severity2["Critical"] = "critical";
  })(Severity || (Severity = {}));

  // ../node_modules/@sentry/minimal/node_modules/tslib/modules/index.js
  var import_tslib2 = __toESM(require_tslib2(), 1);
  var {
    __extends: __extends2,
    __assign: __assign2,
    __rest: __rest2,
    __decorate: __decorate2,
    __param: __param2,
    __metadata: __metadata2,
    __awaiter: __awaiter2,
    __generator: __generator2,
    __exportStar: __exportStar2,
    __createBinding: __createBinding2,
    __values: __values2,
    __read: __read2,
    __spread: __spread2,
    __spreadArrays: __spreadArrays2,
    __await: __await2,
    __asyncGenerator: __asyncGenerator2,
    __asyncDelegator: __asyncDelegator2,
    __asyncValues: __asyncValues2,
    __makeTemplateObject: __makeTemplateObject2,
    __importStar: __importStar2,
    __importDefault: __importDefault2,
    __classPrivateFieldGet: __classPrivateFieldGet2,
    __classPrivateFieldSet: __classPrivateFieldSet2
  } = import_tslib2.default;

  // ../node_modules/@sentry/hub/node_modules/tslib/modules/index.js
  var import_tslib3 = __toESM(require_tslib3(), 1);
  var {
    __extends: __extends3,
    __assign: __assign3,
    __rest: __rest3,
    __decorate: __decorate3,
    __param: __param3,
    __metadata: __metadata3,
    __awaiter: __awaiter3,
    __generator: __generator3,
    __exportStar: __exportStar3,
    __createBinding: __createBinding3,
    __values: __values3,
    __read: __read3,
    __spread: __spread3,
    __spreadArrays: __spreadArrays3,
    __await: __await3,
    __asyncGenerator: __asyncGenerator3,
    __asyncDelegator: __asyncDelegator3,
    __asyncValues: __asyncValues3,
    __makeTemplateObject: __makeTemplateObject3,
    __importStar: __importStar3,
    __importDefault: __importDefault3,
    __classPrivateFieldGet: __classPrivateFieldGet3,
    __classPrivateFieldSet: __classPrivateFieldSet3
  } = import_tslib3.default;

  // ../node_modules/@sentry/utils/esm/async.js
  function forget(promise) {
    void promise.then(null, function(e) {
      console.error(e);
    });
  }

  // ../node_modules/@sentry/utils/esm/env.js
  function isBrowserBundle() {
    return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
  }

  // ../node_modules/@sentry/utils/esm/node.js
  function isNodeEnv() {
    return !isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
  }
  function dynamicRequire(mod, request) {
    return mod.require(request);
  }
  function loadModule(moduleName) {
    var mod;
    try {
      mod = dynamicRequire(module, moduleName);
    } catch (e) {
    }
    try {
      var cwd = dynamicRequire(module, "process").cwd;
      mod = dynamicRequire(module, cwd() + "/node_modules/" + moduleName);
    } catch (e) {
    }
    return mod;
  }

  // ../node_modules/@sentry/utils/esm/global.js
  var fallbackGlobalObject = {};
  function getGlobalObject() {
    return isNodeEnv() ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : fallbackGlobalObject;
  }
  function getGlobalSingleton(name, creator, obj) {
    var global12 = obj || getGlobalObject();
    var __SENTRY__ = global12.__SENTRY__ = global12.__SENTRY__ || {};
    var singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
    return singleton;
  }

  // ../node_modules/@sentry/utils/esm/is.js
  var objectToString = Object.prototype.toString;
  function isError(wat) {
    switch (objectToString.call(wat)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return true;
      default:
        return isInstanceOf(wat, Error);
    }
  }
  function isBuiltin(wat, ty) {
    return objectToString.call(wat) === "[object " + ty + "]";
  }
  function isErrorEvent(wat) {
    return isBuiltin(wat, "ErrorEvent");
  }
  function isDOMError(wat) {
    return isBuiltin(wat, "DOMError");
  }
  function isDOMException(wat) {
    return isBuiltin(wat, "DOMException");
  }
  function isString(wat) {
    return isBuiltin(wat, "String");
  }
  function isPrimitive(wat) {
    return wat === null || typeof wat !== "object" && typeof wat !== "function";
  }
  function isPlainObject(wat) {
    return isBuiltin(wat, "Object");
  }
  function isEvent(wat) {
    return typeof Event !== "undefined" && isInstanceOf(wat, Event);
  }
  function isElement(wat) {
    return typeof Element !== "undefined" && isInstanceOf(wat, Element);
  }
  function isRegExp(wat) {
    return isBuiltin(wat, "RegExp");
  }
  function isThenable(wat) {
    return Boolean(wat && wat.then && typeof wat.then === "function");
  }
  function isSyntheticEvent(wat) {
    return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
  }
  function isNaN2(wat) {
    return typeof wat === "number" && wat !== wat;
  }
  function isInstanceOf(wat, base) {
    try {
      return wat instanceof base;
    } catch (_e) {
      return false;
    }
  }

  // ../node_modules/@sentry/utils/esm/browser.js
  function htmlTreeAsString(elem, keyAttrs) {
    try {
      var currentElem = elem;
      var MAX_TRAVERSE_HEIGHT = 5;
      var MAX_OUTPUT_LEN = 80;
      var out = [];
      var height = 0;
      var len = 0;
      var separator = " > ";
      var sepLength = separator.length;
      var nextStr = void 0;
      while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
        nextStr = _htmlElementAsString(currentElem, keyAttrs);
        if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN) {
          break;
        }
        out.push(nextStr);
        len += nextStr.length;
        currentElem = currentElem.parentNode;
      }
      return out.reverse().join(separator);
    } catch (_oO) {
      return "<unknown>";
    }
  }
  function _htmlElementAsString(el, keyAttrs) {
    var elem = el;
    var out = [];
    var className;
    var classes;
    var key;
    var attr;
    var i;
    if (!elem || !elem.tagName) {
      return "";
    }
    out.push(elem.tagName.toLowerCase());
    var keyAttrPairs = keyAttrs && keyAttrs.length ? keyAttrs.filter(function(keyAttr) {
      return elem.getAttribute(keyAttr);
    }).map(function(keyAttr) {
      return [keyAttr, elem.getAttribute(keyAttr)];
    }) : null;
    if (keyAttrPairs && keyAttrPairs.length) {
      keyAttrPairs.forEach(function(keyAttrPair) {
        out.push("[" + keyAttrPair[0] + '="' + keyAttrPair[1] + '"]');
      });
    } else {
      if (elem.id) {
        out.push("#" + elem.id);
      }
      className = elem.className;
      if (className && isString(className)) {
        classes = className.split(/\s+/);
        for (i = 0; i < classes.length; i++) {
          out.push("." + classes[i]);
        }
      }
    }
    var allowedAttrs = ["type", "name", "title", "alt"];
    for (i = 0; i < allowedAttrs.length; i++) {
      key = allowedAttrs[i];
      attr = elem.getAttribute(key);
      if (attr) {
        out.push("[" + key + '="' + attr + '"]');
      }
    }
    return out.join("");
  }
  function getLocationHref() {
    var global12 = getGlobalObject();
    try {
      return global12.document.location.href;
    } catch (oO) {
      return "";
    }
  }

  // ../node_modules/@sentry/utils/node_modules/tslib/modules/index.js
  var import_tslib4 = __toESM(require_tslib4(), 1);
  var {
    __extends: __extends4,
    __assign: __assign4,
    __rest: __rest4,
    __decorate: __decorate4,
    __param: __param4,
    __metadata: __metadata4,
    __awaiter: __awaiter4,
    __generator: __generator4,
    __exportStar: __exportStar4,
    __createBinding: __createBinding4,
    __values: __values4,
    __read: __read4,
    __spread: __spread4,
    __spreadArrays: __spreadArrays4,
    __await: __await4,
    __asyncGenerator: __asyncGenerator4,
    __asyncDelegator: __asyncDelegator4,
    __asyncValues: __asyncValues4,
    __makeTemplateObject: __makeTemplateObject4,
    __importStar: __importStar4,
    __importDefault: __importDefault4,
    __classPrivateFieldGet: __classPrivateFieldGet4,
    __classPrivateFieldSet: __classPrivateFieldSet4
  } = import_tslib4.default;

  // ../node_modules/@sentry/utils/esm/polyfill.js
  var setPrototypeOf = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
  function setProtoOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }
  function mixinProperties(obj, proto) {
    for (var prop in proto) {
      if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
        obj[prop] = proto[prop];
      }
    }
    return obj;
  }

  // ../node_modules/@sentry/utils/esm/error.js
  var SentryError = function(_super) {
    __extends4(SentryError2, _super);
    function SentryError2(message) {
      var _newTarget = this.constructor;
      var _this = _super.call(this, message) || this;
      _this.message = message;
      _this.name = _newTarget.prototype.constructor.name;
      setPrototypeOf(_this, _newTarget.prototype);
      return _this;
    }
    return SentryError2;
  }(Error);

  // ../node_modules/@sentry/utils/esm/flags.js
  var IS_DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;

  // ../node_modules/@sentry/utils/esm/dsn.js
  var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
  function isValidProtocol(protocol) {
    return protocol === "http" || protocol === "https";
  }
  function dsnToString(dsn, withPassword) {
    if (withPassword === void 0) {
      withPassword = false;
    }
    var host = dsn.host, path = dsn.path, pass = dsn.pass, port = dsn.port, projectId = dsn.projectId, protocol = dsn.protocol, publicKey = dsn.publicKey;
    return protocol + "://" + publicKey + (withPassword && pass ? ":" + pass : "") + ("@" + host + (port ? ":" + port : "") + "/" + (path ? path + "/" : path) + projectId);
  }
  function dsnFromString(str) {
    var match = DSN_REGEX.exec(str);
    if (!match) {
      throw new SentryError("Invalid Sentry Dsn: " + str);
    }
    var _a = __read4(match.slice(1), 6), protocol = _a[0], publicKey = _a[1], _b = _a[2], pass = _b === void 0 ? "" : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? "" : _c, lastPath = _a[5];
    var path = "";
    var projectId = lastPath;
    var split = projectId.split("/");
    if (split.length > 1) {
      path = split.slice(0, -1).join("/");
      projectId = split.pop();
    }
    if (projectId) {
      var projectMatch = projectId.match(/^\d+/);
      if (projectMatch) {
        projectId = projectMatch[0];
      }
    }
    return dsnFromComponents({ host, pass, path, projectId, port, protocol, publicKey });
  }
  function dsnFromComponents(components) {
    if ("user" in components && !("publicKey" in components)) {
      components.publicKey = components.user;
    }
    return {
      user: components.publicKey || "",
      protocol: components.protocol,
      publicKey: components.publicKey || "",
      pass: components.pass || "",
      host: components.host,
      port: components.port || "",
      path: components.path || "",
      projectId: components.projectId
    };
  }
  function validateDsn(dsn) {
    if (!IS_DEBUG_BUILD) {
      return;
    }
    var port = dsn.port, projectId = dsn.projectId, protocol = dsn.protocol;
    var requiredComponents = ["protocol", "publicKey", "host", "projectId"];
    requiredComponents.forEach(function(component) {
      if (!dsn[component]) {
        throw new SentryError("Invalid Sentry Dsn: " + component + " missing");
      }
    });
    if (!projectId.match(/^\d+$/)) {
      throw new SentryError("Invalid Sentry Dsn: Invalid projectId " + projectId);
    }
    if (!isValidProtocol(protocol)) {
      throw new SentryError("Invalid Sentry Dsn: Invalid protocol " + protocol);
    }
    if (port && isNaN(parseInt(port, 10))) {
      throw new SentryError("Invalid Sentry Dsn: Invalid port " + port);
    }
    return true;
  }
  function makeDsn(from) {
    var components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
    validateDsn(components);
    return components;
  }

  // ../node_modules/@sentry/utils/esm/enums.js
  var SeverityLevels = ["fatal", "error", "warning", "log", "info", "debug", "critical"];

  // ../node_modules/@sentry/utils/esm/logger.js
  var global2 = getGlobalObject();
  var PREFIX = "Sentry Logger ";
  var CONSOLE_LEVELS = ["debug", "info", "warn", "error", "log", "assert"];
  function consoleSandbox(callback) {
    var global12 = getGlobalObject();
    if (!("console" in global12)) {
      return callback();
    }
    var originalConsole = global12.console;
    var wrappedLevels = {};
    CONSOLE_LEVELS.forEach(function(level) {
      var originalWrappedFunc = originalConsole[level] && originalConsole[level].__sentry_original__;
      if (level in global12.console && originalWrappedFunc) {
        wrappedLevels[level] = originalConsole[level];
        originalConsole[level] = originalWrappedFunc;
      }
    });
    try {
      return callback();
    } finally {
      Object.keys(wrappedLevels).forEach(function(level) {
        originalConsole[level] = wrappedLevels[level];
      });
    }
  }
  function makeLogger() {
    var enabled = false;
    var logger2 = {
      enable: function() {
        enabled = true;
      },
      disable: function() {
        enabled = false;
      }
    };
    if (IS_DEBUG_BUILD) {
      CONSOLE_LEVELS.forEach(function(name) {
        logger2[name] = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (enabled) {
            consoleSandbox(function() {
              var _a;
              (_a = global2.console)[name].apply(_a, __spread4([PREFIX + "[" + name + "]:"], args));
            });
          }
        };
      });
    } else {
      CONSOLE_LEVELS.forEach(function(name) {
        logger2[name] = function() {
          return void 0;
        };
      });
    }
    return logger2;
  }
  var logger;
  if (IS_DEBUG_BUILD) {
    logger = getGlobalSingleton("logger", makeLogger);
  } else {
    logger = makeLogger();
  }

  // ../node_modules/@sentry/utils/esm/string.js
  function truncate(str, max) {
    if (max === void 0) {
      max = 0;
    }
    if (typeof str !== "string" || max === 0) {
      return str;
    }
    return str.length <= max ? str : str.substr(0, max) + "...";
  }
  function safeJoin(input, delimiter) {
    if (!Array.isArray(input)) {
      return "";
    }
    var output = [];
    for (var i = 0; i < input.length; i++) {
      var value = input[i];
      try {
        output.push(String(value));
      } catch (e) {
        output.push("[value cannot be serialized]");
      }
    }
    return output.join(delimiter);
  }
  function isMatchingPattern(value, pattern) {
    if (!isString(value)) {
      return false;
    }
    if (isRegExp(pattern)) {
      return pattern.test(value);
    }
    if (typeof pattern === "string") {
      return value.indexOf(pattern) !== -1;
    }
    return false;
  }

  // ../node_modules/@sentry/utils/esm/object.js
  function fill(source, name, replacementFactory) {
    if (!(name in source)) {
      return;
    }
    var original = source[name];
    var wrapped = replacementFactory(original);
    if (typeof wrapped === "function") {
      try {
        markFunctionWrapped(wrapped, original);
      } catch (_Oo) {
      }
    }
    source[name] = wrapped;
  }
  function addNonEnumerableProperty(obj, name, value) {
    Object.defineProperty(obj, name, {
      value,
      writable: true,
      configurable: true
    });
  }
  function markFunctionWrapped(wrapped, original) {
    var proto = original.prototype || {};
    wrapped.prototype = original.prototype = proto;
    addNonEnumerableProperty(wrapped, "__sentry_original__", original);
  }
  function getOriginalFunction(func) {
    return func.__sentry_original__;
  }
  function urlEncode(object) {
    return Object.keys(object).map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    }).join("&");
  }
  function convertToPlainObject(value) {
    var newObj = value;
    if (isError(value)) {
      newObj = __assign4({ message: value.message, name: value.name, stack: value.stack }, getOwnProperties(value));
    } else if (isEvent(value)) {
      var event_1 = value;
      newObj = __assign4({ type: event_1.type, target: serializeEventTarget(event_1.target), currentTarget: serializeEventTarget(event_1.currentTarget) }, getOwnProperties(event_1));
      if (typeof CustomEvent !== "undefined" && isInstanceOf(value, CustomEvent)) {
        newObj.detail = event_1.detail;
      }
    }
    return newObj;
  }
  function serializeEventTarget(target) {
    try {
      return isElement(target) ? htmlTreeAsString(target) : Object.prototype.toString.call(target);
    } catch (_oO) {
      return "<unknown>";
    }
  }
  function getOwnProperties(obj) {
    var extractedProps = {};
    for (var property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        extractedProps[property] = obj[property];
      }
    }
    return extractedProps;
  }
  function extractExceptionKeysForMessage(exception, maxLength) {
    if (maxLength === void 0) {
      maxLength = 40;
    }
    var keys = Object.keys(convertToPlainObject(exception));
    keys.sort();
    if (!keys.length) {
      return "[object has no keys]";
    }
    if (keys[0].length >= maxLength) {
      return truncate(keys[0], maxLength);
    }
    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
      var serialized = keys.slice(0, includedKeys).join(", ");
      if (serialized.length > maxLength) {
        continue;
      }
      if (includedKeys === keys.length) {
        return serialized;
      }
      return truncate(serialized, maxLength);
    }
    return "";
  }
  function dropUndefinedKeys(val) {
    var e_1, _a;
    if (isPlainObject(val)) {
      var rv = {};
      try {
        for (var _b = __values4(Object.keys(val)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          if (typeof val[key] !== "undefined") {
            rv[key] = dropUndefinedKeys(val[key]);
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return rv;
    }
    if (Array.isArray(val)) {
      return val.map(dropUndefinedKeys);
    }
    return val;
  }

  // ../node_modules/@sentry/utils/esm/stacktrace.js
  var STACKTRACE_LIMIT = 50;
  function createStackParser() {
    var parsers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      parsers[_i] = arguments[_i];
    }
    var sortedParsers = parsers.sort(function(a, b) {
      return a[0] - b[0];
    }).map(function(p) {
      return p[1];
    });
    return function(stack, skipFirst) {
      var e_1, _a, e_2, _b;
      if (skipFirst === void 0) {
        skipFirst = 0;
      }
      var frames = [];
      try {
        for (var _c = __values4(stack.split("\n").slice(skipFirst)), _d = _c.next(); !_d.done; _d = _c.next()) {
          var line = _d.value;
          try {
            for (var sortedParsers_1 = (e_2 = void 0, __values4(sortedParsers)), sortedParsers_1_1 = sortedParsers_1.next(); !sortedParsers_1_1.done; sortedParsers_1_1 = sortedParsers_1.next()) {
              var parser = sortedParsers_1_1.value;
              var frame = parser(line);
              if (frame) {
                frames.push(frame);
                break;
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (sortedParsers_1_1 && !sortedParsers_1_1.done && (_b = sortedParsers_1.return))
                _b.call(sortedParsers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return))
            _a.call(_c);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return stripSentryFramesAndReverse(frames);
    };
  }
  function stripSentryFramesAndReverse(stack) {
    if (!stack.length) {
      return [];
    }
    var localStack = stack;
    var firstFrameFunction = localStack[0].function || "";
    var lastFrameFunction = localStack[localStack.length - 1].function || "";
    if (firstFrameFunction.indexOf("captureMessage") !== -1 || firstFrameFunction.indexOf("captureException") !== -1) {
      localStack = localStack.slice(1);
    }
    if (lastFrameFunction.indexOf("sentryWrapped") !== -1) {
      localStack = localStack.slice(0, -1);
    }
    return localStack.slice(0, STACKTRACE_LIMIT).map(function(frame) {
      return __assign4(__assign4({}, frame), { filename: frame.filename || localStack[0].filename, function: frame.function || "?" });
    }).reverse();
  }
  var defaultFunctionName = "<anonymous>";
  function getFunctionName(fn) {
    try {
      if (!fn || typeof fn !== "function") {
        return defaultFunctionName;
      }
      return fn.name || defaultFunctionName;
    } catch (e) {
      return defaultFunctionName;
    }
  }

  // ../node_modules/@sentry/utils/esm/supports.js
  function supportsFetch() {
    if (!("fetch" in getGlobalObject())) {
      return false;
    }
    try {
      new Headers();
      new Request("");
      new Response();
      return true;
    } catch (e) {
      return false;
    }
  }
  function isNativeFetch(func) {
    return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
  }
  function supportsNativeFetch() {
    if (!supportsFetch()) {
      return false;
    }
    var global12 = getGlobalObject();
    if (isNativeFetch(global12.fetch)) {
      return true;
    }
    var result = false;
    var doc = global12.document;
    if (doc && typeof doc.createElement === "function") {
      try {
        var sandbox = doc.createElement("iframe");
        sandbox.hidden = true;
        doc.head.appendChild(sandbox);
        if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
          result = isNativeFetch(sandbox.contentWindow.fetch);
        }
        doc.head.removeChild(sandbox);
      } catch (err) {
        IS_DEBUG_BUILD && logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
      }
    }
    return result;
  }
  function supportsReferrerPolicy() {
    if (!supportsFetch()) {
      return false;
    }
    try {
      new Request("_", {
        referrerPolicy: "origin"
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  function supportsHistory() {
    var global12 = getGlobalObject();
    var chrome2 = global12.chrome;
    var isChromePackagedApp = chrome2 && chrome2.app && chrome2.app.runtime;
    var hasHistoryApi = "history" in global12 && !!global12.history.pushState && !!global12.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
  }

  // ../node_modules/@sentry/utils/esm/instrument.js
  var global3 = getGlobalObject();
  var handlers = {};
  var instrumented = {};
  function instrument(type) {
    if (instrumented[type]) {
      return;
    }
    instrumented[type] = true;
    switch (type) {
      case "console":
        instrumentConsole();
        break;
      case "dom":
        instrumentDOM();
        break;
      case "xhr":
        instrumentXHR();
        break;
      case "fetch":
        instrumentFetch();
        break;
      case "history":
        instrumentHistory();
        break;
      case "error":
        instrumentError();
        break;
      case "unhandledrejection":
        instrumentUnhandledRejection();
        break;
      default:
        IS_DEBUG_BUILD && logger.warn("unknown instrumentation type:", type);
        return;
    }
  }
  function addInstrumentationHandler(type, callback) {
    handlers[type] = handlers[type] || [];
    handlers[type].push(callback);
    instrument(type);
  }
  function triggerHandlers(type, data) {
    var e_1, _a;
    if (!type || !handlers[type]) {
      return;
    }
    try {
      for (var _b = __values4(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
        var handler = _c.value;
        try {
          handler(data);
        } catch (e) {
          IS_DEBUG_BUILD && logger.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + getFunctionName(handler) + "\nError:", e);
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  }
  function instrumentConsole() {
    if (!("console" in global3)) {
      return;
    }
    CONSOLE_LEVELS.forEach(function(level) {
      if (!(level in global3.console)) {
        return;
      }
      fill(global3.console, level, function(originalConsoleMethod) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          triggerHandlers("console", { args, level });
          if (originalConsoleMethod) {
            originalConsoleMethod.apply(global3.console, args);
          }
        };
      });
    });
  }
  function instrumentFetch() {
    if (!supportsNativeFetch()) {
      return;
    }
    fill(global3, "fetch", function(originalFetch) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var handlerData = {
          args,
          fetchData: {
            method: getFetchMethod(args),
            url: getFetchUrl(args)
          },
          startTimestamp: Date.now()
        };
        triggerHandlers("fetch", __assign4({}, handlerData));
        return originalFetch.apply(global3, args).then(function(response) {
          triggerHandlers("fetch", __assign4(__assign4({}, handlerData), { endTimestamp: Date.now(), response }));
          return response;
        }, function(error) {
          triggerHandlers("fetch", __assign4(__assign4({}, handlerData), { endTimestamp: Date.now(), error }));
          throw error;
        });
      };
    });
  }
  function getFetchMethod(fetchArgs) {
    if (fetchArgs === void 0) {
      fetchArgs = [];
    }
    if ("Request" in global3 && isInstanceOf(fetchArgs[0], Request) && fetchArgs[0].method) {
      return String(fetchArgs[0].method).toUpperCase();
    }
    if (fetchArgs[1] && fetchArgs[1].method) {
      return String(fetchArgs[1].method).toUpperCase();
    }
    return "GET";
  }
  function getFetchUrl(fetchArgs) {
    if (fetchArgs === void 0) {
      fetchArgs = [];
    }
    if (typeof fetchArgs[0] === "string") {
      return fetchArgs[0];
    }
    if ("Request" in global3 && isInstanceOf(fetchArgs[0], Request)) {
      return fetchArgs[0].url;
    }
    return String(fetchArgs[0]);
  }
  function instrumentXHR() {
    if (!("XMLHttpRequest" in global3)) {
      return;
    }
    var xhrproto = XMLHttpRequest.prototype;
    fill(xhrproto, "open", function(originalOpen) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var xhr = this;
        var url = args[1];
        var xhrInfo = xhr.__sentry_xhr__ = {
          method: isString(args[0]) ? args[0].toUpperCase() : args[0],
          url: args[1]
        };
        if (isString(url) && xhrInfo.method === "POST" && url.match(/sentry_key/)) {
          xhr.__sentry_own_request__ = true;
        }
        var onreadystatechangeHandler = function() {
          if (xhr.readyState === 4) {
            try {
              xhrInfo.status_code = xhr.status;
            } catch (e) {
            }
            triggerHandlers("xhr", {
              args,
              endTimestamp: Date.now(),
              startTimestamp: Date.now(),
              xhr
            });
          }
        };
        if ("onreadystatechange" in xhr && typeof xhr.onreadystatechange === "function") {
          fill(xhr, "onreadystatechange", function(original) {
            return function() {
              var readyStateArgs = [];
              for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                readyStateArgs[_i2] = arguments[_i2];
              }
              onreadystatechangeHandler();
              return original.apply(xhr, readyStateArgs);
            };
          });
        } else {
          xhr.addEventListener("readystatechange", onreadystatechangeHandler);
        }
        return originalOpen.apply(xhr, args);
      };
    });
    fill(xhrproto, "send", function(originalSend) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (this.__sentry_xhr__ && args[0] !== void 0) {
          this.__sentry_xhr__.body = args[0];
        }
        triggerHandlers("xhr", {
          args,
          startTimestamp: Date.now(),
          xhr: this
        });
        return originalSend.apply(this, args);
      };
    });
  }
  var lastHref;
  function instrumentHistory() {
    if (!supportsHistory()) {
      return;
    }
    var oldOnPopState = global3.onpopstate;
    global3.onpopstate = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var to = global3.location.href;
      var from = lastHref;
      lastHref = to;
      triggerHandlers("history", {
        from,
        to
      });
      if (oldOnPopState) {
        try {
          return oldOnPopState.apply(this, args);
        } catch (_oO) {
        }
      }
    };
    function historyReplacementFunction(originalHistoryFunction) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var url = args.length > 2 ? args[2] : void 0;
        if (url) {
          var from = lastHref;
          var to = String(url);
          lastHref = to;
          triggerHandlers("history", {
            from,
            to
          });
        }
        return originalHistoryFunction.apply(this, args);
      };
    }
    fill(global3.history, "pushState", historyReplacementFunction);
    fill(global3.history, "replaceState", historyReplacementFunction);
  }
  var debounceDuration = 1e3;
  var debounceTimerID;
  var lastCapturedEvent;
  function shouldShortcircuitPreviousDebounce(previous, current) {
    if (!previous) {
      return true;
    }
    if (previous.type !== current.type) {
      return true;
    }
    try {
      if (previous.target !== current.target) {
        return true;
      }
    } catch (e) {
    }
    return false;
  }
  function shouldSkipDOMEvent(event) {
    if (event.type !== "keypress") {
      return false;
    }
    try {
      var target = event.target;
      if (!target || !target.tagName) {
        return true;
      }
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return false;
      }
    } catch (e) {
    }
    return true;
  }
  function makeDOMEventHandler(handler, globalListener) {
    if (globalListener === void 0) {
      globalListener = false;
    }
    return function(event) {
      if (!event || lastCapturedEvent === event) {
        return;
      }
      if (shouldSkipDOMEvent(event)) {
        return;
      }
      var name = event.type === "keypress" ? "input" : event.type;
      if (debounceTimerID === void 0) {
        handler({
          event,
          name,
          global: globalListener
        });
        lastCapturedEvent = event;
      } else if (shouldShortcircuitPreviousDebounce(lastCapturedEvent, event)) {
        handler({
          event,
          name,
          global: globalListener
        });
        lastCapturedEvent = event;
      }
      clearTimeout(debounceTimerID);
      debounceTimerID = global3.setTimeout(function() {
        debounceTimerID = void 0;
      }, debounceDuration);
    };
  }
  function instrumentDOM() {
    if (!("document" in global3)) {
      return;
    }
    var triggerDOMHandler = triggerHandlers.bind(null, "dom");
    var globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
    global3.document.addEventListener("click", globalDOMEventHandler, false);
    global3.document.addEventListener("keypress", globalDOMEventHandler, false);
    ["EventTarget", "Node"].forEach(function(target) {
      var proto = global3[target] && global3[target].prototype;
      if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
        return;
      }
      fill(proto, "addEventListener", function(originalAddEventListener) {
        return function(type, listener, options) {
          if (type === "click" || type == "keypress") {
            try {
              var el = this;
              var handlers_1 = el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {};
              var handlerForType = handlers_1[type] = handlers_1[type] || { refCount: 0 };
              if (!handlerForType.handler) {
                var handler = makeDOMEventHandler(triggerDOMHandler);
                handlerForType.handler = handler;
                originalAddEventListener.call(this, type, handler, options);
              }
              handlerForType.refCount += 1;
            } catch (e) {
            }
          }
          return originalAddEventListener.call(this, type, listener, options);
        };
      });
      fill(proto, "removeEventListener", function(originalRemoveEventListener) {
        return function(type, listener, options) {
          if (type === "click" || type == "keypress") {
            try {
              var el = this;
              var handlers_2 = el.__sentry_instrumentation_handlers__ || {};
              var handlerForType = handlers_2[type];
              if (handlerForType) {
                handlerForType.refCount -= 1;
                if (handlerForType.refCount <= 0) {
                  originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                  handlerForType.handler = void 0;
                  delete handlers_2[type];
                }
                if (Object.keys(handlers_2).length === 0) {
                  delete el.__sentry_instrumentation_handlers__;
                }
              }
            } catch (e) {
            }
          }
          return originalRemoveEventListener.call(this, type, listener, options);
        };
      });
    });
  }
  var _oldOnErrorHandler = null;
  function instrumentError() {
    _oldOnErrorHandler = global3.onerror;
    global3.onerror = function(msg, url, line, column, error) {
      triggerHandlers("error", {
        column,
        error,
        line,
        msg,
        url
      });
      if (_oldOnErrorHandler) {
        return _oldOnErrorHandler.apply(this, arguments);
      }
      return false;
    };
  }
  var _oldOnUnhandledRejectionHandler = null;
  function instrumentUnhandledRejection() {
    _oldOnUnhandledRejectionHandler = global3.onunhandledrejection;
    global3.onunhandledrejection = function(e) {
      triggerHandlers("unhandledrejection", e);
      if (_oldOnUnhandledRejectionHandler) {
        return _oldOnUnhandledRejectionHandler.apply(this, arguments);
      }
      return true;
    };
  }

  // ../node_modules/@sentry/utils/esm/memo.js
  function memoBuilder() {
    var hasWeakSet = typeof WeakSet === "function";
    var inner = hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
    function memoize(obj) {
      if (hasWeakSet) {
        if (inner.has(obj)) {
          return true;
        }
        inner.add(obj);
        return false;
      }
      for (var i = 0; i < inner.length; i++) {
        var value = inner[i];
        if (value === obj) {
          return true;
        }
      }
      inner.push(obj);
      return false;
    }
    function unmemoize(obj) {
      if (hasWeakSet) {
        inner.delete(obj);
      } else {
        for (var i = 0; i < inner.length; i++) {
          if (inner[i] === obj) {
            inner.splice(i, 1);
            break;
          }
        }
      }
    }
    return [memoize, unmemoize];
  }

  // ../node_modules/@sentry/utils/esm/misc.js
  function uuid4() {
    var global12 = getGlobalObject();
    var crypto = global12.crypto || global12.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
      var arr = new Uint16Array(8);
      crypto.getRandomValues(arr);
      arr[3] = arr[3] & 4095 | 16384;
      arr[4] = arr[4] & 16383 | 32768;
      var pad = function(num) {
        var v = num.toString(16);
        while (v.length < 4) {
          v = "0" + v;
        }
        return v;
      };
      return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
    }
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  function parseUrl(url) {
    if (!url) {
      return {};
    }
    var match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
      return {};
    }
    var query = match[6] || "";
    var fragment = match[8] || "";
    return {
      host: match[4],
      path: match[5],
      protocol: match[2],
      relative: match[5] + query + fragment
    };
  }
  function getFirstException(event) {
    return event.exception && event.exception.values ? event.exception.values[0] : void 0;
  }
  function getEventDescription(event) {
    var message = event.message, eventId = event.event_id;
    if (message) {
      return message;
    }
    var firstException = getFirstException(event);
    if (firstException) {
      if (firstException.type && firstException.value) {
        return firstException.type + ": " + firstException.value;
      }
      return firstException.type || firstException.value || eventId || "<unknown>";
    }
    return eventId || "<unknown>";
  }
  function addExceptionTypeValue(event, value, type) {
    var exception = event.exception = event.exception || {};
    var values = exception.values = exception.values || [];
    var firstException = values[0] = values[0] || {};
    if (!firstException.value) {
      firstException.value = value || "";
    }
    if (!firstException.type) {
      firstException.type = type || "Error";
    }
  }
  function addExceptionMechanism(event, newMechanism) {
    var firstException = getFirstException(event);
    if (!firstException) {
      return;
    }
    var defaultMechanism = { type: "generic", handled: true };
    var currentMechanism = firstException.mechanism;
    firstException.mechanism = __assign4(__assign4(__assign4({}, defaultMechanism), currentMechanism), newMechanism);
    if (newMechanism && "data" in newMechanism) {
      var mergedData = __assign4(__assign4({}, currentMechanism && currentMechanism.data), newMechanism.data);
      firstException.mechanism.data = mergedData;
    }
  }
  function checkOrSetAlreadyCaught(exception) {
    if (exception && exception.__sentry_captured__) {
      return true;
    }
    try {
      addNonEnumerableProperty(exception, "__sentry_captured__", true);
    } catch (err) {
    }
    return false;
  }

  // ../node_modules/@sentry/utils/esm/normalize.js
  function normalize(input, depth, maxProperties) {
    if (depth === void 0) {
      depth = Infinity;
    }
    if (maxProperties === void 0) {
      maxProperties = Infinity;
    }
    try {
      return visit("", input, depth, maxProperties);
    } catch (err) {
      return { ERROR: "**non-serializable** (" + err + ")" };
    }
  }
  function normalizeToSize(object, depth, maxSize) {
    if (depth === void 0) {
      depth = 3;
    }
    if (maxSize === void 0) {
      maxSize = 100 * 1024;
    }
    var normalized = normalize(object, depth);
    if (jsonSize(normalized) > maxSize) {
      return normalizeToSize(object, depth - 1, maxSize);
    }
    return normalized;
  }
  function visit(key, value, depth, maxProperties, memo) {
    if (depth === void 0) {
      depth = Infinity;
    }
    if (maxProperties === void 0) {
      maxProperties = Infinity;
    }
    if (memo === void 0) {
      memo = memoBuilder();
    }
    var _a = __read4(memo, 2), memoize = _a[0], unmemoize = _a[1];
    var valueWithToJSON = value;
    if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
      try {
        return valueWithToJSON.toJSON();
      } catch (err) {
      }
    }
    if (value === null || ["number", "boolean", "string"].includes(typeof value) && !isNaN2(value)) {
      return value;
    }
    var stringified = stringifyValue(key, value);
    if (!stringified.startsWith("[object ")) {
      return stringified;
    }
    if (depth === 0) {
      return stringified.replace("object ", "");
    }
    if (memoize(value)) {
      return "[Circular ~]";
    }
    var normalized = Array.isArray(value) ? [] : {};
    var numAdded = 0;
    var visitable = isError(value) || isEvent(value) ? convertToPlainObject(value) : value;
    for (var visitKey in visitable) {
      if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
        continue;
      }
      if (numAdded >= maxProperties) {
        normalized[visitKey] = "[MaxProperties ~]";
        break;
      }
      var visitValue = visitable[visitKey];
      normalized[visitKey] = visit(visitKey, visitValue, depth - 1, maxProperties, memo);
      numAdded += 1;
    }
    unmemoize(value);
    return normalized;
  }
  function stringifyValue(key, value) {
    try {
      if (key === "domain" && value && typeof value === "object" && value._events) {
        return "[Domain]";
      }
      if (key === "domainEmitter") {
        return "[DomainEmitter]";
      }
      if (typeof global !== "undefined" && value === global) {
        return "[Global]";
      }
      if (typeof window !== "undefined" && value === window) {
        return "[Window]";
      }
      if (typeof document !== "undefined" && value === document) {
        return "[Document]";
      }
      if (isSyntheticEvent(value)) {
        return "[SyntheticEvent]";
      }
      if (typeof value === "number" && value !== value) {
        return "[NaN]";
      }
      if (value === void 0) {
        return "[undefined]";
      }
      if (typeof value === "function") {
        return "[Function: " + getFunctionName(value) + "]";
      }
      if (typeof value === "symbol") {
        return "[" + String(value) + "]";
      }
      if (typeof value === "bigint") {
        return "[BigInt: " + String(value) + "]";
      }
      return "[object " + Object.getPrototypeOf(value).constructor.name + "]";
    } catch (err) {
      return "**non-serializable** (" + err + ")";
    }
  }
  function utf8Length(value) {
    return ~-encodeURI(value).split(/%..|./).length;
  }
  function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
  }

  // ../node_modules/@sentry/utils/esm/syncpromise.js
  function resolvedSyncPromise(value) {
    return new SyncPromise(function(resolve) {
      resolve(value);
    });
  }
  function rejectedSyncPromise(reason) {
    return new SyncPromise(function(_, reject) {
      reject(reason);
    });
  }
  var SyncPromise = function() {
    function SyncPromise2(executor) {
      var _this = this;
      this._state = 0;
      this._handlers = [];
      this._resolve = function(value) {
        _this._setResult(1, value);
      };
      this._reject = function(reason) {
        _this._setResult(2, reason);
      };
      this._setResult = function(state, value) {
        if (_this._state !== 0) {
          return;
        }
        if (isThenable(value)) {
          void value.then(_this._resolve, _this._reject);
          return;
        }
        _this._state = state;
        _this._value = value;
        _this._executeHandlers();
      };
      this._executeHandlers = function() {
        if (_this._state === 0) {
          return;
        }
        var cachedHandlers = _this._handlers.slice();
        _this._handlers = [];
        cachedHandlers.forEach(function(handler) {
          if (handler[0]) {
            return;
          }
          if (_this._state === 1) {
            handler[1](_this._value);
          }
          if (_this._state === 2) {
            handler[2](_this._value);
          }
          handler[0] = true;
        });
      };
      try {
        executor(this._resolve, this._reject);
      } catch (e) {
        this._reject(e);
      }
    }
    SyncPromise2.prototype.then = function(onfulfilled, onrejected) {
      var _this = this;
      return new SyncPromise2(function(resolve, reject) {
        _this._handlers.push([
          false,
          function(result) {
            if (!onfulfilled) {
              resolve(result);
            } else {
              try {
                resolve(onfulfilled(result));
              } catch (e) {
                reject(e);
              }
            }
          },
          function(reason) {
            if (!onrejected) {
              reject(reason);
            } else {
              try {
                resolve(onrejected(reason));
              } catch (e) {
                reject(e);
              }
            }
          }
        ]);
        _this._executeHandlers();
      });
    };
    SyncPromise2.prototype.catch = function(onrejected) {
      return this.then(function(val) {
        return val;
      }, onrejected);
    };
    SyncPromise2.prototype.finally = function(onfinally) {
      var _this = this;
      return new SyncPromise2(function(resolve, reject) {
        var val;
        var isRejected;
        return _this.then(function(value) {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        }, function(reason) {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        }).then(function() {
          if (isRejected) {
            reject(val);
            return;
          }
          resolve(val);
        });
      });
    };
    return SyncPromise2;
  }();

  // ../node_modules/@sentry/utils/esm/promisebuffer.js
  function makePromiseBuffer(limit) {
    var buffer = [];
    function isReady() {
      return limit === void 0 || buffer.length < limit;
    }
    function remove(task) {
      return buffer.splice(buffer.indexOf(task), 1)[0];
    }
    function add(taskProducer) {
      if (!isReady()) {
        return rejectedSyncPromise(new SentryError("Not adding Promise due to buffer limit reached."));
      }
      var task = taskProducer();
      if (buffer.indexOf(task) === -1) {
        buffer.push(task);
      }
      void task.then(function() {
        return remove(task);
      }).then(null, function() {
        return remove(task).then(null, function() {
        });
      });
      return task;
    }
    function drain(timeout) {
      return new SyncPromise(function(resolve, reject) {
        var counter = buffer.length;
        if (!counter) {
          return resolve(true);
        }
        var capturedSetTimeout = setTimeout(function() {
          if (timeout && timeout > 0) {
            resolve(false);
          }
        }, timeout);
        buffer.forEach(function(item) {
          void resolvedSyncPromise(item).then(function() {
            if (!--counter) {
              clearTimeout(capturedSetTimeout);
              resolve(true);
            }
          }, reject);
        });
      });
    }
    return {
      $: buffer,
      add,
      drain
    };
  }

  // ../node_modules/@sentry/utils/esm/severity.js
  function isSupportedSeverity(level) {
    return SeverityLevels.indexOf(level) !== -1;
  }
  function severityFromString(level) {
    if (level === "warn")
      return Severity.Warning;
    if (isSupportedSeverity(level)) {
      return level;
    }
    return Severity.Log;
  }

  // ../node_modules/@sentry/utils/esm/status.js
  function eventStatusFromHttpCode(code) {
    if (code >= 200 && code < 300) {
      return "success";
    }
    if (code === 429) {
      return "rate_limit";
    }
    if (code >= 400 && code < 500) {
      return "invalid";
    }
    if (code >= 500) {
      return "failed";
    }
    return "unknown";
  }

  // ../node_modules/@sentry/utils/esm/time.js
  var dateTimestampSource = {
    nowSeconds: function() {
      return Date.now() / 1e3;
    }
  };
  function getBrowserPerformance() {
    var performance2 = getGlobalObject().performance;
    if (!performance2 || !performance2.now) {
      return void 0;
    }
    var timeOrigin = Date.now() - performance2.now();
    return {
      now: function() {
        return performance2.now();
      },
      timeOrigin
    };
  }
  function getNodePerformance() {
    try {
      var perfHooks = dynamicRequire(module, "perf_hooks");
      return perfHooks.performance;
    } catch (_) {
      return void 0;
    }
  }
  var platformPerformance = isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
  var timestampSource = platformPerformance === void 0 ? dateTimestampSource : {
    nowSeconds: function() {
      return (platformPerformance.timeOrigin + platformPerformance.now()) / 1e3;
    }
  };
  var dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
  var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
  var timestampWithMs = timestampInSeconds;
  var _browserPerformanceTimeOriginMode;
  var browserPerformanceTimeOrigin = function() {
    var performance2 = getGlobalObject().performance;
    if (!performance2 || !performance2.now) {
      _browserPerformanceTimeOriginMode = "none";
      return void 0;
    }
    var threshold = 3600 * 1e3;
    var performanceNow = performance2.now();
    var dateNow = Date.now();
    var timeOriginDelta = performance2.timeOrigin ? Math.abs(performance2.timeOrigin + performanceNow - dateNow) : threshold;
    var timeOriginIsReliable = timeOriginDelta < threshold;
    var navigationStart = performance2.timing && performance2.timing.navigationStart;
    var hasNavigationStart = typeof navigationStart === "number";
    var navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
    var navigationStartIsReliable = navigationStartDelta < threshold;
    if (timeOriginIsReliable || navigationStartIsReliable) {
      if (timeOriginDelta <= navigationStartDelta) {
        _browserPerformanceTimeOriginMode = "timeOrigin";
        return performance2.timeOrigin;
      } else {
        _browserPerformanceTimeOriginMode = "navigationStart";
        return navigationStart;
      }
    }
    _browserPerformanceTimeOriginMode = "dateNow";
    return dateNow;
  }();

  // ../node_modules/@sentry/utils/esm/tracing.js
  var TRACEPARENT_REGEXP = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
  function extractTraceparentData(traceparent) {
    var matches = traceparent.match(TRACEPARENT_REGEXP);
    if (matches) {
      var parentSampled = void 0;
      if (matches[3] === "1") {
        parentSampled = true;
      } else if (matches[3] === "0") {
        parentSampled = false;
      }
      return {
        traceId: matches[1],
        parentSampled,
        parentSpanId: matches[2]
      };
    }
    return void 0;
  }

  // ../node_modules/@sentry/utils/esm/envelope.js
  function createEnvelope(headers, items) {
    if (items === void 0) {
      items = [];
    }
    return [headers, items];
  }
  function getEnvelopeType(envelope) {
    var _a = __read4(envelope, 2), _b = __read4(_a[1], 1), _c = __read4(_b[0], 1), firstItemHeader = _c[0];
    return firstItemHeader.type;
  }
  function serializeEnvelope(envelope) {
    var _a = __read4(envelope, 2), headers = _a[0], items = _a[1];
    var serializedHeaders = JSON.stringify(headers);
    return items.reduce(function(acc, item) {
      var _a2 = __read4(item, 2), itemHeaders = _a2[0], payload = _a2[1];
      var serializedPayload = isPrimitive(payload) ? String(payload) : JSON.stringify(payload);
      return acc + "\n" + JSON.stringify(itemHeaders) + "\n" + serializedPayload;
    }, serializedHeaders);
  }

  // ../node_modules/@sentry/utils/esm/clientreport.js
  function createClientReportEnvelope(discarded_events, dsn, timestamp) {
    var clientReportItem = [
      { type: "client_report" },
      {
        timestamp: timestamp || dateTimestampInSeconds(),
        discarded_events
      }
    ];
    return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
  }

  // ../node_modules/@sentry/utils/esm/ratelimit.js
  var DEFAULT_RETRY_AFTER = 60 * 1e3;
  function parseRetryAfterHeader(header, now) {
    if (now === void 0) {
      now = Date.now();
    }
    var headerDelay = parseInt("" + header, 10);
    if (!isNaN(headerDelay)) {
      return headerDelay * 1e3;
    }
    var headerDate = Date.parse("" + header);
    if (!isNaN(headerDate)) {
      return headerDate - now;
    }
    return DEFAULT_RETRY_AFTER;
  }
  function disabledUntil(limits, category) {
    return limits[category] || limits.all || 0;
  }
  function isRateLimited(limits, category, now) {
    if (now === void 0) {
      now = Date.now();
    }
    return disabledUntil(limits, category) > now;
  }
  function updateRateLimits(limits, headers, now) {
    var e_1, _a, e_2, _b;
    if (now === void 0) {
      now = Date.now();
    }
    var updatedRateLimits = __assign4({}, limits);
    var rateLimitHeader = headers["x-sentry-rate-limits"];
    var retryAfterHeader = headers["retry-after"];
    if (rateLimitHeader) {
      try {
        for (var _c = __values4(rateLimitHeader.trim().split(",")), _d = _c.next(); !_d.done; _d = _c.next()) {
          var limit = _d.value;
          var parameters = limit.split(":", 2);
          var headerDelay = parseInt(parameters[0], 10);
          var delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
          if (!parameters[1]) {
            updatedRateLimits.all = now + delay;
          } else {
            try {
              for (var _e = (e_2 = void 0, __values4(parameters[1].split(";"))), _f = _e.next(); !_f.done; _f = _e.next()) {
                var category = _f.value;
                updatedRateLimits[category] = now + delay;
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (_f && !_f.done && (_b = _e.return))
                  _b.call(_e);
              } finally {
                if (e_2)
                  throw e_2.error;
              }
            }
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return))
            _a.call(_c);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    } else if (retryAfterHeader) {
      updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
    }
    return updatedRateLimits;
  }

  // ../node_modules/@sentry/hub/esm/scope.js
  var MAX_BREADCRUMBS = 100;
  var Scope = function() {
    function Scope2() {
      this._notifyingListeners = false;
      this._scopeListeners = [];
      this._eventProcessors = [];
      this._breadcrumbs = [];
      this._user = {};
      this._tags = {};
      this._extra = {};
      this._contexts = {};
      this._sdkProcessingMetadata = {};
    }
    Scope2.clone = function(scope) {
      var newScope = new Scope2();
      if (scope) {
        newScope._breadcrumbs = __spread3(scope._breadcrumbs);
        newScope._tags = __assign3({}, scope._tags);
        newScope._extra = __assign3({}, scope._extra);
        newScope._contexts = __assign3({}, scope._contexts);
        newScope._user = scope._user;
        newScope._level = scope._level;
        newScope._span = scope._span;
        newScope._session = scope._session;
        newScope._transactionName = scope._transactionName;
        newScope._fingerprint = scope._fingerprint;
        newScope._eventProcessors = __spread3(scope._eventProcessors);
        newScope._requestSession = scope._requestSession;
      }
      return newScope;
    };
    Scope2.prototype.addScopeListener = function(callback) {
      this._scopeListeners.push(callback);
    };
    Scope2.prototype.addEventProcessor = function(callback) {
      this._eventProcessors.push(callback);
      return this;
    };
    Scope2.prototype.setUser = function(user) {
      this._user = user || {};
      if (this._session) {
        this._session.update({ user });
      }
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.getUser = function() {
      return this._user;
    };
    Scope2.prototype.getRequestSession = function() {
      return this._requestSession;
    };
    Scope2.prototype.setRequestSession = function(requestSession) {
      this._requestSession = requestSession;
      return this;
    };
    Scope2.prototype.setTags = function(tags) {
      this._tags = __assign3(__assign3({}, this._tags), tags);
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setTag = function(key, value) {
      var _a;
      this._tags = __assign3(__assign3({}, this._tags), (_a = {}, _a[key] = value, _a));
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setExtras = function(extras) {
      this._extra = __assign3(__assign3({}, this._extra), extras);
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setExtra = function(key, extra) {
      var _a;
      this._extra = __assign3(__assign3({}, this._extra), (_a = {}, _a[key] = extra, _a));
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setFingerprint = function(fingerprint) {
      this._fingerprint = fingerprint;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setLevel = function(level) {
      this._level = level;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setTransactionName = function(name) {
      this._transactionName = name;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setTransaction = function(name) {
      return this.setTransactionName(name);
    };
    Scope2.prototype.setContext = function(key, context) {
      var _a;
      if (context === null) {
        delete this._contexts[key];
      } else {
        this._contexts = __assign3(__assign3({}, this._contexts), (_a = {}, _a[key] = context, _a));
      }
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setSpan = function(span) {
      this._span = span;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.getSpan = function() {
      return this._span;
    };
    Scope2.prototype.getTransaction = function() {
      var span = this.getSpan();
      return span && span.transaction;
    };
    Scope2.prototype.setSession = function(session) {
      if (!session) {
        delete this._session;
      } else {
        this._session = session;
      }
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.getSession = function() {
      return this._session;
    };
    Scope2.prototype.update = function(captureContext) {
      if (!captureContext) {
        return this;
      }
      if (typeof captureContext === "function") {
        var updatedScope = captureContext(this);
        return updatedScope instanceof Scope2 ? updatedScope : this;
      }
      if (captureContext instanceof Scope2) {
        this._tags = __assign3(__assign3({}, this._tags), captureContext._tags);
        this._extra = __assign3(__assign3({}, this._extra), captureContext._extra);
        this._contexts = __assign3(__assign3({}, this._contexts), captureContext._contexts);
        if (captureContext._user && Object.keys(captureContext._user).length) {
          this._user = captureContext._user;
        }
        if (captureContext._level) {
          this._level = captureContext._level;
        }
        if (captureContext._fingerprint) {
          this._fingerprint = captureContext._fingerprint;
        }
        if (captureContext._requestSession) {
          this._requestSession = captureContext._requestSession;
        }
      } else if (isPlainObject(captureContext)) {
        captureContext = captureContext;
        this._tags = __assign3(__assign3({}, this._tags), captureContext.tags);
        this._extra = __assign3(__assign3({}, this._extra), captureContext.extra);
        this._contexts = __assign3(__assign3({}, this._contexts), captureContext.contexts);
        if (captureContext.user) {
          this._user = captureContext.user;
        }
        if (captureContext.level) {
          this._level = captureContext.level;
        }
        if (captureContext.fingerprint) {
          this._fingerprint = captureContext.fingerprint;
        }
        if (captureContext.requestSession) {
          this._requestSession = captureContext.requestSession;
        }
      }
      return this;
    };
    Scope2.prototype.clear = function() {
      this._breadcrumbs = [];
      this._tags = {};
      this._extra = {};
      this._user = {};
      this._contexts = {};
      this._level = void 0;
      this._transactionName = void 0;
      this._fingerprint = void 0;
      this._requestSession = void 0;
      this._span = void 0;
      this._session = void 0;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.addBreadcrumb = function(breadcrumb, maxBreadcrumbs) {
      var maxCrumbs = typeof maxBreadcrumbs === "number" ? Math.min(maxBreadcrumbs, MAX_BREADCRUMBS) : MAX_BREADCRUMBS;
      if (maxCrumbs <= 0) {
        return this;
      }
      var mergedBreadcrumb = __assign3({ timestamp: dateTimestampInSeconds() }, breadcrumb);
      this._breadcrumbs = __spread3(this._breadcrumbs, [mergedBreadcrumb]).slice(-maxCrumbs);
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.clearBreadcrumbs = function() {
      this._breadcrumbs = [];
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.applyToEvent = function(event, hint) {
      if (this._extra && Object.keys(this._extra).length) {
        event.extra = __assign3(__assign3({}, this._extra), event.extra);
      }
      if (this._tags && Object.keys(this._tags).length) {
        event.tags = __assign3(__assign3({}, this._tags), event.tags);
      }
      if (this._user && Object.keys(this._user).length) {
        event.user = __assign3(__assign3({}, this._user), event.user);
      }
      if (this._contexts && Object.keys(this._contexts).length) {
        event.contexts = __assign3(__assign3({}, this._contexts), event.contexts);
      }
      if (this._level) {
        event.level = this._level;
      }
      if (this._transactionName) {
        event.transaction = this._transactionName;
      }
      if (this._span) {
        event.contexts = __assign3({ trace: this._span.getTraceContext() }, event.contexts);
        var transactionName = this._span.transaction && this._span.transaction.name;
        if (transactionName) {
          event.tags = __assign3({ transaction: transactionName }, event.tags);
        }
      }
      this._applyFingerprint(event);
      event.breadcrumbs = __spread3(event.breadcrumbs || [], this._breadcrumbs);
      event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : void 0;
      event.sdkProcessingMetadata = this._sdkProcessingMetadata;
      return this._notifyEventProcessors(__spread3(getGlobalEventProcessors(), this._eventProcessors), event, hint);
    };
    Scope2.prototype.setSDKProcessingMetadata = function(newData) {
      this._sdkProcessingMetadata = __assign3(__assign3({}, this._sdkProcessingMetadata), newData);
      return this;
    };
    Scope2.prototype._notifyEventProcessors = function(processors, event, hint, index) {
      var _this = this;
      if (index === void 0) {
        index = 0;
      }
      return new SyncPromise(function(resolve, reject) {
        var processor = processors[index];
        if (event === null || typeof processor !== "function") {
          resolve(event);
        } else {
          var result = processor(__assign3({}, event), hint);
          if (isThenable(result)) {
            void result.then(function(final) {
              return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve);
            }).then(null, reject);
          } else {
            void _this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
          }
        }
      });
    };
    Scope2.prototype._notifyScopeListeners = function() {
      var _this = this;
      if (!this._notifyingListeners) {
        this._notifyingListeners = true;
        this._scopeListeners.forEach(function(callback) {
          callback(_this);
        });
        this._notifyingListeners = false;
      }
    };
    Scope2.prototype._applyFingerprint = function(event) {
      event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
      if (this._fingerprint) {
        event.fingerprint = event.fingerprint.concat(this._fingerprint);
      }
      if (event.fingerprint && !event.fingerprint.length) {
        delete event.fingerprint;
      }
    };
    return Scope2;
  }();
  function getGlobalEventProcessors() {
    return getGlobalSingleton("globalEventProcessors", function() {
      return [];
    });
  }
  function addGlobalEventProcessor(callback) {
    getGlobalEventProcessors().push(callback);
  }

  // ../node_modules/@sentry/hub/esm/session.js
  var Session = function() {
    function Session2(context) {
      this.errors = 0;
      this.sid = uuid4();
      this.duration = 0;
      this.status = "ok";
      this.init = true;
      this.ignoreDuration = false;
      var startingTime = timestampInSeconds();
      this.timestamp = startingTime;
      this.started = startingTime;
      if (context) {
        this.update(context);
      }
    }
    Session2.prototype.update = function(context) {
      if (context === void 0) {
        context = {};
      }
      if (context.user) {
        if (!this.ipAddress && context.user.ip_address) {
          this.ipAddress = context.user.ip_address;
        }
        if (!this.did && !context.did) {
          this.did = context.user.id || context.user.email || context.user.username;
        }
      }
      this.timestamp = context.timestamp || timestampInSeconds();
      if (context.ignoreDuration) {
        this.ignoreDuration = context.ignoreDuration;
      }
      if (context.sid) {
        this.sid = context.sid.length === 32 ? context.sid : uuid4();
      }
      if (context.init !== void 0) {
        this.init = context.init;
      }
      if (!this.did && context.did) {
        this.did = "" + context.did;
      }
      if (typeof context.started === "number") {
        this.started = context.started;
      }
      if (this.ignoreDuration) {
        this.duration = void 0;
      } else if (typeof context.duration === "number") {
        this.duration = context.duration;
      } else {
        var duration = this.timestamp - this.started;
        this.duration = duration >= 0 ? duration : 0;
      }
      if (context.release) {
        this.release = context.release;
      }
      if (context.environment) {
        this.environment = context.environment;
      }
      if (!this.ipAddress && context.ipAddress) {
        this.ipAddress = context.ipAddress;
      }
      if (!this.userAgent && context.userAgent) {
        this.userAgent = context.userAgent;
      }
      if (typeof context.errors === "number") {
        this.errors = context.errors;
      }
      if (context.status) {
        this.status = context.status;
      }
    };
    Session2.prototype.close = function(status) {
      if (status) {
        this.update({ status });
      } else if (this.status === "ok") {
        this.update({ status: "exited" });
      } else {
        this.update();
      }
    };
    Session2.prototype.toJSON = function() {
      return dropUndefinedKeys({
        sid: "" + this.sid,
        init: this.init,
        started: new Date(this.started * 1e3).toISOString(),
        timestamp: new Date(this.timestamp * 1e3).toISOString(),
        status: this.status,
        errors: this.errors,
        did: typeof this.did === "number" || typeof this.did === "string" ? "" + this.did : void 0,
        duration: this.duration,
        attrs: {
          release: this.release,
          environment: this.environment,
          ip_address: this.ipAddress,
          user_agent: this.userAgent
        }
      });
    };
    return Session2;
  }();

  // ../node_modules/@sentry/hub/esm/flags.js
  var IS_DEBUG_BUILD2 = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;

  // ../node_modules/@sentry/hub/esm/hub.js
  var API_VERSION = 4;
  var DEFAULT_BREADCRUMBS = 100;
  var Hub = function() {
    function Hub2(client, scope, _version) {
      if (scope === void 0) {
        scope = new Scope();
      }
      if (_version === void 0) {
        _version = API_VERSION;
      }
      this._version = _version;
      this._stack = [{}];
      this.getStackTop().scope = scope;
      if (client) {
        this.bindClient(client);
      }
    }
    Hub2.prototype.isOlderThan = function(version) {
      return this._version < version;
    };
    Hub2.prototype.bindClient = function(client) {
      var top = this.getStackTop();
      top.client = client;
      if (client && client.setupIntegrations) {
        client.setupIntegrations();
      }
    };
    Hub2.prototype.pushScope = function() {
      var scope = Scope.clone(this.getScope());
      this.getStack().push({
        client: this.getClient(),
        scope
      });
      return scope;
    };
    Hub2.prototype.popScope = function() {
      if (this.getStack().length <= 1)
        return false;
      return !!this.getStack().pop();
    };
    Hub2.prototype.withScope = function(callback) {
      var scope = this.pushScope();
      try {
        callback(scope);
      } finally {
        this.popScope();
      }
    };
    Hub2.prototype.getClient = function() {
      return this.getStackTop().client;
    };
    Hub2.prototype.getScope = function() {
      return this.getStackTop().scope;
    };
    Hub2.prototype.getStack = function() {
      return this._stack;
    };
    Hub2.prototype.getStackTop = function() {
      return this._stack[this._stack.length - 1];
    };
    Hub2.prototype.captureException = function(exception, hint) {
      var eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
      var finalHint = hint;
      if (!hint) {
        var syntheticException = void 0;
        try {
          throw new Error("Sentry syntheticException");
        } catch (exception2) {
          syntheticException = exception2;
        }
        finalHint = {
          originalException: exception,
          syntheticException
        };
      }
      this._invokeClient("captureException", exception, __assign3(__assign3({}, finalHint), { event_id: eventId }));
      return eventId;
    };
    Hub2.prototype.captureMessage = function(message, level, hint) {
      var eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
      var finalHint = hint;
      if (!hint) {
        var syntheticException = void 0;
        try {
          throw new Error(message);
        } catch (exception) {
          syntheticException = exception;
        }
        finalHint = {
          originalException: message,
          syntheticException
        };
      }
      this._invokeClient("captureMessage", message, level, __assign3(__assign3({}, finalHint), { event_id: eventId }));
      return eventId;
    };
    Hub2.prototype.captureEvent = function(event, hint) {
      var eventId = hint && hint.event_id ? hint.event_id : uuid4();
      if (event.type !== "transaction") {
        this._lastEventId = eventId;
      }
      this._invokeClient("captureEvent", event, __assign3(__assign3({}, hint), { event_id: eventId }));
      return eventId;
    };
    Hub2.prototype.lastEventId = function() {
      return this._lastEventId;
    };
    Hub2.prototype.addBreadcrumb = function(breadcrumb, hint) {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      if (!scope || !client)
        return;
      var _b = client.getOptions && client.getOptions() || {}, _c = _b.beforeBreadcrumb, beforeBreadcrumb = _c === void 0 ? null : _c, _d = _b.maxBreadcrumbs, maxBreadcrumbs = _d === void 0 ? DEFAULT_BREADCRUMBS : _d;
      if (maxBreadcrumbs <= 0)
        return;
      var timestamp = dateTimestampInSeconds();
      var mergedBreadcrumb = __assign3({ timestamp }, breadcrumb);
      var finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(function() {
        return beforeBreadcrumb(mergedBreadcrumb, hint);
      }) : mergedBreadcrumb;
      if (finalBreadcrumb === null)
        return;
      scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
    };
    Hub2.prototype.setUser = function(user) {
      var scope = this.getScope();
      if (scope)
        scope.setUser(user);
    };
    Hub2.prototype.setTags = function(tags) {
      var scope = this.getScope();
      if (scope)
        scope.setTags(tags);
    };
    Hub2.prototype.setExtras = function(extras) {
      var scope = this.getScope();
      if (scope)
        scope.setExtras(extras);
    };
    Hub2.prototype.setTag = function(key, value) {
      var scope = this.getScope();
      if (scope)
        scope.setTag(key, value);
    };
    Hub2.prototype.setExtra = function(key, extra) {
      var scope = this.getScope();
      if (scope)
        scope.setExtra(key, extra);
    };
    Hub2.prototype.setContext = function(name, context) {
      var scope = this.getScope();
      if (scope)
        scope.setContext(name, context);
    };
    Hub2.prototype.configureScope = function(callback) {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      if (scope && client) {
        callback(scope);
      }
    };
    Hub2.prototype.run = function(callback) {
      var oldHub = makeMain(this);
      try {
        callback(this);
      } finally {
        makeMain(oldHub);
      }
    };
    Hub2.prototype.getIntegration = function(integration) {
      var client = this.getClient();
      if (!client)
        return null;
      try {
        return client.getIntegration(integration);
      } catch (_oO) {
        IS_DEBUG_BUILD2 && logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
        return null;
      }
    };
    Hub2.prototype.startSpan = function(context) {
      return this._callExtensionMethod("startSpan", context);
    };
    Hub2.prototype.startTransaction = function(context, customSamplingContext) {
      return this._callExtensionMethod("startTransaction", context, customSamplingContext);
    };
    Hub2.prototype.traceHeaders = function() {
      return this._callExtensionMethod("traceHeaders");
    };
    Hub2.prototype.captureSession = function(endSession) {
      if (endSession === void 0) {
        endSession = false;
      }
      if (endSession) {
        return this.endSession();
      }
      this._sendSessionUpdate();
    };
    Hub2.prototype.endSession = function() {
      var layer = this.getStackTop();
      var scope = layer && layer.scope;
      var session = scope && scope.getSession();
      if (session) {
        session.close();
      }
      this._sendSessionUpdate();
      if (scope) {
        scope.setSession();
      }
    };
    Hub2.prototype.startSession = function(context) {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      var _b = client && client.getOptions() || {}, release = _b.release, environment = _b.environment;
      var global12 = getGlobalObject();
      var userAgent = (global12.navigator || {}).userAgent;
      var session = new Session(__assign3(__assign3(__assign3({
        release,
        environment
      }, scope && { user: scope.getUser() }), userAgent && { userAgent }), context));
      if (scope) {
        var currentSession = scope.getSession && scope.getSession();
        if (currentSession && currentSession.status === "ok") {
          currentSession.update({ status: "exited" });
        }
        this.endSession();
        scope.setSession(session);
      }
      return session;
    };
    Hub2.prototype._sendSessionUpdate = function() {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      if (!scope)
        return;
      var session = scope.getSession && scope.getSession();
      if (session) {
        if (client && client.captureSession) {
          client.captureSession(session);
        }
      }
    };
    Hub2.prototype._invokeClient = function(method) {
      var _a;
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var _b = this.getStackTop(), scope = _b.scope, client = _b.client;
      if (client && client[method]) {
        (_a = client)[method].apply(_a, __spread3(args, [scope]));
      }
    };
    Hub2.prototype._callExtensionMethod = function(method) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var carrier = getMainCarrier();
      var sentry = carrier.__SENTRY__;
      if (sentry && sentry.extensions && typeof sentry.extensions[method] === "function") {
        return sentry.extensions[method].apply(this, args);
      }
      IS_DEBUG_BUILD2 && logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
    };
    return Hub2;
  }();
  function getMainCarrier() {
    var carrier = getGlobalObject();
    carrier.__SENTRY__ = carrier.__SENTRY__ || {
      extensions: {},
      hub: void 0
    };
    return carrier;
  }
  function makeMain(hub) {
    var registry = getMainCarrier();
    var oldHub = getHubFromCarrier(registry);
    setHubOnCarrier(registry, hub);
    return oldHub;
  }
  function getCurrentHub() {
    var registry = getMainCarrier();
    if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
      setHubOnCarrier(registry, new Hub());
    }
    if (isNodeEnv()) {
      return getHubFromActiveDomain(registry);
    }
    return getHubFromCarrier(registry);
  }
  function getHubFromActiveDomain(registry) {
    try {
      var sentry = getMainCarrier().__SENTRY__;
      var activeDomain = sentry && sentry.extensions && sentry.extensions.domain && sentry.extensions.domain.active;
      if (!activeDomain) {
        return getHubFromCarrier(registry);
      }
      if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
        var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
        setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, Scope.clone(registryHubTopStack.scope)));
      }
      return getHubFromCarrier(activeDomain);
    } catch (_Oo) {
      return getHubFromCarrier(registry);
    }
  }
  function hasHubOnCarrier(carrier) {
    return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
  }
  function getHubFromCarrier(carrier) {
    return getGlobalSingleton("hub", function() {
      return new Hub();
    }, carrier);
  }
  function setHubOnCarrier(carrier, hub) {
    if (!carrier)
      return false;
    var __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
    __SENTRY__.hub = hub;
    return true;
  }

  // ../node_modules/@sentry/minimal/esm/index.js
  function callOnHub(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var hub = getCurrentHub();
    if (hub && hub[method]) {
      return hub[method].apply(hub, __spread2(args));
    }
    throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
  }
  function captureException(exception, captureContext) {
    var syntheticException = new Error("Sentry syntheticException");
    return callOnHub("captureException", exception, {
      captureContext,
      originalException: exception,
      syntheticException
    });
  }
  function setTag(key, value) {
    callOnHub("setTag", key, value);
  }
  function withScope(callback) {
    callOnHub("withScope", callback);
  }

  // ../node_modules/@sentry/core/esm/api.js
  var SENTRY_API_VERSION = "7";
  var API = function() {
    function API2(dsn, metadata, tunnel) {
      if (metadata === void 0) {
        metadata = {};
      }
      this.dsn = dsn;
      this._dsnObject = makeDsn(dsn);
      this.metadata = metadata;
      this._tunnel = tunnel;
    }
    API2.prototype.getDsn = function() {
      return this._dsnObject;
    };
    API2.prototype.forceEnvelope = function() {
      return !!this._tunnel;
    };
    API2.prototype.getBaseApiEndpoint = function() {
      return getBaseApiEndpoint(this._dsnObject);
    };
    API2.prototype.getStoreEndpoint = function() {
      return getStoreEndpoint(this._dsnObject);
    };
    API2.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
      return getStoreEndpointWithUrlEncodedAuth(this._dsnObject);
    };
    API2.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function() {
      return getEnvelopeEndpointWithUrlEncodedAuth(this._dsnObject, this._tunnel);
    };
    return API2;
  }();
  function initAPIDetails(dsn, metadata, tunnel) {
    return {
      initDsn: dsn,
      metadata: metadata || {},
      dsn: makeDsn(dsn),
      tunnel
    };
  }
  function getBaseApiEndpoint(dsn) {
    var protocol = dsn.protocol ? dsn.protocol + ":" : "";
    var port = dsn.port ? ":" + dsn.port : "";
    return protocol + "//" + dsn.host + port + (dsn.path ? "/" + dsn.path : "") + "/api/";
  }
  function _getIngestEndpoint(dsn, target) {
    return "" + getBaseApiEndpoint(dsn) + dsn.projectId + "/" + target + "/";
  }
  function _encodedAuth(dsn) {
    return urlEncode({
      sentry_key: dsn.publicKey,
      sentry_version: SENTRY_API_VERSION
    });
  }
  function getStoreEndpoint(dsn) {
    return _getIngestEndpoint(dsn, "store");
  }
  function getStoreEndpointWithUrlEncodedAuth(dsn) {
    return getStoreEndpoint(dsn) + "?" + _encodedAuth(dsn);
  }
  function _getEnvelopeEndpoint(dsn) {
    return _getIngestEndpoint(dsn, "envelope");
  }
  function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel) {
    return tunnel ? tunnel : _getEnvelopeEndpoint(dsn) + "?" + _encodedAuth(dsn);
  }
  function getReportDialogEndpoint(dsnLike, dialogOptions) {
    var dsn = makeDsn(dsnLike);
    var endpoint = getBaseApiEndpoint(dsn) + "embed/error-page/";
    var encodedOptions = "dsn=" + dsnToString(dsn);
    for (var key in dialogOptions) {
      if (key === "dsn") {
        continue;
      }
      if (key === "user") {
        if (!dialogOptions.user) {
          continue;
        }
        if (dialogOptions.user.name) {
          encodedOptions += "&name=" + encodeURIComponent(dialogOptions.user.name);
        }
        if (dialogOptions.user.email) {
          encodedOptions += "&email=" + encodeURIComponent(dialogOptions.user.email);
        }
      } else {
        encodedOptions += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]);
      }
    }
    return endpoint + "?" + encodedOptions;
  }

  // ../node_modules/@sentry/core/node_modules/tslib/modules/index.js
  var import_tslib18 = __toESM(require_tslib5(), 1);
  var {
    __extends: __extends5,
    __assign: __assign5,
    __rest: __rest5,
    __decorate: __decorate5,
    __param: __param5,
    __metadata: __metadata5,
    __awaiter: __awaiter5,
    __generator: __generator5,
    __exportStar: __exportStar5,
    __createBinding: __createBinding5,
    __values: __values5,
    __read: __read5,
    __spread: __spread5,
    __spreadArrays: __spreadArrays5,
    __await: __await5,
    __asyncGenerator: __asyncGenerator5,
    __asyncDelegator: __asyncDelegator5,
    __asyncValues: __asyncValues5,
    __makeTemplateObject: __makeTemplateObject5,
    __importStar: __importStar5,
    __importDefault: __importDefault5,
    __classPrivateFieldGet: __classPrivateFieldGet5,
    __classPrivateFieldSet: __classPrivateFieldSet5
  } = import_tslib18.default;

  // ../node_modules/@sentry/core/esm/flags.js
  var IS_DEBUG_BUILD3 = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;

  // ../node_modules/@sentry/core/esm/integration.js
  var installedIntegrations = [];
  function filterDuplicates(integrations) {
    return integrations.reduce(function(acc, integrations2) {
      if (acc.every(function(accIntegration) {
        return integrations2.name !== accIntegration.name;
      })) {
        acc.push(integrations2);
      }
      return acc;
    }, []);
  }
  function getIntegrationsToSetup(options) {
    var defaultIntegrations2 = options.defaultIntegrations && __spread5(options.defaultIntegrations) || [];
    var userIntegrations = options.integrations;
    var integrations = __spread5(filterDuplicates(defaultIntegrations2));
    if (Array.isArray(userIntegrations)) {
      integrations = __spread5(integrations.filter(function(integrations2) {
        return userIntegrations.every(function(userIntegration) {
          return userIntegration.name !== integrations2.name;
        });
      }), filterDuplicates(userIntegrations));
    } else if (typeof userIntegrations === "function") {
      integrations = userIntegrations(integrations);
      integrations = Array.isArray(integrations) ? integrations : [integrations];
    }
    var integrationsNames = integrations.map(function(i) {
      return i.name;
    });
    var alwaysLastToRun = "Debug";
    if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
      integrations.push.apply(integrations, __spread5(integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1)));
    }
    return integrations;
  }
  function setupIntegration(integration) {
    if (installedIntegrations.indexOf(integration.name) !== -1) {
      return;
    }
    integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
    installedIntegrations.push(integration.name);
    IS_DEBUG_BUILD3 && logger.log("Integration installed: " + integration.name);
  }
  function setupIntegrations(options) {
    var integrations = {};
    getIntegrationsToSetup(options).forEach(function(integration) {
      integrations[integration.name] = integration;
      setupIntegration(integration);
    });
    addNonEnumerableProperty(integrations, "initialized", true);
    return integrations;
  }

  // ../node_modules/@sentry/core/esm/baseclient.js
  var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
  var BaseClient = function() {
    function BaseClient2(backendClass, options) {
      this._integrations = {};
      this._numProcessing = 0;
      this._backend = new backendClass(options);
      this._options = options;
      if (options.dsn) {
        this._dsn = makeDsn(options.dsn);
      }
    }
    BaseClient2.prototype.captureException = function(exception, hint, scope) {
      var _this = this;
      if (checkOrSetAlreadyCaught(exception)) {
        IS_DEBUG_BUILD3 && logger.log(ALREADY_SEEN_ERROR);
        return;
      }
      var eventId = hint && hint.event_id;
      this._process(this._getBackend().eventFromException(exception, hint).then(function(event) {
        return _this._captureEvent(event, hint, scope);
      }).then(function(result) {
        eventId = result;
      }));
      return eventId;
    };
    BaseClient2.prototype.captureMessage = function(message, level, hint, scope) {
      var _this = this;
      var eventId = hint && hint.event_id;
      var promisedEvent = isPrimitive(message) ? this._getBackend().eventFromMessage(String(message), level, hint) : this._getBackend().eventFromException(message, hint);
      this._process(promisedEvent.then(function(event) {
        return _this._captureEvent(event, hint, scope);
      }).then(function(result) {
        eventId = result;
      }));
      return eventId;
    };
    BaseClient2.prototype.captureEvent = function(event, hint, scope) {
      if (hint && hint.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
        IS_DEBUG_BUILD3 && logger.log(ALREADY_SEEN_ERROR);
        return;
      }
      var eventId = hint && hint.event_id;
      this._process(this._captureEvent(event, hint, scope).then(function(result) {
        eventId = result;
      }));
      return eventId;
    };
    BaseClient2.prototype.captureSession = function(session) {
      if (!this._isEnabled()) {
        IS_DEBUG_BUILD3 && logger.warn("SDK not enabled, will not capture session.");
        return;
      }
      if (!(typeof session.release === "string")) {
        IS_DEBUG_BUILD3 && logger.warn("Discarded session because of missing or non-string release");
      } else {
        this._sendSession(session);
        session.update({ init: false });
      }
    };
    BaseClient2.prototype.getDsn = function() {
      return this._dsn;
    };
    BaseClient2.prototype.getOptions = function() {
      return this._options;
    };
    BaseClient2.prototype.getTransport = function() {
      return this._getBackend().getTransport();
    };
    BaseClient2.prototype.flush = function(timeout) {
      var _this = this;
      return this._isClientDoneProcessing(timeout).then(function(clientFinished) {
        return _this.getTransport().close(timeout).then(function(transportFlushed) {
          return clientFinished && transportFlushed;
        });
      });
    };
    BaseClient2.prototype.close = function(timeout) {
      var _this = this;
      return this.flush(timeout).then(function(result) {
        _this.getOptions().enabled = false;
        return result;
      });
    };
    BaseClient2.prototype.setupIntegrations = function() {
      if (this._isEnabled() && !this._integrations.initialized) {
        this._integrations = setupIntegrations(this._options);
      }
    };
    BaseClient2.prototype.getIntegration = function(integration) {
      try {
        return this._integrations[integration.id] || null;
      } catch (_oO) {
        IS_DEBUG_BUILD3 && logger.warn("Cannot retrieve integration " + integration.id + " from the current Client");
        return null;
      }
    };
    BaseClient2.prototype._updateSessionFromEvent = function(session, event) {
      var e_1, _a;
      var crashed = false;
      var errored = false;
      var exceptions = event.exception && event.exception.values;
      if (exceptions) {
        errored = true;
        try {
          for (var exceptions_1 = __values5(exceptions), exceptions_1_1 = exceptions_1.next(); !exceptions_1_1.done; exceptions_1_1 = exceptions_1.next()) {
            var ex = exceptions_1_1.value;
            var mechanism = ex.mechanism;
            if (mechanism && mechanism.handled === false) {
              crashed = true;
              break;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (exceptions_1_1 && !exceptions_1_1.done && (_a = exceptions_1.return))
              _a.call(exceptions_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
      var sessionNonTerminal = session.status === "ok";
      var shouldUpdateAndSend = sessionNonTerminal && session.errors === 0 || sessionNonTerminal && crashed;
      if (shouldUpdateAndSend) {
        session.update(__assign5(__assign5({}, crashed && { status: "crashed" }), { errors: session.errors || Number(errored || crashed) }));
        this.captureSession(session);
      }
    };
    BaseClient2.prototype._sendSession = function(session) {
      this._getBackend().sendSession(session);
    };
    BaseClient2.prototype._isClientDoneProcessing = function(timeout) {
      var _this = this;
      return new SyncPromise(function(resolve) {
        var ticked = 0;
        var tick = 1;
        var interval = setInterval(function() {
          if (_this._numProcessing == 0) {
            clearInterval(interval);
            resolve(true);
          } else {
            ticked += tick;
            if (timeout && ticked >= timeout) {
              clearInterval(interval);
              resolve(false);
            }
          }
        }, tick);
      });
    };
    BaseClient2.prototype._getBackend = function() {
      return this._backend;
    };
    BaseClient2.prototype._isEnabled = function() {
      return this.getOptions().enabled !== false && this._dsn !== void 0;
    };
    BaseClient2.prototype._prepareEvent = function(event, scope, hint) {
      var _this = this;
      var _a = this.getOptions(), _b = _a.normalizeDepth, normalizeDepth = _b === void 0 ? 3 : _b, _c = _a.normalizeMaxBreadth, normalizeMaxBreadth = _c === void 0 ? 1e3 : _c;
      var prepared = __assign5(__assign5({}, event), { event_id: event.event_id || (hint && hint.event_id ? hint.event_id : uuid4()), timestamp: event.timestamp || dateTimestampInSeconds() });
      this._applyClientOptions(prepared);
      this._applyIntegrationsMetadata(prepared);
      var finalScope = scope;
      if (hint && hint.captureContext) {
        finalScope = Scope.clone(finalScope).update(hint.captureContext);
      }
      var result = resolvedSyncPromise(prepared);
      if (finalScope) {
        result = finalScope.applyToEvent(prepared, hint);
      }
      return result.then(function(evt) {
        if (evt) {
          evt.sdkProcessingMetadata = __assign5(__assign5({}, evt.sdkProcessingMetadata), { normalizeDepth: normalize(normalizeDepth) + " (" + typeof normalizeDepth + ")" });
        }
        if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
          return _this._normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
        }
        return evt;
      });
    };
    BaseClient2.prototype._normalizeEvent = function(event, depth, maxBreadth) {
      if (!event) {
        return null;
      }
      var normalized = __assign5(__assign5(__assign5(__assign5(__assign5({}, event), event.breadcrumbs && {
        breadcrumbs: event.breadcrumbs.map(function(b) {
          return __assign5(__assign5({}, b), b.data && {
            data: normalize(b.data, depth, maxBreadth)
          });
        })
      }), event.user && {
        user: normalize(event.user, depth, maxBreadth)
      }), event.contexts && {
        contexts: normalize(event.contexts, depth, maxBreadth)
      }), event.extra && {
        extra: normalize(event.extra, depth, maxBreadth)
      });
      if (event.contexts && event.contexts.trace) {
        normalized.contexts.trace = event.contexts.trace;
      }
      normalized.sdkProcessingMetadata = __assign5(__assign5({}, normalized.sdkProcessingMetadata), { baseClientNormalized: true });
      return normalized;
    };
    BaseClient2.prototype._applyClientOptions = function(event) {
      var options = this.getOptions();
      var environment = options.environment, release = options.release, dist = options.dist, _a = options.maxValueLength, maxValueLength = _a === void 0 ? 250 : _a;
      if (!("environment" in event)) {
        event.environment = "environment" in options ? environment : "production";
      }
      if (event.release === void 0 && release !== void 0) {
        event.release = release;
      }
      if (event.dist === void 0 && dist !== void 0) {
        event.dist = dist;
      }
      if (event.message) {
        event.message = truncate(event.message, maxValueLength);
      }
      var exception = event.exception && event.exception.values && event.exception.values[0];
      if (exception && exception.value) {
        exception.value = truncate(exception.value, maxValueLength);
      }
      var request = event.request;
      if (request && request.url) {
        request.url = truncate(request.url, maxValueLength);
      }
    };
    BaseClient2.prototype._applyIntegrationsMetadata = function(event) {
      var integrationsArray = Object.keys(this._integrations);
      if (integrationsArray.length > 0) {
        event.sdk = event.sdk || {};
        event.sdk.integrations = __spread5(event.sdk.integrations || [], integrationsArray);
      }
    };
    BaseClient2.prototype._sendEvent = function(event) {
      this._getBackend().sendEvent(event);
    };
    BaseClient2.prototype._captureEvent = function(event, hint, scope) {
      return this._processEvent(event, hint, scope).then(function(finalEvent) {
        return finalEvent.event_id;
      }, function(reason) {
        IS_DEBUG_BUILD3 && logger.error(reason);
        return void 0;
      });
    };
    BaseClient2.prototype._processEvent = function(event, hint, scope) {
      var _this = this;
      var _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
      var transport = this.getTransport();
      function recordLostEvent(outcome, category) {
        if (transport.recordLostEvent) {
          transport.recordLostEvent(outcome, category);
        }
      }
      if (!this._isEnabled()) {
        return rejectedSyncPromise(new SentryError("SDK not enabled, will not capture event."));
      }
      var isTransaction = event.type === "transaction";
      if (!isTransaction && typeof sampleRate === "number" && Math.random() > sampleRate) {
        recordLostEvent("sample_rate", "event");
        return rejectedSyncPromise(new SentryError("Discarding event because it's not included in the random sample (sampling rate = " + sampleRate + ")"));
      }
      return this._prepareEvent(event, scope, hint).then(function(prepared) {
        if (prepared === null) {
          recordLostEvent("event_processor", event.type || "event");
          throw new SentryError("An event processor returned null, will not send event.");
        }
        var isInternalException = hint && hint.data && hint.data.__sentry__ === true;
        if (isInternalException || isTransaction || !beforeSend) {
          return prepared;
        }
        var beforeSendResult = beforeSend(prepared, hint);
        return _ensureBeforeSendRv(beforeSendResult);
      }).then(function(processedEvent) {
        if (processedEvent === null) {
          recordLostEvent("before_send", event.type || "event");
          throw new SentryError("`beforeSend` returned `null`, will not send event.");
        }
        var session = scope && scope.getSession && scope.getSession();
        if (!isTransaction && session) {
          _this._updateSessionFromEvent(session, processedEvent);
        }
        _this._sendEvent(processedEvent);
        return processedEvent;
      }).then(null, function(reason) {
        if (reason instanceof SentryError) {
          throw reason;
        }
        _this.captureException(reason, {
          data: {
            __sentry__: true
          },
          originalException: reason
        });
        throw new SentryError("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + reason);
      });
    };
    BaseClient2.prototype._process = function(promise) {
      var _this = this;
      this._numProcessing += 1;
      void promise.then(function(value) {
        _this._numProcessing -= 1;
        return value;
      }, function(reason) {
        _this._numProcessing -= 1;
        return reason;
      });
    };
    return BaseClient2;
  }();
  function _ensureBeforeSendRv(rv) {
    var nullErr = "`beforeSend` method has to return `null` or a valid event.";
    if (isThenable(rv)) {
      return rv.then(function(event) {
        if (!(isPlainObject(event) || event === null)) {
          throw new SentryError(nullErr);
        }
        return event;
      }, function(e) {
        throw new SentryError("beforeSend rejected with " + e);
      });
    } else if (!(isPlainObject(rv) || rv === null)) {
      throw new SentryError(nullErr);
    }
    return rv;
  }

  // ../node_modules/@sentry/core/esm/request.js
  function getSdkMetadataForEnvelopeHeader(api) {
    if (!api.metadata || !api.metadata.sdk) {
      return;
    }
    var _a = api.metadata.sdk, name = _a.name, version = _a.version;
    return { name, version };
  }
  function enhanceEventWithSdkInfo(event, sdkInfo) {
    if (!sdkInfo) {
      return event;
    }
    event.sdk = event.sdk || {};
    event.sdk.name = event.sdk.name || sdkInfo.name;
    event.sdk.version = event.sdk.version || sdkInfo.version;
    event.sdk.integrations = __spread5(event.sdk.integrations || [], sdkInfo.integrations || []);
    event.sdk.packages = __spread5(event.sdk.packages || [], sdkInfo.packages || []);
    return event;
  }
  function createSessionEnvelope(session, api) {
    var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
    var envelopeHeaders = __assign5(__assign5({ sent_at: new Date().toISOString() }, sdkInfo && { sdk: sdkInfo }), !!api.tunnel && { dsn: dsnToString(api.dsn) });
    var type = "aggregates" in session ? "sessions" : "session";
    var envelopeItem = [{ type }, session];
    var envelope = createEnvelope(envelopeHeaders, [envelopeItem]);
    return [envelope, type];
  }
  function sessionToSentryRequest(session, api) {
    var _a = __read5(createSessionEnvelope(session, api), 2), envelope = _a[0], type = _a[1];
    return {
      body: serializeEnvelope(envelope),
      type,
      url: getEnvelopeEndpointWithUrlEncodedAuth(api.dsn, api.tunnel)
    };
  }
  function createEventEnvelope(event, api) {
    var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
    var eventType = event.type || "event";
    var transactionSampling = (event.sdkProcessingMetadata || {}).transactionSampling;
    var _a = transactionSampling || {}, samplingMethod = _a.method, sampleRate = _a.rate;
    enhanceEventWithSdkInfo(event, api.metadata.sdk);
    event.tags = event.tags || {};
    event.extra = event.extra || {};
    if (!(event.sdkProcessingMetadata && event.sdkProcessingMetadata.baseClientNormalized)) {
      event.tags.skippedNormalization = true;
      event.extra.normalizeDepth = event.sdkProcessingMetadata ? event.sdkProcessingMetadata.normalizeDepth : "unset";
    }
    delete event.sdkProcessingMetadata;
    var envelopeHeaders = __assign5(__assign5({ event_id: event.event_id, sent_at: new Date().toISOString() }, sdkInfo && { sdk: sdkInfo }), !!api.tunnel && { dsn: dsnToString(api.dsn) });
    var eventItem = [
      {
        type: eventType,
        sample_rates: [{ id: samplingMethod, rate: sampleRate }]
      },
      event
    ];
    return createEnvelope(envelopeHeaders, [eventItem]);
  }
  function eventToSentryRequest(event, api) {
    var sdkInfo = getSdkMetadataForEnvelopeHeader(api);
    var eventType = event.type || "event";
    var useEnvelope = eventType === "transaction" || !!api.tunnel;
    var transactionSampling = (event.sdkProcessingMetadata || {}).transactionSampling;
    var _a = transactionSampling || {}, samplingMethod = _a.method, sampleRate = _a.rate;
    enhanceEventWithSdkInfo(event, api.metadata.sdk);
    event.tags = event.tags || {};
    event.extra = event.extra || {};
    if (!(event.sdkProcessingMetadata && event.sdkProcessingMetadata.baseClientNormalized)) {
      event.tags.skippedNormalization = true;
      event.extra.normalizeDepth = event.sdkProcessingMetadata ? event.sdkProcessingMetadata.normalizeDepth : "unset";
    }
    delete event.sdkProcessingMetadata;
    var body;
    try {
      body = JSON.stringify(event);
    } catch (err) {
      event.tags.JSONStringifyError = true;
      event.extra.JSONStringifyError = err;
      try {
        body = JSON.stringify(normalize(event));
      } catch (newErr) {
        var innerErr = newErr;
        body = JSON.stringify({
          message: "JSON.stringify error after renormalization",
          extra: { message: innerErr.message, stack: innerErr.stack }
        });
      }
    }
    var req = {
      body,
      type: eventType,
      url: useEnvelope ? getEnvelopeEndpointWithUrlEncodedAuth(api.dsn, api.tunnel) : getStoreEndpointWithUrlEncodedAuth(api.dsn)
    };
    if (useEnvelope) {
      var envelopeHeaders = __assign5(__assign5({ event_id: event.event_id, sent_at: new Date().toISOString() }, sdkInfo && { sdk: sdkInfo }), !!api.tunnel && { dsn: dsnToString(api.dsn) });
      var eventItem = [
        {
          type: eventType,
          sample_rates: [{ id: samplingMethod, rate: sampleRate }]
        },
        req.body
      ];
      var envelope = createEnvelope(envelopeHeaders, [eventItem]);
      req.body = serializeEnvelope(envelope);
    }
    return req;
  }

  // ../node_modules/@sentry/core/esm/transports/noop.js
  var NoopTransport = function() {
    function NoopTransport2() {
    }
    NoopTransport2.prototype.sendEvent = function(_) {
      return resolvedSyncPromise({
        reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
        status: "skipped"
      });
    };
    NoopTransport2.prototype.close = function(_) {
      return resolvedSyncPromise(true);
    };
    return NoopTransport2;
  }();

  // ../node_modules/@sentry/core/esm/basebackend.js
  var BaseBackend = function() {
    function BaseBackend2(options) {
      this._options = options;
      if (!this._options.dsn) {
        IS_DEBUG_BUILD3 && logger.warn("No DSN provided, backend will not do anything.");
      }
      this._transport = this._setupTransport();
    }
    BaseBackend2.prototype.eventFromException = function(_exception, _hint) {
      throw new SentryError("Backend has to implement `eventFromException` method");
    };
    BaseBackend2.prototype.eventFromMessage = function(_message, _level, _hint) {
      throw new SentryError("Backend has to implement `eventFromMessage` method");
    };
    BaseBackend2.prototype.sendEvent = function(event) {
      if (this._newTransport && this._options.dsn && this._options._experiments && this._options._experiments.newTransport) {
        var api = initAPIDetails(this._options.dsn, this._options._metadata, this._options.tunnel);
        var env = createEventEnvelope(event, api);
        void this._newTransport.send(env).then(null, function(reason) {
          IS_DEBUG_BUILD3 && logger.error("Error while sending event:", reason);
        });
      } else {
        void this._transport.sendEvent(event).then(null, function(reason) {
          IS_DEBUG_BUILD3 && logger.error("Error while sending event:", reason);
        });
      }
    };
    BaseBackend2.prototype.sendSession = function(session) {
      if (!this._transport.sendSession) {
        IS_DEBUG_BUILD3 && logger.warn("Dropping session because custom transport doesn't implement sendSession");
        return;
      }
      if (this._newTransport && this._options.dsn && this._options._experiments && this._options._experiments.newTransport) {
        var api = initAPIDetails(this._options.dsn, this._options._metadata, this._options.tunnel);
        var _a = __read5(createSessionEnvelope(session, api), 1), env = _a[0];
        void this._newTransport.send(env).then(null, function(reason) {
          IS_DEBUG_BUILD3 && logger.error("Error while sending session:", reason);
        });
      } else {
        void this._transport.sendSession(session).then(null, function(reason) {
          IS_DEBUG_BUILD3 && logger.error("Error while sending session:", reason);
        });
      }
    };
    BaseBackend2.prototype.getTransport = function() {
      return this._transport;
    };
    BaseBackend2.prototype._setupTransport = function() {
      return new NoopTransport();
    };
    return BaseBackend2;
  }();

  // ../node_modules/@sentry/core/esm/sdk.js
  function initAndBind(clientClass, options) {
    if (options.debug === true) {
      if (IS_DEBUG_BUILD3) {
        logger.enable();
      } else {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
      }
    }
    var hub = getCurrentHub();
    var scope = hub.getScope();
    if (scope) {
      scope.update(options.initialScope);
    }
    var client = new clientClass(options);
    hub.bindClient(client);
  }

  // ../node_modules/@sentry/core/esm/transports/base.js
  var DEFAULT_TRANSPORT_BUFFER_SIZE = 30;
  function createTransport(options, makeRequest, buffer) {
    if (buffer === void 0) {
      buffer = makePromiseBuffer(options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE);
    }
    var rateLimits = {};
    var flush2 = function(timeout) {
      return buffer.drain(timeout);
    };
    function send(envelope) {
      var envCategory = getEnvelopeType(envelope);
      var category = envCategory === "event" ? "error" : envCategory;
      var request = {
        category,
        body: serializeEnvelope(envelope)
      };
      if (isRateLimited(rateLimits, category)) {
        return rejectedSyncPromise({
          status: "rate_limit",
          reason: getRateLimitReason(rateLimits, category)
        });
      }
      var requestTask = function() {
        return makeRequest(request).then(function(_a) {
          var body = _a.body, headers = _a.headers, reason = _a.reason, statusCode = _a.statusCode;
          var status = eventStatusFromHttpCode(statusCode);
          if (headers) {
            rateLimits = updateRateLimits(rateLimits, headers);
          }
          if (status === "success") {
            return resolvedSyncPromise({ status, reason });
          }
          return rejectedSyncPromise({
            status,
            reason: reason || body || (status === "rate_limit" ? getRateLimitReason(rateLimits, category) : "Unknown transport error")
          });
        });
      };
      return buffer.add(requestTask);
    }
    return {
      send,
      flush: flush2
    };
  }
  function getRateLimitReason(rateLimits, category) {
    return "Too many " + category + " requests, backing off until: " + new Date(disabledUntil(rateLimits, category)).toISOString();
  }

  // ../node_modules/@sentry/core/esm/version.js
  var SDK_VERSION = "6.19.7";

  // ../node_modules/@sentry/core/esm/integrations/index.js
  var integrations_exports = {};
  __export(integrations_exports, {
    FunctionToString: () => FunctionToString,
    InboundFilters: () => InboundFilters
  });

  // ../node_modules/@sentry/core/esm/integrations/functiontostring.js
  var originalFunctionToString;
  var FunctionToString = function() {
    function FunctionToString2() {
      this.name = FunctionToString2.id;
    }
    FunctionToString2.prototype.setupOnce = function() {
      originalFunctionToString = Function.prototype.toString;
      Function.prototype.toString = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var context = getOriginalFunction(this) || this;
        return originalFunctionToString.apply(context, args);
      };
    };
    FunctionToString2.id = "FunctionToString";
    return FunctionToString2;
  }();

  // ../node_modules/@sentry/core/esm/integrations/inboundfilters.js
  var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
  var InboundFilters = function() {
    function InboundFilters2(_options) {
      if (_options === void 0) {
        _options = {};
      }
      this._options = _options;
      this.name = InboundFilters2.id;
    }
    InboundFilters2.prototype.setupOnce = function(addGlobalEventProcessor2, getCurrentHub2) {
      addGlobalEventProcessor2(function(event) {
        var hub = getCurrentHub2();
        if (hub) {
          var self_1 = hub.getIntegration(InboundFilters2);
          if (self_1) {
            var client = hub.getClient();
            var clientOptions = client ? client.getOptions() : {};
            var options = _mergeOptions(self_1._options, clientOptions);
            return _shouldDropEvent(event, options) ? null : event;
          }
        }
        return event;
      });
    };
    InboundFilters2.id = "InboundFilters";
    return InboundFilters2;
  }();
  function _mergeOptions(internalOptions, clientOptions) {
    if (internalOptions === void 0) {
      internalOptions = {};
    }
    if (clientOptions === void 0) {
      clientOptions = {};
    }
    return {
      allowUrls: __spread5(internalOptions.whitelistUrls || [], internalOptions.allowUrls || [], clientOptions.whitelistUrls || [], clientOptions.allowUrls || []),
      denyUrls: __spread5(internalOptions.blacklistUrls || [], internalOptions.denyUrls || [], clientOptions.blacklistUrls || [], clientOptions.denyUrls || []),
      ignoreErrors: __spread5(internalOptions.ignoreErrors || [], clientOptions.ignoreErrors || [], DEFAULT_IGNORE_ERRORS),
      ignoreInternal: internalOptions.ignoreInternal !== void 0 ? internalOptions.ignoreInternal : true
    };
  }
  function _shouldDropEvent(event, options) {
    if (options.ignoreInternal && _isSentryError(event)) {
      IS_DEBUG_BUILD3 && logger.warn("Event dropped due to being internal Sentry Error.\nEvent: " + getEventDescription(event));
      return true;
    }
    if (_isIgnoredError(event, options.ignoreErrors)) {
      IS_DEBUG_BUILD3 && logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + getEventDescription(event));
      return true;
    }
    if (_isDeniedUrl(event, options.denyUrls)) {
      IS_DEBUG_BUILD3 && logger.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + _getEventFilterUrl(event));
      return true;
    }
    if (!_isAllowedUrl(event, options.allowUrls)) {
      IS_DEBUG_BUILD3 && logger.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + _getEventFilterUrl(event));
      return true;
    }
    return false;
  }
  function _isIgnoredError(event, ignoreErrors) {
    if (!ignoreErrors || !ignoreErrors.length) {
      return false;
    }
    return _getPossibleEventMessages(event).some(function(message) {
      return ignoreErrors.some(function(pattern) {
        return isMatchingPattern(message, pattern);
      });
    });
  }
  function _isDeniedUrl(event, denyUrls) {
    if (!denyUrls || !denyUrls.length) {
      return false;
    }
    var url = _getEventFilterUrl(event);
    return !url ? false : denyUrls.some(function(pattern) {
      return isMatchingPattern(url, pattern);
    });
  }
  function _isAllowedUrl(event, allowUrls) {
    if (!allowUrls || !allowUrls.length) {
      return true;
    }
    var url = _getEventFilterUrl(event);
    return !url ? true : allowUrls.some(function(pattern) {
      return isMatchingPattern(url, pattern);
    });
  }
  function _getPossibleEventMessages(event) {
    if (event.message) {
      return [event.message];
    }
    if (event.exception) {
      try {
        var _a = event.exception.values && event.exception.values[0] || {}, _b = _a.type, type = _b === void 0 ? "" : _b, _c = _a.value, value = _c === void 0 ? "" : _c;
        return ["" + value, type + ": " + value];
      } catch (oO) {
        IS_DEBUG_BUILD3 && logger.error("Cannot extract message for event " + getEventDescription(event));
        return [];
      }
    }
    return [];
  }
  function _isSentryError(event) {
    try {
      return event.exception.values[0].type === "SentryError";
    } catch (e) {
    }
    return false;
  }
  function _getLastValidUrl(frames) {
    if (frames === void 0) {
      frames = [];
    }
    for (var i = frames.length - 1; i >= 0; i--) {
      var frame = frames[i];
      if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") {
        return frame.filename || null;
      }
    }
    return null;
  }
  function _getEventFilterUrl(event) {
    try {
      if (event.stacktrace) {
        return _getLastValidUrl(event.stacktrace.frames);
      }
      var frames_1;
      try {
        frames_1 = event.exception.values[0].stacktrace.frames;
      } catch (e) {
      }
      return frames_1 ? _getLastValidUrl(frames_1) : null;
    } catch (oO) {
      IS_DEBUG_BUILD3 && logger.error("Cannot extract url for event " + getEventDescription(event));
      return null;
    }
  }

  // ../node_modules/@sentry/browser/esm/stack-parsers.js
  var UNKNOWN_FUNCTION = "?";
  var OPERA10_PRIORITY = 10;
  var OPERA11_PRIORITY = 20;
  var CHROME_PRIORITY = 30;
  var WINJS_PRIORITY = 40;
  var GECKO_PRIORITY = 50;
  function createFrame(filename, func, lineno, colno) {
    var frame = {
      filename,
      function: func,
      in_app: true
    };
    if (lineno !== void 0) {
      frame.lineno = lineno;
    }
    if (colno !== void 0) {
      frame.colno = colno;
    }
    return frame;
  }
  var chromeRegex = /^\s*at (?:(.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
  var chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
  var chrome = function(line) {
    var parts = chromeRegex.exec(line);
    if (parts) {
      var isEval = parts[2] && parts[2].indexOf("eval") === 0;
      if (isEval) {
        var subMatch = chromeEvalRegex.exec(parts[2]);
        if (subMatch) {
          parts[2] = subMatch[1];
          parts[3] = subMatch[2];
          parts[4] = subMatch[3];
        }
      }
      var _a = __read(extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]), 2), func = _a[0], filename = _a[1];
      return createFrame(filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
    }
    return;
  };
  var chromeStackParser = [CHROME_PRIORITY, chrome];
  var geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
  var geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
  var gecko = function(line) {
    var _a;
    var parts = geckoREgex.exec(line);
    if (parts) {
      var isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
      if (isEval) {
        var subMatch = geckoEvalRegex.exec(parts[3]);
        if (subMatch) {
          parts[1] = parts[1] || "eval";
          parts[3] = subMatch[1];
          parts[4] = subMatch[2];
          parts[5] = "";
        }
      }
      var filename = parts[3];
      var func = parts[1] || UNKNOWN_FUNCTION;
      _a = __read(extractSafariExtensionDetails(func, filename), 2), func = _a[0], filename = _a[1];
      return createFrame(filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
    }
    return;
  };
  var geckoStackParser = [GECKO_PRIORITY, gecko];
  var winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  var winjs = function(line) {
    var parts = winjsRegex.exec(line);
    return parts ? createFrame(parts[2], parts[1] || UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : void 0) : void 0;
  };
  var winjsStackParser = [WINJS_PRIORITY, winjs];
  var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
  var opera10 = function(line) {
    var parts = opera10Regex.exec(line);
    return parts ? createFrame(parts[2], parts[3] || UNKNOWN_FUNCTION, +parts[1]) : void 0;
  };
  var opera10StackParser = [OPERA10_PRIORITY, opera10];
  var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;
  var opera11 = function(line) {
    var parts = opera11Regex.exec(line);
    return parts ? createFrame(parts[5], parts[3] || parts[4] || UNKNOWN_FUNCTION, +parts[1], +parts[2]) : void 0;
  };
  var opera11StackParser = [OPERA11_PRIORITY, opera11];
  var extractSafariExtensionDetails = function(func, filename) {
    var isSafariExtension = func.indexOf("safari-extension") !== -1;
    var isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
    return isSafariExtension || isSafariWebExtension ? [
      func.indexOf("@") !== -1 ? func.split("@")[0] : UNKNOWN_FUNCTION,
      isSafariExtension ? "safari-extension:" + filename : "safari-web-extension:" + filename
    ] : [func, filename];
  };

  // ../node_modules/@sentry/browser/esm/eventbuilder.js
  function exceptionFromError(ex) {
    var frames = parseStackFrames(ex);
    var exception = {
      type: ex && ex.name,
      value: extractMessage(ex)
    };
    if (frames.length) {
      exception.stacktrace = { frames };
    }
    if (exception.type === void 0 && exception.value === "") {
      exception.value = "Unrecoverable error caught";
    }
    return exception;
  }
  function eventFromPlainObject(exception, syntheticException, isUnhandledRejection) {
    var event = {
      exception: {
        values: [
          {
            type: isEvent(exception) ? exception.constructor.name : isUnhandledRejection ? "UnhandledRejection" : "Error",
            value: "Non-Error " + (isUnhandledRejection ? "promise rejection" : "exception") + " captured with keys: " + extractExceptionKeysForMessage(exception)
          }
        ]
      },
      extra: {
        __serialized__: normalizeToSize(exception)
      }
    };
    if (syntheticException) {
      var frames_1 = parseStackFrames(syntheticException);
      if (frames_1.length) {
        event.stacktrace = { frames: frames_1 };
      }
    }
    return event;
  }
  function eventFromError(ex) {
    return {
      exception: {
        values: [exceptionFromError(ex)]
      }
    };
  }
  function parseStackFrames(ex) {
    var stacktrace = ex.stacktrace || ex.stack || "";
    var popSize = getPopSize(ex);
    try {
      return createStackParser(opera10StackParser, opera11StackParser, chromeStackParser, winjsStackParser, geckoStackParser)(stacktrace, popSize);
    } catch (e) {
    }
    return [];
  }
  var reactMinifiedRegexp = /Minified React error #\d+;/i;
  function getPopSize(ex) {
    if (ex) {
      if (typeof ex.framesToPop === "number") {
        return ex.framesToPop;
      }
      if (reactMinifiedRegexp.test(ex.message)) {
        return 1;
      }
    }
    return 0;
  }
  function extractMessage(ex) {
    var message = ex && ex.message;
    if (!message) {
      return "No error message";
    }
    if (message.error && typeof message.error.message === "string") {
      return message.error.message;
    }
    return message;
  }
  function eventFromException(exception, hint, attachStacktrace) {
    var syntheticException = hint && hint.syntheticException || void 0;
    var event = eventFromUnknownInput(exception, syntheticException, attachStacktrace);
    addExceptionMechanism(event);
    event.level = Severity.Error;
    if (hint && hint.event_id) {
      event.event_id = hint.event_id;
    }
    return resolvedSyncPromise(event);
  }
  function eventFromMessage(message, level, hint, attachStacktrace) {
    if (level === void 0) {
      level = Severity.Info;
    }
    var syntheticException = hint && hint.syntheticException || void 0;
    var event = eventFromString(message, syntheticException, attachStacktrace);
    event.level = level;
    if (hint && hint.event_id) {
      event.event_id = hint.event_id;
    }
    return resolvedSyncPromise(event);
  }
  function eventFromUnknownInput(exception, syntheticException, attachStacktrace, isUnhandledRejection) {
    var event;
    if (isErrorEvent(exception) && exception.error) {
      var errorEvent = exception;
      return eventFromError(errorEvent.error);
    }
    if (isDOMError(exception) || isDOMException(exception)) {
      var domException = exception;
      if ("stack" in exception) {
        event = eventFromError(exception);
      } else {
        var name_1 = domException.name || (isDOMError(domException) ? "DOMError" : "DOMException");
        var message = domException.message ? name_1 + ": " + domException.message : name_1;
        event = eventFromString(message, syntheticException, attachStacktrace);
        addExceptionTypeValue(event, message);
      }
      if ("code" in domException) {
        event.tags = __assign(__assign({}, event.tags), { "DOMException.code": "" + domException.code });
      }
      return event;
    }
    if (isError(exception)) {
      return eventFromError(exception);
    }
    if (isPlainObject(exception) || isEvent(exception)) {
      var objectException = exception;
      event = eventFromPlainObject(objectException, syntheticException, isUnhandledRejection);
      addExceptionMechanism(event, {
        synthetic: true
      });
      return event;
    }
    event = eventFromString(exception, syntheticException, attachStacktrace);
    addExceptionTypeValue(event, "" + exception, void 0);
    addExceptionMechanism(event, {
      synthetic: true
    });
    return event;
  }
  function eventFromString(input, syntheticException, attachStacktrace) {
    var event = {
      message: input
    };
    if (attachStacktrace && syntheticException) {
      var frames_2 = parseStackFrames(syntheticException);
      if (frames_2.length) {
        event.stacktrace = { frames: frames_2 };
      }
    }
    return event;
  }

  // ../node_modules/@sentry/browser/esm/flags.js
  var IS_DEBUG_BUILD4 = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;

  // ../node_modules/@sentry/browser/esm/transports/utils.js
  var global4 = getGlobalObject();
  var cachedFetchImpl;
  function getNativeFetchImplementation() {
    if (cachedFetchImpl) {
      return cachedFetchImpl;
    }
    if (isNativeFetch(global4.fetch)) {
      return cachedFetchImpl = global4.fetch.bind(global4);
    }
    var document2 = global4.document;
    var fetchImpl = global4.fetch;
    if (document2 && typeof document2.createElement === "function") {
      try {
        var sandbox = document2.createElement("iframe");
        sandbox.hidden = true;
        document2.head.appendChild(sandbox);
        var contentWindow = sandbox.contentWindow;
        if (contentWindow && contentWindow.fetch) {
          fetchImpl = contentWindow.fetch;
        }
        document2.head.removeChild(sandbox);
      } catch (e) {
        IS_DEBUG_BUILD4 && logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", e);
      }
    }
    return cachedFetchImpl = fetchImpl.bind(global4);
  }
  function sendReport(url, body) {
    var isRealNavigator = Object.prototype.toString.call(global4 && global4.navigator) === "[object Navigator]";
    var hasSendBeacon = isRealNavigator && typeof global4.navigator.sendBeacon === "function";
    if (hasSendBeacon) {
      var sendBeacon = global4.navigator.sendBeacon.bind(global4.navigator);
      return sendBeacon(url, body);
    }
    if (supportsFetch()) {
      var fetch_1 = getNativeFetchImplementation();
      return forget(fetch_1(url, {
        body,
        method: "POST",
        credentials: "omit",
        keepalive: true
      }));
    }
  }

  // ../node_modules/@sentry/browser/esm/transports/base.js
  function requestTypeToCategory(ty) {
    var tyStr = ty;
    return tyStr === "event" ? "error" : tyStr;
  }
  var global5 = getGlobalObject();
  var BaseTransport = function() {
    function BaseTransport2(options) {
      var _this = this;
      this.options = options;
      this._buffer = makePromiseBuffer(30);
      this._rateLimits = {};
      this._outcomes = {};
      this._api = initAPIDetails(options.dsn, options._metadata, options.tunnel);
      this.url = getStoreEndpointWithUrlEncodedAuth(this._api.dsn);
      if (this.options.sendClientReports && global5.document) {
        global5.document.addEventListener("visibilitychange", function() {
          if (global5.document.visibilityState === "hidden") {
            _this._flushOutcomes();
          }
        });
      }
    }
    BaseTransport2.prototype.sendEvent = function(event) {
      return this._sendRequest(eventToSentryRequest(event, this._api), event);
    };
    BaseTransport2.prototype.sendSession = function(session) {
      return this._sendRequest(sessionToSentryRequest(session, this._api), session);
    };
    BaseTransport2.prototype.close = function(timeout) {
      return this._buffer.drain(timeout);
    };
    BaseTransport2.prototype.recordLostEvent = function(reason, category) {
      var _a;
      if (!this.options.sendClientReports) {
        return;
      }
      var key = requestTypeToCategory(category) + ":" + reason;
      IS_DEBUG_BUILD4 && logger.log("Adding outcome: " + key);
      this._outcomes[key] = (_a = this._outcomes[key], _a !== null && _a !== void 0 ? _a : 0) + 1;
    };
    BaseTransport2.prototype._flushOutcomes = function() {
      if (!this.options.sendClientReports) {
        return;
      }
      var outcomes = this._outcomes;
      this._outcomes = {};
      if (!Object.keys(outcomes).length) {
        IS_DEBUG_BUILD4 && logger.log("No outcomes to flush");
        return;
      }
      IS_DEBUG_BUILD4 && logger.log("Flushing outcomes:\n" + JSON.stringify(outcomes, null, 2));
      var url = getEnvelopeEndpointWithUrlEncodedAuth(this._api.dsn, this._api.tunnel);
      var discardedEvents = Object.keys(outcomes).map(function(key) {
        var _a = __read(key.split(":"), 2), category = _a[0], reason = _a[1];
        return {
          reason,
          category,
          quantity: outcomes[key]
        };
      });
      var envelope = createClientReportEnvelope(discardedEvents, this._api.tunnel && dsnToString(this._api.dsn));
      try {
        sendReport(url, serializeEnvelope(envelope));
      } catch (e) {
        IS_DEBUG_BUILD4 && logger.error(e);
      }
    };
    BaseTransport2.prototype._handleResponse = function(_a) {
      var requestType = _a.requestType, response = _a.response, headers = _a.headers, resolve = _a.resolve, reject = _a.reject;
      var status = eventStatusFromHttpCode(response.status);
      this._rateLimits = updateRateLimits(this._rateLimits, headers);
      if (this._isRateLimited(requestType)) {
        IS_DEBUG_BUILD4 && logger.warn("Too many " + requestType + " requests, backing off until: " + this._disabledUntil(requestType));
      }
      if (status === "success") {
        resolve({ status });
        return;
      }
      reject(response);
    };
    BaseTransport2.prototype._disabledUntil = function(requestType) {
      var category = requestTypeToCategory(requestType);
      return new Date(disabledUntil(this._rateLimits, category));
    };
    BaseTransport2.prototype._isRateLimited = function(requestType) {
      var category = requestTypeToCategory(requestType);
      return isRateLimited(this._rateLimits, category);
    };
    return BaseTransport2;
  }();

  // ../node_modules/@sentry/browser/esm/transports/fetch.js
  var FetchTransport = function(_super) {
    __extends(FetchTransport2, _super);
    function FetchTransport2(options, fetchImpl) {
      if (fetchImpl === void 0) {
        fetchImpl = getNativeFetchImplementation();
      }
      var _this = _super.call(this, options) || this;
      _this._fetch = fetchImpl;
      return _this;
    }
    FetchTransport2.prototype._sendRequest = function(sentryRequest, originalPayload) {
      var _this = this;
      if (this._isRateLimited(sentryRequest.type)) {
        this.recordLostEvent("ratelimit_backoff", sentryRequest.type);
        return Promise.reject({
          event: originalPayload,
          type: sentryRequest.type,
          reason: "Transport for " + sentryRequest.type + " requests locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
          status: 429
        });
      }
      var options = {
        body: sentryRequest.body,
        method: "POST",
        referrerPolicy: supportsReferrerPolicy() ? "origin" : ""
      };
      if (this.options.fetchParameters !== void 0) {
        Object.assign(options, this.options.fetchParameters);
      }
      if (this.options.headers !== void 0) {
        options.headers = this.options.headers;
      }
      return this._buffer.add(function() {
        return new SyncPromise(function(resolve, reject) {
          void _this._fetch(sentryRequest.url, options).then(function(response) {
            var headers = {
              "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
              "retry-after": response.headers.get("Retry-After")
            };
            _this._handleResponse({
              requestType: sentryRequest.type,
              response,
              headers,
              resolve,
              reject
            });
          }).catch(reject);
        });
      }).then(void 0, function(reason) {
        if (reason instanceof SentryError) {
          _this.recordLostEvent("queue_overflow", sentryRequest.type);
        } else {
          _this.recordLostEvent("network_error", sentryRequest.type);
        }
        throw reason;
      });
    };
    return FetchTransport2;
  }(BaseTransport);

  // ../node_modules/@sentry/browser/esm/transports/xhr.js
  var XHRTransport = function(_super) {
    __extends(XHRTransport2, _super);
    function XHRTransport2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    XHRTransport2.prototype._sendRequest = function(sentryRequest, originalPayload) {
      var _this = this;
      if (this._isRateLimited(sentryRequest.type)) {
        this.recordLostEvent("ratelimit_backoff", sentryRequest.type);
        return Promise.reject({
          event: originalPayload,
          type: sentryRequest.type,
          reason: "Transport for " + sentryRequest.type + " requests locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
          status: 429
        });
      }
      return this._buffer.add(function() {
        return new SyncPromise(function(resolve, reject) {
          var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            if (request.readyState === 4) {
              var headers = {
                "x-sentry-rate-limits": request.getResponseHeader("X-Sentry-Rate-Limits"),
                "retry-after": request.getResponseHeader("Retry-After")
              };
              _this._handleResponse({ requestType: sentryRequest.type, response: request, headers, resolve, reject });
            }
          };
          request.open("POST", sentryRequest.url);
          for (var header in _this.options.headers) {
            if (Object.prototype.hasOwnProperty.call(_this.options.headers, header)) {
              request.setRequestHeader(header, _this.options.headers[header]);
            }
          }
          request.send(sentryRequest.body);
        });
      }).then(void 0, function(reason) {
        if (reason instanceof SentryError) {
          _this.recordLostEvent("queue_overflow", sentryRequest.type);
        } else {
          _this.recordLostEvent("network_error", sentryRequest.type);
        }
        throw reason;
      });
    };
    return XHRTransport2;
  }(BaseTransport);

  // ../node_modules/@sentry/browser/esm/transports/new-fetch.js
  function makeNewFetchTransport(options, nativeFetch) {
    if (nativeFetch === void 0) {
      nativeFetch = getNativeFetchImplementation();
    }
    function makeRequest(request) {
      var requestOptions = __assign({ body: request.body, method: "POST", referrerPolicy: "origin" }, options.requestOptions);
      return nativeFetch(options.url, requestOptions).then(function(response) {
        return response.text().then(function(body) {
          return {
            body,
            headers: {
              "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
              "retry-after": response.headers.get("Retry-After")
            },
            reason: response.statusText,
            statusCode: response.status
          };
        });
      });
    }
    return createTransport({ bufferSize: options.bufferSize }, makeRequest);
  }

  // ../node_modules/@sentry/browser/esm/transports/new-xhr.js
  var XHR_READYSTATE_DONE = 4;
  function makeNewXHRTransport(options) {
    function makeRequest(request) {
      return new SyncPromise(function(resolve, _reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XHR_READYSTATE_DONE) {
            var response = {
              body: xhr.response,
              headers: {
                "x-sentry-rate-limits": xhr.getResponseHeader("X-Sentry-Rate-Limits"),
                "retry-after": xhr.getResponseHeader("Retry-After")
              },
              reason: xhr.statusText,
              statusCode: xhr.status
            };
            resolve(response);
          }
        };
        xhr.open("POST", options.url);
        for (var header in options.headers) {
          if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
            xhr.setRequestHeader(header, options.headers[header]);
          }
        }
        xhr.send(request.body);
      });
    }
    return createTransport({ bufferSize: options.bufferSize }, makeRequest);
  }

  // ../node_modules/@sentry/browser/esm/backend.js
  var BrowserBackend = function(_super) {
    __extends(BrowserBackend2, _super);
    function BrowserBackend2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserBackend2.prototype.eventFromException = function(exception, hint) {
      return eventFromException(exception, hint, this._options.attachStacktrace);
    };
    BrowserBackend2.prototype.eventFromMessage = function(message, level, hint) {
      if (level === void 0) {
        level = Severity.Info;
      }
      return eventFromMessage(message, level, hint, this._options.attachStacktrace);
    };
    BrowserBackend2.prototype._setupTransport = function() {
      if (!this._options.dsn) {
        return _super.prototype._setupTransport.call(this);
      }
      var transportOptions = __assign(__assign({}, this._options.transportOptions), { dsn: this._options.dsn, tunnel: this._options.tunnel, sendClientReports: this._options.sendClientReports, _metadata: this._options._metadata });
      var api = initAPIDetails(transportOptions.dsn, transportOptions._metadata, transportOptions.tunnel);
      var url = getEnvelopeEndpointWithUrlEncodedAuth(api.dsn, api.tunnel);
      if (this._options.transport) {
        return new this._options.transport(transportOptions);
      }
      if (supportsFetch()) {
        var requestOptions = __assign({}, transportOptions.fetchParameters);
        this._newTransport = makeNewFetchTransport({ requestOptions, url });
        return new FetchTransport(transportOptions);
      }
      this._newTransport = makeNewXHRTransport({
        url,
        headers: transportOptions.headers
      });
      return new XHRTransport(transportOptions);
    };
    return BrowserBackend2;
  }(BaseBackend);

  // ../node_modules/@sentry/browser/esm/helpers.js
  var global6 = getGlobalObject();
  var ignoreOnError = 0;
  function shouldIgnoreOnError() {
    return ignoreOnError > 0;
  }
  function ignoreNextOnError() {
    ignoreOnError += 1;
    setTimeout(function() {
      ignoreOnError -= 1;
    });
  }
  function wrap(fn, options, before) {
    if (options === void 0) {
      options = {};
    }
    if (typeof fn !== "function") {
      return fn;
    }
    try {
      var wrapper = fn.__sentry_wrapped__;
      if (wrapper) {
        return wrapper;
      }
      if (getOriginalFunction(fn)) {
        return fn;
      }
    } catch (e) {
      return fn;
    }
    var sentryWrapped = function() {
      var args = Array.prototype.slice.call(arguments);
      try {
        if (before && typeof before === "function") {
          before.apply(this, arguments);
        }
        var wrappedArguments = args.map(function(arg) {
          return wrap(arg, options);
        });
        return fn.apply(this, wrappedArguments);
      } catch (ex) {
        ignoreNextOnError();
        withScope(function(scope) {
          scope.addEventProcessor(function(event) {
            if (options.mechanism) {
              addExceptionTypeValue(event, void 0, void 0);
              addExceptionMechanism(event, options.mechanism);
            }
            event.extra = __assign(__assign({}, event.extra), { arguments: args });
            return event;
          });
          captureException(ex);
        });
        throw ex;
      }
    };
    try {
      for (var property in fn) {
        if (Object.prototype.hasOwnProperty.call(fn, property)) {
          sentryWrapped[property] = fn[property];
        }
      }
    } catch (_oO) {
    }
    markFunctionWrapped(sentryWrapped, fn);
    addNonEnumerableProperty(fn, "__sentry_wrapped__", sentryWrapped);
    try {
      var descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, "name");
      if (descriptor.configurable) {
        Object.defineProperty(sentryWrapped, "name", {
          get: function() {
            return fn.name;
          }
        });
      }
    } catch (_oO) {
    }
    return sentryWrapped;
  }
  function injectReportDialog(options) {
    if (options === void 0) {
      options = {};
    }
    if (!global6.document) {
      return;
    }
    if (!options.eventId) {
      IS_DEBUG_BUILD4 && logger.error("Missing eventId option in showReportDialog call");
      return;
    }
    if (!options.dsn) {
      IS_DEBUG_BUILD4 && logger.error("Missing dsn option in showReportDialog call");
      return;
    }
    var script = global6.document.createElement("script");
    script.async = true;
    script.src = getReportDialogEndpoint(options.dsn, options);
    if (options.onLoad) {
      script.onload = options.onLoad;
    }
    var injectionPoint = global6.document.head || global6.document.body;
    if (injectionPoint) {
      injectionPoint.appendChild(script);
    }
  }

  // ../node_modules/@sentry/browser/esm/integrations/globalhandlers.js
  var GlobalHandlers = function() {
    function GlobalHandlers2(options) {
      this.name = GlobalHandlers2.id;
      this._installFunc = {
        onerror: _installGlobalOnErrorHandler,
        onunhandledrejection: _installGlobalOnUnhandledRejectionHandler
      };
      this._options = __assign({ onerror: true, onunhandledrejection: true }, options);
    }
    GlobalHandlers2.prototype.setupOnce = function() {
      Error.stackTraceLimit = 50;
      var options = this._options;
      for (var key in options) {
        var installFunc = this._installFunc[key];
        if (installFunc && options[key]) {
          globalHandlerLog(key);
          installFunc();
          this._installFunc[key] = void 0;
        }
      }
    };
    GlobalHandlers2.id = "GlobalHandlers";
    return GlobalHandlers2;
  }();
  function _installGlobalOnErrorHandler() {
    addInstrumentationHandler(
      "error",
      function(data) {
        var _a = __read(getHubAndAttachStacktrace(), 2), hub = _a[0], attachStacktrace = _a[1];
        if (!hub.getIntegration(GlobalHandlers)) {
          return;
        }
        var msg = data.msg, url = data.url, line = data.line, column = data.column, error = data.error;
        if (shouldIgnoreOnError() || error && error.__sentry_own_request__) {
          return;
        }
        var event = error === void 0 && isString(msg) ? _eventFromIncompleteOnError(msg, url, line, column) : _enhanceEventWithInitialFrame(eventFromUnknownInput(error || msg, void 0, attachStacktrace, false), url, line, column);
        event.level = Severity.Error;
        addMechanismAndCapture(hub, error, event, "onerror");
      }
    );
  }
  function _installGlobalOnUnhandledRejectionHandler() {
    addInstrumentationHandler(
      "unhandledrejection",
      function(e) {
        var _a = __read(getHubAndAttachStacktrace(), 2), hub = _a[0], attachStacktrace = _a[1];
        if (!hub.getIntegration(GlobalHandlers)) {
          return;
        }
        var error = e;
        try {
          if ("reason" in e) {
            error = e.reason;
          } else if ("detail" in e && "reason" in e.detail) {
            error = e.detail.reason;
          }
        } catch (_oO) {
        }
        if (shouldIgnoreOnError() || error && error.__sentry_own_request__) {
          return true;
        }
        var event = isPrimitive(error) ? _eventFromRejectionWithPrimitive(error) : eventFromUnknownInput(error, void 0, attachStacktrace, true);
        event.level = Severity.Error;
        addMechanismAndCapture(hub, error, event, "onunhandledrejection");
        return;
      }
    );
  }
  function _eventFromRejectionWithPrimitive(reason) {
    return {
      exception: {
        values: [
          {
            type: "UnhandledRejection",
            value: "Non-Error promise rejection captured with value: " + String(reason)
          }
        ]
      }
    };
  }
  function _eventFromIncompleteOnError(msg, url, line, column) {
    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
    var message = isErrorEvent(msg) ? msg.message : msg;
    var name = "Error";
    var groups = message.match(ERROR_TYPES_RE);
    if (groups) {
      name = groups[1];
      message = groups[2];
    }
    var event = {
      exception: {
        values: [
          {
            type: name,
            value: message
          }
        ]
      }
    };
    return _enhanceEventWithInitialFrame(event, url, line, column);
  }
  function _enhanceEventWithInitialFrame(event, url, line, column) {
    var e = event.exception = event.exception || {};
    var ev = e.values = e.values || [];
    var ev0 = ev[0] = ev[0] || {};
    var ev0s = ev0.stacktrace = ev0.stacktrace || {};
    var ev0sf = ev0s.frames = ev0s.frames || [];
    var colno = isNaN(parseInt(column, 10)) ? void 0 : column;
    var lineno = isNaN(parseInt(line, 10)) ? void 0 : line;
    var filename = isString(url) && url.length > 0 ? url : getLocationHref();
    if (ev0sf.length === 0) {
      ev0sf.push({
        colno,
        filename,
        function: "?",
        in_app: true,
        lineno
      });
    }
    return event;
  }
  function globalHandlerLog(type) {
    IS_DEBUG_BUILD4 && logger.log("Global Handler attached: " + type);
  }
  function addMechanismAndCapture(hub, error, event, type) {
    addExceptionMechanism(event, {
      handled: false,
      type
    });
    hub.captureEvent(event, {
      originalException: error
    });
  }
  function getHubAndAttachStacktrace() {
    var hub = getCurrentHub();
    var client = hub.getClient();
    var attachStacktrace = client && client.getOptions().attachStacktrace;
    return [hub, attachStacktrace];
  }

  // ../node_modules/@sentry/browser/esm/integrations/trycatch.js
  var DEFAULT_EVENT_TARGET = [
    "EventTarget",
    "Window",
    "Node",
    "ApplicationCache",
    "AudioTrackList",
    "ChannelMergerNode",
    "CryptoOperation",
    "EventSource",
    "FileReader",
    "HTMLUnknownElement",
    "IDBDatabase",
    "IDBRequest",
    "IDBTransaction",
    "KeyOperation",
    "MediaController",
    "MessagePort",
    "ModalWindow",
    "Notification",
    "SVGElementInstance",
    "Screen",
    "TextTrack",
    "TextTrackCue",
    "TextTrackList",
    "WebSocket",
    "WebSocketWorker",
    "Worker",
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "XMLHttpRequestUpload"
  ];
  var TryCatch = function() {
    function TryCatch2(options) {
      this.name = TryCatch2.id;
      this._options = __assign({ XMLHttpRequest: true, eventTarget: true, requestAnimationFrame: true, setInterval: true, setTimeout: true }, options);
    }
    TryCatch2.prototype.setupOnce = function() {
      var global12 = getGlobalObject();
      if (this._options.setTimeout) {
        fill(global12, "setTimeout", _wrapTimeFunction);
      }
      if (this._options.setInterval) {
        fill(global12, "setInterval", _wrapTimeFunction);
      }
      if (this._options.requestAnimationFrame) {
        fill(global12, "requestAnimationFrame", _wrapRAF);
      }
      if (this._options.XMLHttpRequest && "XMLHttpRequest" in global12) {
        fill(XMLHttpRequest.prototype, "send", _wrapXHR);
      }
      var eventTargetOption = this._options.eventTarget;
      if (eventTargetOption) {
        var eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
        eventTarget.forEach(_wrapEventTarget);
      }
    };
    TryCatch2.id = "TryCatch";
    return TryCatch2;
  }();
  function _wrapTimeFunction(original) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var originalCallback = args[0];
      args[0] = wrap(originalCallback, {
        mechanism: {
          data: { function: getFunctionName(original) },
          handled: true,
          type: "instrument"
        }
      });
      return original.apply(this, args);
    };
  }
  function _wrapRAF(original) {
    return function(callback) {
      return original.apply(this, [
        wrap(callback, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: getFunctionName(original)
            },
            handled: true,
            type: "instrument"
          }
        })
      ]);
    };
  }
  function _wrapXHR(originalSend) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var xhr = this;
      var xmlHttpRequestProps = ["onload", "onerror", "onprogress", "onreadystatechange"];
      xmlHttpRequestProps.forEach(function(prop) {
        if (prop in xhr && typeof xhr[prop] === "function") {
          fill(xhr, prop, function(original) {
            var wrapOptions = {
              mechanism: {
                data: {
                  function: prop,
                  handler: getFunctionName(original)
                },
                handled: true,
                type: "instrument"
              }
            };
            var originalFunction = getOriginalFunction(original);
            if (originalFunction) {
              wrapOptions.mechanism.data.handler = getFunctionName(originalFunction);
            }
            return wrap(original, wrapOptions);
          });
        }
      });
      return originalSend.apply(this, args);
    };
  }
  function _wrapEventTarget(target) {
    var global12 = getGlobalObject();
    var proto = global12[target] && global12[target].prototype;
    if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
      return;
    }
    fill(proto, "addEventListener", function(original) {
      return function(eventName, fn, options) {
        try {
          if (typeof fn.handleEvent === "function") {
            fn.handleEvent = wrap(fn.handleEvent.bind(fn), {
              mechanism: {
                data: {
                  function: "handleEvent",
                  handler: getFunctionName(fn),
                  target
                },
                handled: true,
                type: "instrument"
              }
            });
          }
        } catch (err) {
        }
        return original.apply(this, [
          eventName,
          wrap(fn, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: getFunctionName(fn),
                target
              },
              handled: true,
              type: "instrument"
            }
          }),
          options
        ]);
      };
    });
    fill(proto, "removeEventListener", function(originalRemoveEventListener) {
      return function(eventName, fn, options) {
        var wrappedEventHandler = fn;
        try {
          var originalEventHandler = wrappedEventHandler && wrappedEventHandler.__sentry_wrapped__;
          if (originalEventHandler) {
            originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
          }
        } catch (e) {
        }
        return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
      };
    });
  }

  // ../node_modules/@sentry/browser/esm/integrations/breadcrumbs.js
  var Breadcrumbs = function() {
    function Breadcrumbs2(options) {
      this.name = Breadcrumbs2.id;
      this._options = __assign({ console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, options);
    }
    Breadcrumbs2.prototype.addSentryBreadcrumb = function(event) {
      if (!this._options.sentry) {
        return;
      }
      getCurrentHub().addBreadcrumb({
        category: "sentry." + (event.type === "transaction" ? "transaction" : "event"),
        event_id: event.event_id,
        level: event.level,
        message: getEventDescription(event)
      }, {
        event
      });
    };
    Breadcrumbs2.prototype.setupOnce = function() {
      if (this._options.console) {
        addInstrumentationHandler("console", _consoleBreadcrumb);
      }
      if (this._options.dom) {
        addInstrumentationHandler("dom", _domBreadcrumb(this._options.dom));
      }
      if (this._options.xhr) {
        addInstrumentationHandler("xhr", _xhrBreadcrumb);
      }
      if (this._options.fetch) {
        addInstrumentationHandler("fetch", _fetchBreadcrumb);
      }
      if (this._options.history) {
        addInstrumentationHandler("history", _historyBreadcrumb);
      }
    };
    Breadcrumbs2.id = "Breadcrumbs";
    return Breadcrumbs2;
  }();
  function _domBreadcrumb(dom) {
    function _innerDomBreadcrumb(handlerData) {
      var target;
      var keyAttrs = typeof dom === "object" ? dom.serializeAttribute : void 0;
      if (typeof keyAttrs === "string") {
        keyAttrs = [keyAttrs];
      }
      try {
        target = handlerData.event.target ? htmlTreeAsString(handlerData.event.target, keyAttrs) : htmlTreeAsString(handlerData.event, keyAttrs);
      } catch (e) {
        target = "<unknown>";
      }
      if (target.length === 0) {
        return;
      }
      getCurrentHub().addBreadcrumb({
        category: "ui." + handlerData.name,
        message: target
      }, {
        event: handlerData.event,
        name: handlerData.name,
        global: handlerData.global
      });
    }
    return _innerDomBreadcrumb;
  }
  function _consoleBreadcrumb(handlerData) {
    var breadcrumb = {
      category: "console",
      data: {
        arguments: handlerData.args,
        logger: "console"
      },
      level: severityFromString(handlerData.level),
      message: safeJoin(handlerData.args, " ")
    };
    if (handlerData.level === "assert") {
      if (handlerData.args[0] === false) {
        breadcrumb.message = "Assertion failed: " + (safeJoin(handlerData.args.slice(1), " ") || "console.assert");
        breadcrumb.data.arguments = handlerData.args.slice(1);
      } else {
        return;
      }
    }
    getCurrentHub().addBreadcrumb(breadcrumb, {
      input: handlerData.args,
      level: handlerData.level
    });
  }
  function _xhrBreadcrumb(handlerData) {
    if (handlerData.endTimestamp) {
      if (handlerData.xhr.__sentry_own_request__) {
        return;
      }
      var _a = handlerData.xhr.__sentry_xhr__ || {}, method = _a.method, url = _a.url, status_code = _a.status_code, body = _a.body;
      getCurrentHub().addBreadcrumb({
        category: "xhr",
        data: {
          method,
          url,
          status_code
        },
        type: "http"
      }, {
        xhr: handlerData.xhr,
        input: body
      });
      return;
    }
  }
  function _fetchBreadcrumb(handlerData) {
    if (!handlerData.endTimestamp) {
      return;
    }
    if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === "POST") {
      return;
    }
    if (handlerData.error) {
      getCurrentHub().addBreadcrumb({
        category: "fetch",
        data: handlerData.fetchData,
        level: Severity.Error,
        type: "http"
      }, {
        data: handlerData.error,
        input: handlerData.args
      });
    } else {
      getCurrentHub().addBreadcrumb({
        category: "fetch",
        data: __assign(__assign({}, handlerData.fetchData), { status_code: handlerData.response.status }),
        type: "http"
      }, {
        input: handlerData.args,
        response: handlerData.response
      });
    }
  }
  function _historyBreadcrumb(handlerData) {
    var global12 = getGlobalObject();
    var from = handlerData.from;
    var to = handlerData.to;
    var parsedLoc = parseUrl(global12.location.href);
    var parsedFrom = parseUrl(from);
    var parsedTo = parseUrl(to);
    if (!parsedFrom.path) {
      parsedFrom = parsedLoc;
    }
    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
      to = parsedTo.relative;
    }
    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
      from = parsedFrom.relative;
    }
    getCurrentHub().addBreadcrumb({
      category: "navigation",
      data: {
        from,
        to
      }
    });
  }

  // ../node_modules/@sentry/browser/esm/integrations/linkederrors.js
  var DEFAULT_KEY = "cause";
  var DEFAULT_LIMIT = 5;
  var LinkedErrors = function() {
    function LinkedErrors2(options) {
      if (options === void 0) {
        options = {};
      }
      this.name = LinkedErrors2.id;
      this._key = options.key || DEFAULT_KEY;
      this._limit = options.limit || DEFAULT_LIMIT;
    }
    LinkedErrors2.prototype.setupOnce = function() {
      addGlobalEventProcessor(function(event, hint) {
        var self2 = getCurrentHub().getIntegration(LinkedErrors2);
        return self2 ? _handler(self2._key, self2._limit, event, hint) : event;
      });
    };
    LinkedErrors2.id = "LinkedErrors";
    return LinkedErrors2;
  }();
  function _handler(key, limit, event, hint) {
    if (!event.exception || !event.exception.values || !hint || !isInstanceOf(hint.originalException, Error)) {
      return event;
    }
    var linkedErrors = _walkErrorTree(limit, hint.originalException, key);
    event.exception.values = __spread(linkedErrors, event.exception.values);
    return event;
  }
  function _walkErrorTree(limit, error, key, stack) {
    if (stack === void 0) {
      stack = [];
    }
    if (!isInstanceOf(error[key], Error) || stack.length + 1 >= limit) {
      return stack;
    }
    var exception = exceptionFromError(error[key]);
    return _walkErrorTree(limit, error[key], key, __spread([exception], stack));
  }

  // ../node_modules/@sentry/browser/esm/integrations/useragent.js
  var global7 = getGlobalObject();
  var UserAgent = function() {
    function UserAgent2() {
      this.name = UserAgent2.id;
    }
    UserAgent2.prototype.setupOnce = function() {
      addGlobalEventProcessor(function(event) {
        if (getCurrentHub().getIntegration(UserAgent2)) {
          if (!global7.navigator && !global7.location && !global7.document) {
            return event;
          }
          var url = event.request && event.request.url || global7.location && global7.location.href;
          var referrer = (global7.document || {}).referrer;
          var userAgent = (global7.navigator || {}).userAgent;
          var headers = __assign(__assign(__assign({}, event.request && event.request.headers), referrer && { Referer: referrer }), userAgent && { "User-Agent": userAgent });
          var request = __assign(__assign({}, url && { url }), { headers });
          return __assign(__assign({}, event), { request });
        }
        return event;
      });
    };
    UserAgent2.id = "UserAgent";
    return UserAgent2;
  }();

  // ../node_modules/@sentry/browser/esm/integrations/dedupe.js
  var Dedupe = function() {
    function Dedupe2() {
      this.name = Dedupe2.id;
    }
    Dedupe2.prototype.setupOnce = function(addGlobalEventProcessor2, getCurrentHub2) {
      addGlobalEventProcessor2(function(currentEvent) {
        var self2 = getCurrentHub2().getIntegration(Dedupe2);
        if (self2) {
          try {
            if (_shouldDropEvent2(currentEvent, self2._previousEvent)) {
              IS_DEBUG_BUILD4 && logger.warn("Event dropped due to being a duplicate of previously captured event.");
              return null;
            }
          } catch (_oO) {
            return self2._previousEvent = currentEvent;
          }
          return self2._previousEvent = currentEvent;
        }
        return currentEvent;
      });
    };
    Dedupe2.id = "Dedupe";
    return Dedupe2;
  }();
  function _shouldDropEvent2(currentEvent, previousEvent) {
    if (!previousEvent) {
      return false;
    }
    if (_isSameMessageEvent(currentEvent, previousEvent)) {
      return true;
    }
    if (_isSameExceptionEvent(currentEvent, previousEvent)) {
      return true;
    }
    return false;
  }
  function _isSameMessageEvent(currentEvent, previousEvent) {
    var currentMessage = currentEvent.message;
    var previousMessage = previousEvent.message;
    if (!currentMessage && !previousMessage) {
      return false;
    }
    if (currentMessage && !previousMessage || !currentMessage && previousMessage) {
      return false;
    }
    if (currentMessage !== previousMessage) {
      return false;
    }
    if (!_isSameFingerprint(currentEvent, previousEvent)) {
      return false;
    }
    if (!_isSameStacktrace(currentEvent, previousEvent)) {
      return false;
    }
    return true;
  }
  function _isSameExceptionEvent(currentEvent, previousEvent) {
    var previousException = _getExceptionFromEvent(previousEvent);
    var currentException = _getExceptionFromEvent(currentEvent);
    if (!previousException || !currentException) {
      return false;
    }
    if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
      return false;
    }
    if (!_isSameFingerprint(currentEvent, previousEvent)) {
      return false;
    }
    if (!_isSameStacktrace(currentEvent, previousEvent)) {
      return false;
    }
    return true;
  }
  function _isSameStacktrace(currentEvent, previousEvent) {
    var currentFrames = _getFramesFromEvent(currentEvent);
    var previousFrames = _getFramesFromEvent(previousEvent);
    if (!currentFrames && !previousFrames) {
      return true;
    }
    if (currentFrames && !previousFrames || !currentFrames && previousFrames) {
      return false;
    }
    currentFrames = currentFrames;
    previousFrames = previousFrames;
    if (previousFrames.length !== currentFrames.length) {
      return false;
    }
    for (var i = 0; i < previousFrames.length; i++) {
      var frameA = previousFrames[i];
      var frameB = currentFrames[i];
      if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) {
        return false;
      }
    }
    return true;
  }
  function _isSameFingerprint(currentEvent, previousEvent) {
    var currentFingerprint = currentEvent.fingerprint;
    var previousFingerprint = previousEvent.fingerprint;
    if (!currentFingerprint && !previousFingerprint) {
      return true;
    }
    if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) {
      return false;
    }
    currentFingerprint = currentFingerprint;
    previousFingerprint = previousFingerprint;
    try {
      return !!(currentFingerprint.join("") === previousFingerprint.join(""));
    } catch (_oO) {
      return false;
    }
  }
  function _getExceptionFromEvent(event) {
    return event.exception && event.exception.values && event.exception.values[0];
  }
  function _getFramesFromEvent(event) {
    var exception = event.exception;
    if (exception) {
      try {
        return exception.values[0].stacktrace.frames;
      } catch (_oO) {
        return void 0;
      }
    } else if (event.stacktrace) {
      return event.stacktrace.frames;
    }
    return void 0;
  }

  // ../node_modules/@sentry/browser/esm/client.js
  var BrowserClient = function(_super) {
    __extends(BrowserClient2, _super);
    function BrowserClient2(options) {
      if (options === void 0) {
        options = {};
      }
      var _this = this;
      options._metadata = options._metadata || {};
      options._metadata.sdk = options._metadata.sdk || {
        name: "sentry.javascript.browser",
        packages: [
          {
            name: "npm:@sentry/browser",
            version: SDK_VERSION
          }
        ],
        version: SDK_VERSION
      };
      _this = _super.call(this, BrowserBackend, options) || this;
      return _this;
    }
    BrowserClient2.prototype.showReportDialog = function(options) {
      if (options === void 0) {
        options = {};
      }
      var document2 = getGlobalObject().document;
      if (!document2) {
        return;
      }
      if (!this._isEnabled()) {
        IS_DEBUG_BUILD4 && logger.error("Trying to call showReportDialog with Sentry Client disabled");
        return;
      }
      injectReportDialog(__assign(__assign({}, options), { dsn: options.dsn || this.getDsn() }));
    };
    BrowserClient2.prototype._prepareEvent = function(event, scope, hint) {
      event.platform = event.platform || "javascript";
      return _super.prototype._prepareEvent.call(this, event, scope, hint);
    };
    BrowserClient2.prototype._sendEvent = function(event) {
      var integration = this.getIntegration(Breadcrumbs);
      if (integration) {
        integration.addSentryBreadcrumb(event);
      }
      _super.prototype._sendEvent.call(this, event);
    };
    return BrowserClient2;
  }(BaseClient);

  // ../node_modules/@sentry/browser/esm/sdk.js
  var defaultIntegrations = [
    new integrations_exports.InboundFilters(),
    new integrations_exports.FunctionToString(),
    new TryCatch(),
    new Breadcrumbs(),
    new GlobalHandlers(),
    new LinkedErrors(),
    new Dedupe(),
    new UserAgent()
  ];
  function init(options) {
    if (options === void 0) {
      options = {};
    }
    if (options.defaultIntegrations === void 0) {
      options.defaultIntegrations = defaultIntegrations;
    }
    if (options.release === void 0) {
      var window_1 = getGlobalObject();
      if (window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id) {
        options.release = window_1.SENTRY_RELEASE.id;
      }
    }
    if (options.autoSessionTracking === void 0) {
      options.autoSessionTracking = true;
    }
    if (options.sendClientReports === void 0) {
      options.sendClientReports = true;
    }
    initAndBind(BrowserClient, options);
    if (options.autoSessionTracking) {
      startSessionTracking();
    }
  }
  function close(timeout) {
    var client = getCurrentHub().getClient();
    if (client) {
      return client.close(timeout);
    }
    IS_DEBUG_BUILD4 && logger.warn("Cannot flush events and disable SDK. No client defined.");
    return resolvedSyncPromise(false);
  }
  function startSessionOnHub(hub) {
    hub.startSession({ ignoreDuration: true });
    hub.captureSession();
  }
  function startSessionTracking() {
    var window2 = getGlobalObject();
    var document2 = window2.document;
    if (typeof document2 === "undefined") {
      IS_DEBUG_BUILD4 && logger.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
      return;
    }
    var hub = getCurrentHub();
    if (!hub.captureSession) {
      return;
    }
    startSessionOnHub(hub);
    addInstrumentationHandler("history", function(_a) {
      var from = _a.from, to = _a.to;
      if (!(from === void 0 || from === to)) {
        startSessionOnHub(getCurrentHub());
      }
    });
  }

  // ../node_modules/@sentry/tracing/node_modules/tslib/modules/index.js
  var import_tslib39 = __toESM(require_tslib6(), 1);
  var {
    __extends: __extends6,
    __assign: __assign6,
    __rest: __rest6,
    __decorate: __decorate6,
    __param: __param6,
    __metadata: __metadata6,
    __awaiter: __awaiter6,
    __generator: __generator6,
    __exportStar: __exportStar6,
    __createBinding: __createBinding6,
    __values: __values6,
    __read: __read6,
    __spread: __spread6,
    __spreadArrays: __spreadArrays6,
    __await: __await6,
    __asyncGenerator: __asyncGenerator6,
    __asyncDelegator: __asyncDelegator6,
    __asyncValues: __asyncValues6,
    __makeTemplateObject: __makeTemplateObject6,
    __importStar: __importStar6,
    __importDefault: __importDefault6,
    __classPrivateFieldGet: __classPrivateFieldGet6,
    __classPrivateFieldSet: __classPrivateFieldSet6
  } = import_tslib39.default;

  // ../node_modules/@sentry/tracing/esm/flags.js
  var IS_DEBUG_BUILD5 = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;

  // ../node_modules/@sentry/tracing/esm/utils.js
  function hasTracingEnabled(maybeOptions) {
    var client = getCurrentHub().getClient();
    var options = maybeOptions || client && client.getOptions();
    return !!options && ("tracesSampleRate" in options || "tracesSampler" in options);
  }
  function getActiveTransaction(maybeHub) {
    var hub = maybeHub || getCurrentHub();
    var scope = hub.getScope();
    return scope && scope.getTransaction();
  }
  function msToSec(time) {
    return time / 1e3;
  }
  function secToMs(time) {
    return time * 1e3;
  }

  // ../node_modules/@sentry/tracing/esm/errors.js
  function registerErrorInstrumentation() {
    addInstrumentationHandler("error", errorCallback);
    addInstrumentationHandler("unhandledrejection", errorCallback);
  }
  function errorCallback() {
    var activeTransaction = getActiveTransaction();
    if (activeTransaction) {
      var status_1 = "internal_error";
      IS_DEBUG_BUILD5 && logger.log("[Tracing] Transaction: " + status_1 + " -> Global error occured");
      activeTransaction.setStatus(status_1);
    }
  }

  // ../node_modules/@sentry/tracing/esm/constants.js
  var FINISH_REASON_TAG = "finishReason";
  var IDLE_TRANSACTION_FINISH_REASONS = ["heartbeatFailed", "idleTimeout", "documentHidden"];

  // ../node_modules/@sentry/tracing/esm/span.js
  var SpanRecorder = function() {
    function SpanRecorder2(maxlen) {
      if (maxlen === void 0) {
        maxlen = 1e3;
      }
      this.spans = [];
      this._maxlen = maxlen;
    }
    SpanRecorder2.prototype.add = function(span) {
      if (this.spans.length > this._maxlen) {
        span.spanRecorder = void 0;
      } else {
        this.spans.push(span);
      }
    };
    return SpanRecorder2;
  }();
  var Span = function() {
    function Span2(spanContext) {
      this.traceId = uuid4();
      this.spanId = uuid4().substring(16);
      this.startTimestamp = timestampWithMs();
      this.tags = {};
      this.data = {};
      if (!spanContext) {
        return this;
      }
      if (spanContext.traceId) {
        this.traceId = spanContext.traceId;
      }
      if (spanContext.spanId) {
        this.spanId = spanContext.spanId;
      }
      if (spanContext.parentSpanId) {
        this.parentSpanId = spanContext.parentSpanId;
      }
      if ("sampled" in spanContext) {
        this.sampled = spanContext.sampled;
      }
      if (spanContext.op) {
        this.op = spanContext.op;
      }
      if (spanContext.description) {
        this.description = spanContext.description;
      }
      if (spanContext.data) {
        this.data = spanContext.data;
      }
      if (spanContext.tags) {
        this.tags = spanContext.tags;
      }
      if (spanContext.status) {
        this.status = spanContext.status;
      }
      if (spanContext.startTimestamp) {
        this.startTimestamp = spanContext.startTimestamp;
      }
      if (spanContext.endTimestamp) {
        this.endTimestamp = spanContext.endTimestamp;
      }
    }
    Span2.prototype.child = function(spanContext) {
      return this.startChild(spanContext);
    };
    Span2.prototype.startChild = function(spanContext) {
      var childSpan = new Span2(__assign6(__assign6({}, spanContext), { parentSpanId: this.spanId, sampled: this.sampled, traceId: this.traceId }));
      childSpan.spanRecorder = this.spanRecorder;
      if (childSpan.spanRecorder) {
        childSpan.spanRecorder.add(childSpan);
      }
      childSpan.transaction = this.transaction;
      return childSpan;
    };
    Span2.prototype.setTag = function(key, value) {
      var _a;
      this.tags = __assign6(__assign6({}, this.tags), (_a = {}, _a[key] = value, _a));
      return this;
    };
    Span2.prototype.setData = function(key, value) {
      var _a;
      this.data = __assign6(__assign6({}, this.data), (_a = {}, _a[key] = value, _a));
      return this;
    };
    Span2.prototype.setStatus = function(value) {
      this.status = value;
      return this;
    };
    Span2.prototype.setHttpStatus = function(httpStatus) {
      this.setTag("http.status_code", String(httpStatus));
      var spanStatus = spanStatusfromHttpCode(httpStatus);
      if (spanStatus !== "unknown_error") {
        this.setStatus(spanStatus);
      }
      return this;
    };
    Span2.prototype.isSuccess = function() {
      return this.status === "ok";
    };
    Span2.prototype.finish = function(endTimestamp) {
      this.endTimestamp = typeof endTimestamp === "number" ? endTimestamp : timestampWithMs();
    };
    Span2.prototype.toTraceparent = function() {
      var sampledString = "";
      if (this.sampled !== void 0) {
        sampledString = this.sampled ? "-1" : "-0";
      }
      return this.traceId + "-" + this.spanId + sampledString;
    };
    Span2.prototype.toContext = function() {
      return dropUndefinedKeys({
        data: this.data,
        description: this.description,
        endTimestamp: this.endTimestamp,
        op: this.op,
        parentSpanId: this.parentSpanId,
        sampled: this.sampled,
        spanId: this.spanId,
        startTimestamp: this.startTimestamp,
        status: this.status,
        tags: this.tags,
        traceId: this.traceId
      });
    };
    Span2.prototype.updateWithContext = function(spanContext) {
      var _a, _b, _c, _d, _e;
      this.data = (_a = spanContext.data, _a !== null && _a !== void 0 ? _a : {});
      this.description = spanContext.description;
      this.endTimestamp = spanContext.endTimestamp;
      this.op = spanContext.op;
      this.parentSpanId = spanContext.parentSpanId;
      this.sampled = spanContext.sampled;
      this.spanId = (_b = spanContext.spanId, _b !== null && _b !== void 0 ? _b : this.spanId);
      this.startTimestamp = (_c = spanContext.startTimestamp, _c !== null && _c !== void 0 ? _c : this.startTimestamp);
      this.status = spanContext.status;
      this.tags = (_d = spanContext.tags, _d !== null && _d !== void 0 ? _d : {});
      this.traceId = (_e = spanContext.traceId, _e !== null && _e !== void 0 ? _e : this.traceId);
      return this;
    };
    Span2.prototype.getTraceContext = function() {
      return dropUndefinedKeys({
        data: Object.keys(this.data).length > 0 ? this.data : void 0,
        description: this.description,
        op: this.op,
        parent_span_id: this.parentSpanId,
        span_id: this.spanId,
        status: this.status,
        tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
        trace_id: this.traceId
      });
    };
    Span2.prototype.toJSON = function() {
      return dropUndefinedKeys({
        data: Object.keys(this.data).length > 0 ? this.data : void 0,
        description: this.description,
        op: this.op,
        parent_span_id: this.parentSpanId,
        span_id: this.spanId,
        start_timestamp: this.startTimestamp,
        status: this.status,
        tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
        timestamp: this.endTimestamp,
        trace_id: this.traceId
      });
    };
    return Span2;
  }();
  function spanStatusfromHttpCode(httpStatus) {
    if (httpStatus < 400 && httpStatus >= 100) {
      return "ok";
    }
    if (httpStatus >= 400 && httpStatus < 500) {
      switch (httpStatus) {
        case 401:
          return "unauthenticated";
        case 403:
          return "permission_denied";
        case 404:
          return "not_found";
        case 409:
          return "already_exists";
        case 413:
          return "failed_precondition";
        case 429:
          return "resource_exhausted";
        default:
          return "invalid_argument";
      }
    }
    if (httpStatus >= 500 && httpStatus < 600) {
      switch (httpStatus) {
        case 501:
          return "unimplemented";
        case 503:
          return "unavailable";
        case 504:
          return "deadline_exceeded";
        default:
          return "internal_error";
      }
    }
    return "unknown_error";
  }

  // ../node_modules/@sentry/tracing/esm/transaction.js
  var Transaction = function(_super) {
    __extends6(Transaction2, _super);
    function Transaction2(transactionContext, hub) {
      var _this = _super.call(this, transactionContext) || this;
      _this._measurements = {};
      _this._hub = getCurrentHub();
      if (isInstanceOf(hub, Hub)) {
        _this._hub = hub;
      }
      _this.name = transactionContext.name || "";
      _this.metadata = transactionContext.metadata || {};
      _this._trimEnd = transactionContext.trimEnd;
      _this.transaction = _this;
      return _this;
    }
    Transaction2.prototype.setName = function(name) {
      this.name = name;
    };
    Transaction2.prototype.initSpanRecorder = function(maxlen) {
      if (maxlen === void 0) {
        maxlen = 1e3;
      }
      if (!this.spanRecorder) {
        this.spanRecorder = new SpanRecorder(maxlen);
      }
      this.spanRecorder.add(this);
    };
    Transaction2.prototype.setMeasurements = function(measurements) {
      this._measurements = __assign6({}, measurements);
    };
    Transaction2.prototype.setMetadata = function(newMetadata) {
      this.metadata = __assign6(__assign6({}, this.metadata), newMetadata);
    };
    Transaction2.prototype.finish = function(endTimestamp) {
      var _this = this;
      if (this.endTimestamp !== void 0) {
        return void 0;
      }
      if (!this.name) {
        IS_DEBUG_BUILD5 && logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
        this.name = "<unlabeled transaction>";
      }
      _super.prototype.finish.call(this, endTimestamp);
      if (this.sampled !== true) {
        IS_DEBUG_BUILD5 && logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
        var client = this._hub.getClient();
        var transport = client && client.getTransport && client.getTransport();
        if (transport && transport.recordLostEvent) {
          transport.recordLostEvent("sample_rate", "transaction");
        }
        return void 0;
      }
      var finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter(function(s) {
        return s !== _this && s.endTimestamp;
      }) : [];
      if (this._trimEnd && finishedSpans.length > 0) {
        this.endTimestamp = finishedSpans.reduce(function(prev, current) {
          if (prev.endTimestamp && current.endTimestamp) {
            return prev.endTimestamp > current.endTimestamp ? prev : current;
          }
          return prev;
        }).endTimestamp;
      }
      var transaction = {
        contexts: {
          trace: this.getTraceContext()
        },
        spans: finishedSpans,
        start_timestamp: this.startTimestamp,
        tags: this.tags,
        timestamp: this.endTimestamp,
        transaction: this.name,
        type: "transaction",
        sdkProcessingMetadata: this.metadata
      };
      var hasMeasurements = Object.keys(this._measurements).length > 0;
      if (hasMeasurements) {
        IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2));
        transaction.measurements = this._measurements;
      }
      IS_DEBUG_BUILD5 && logger.log("[Tracing] Finishing " + this.op + " transaction: " + this.name + ".");
      return this._hub.captureEvent(transaction);
    };
    Transaction2.prototype.toContext = function() {
      var spanContext = _super.prototype.toContext.call(this);
      return dropUndefinedKeys(__assign6(__assign6({}, spanContext), { name: this.name, trimEnd: this._trimEnd }));
    };
    Transaction2.prototype.updateWithContext = function(transactionContext) {
      var _a;
      _super.prototype.updateWithContext.call(this, transactionContext);
      this.name = (_a = transactionContext.name, _a !== null && _a !== void 0 ? _a : "");
      this._trimEnd = transactionContext.trimEnd;
      return this;
    };
    return Transaction2;
  }(Span);

  // ../node_modules/@sentry/tracing/esm/idletransaction.js
  var DEFAULT_IDLE_TIMEOUT = 1e3;
  var HEARTBEAT_INTERVAL = 5e3;
  var IdleTransactionSpanRecorder = function(_super) {
    __extends6(IdleTransactionSpanRecorder2, _super);
    function IdleTransactionSpanRecorder2(_pushActivity, _popActivity, transactionSpanId, maxlen) {
      if (transactionSpanId === void 0) {
        transactionSpanId = "";
      }
      var _this = _super.call(this, maxlen) || this;
      _this._pushActivity = _pushActivity;
      _this._popActivity = _popActivity;
      _this.transactionSpanId = transactionSpanId;
      return _this;
    }
    IdleTransactionSpanRecorder2.prototype.add = function(span) {
      var _this = this;
      if (span.spanId !== this.transactionSpanId) {
        span.finish = function(endTimestamp) {
          span.endTimestamp = typeof endTimestamp === "number" ? endTimestamp : timestampWithMs();
          _this._popActivity(span.spanId);
        };
        if (span.endTimestamp === void 0) {
          this._pushActivity(span.spanId);
        }
      }
      _super.prototype.add.call(this, span);
    };
    return IdleTransactionSpanRecorder2;
  }(SpanRecorder);
  var IdleTransaction = function(_super) {
    __extends6(IdleTransaction2, _super);
    function IdleTransaction2(transactionContext, _idleHub, _idleTimeout, _onScope) {
      if (_idleTimeout === void 0) {
        _idleTimeout = DEFAULT_IDLE_TIMEOUT;
      }
      if (_onScope === void 0) {
        _onScope = false;
      }
      var _this = _super.call(this, transactionContext, _idleHub) || this;
      _this._idleHub = _idleHub;
      _this._idleTimeout = _idleTimeout;
      _this._onScope = _onScope;
      _this.activities = {};
      _this._heartbeatCounter = 0;
      _this._finished = false;
      _this._beforeFinishCallbacks = [];
      if (_idleHub && _onScope) {
        clearActiveTransaction(_idleHub);
        IS_DEBUG_BUILD5 && logger.log("Setting idle transaction on scope. Span ID: " + _this.spanId);
        _idleHub.configureScope(function(scope) {
          return scope.setSpan(_this);
        });
      }
      _this._initTimeout = setTimeout(function() {
        if (!_this._finished) {
          _this.finish();
        }
      }, _this._idleTimeout);
      return _this;
    }
    IdleTransaction2.prototype.finish = function(endTimestamp) {
      var e_1, _a;
      var _this = this;
      if (endTimestamp === void 0) {
        endTimestamp = timestampWithMs();
      }
      this._finished = true;
      this.activities = {};
      if (this.spanRecorder) {
        IS_DEBUG_BUILD5 && logger.log("[Tracing] finishing IdleTransaction", new Date(endTimestamp * 1e3).toISOString(), this.op);
        try {
          for (var _b = __values6(this._beforeFinishCallbacks), _c = _b.next(); !_c.done; _c = _b.next()) {
            var callback = _c.value;
            callback(this, endTimestamp);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        this.spanRecorder.spans = this.spanRecorder.spans.filter(function(span) {
          if (span.spanId === _this.spanId) {
            return true;
          }
          if (!span.endTimestamp) {
            span.endTimestamp = endTimestamp;
            span.setStatus("cancelled");
            IS_DEBUG_BUILD5 && logger.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(span, void 0, 2));
          }
          var keepSpan = span.startTimestamp < endTimestamp;
          if (!keepSpan) {
            IS_DEBUG_BUILD5 && logger.log("[Tracing] discarding Span since it happened after Transaction was finished", JSON.stringify(span, void 0, 2));
          }
          return keepSpan;
        });
        IS_DEBUG_BUILD5 && logger.log("[Tracing] flushing IdleTransaction");
      } else {
        IS_DEBUG_BUILD5 && logger.log("[Tracing] No active IdleTransaction");
      }
      if (this._onScope) {
        clearActiveTransaction(this._idleHub);
      }
      return _super.prototype.finish.call(this, endTimestamp);
    };
    IdleTransaction2.prototype.registerBeforeFinishCallback = function(callback) {
      this._beforeFinishCallbacks.push(callback);
    };
    IdleTransaction2.prototype.initSpanRecorder = function(maxlen) {
      var _this = this;
      if (!this.spanRecorder) {
        var pushActivity = function(id) {
          if (_this._finished) {
            return;
          }
          _this._pushActivity(id);
        };
        var popActivity = function(id) {
          if (_this._finished) {
            return;
          }
          _this._popActivity(id);
        };
        this.spanRecorder = new IdleTransactionSpanRecorder(pushActivity, popActivity, this.spanId, maxlen);
        IS_DEBUG_BUILD5 && logger.log("Starting heartbeat");
        this._pingHeartbeat();
      }
      this.spanRecorder.add(this);
    };
    IdleTransaction2.prototype._pushActivity = function(spanId) {
      if (this._initTimeout) {
        clearTimeout(this._initTimeout);
        this._initTimeout = void 0;
      }
      IS_DEBUG_BUILD5 && logger.log("[Tracing] pushActivity: " + spanId);
      this.activities[spanId] = true;
      IS_DEBUG_BUILD5 && logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
    };
    IdleTransaction2.prototype._popActivity = function(spanId) {
      var _this = this;
      if (this.activities[spanId]) {
        IS_DEBUG_BUILD5 && logger.log("[Tracing] popActivity " + spanId);
        delete this.activities[spanId];
        IS_DEBUG_BUILD5 && logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
      }
      if (Object.keys(this.activities).length === 0) {
        var timeout = this._idleTimeout;
        var end_1 = timestampWithMs() + timeout / 1e3;
        setTimeout(function() {
          if (!_this._finished) {
            _this.setTag(FINISH_REASON_TAG, IDLE_TRANSACTION_FINISH_REASONS[1]);
            _this.finish(end_1);
          }
        }, timeout);
      }
    };
    IdleTransaction2.prototype._beat = function() {
      if (this._finished) {
        return;
      }
      var heartbeatString = Object.keys(this.activities).join("");
      if (heartbeatString === this._prevHeartbeatString) {
        this._heartbeatCounter += 1;
      } else {
        this._heartbeatCounter = 1;
      }
      this._prevHeartbeatString = heartbeatString;
      if (this._heartbeatCounter >= 3) {
        IS_DEBUG_BUILD5 && logger.log("[Tracing] Transaction finished because of no change for 3 heart beats");
        this.setStatus("deadline_exceeded");
        this.setTag(FINISH_REASON_TAG, IDLE_TRANSACTION_FINISH_REASONS[0]);
        this.finish();
      } else {
        this._pingHeartbeat();
      }
    };
    IdleTransaction2.prototype._pingHeartbeat = function() {
      var _this = this;
      IS_DEBUG_BUILD5 && logger.log("pinging Heartbeat -> current counter: " + this._heartbeatCounter);
      setTimeout(function() {
        _this._beat();
      }, HEARTBEAT_INTERVAL);
    };
    return IdleTransaction2;
  }(Transaction);
  function clearActiveTransaction(hub) {
    if (hub) {
      var scope = hub.getScope();
      if (scope) {
        var transaction = scope.getTransaction();
        if (transaction) {
          scope.setSpan(void 0);
        }
      }
    }
  }

  // ../node_modules/@sentry/tracing/esm/hubextensions.js
  function traceHeaders() {
    var scope = this.getScope();
    if (scope) {
      var span = scope.getSpan();
      if (span) {
        return {
          "sentry-trace": span.toTraceparent()
        };
      }
    }
    return {};
  }
  function sample(transaction, options, samplingContext) {
    if (!hasTracingEnabled(options)) {
      transaction.sampled = false;
      return transaction;
    }
    if (transaction.sampled !== void 0) {
      transaction.setMetadata({
        transactionSampling: { method: "explicitly_set" }
      });
      return transaction;
    }
    var sampleRate;
    if (typeof options.tracesSampler === "function") {
      sampleRate = options.tracesSampler(samplingContext);
      transaction.setMetadata({
        transactionSampling: {
          method: "client_sampler",
          rate: Number(sampleRate)
        }
      });
    } else if (samplingContext.parentSampled !== void 0) {
      sampleRate = samplingContext.parentSampled;
      transaction.setMetadata({
        transactionSampling: { method: "inheritance" }
      });
    } else {
      sampleRate = options.tracesSampleRate;
      transaction.setMetadata({
        transactionSampling: {
          method: "client_rate",
          rate: Number(sampleRate)
        }
      });
    }
    if (!isValidSampleRate(sampleRate)) {
      IS_DEBUG_BUILD5 && logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
      transaction.sampled = false;
      return transaction;
    }
    if (!sampleRate) {
      IS_DEBUG_BUILD5 && logger.log("[Tracing] Discarding transaction because " + (typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"));
      transaction.sampled = false;
      return transaction;
    }
    transaction.sampled = Math.random() < sampleRate;
    if (!transaction.sampled) {
      IS_DEBUG_BUILD5 && logger.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " + Number(sampleRate) + ")");
      return transaction;
    }
    IS_DEBUG_BUILD5 && logger.log("[Tracing] starting " + transaction.op + " transaction - " + transaction.name);
    return transaction;
  }
  function isValidSampleRate(rate) {
    if (isNaN2(rate) || !(typeof rate === "number" || typeof rate === "boolean")) {
      IS_DEBUG_BUILD5 && logger.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " + JSON.stringify(rate) + " of type " + JSON.stringify(typeof rate) + ".");
      return false;
    }
    if (rate < 0 || rate > 1) {
      IS_DEBUG_BUILD5 && logger.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " + rate + ".");
      return false;
    }
    return true;
  }
  function _startTransaction(transactionContext, customSamplingContext) {
    var client = this.getClient();
    var options = client && client.getOptions() || {};
    var transaction = new Transaction(transactionContext, this);
    transaction = sample(transaction, options, __assign6({ parentSampled: transactionContext.parentSampled, transactionContext }, customSamplingContext));
    if (transaction.sampled) {
      transaction.initSpanRecorder(options._experiments && options._experiments.maxSpans);
    }
    return transaction;
  }
  function startIdleTransaction(hub, transactionContext, idleTimeout, onScope, customSamplingContext) {
    var client = hub.getClient();
    var options = client && client.getOptions() || {};
    var transaction = new IdleTransaction(transactionContext, hub, idleTimeout, onScope);
    transaction = sample(transaction, options, __assign6({ parentSampled: transactionContext.parentSampled, transactionContext }, customSamplingContext));
    if (transaction.sampled) {
      transaction.initSpanRecorder(options._experiments && options._experiments.maxSpans);
    }
    return transaction;
  }
  function _addTracingExtensions() {
    var carrier = getMainCarrier();
    if (!carrier.__SENTRY__) {
      return;
    }
    carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
    if (!carrier.__SENTRY__.extensions.startTransaction) {
      carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
    }
    if (!carrier.__SENTRY__.extensions.traceHeaders) {
      carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
    }
  }
  function _autoloadDatabaseIntegrations() {
    var carrier = getMainCarrier();
    if (!carrier.__SENTRY__) {
      return;
    }
    var packageToIntegrationMapping = {
      mongodb: function() {
        var integration = dynamicRequire(module, "./integrations/node/mongo");
        return new integration.Mongo();
      },
      mongoose: function() {
        var integration = dynamicRequire(module, "./integrations/node/mongo");
        return new integration.Mongo({ mongoose: true });
      },
      mysql: function() {
        var integration = dynamicRequire(module, "./integrations/node/mysql");
        return new integration.Mysql();
      },
      pg: function() {
        var integration = dynamicRequire(module, "./integrations/node/postgres");
        return new integration.Postgres();
      }
    };
    var mappedPackages = Object.keys(packageToIntegrationMapping).filter(function(moduleName) {
      return !!loadModule(moduleName);
    }).map(function(pkg) {
      try {
        return packageToIntegrationMapping[pkg]();
      } catch (e) {
        return void 0;
      }
    }).filter(function(p) {
      return p;
    });
    if (mappedPackages.length > 0) {
      carrier.__SENTRY__.integrations = __spread6(carrier.__SENTRY__.integrations || [], mappedPackages);
    }
  }
  function addExtensionMethods() {
    _addTracingExtensions();
    if (isNodeEnv()) {
      _autoloadDatabaseIntegrations();
    }
    registerErrorInstrumentation();
  }

  // ../node_modules/@sentry/tracing/esm/browser/backgroundtab.js
  var global8 = getGlobalObject();
  function registerBackgroundTabDetection() {
    if (global8 && global8.document) {
      global8.document.addEventListener("visibilitychange", function() {
        var activeTransaction = getActiveTransaction();
        if (global8.document.hidden && activeTransaction) {
          var statusType = "cancelled";
          IS_DEBUG_BUILD5 && logger.log("[Tracing] Transaction: " + statusType + " -> since tab moved to the background, op: " + activeTransaction.op);
          if (!activeTransaction.status) {
            activeTransaction.setStatus(statusType);
          }
          activeTransaction.setTag("visibilitychange", "document.hidden");
          activeTransaction.setTag(FINISH_REASON_TAG, IDLE_TRANSACTION_FINISH_REASONS[2]);
          activeTransaction.finish();
        }
      });
    } else {
      IS_DEBUG_BUILD5 && logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
    }
  }

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/lib/bindReporter.js
  var bindReporter = function(callback, metric, reportAllChanges) {
    var prevValue;
    return function(forceReport) {
      if (metric.value >= 0) {
        if (forceReport || reportAllChanges) {
          metric.delta = metric.value - (prevValue || 0);
          if (metric.delta || prevValue === void 0) {
            prevValue = metric.value;
            callback(metric);
          }
        }
      }
    };
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/lib/generateUniqueID.js
  var generateUniqueID = function() {
    return "v2-" + Date.now() + "-" + (Math.floor(Math.random() * (9e12 - 1)) + 1e12);
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/lib/initMetric.js
  var initMetric = function(name, value) {
    return {
      name,
      value: value !== null && value !== void 0 ? value : -1,
      delta: 0,
      entries: [],
      id: generateUniqueID()
    };
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/lib/observe.js
  var observe = function(type, callback) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(type)) {
        if (type === "first-input" && !("PerformanceEventTiming" in self)) {
          return;
        }
        var po = new PerformanceObserver(function(l) {
          return l.getEntries().map(callback);
        });
        po.observe({ type, buffered: true });
        return po;
      }
    } catch (e) {
    }
    return;
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/lib/onHidden.js
  var onHidden = function(cb, once) {
    var onHiddenOrPageHide = function(event) {
      if (event.type === "pagehide" || getGlobalObject().document.visibilityState === "hidden") {
        cb(event);
        if (once) {
          removeEventListener("visibilitychange", onHiddenOrPageHide, true);
          removeEventListener("pagehide", onHiddenOrPageHide, true);
        }
      }
    };
    addEventListener("visibilitychange", onHiddenOrPageHide, true);
    addEventListener("pagehide", onHiddenOrPageHide, true);
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/getCLS.js
  var getCLS = function(onReport, reportAllChanges) {
    var metric = initMetric("CLS", 0);
    var report;
    var sessionValue = 0;
    var sessionEntries = [];
    var entryHandler = function(entry) {
      if (entry && !entry.hadRecentInput) {
        var firstSessionEntry = sessionEntries[0];
        var lastSessionEntry = sessionEntries[sessionEntries.length - 1];
        if (sessionValue && sessionEntries.length !== 0 && entry.startTime - lastSessionEntry.startTime < 1e3 && entry.startTime - firstSessionEntry.startTime < 5e3) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }
        if (sessionValue > metric.value) {
          metric.value = sessionValue;
          metric.entries = sessionEntries;
          if (report) {
            report();
          }
        }
      }
    };
    var po = observe("layout-shift", entryHandler);
    if (po) {
      report = bindReporter(onReport, metric, reportAllChanges);
      onHidden(function() {
        po.takeRecords().map(entryHandler);
        report(true);
      });
    }
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/lib/getVisibilityWatcher.js
  var firstHiddenTime = -1;
  var initHiddenTime = function() {
    return getGlobalObject().document.visibilityState === "hidden" ? 0 : Infinity;
  };
  var trackChanges = function() {
    onHidden(function(_a) {
      var timeStamp = _a.timeStamp;
      firstHiddenTime = timeStamp;
    }, true);
  };
  var getVisibilityWatcher = function() {
    if (firstHiddenTime < 0) {
      firstHiddenTime = initHiddenTime();
      trackChanges();
    }
    return {
      get firstHiddenTime() {
        return firstHiddenTime;
      }
    };
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/getFID.js
  var getFID = function(onReport, reportAllChanges) {
    var visibilityWatcher = getVisibilityWatcher();
    var metric = initMetric("FID");
    var report;
    var entryHandler = function(entry) {
      if (report && entry.startTime < visibilityWatcher.firstHiddenTime) {
        metric.value = entry.processingStart - entry.startTime;
        metric.entries.push(entry);
        report(true);
      }
    };
    var po = observe("first-input", entryHandler);
    if (po) {
      report = bindReporter(onReport, metric, reportAllChanges);
      onHidden(function() {
        po.takeRecords().map(entryHandler);
        po.disconnect();
      }, true);
    }
  };

  // ../node_modules/@sentry/tracing/esm/browser/web-vitals/getLCP.js
  var reportedMetricIDs = {};
  var getLCP = function(onReport, reportAllChanges) {
    var visibilityWatcher = getVisibilityWatcher();
    var metric = initMetric("LCP");
    var report;
    var entryHandler = function(entry) {
      var value = entry.startTime;
      if (value < visibilityWatcher.firstHiddenTime) {
        metric.value = value;
        metric.entries.push(entry);
      }
      if (report) {
        report();
      }
    };
    var po = observe("largest-contentful-paint", entryHandler);
    if (po) {
      report = bindReporter(onReport, metric, reportAllChanges);
      var stopListening_1 = function() {
        if (!reportedMetricIDs[metric.id]) {
          po.takeRecords().map(entryHandler);
          po.disconnect();
          reportedMetricIDs[metric.id] = true;
          report(true);
        }
      };
      ["keydown", "click"].forEach(function(type) {
        addEventListener(type, stopListening_1, { once: true, capture: true });
      });
      onHidden(stopListening_1, true);
    }
  };

  // ../node_modules/@sentry/tracing/esm/browser/metrics.js
  var global9 = getGlobalObject();
  var MetricsInstrumentation = function() {
    function MetricsInstrumentation2(_reportAllChanges) {
      if (_reportAllChanges === void 0) {
        _reportAllChanges = false;
      }
      this._reportAllChanges = _reportAllChanges;
      this._measurements = {};
      this._performanceCursor = 0;
      if (!isNodeEnv() && global9 && global9.performance && global9.document) {
        if (global9.performance.mark) {
          global9.performance.mark("sentry-tracing-init");
        }
        this._trackCLS();
        this._trackLCP();
        this._trackFID();
      }
    }
    MetricsInstrumentation2.prototype.addPerformanceEntries = function(transaction) {
      var _this = this;
      if (!global9 || !global9.performance || !global9.performance.getEntries || !browserPerformanceTimeOrigin) {
        return;
      }
      IS_DEBUG_BUILD5 && logger.log("[Tracing] Adding & adjusting spans using Performance API");
      var timeOrigin = msToSec(browserPerformanceTimeOrigin);
      var responseStartTimestamp;
      var requestStartTimestamp;
      global9.performance.getEntries().slice(this._performanceCursor).forEach(function(entry) {
        var startTime = msToSec(entry.startTime);
        var duration = msToSec(entry.duration);
        if (transaction.op === "navigation" && timeOrigin + startTime < transaction.startTimestamp) {
          return;
        }
        switch (entry.entryType) {
          case "navigation": {
            addNavigationSpans(transaction, entry, timeOrigin);
            responseStartTimestamp = timeOrigin + msToSec(entry.responseStart);
            requestStartTimestamp = timeOrigin + msToSec(entry.requestStart);
            break;
          }
          case "mark":
          case "paint":
          case "measure": {
            var startTimestamp = addMeasureSpans(transaction, entry, startTime, duration, timeOrigin);
            var firstHidden = getVisibilityWatcher();
            var shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
            if (entry.name === "first-paint" && shouldRecord) {
              IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding FP");
              _this._measurements["fp"] = { value: entry.startTime };
              _this._measurements["mark.fp"] = { value: startTimestamp };
            }
            if (entry.name === "first-contentful-paint" && shouldRecord) {
              IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding FCP");
              _this._measurements["fcp"] = { value: entry.startTime };
              _this._measurements["mark.fcp"] = { value: startTimestamp };
            }
            break;
          }
          case "resource": {
            var resourceName = entry.name.replace(global9.location.origin, "");
            addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin);
            break;
          }
          default:
        }
      });
      this._performanceCursor = Math.max(performance.getEntries().length - 1, 0);
      this._trackNavigator(transaction);
      if (transaction.op === "pageload") {
        var timeOrigin_1 = msToSec(browserPerformanceTimeOrigin);
        if (typeof responseStartTimestamp === "number") {
          IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding TTFB");
          this._measurements["ttfb"] = { value: (responseStartTimestamp - transaction.startTimestamp) * 1e3 };
          if (typeof requestStartTimestamp === "number" && requestStartTimestamp <= responseStartTimestamp) {
            this._measurements["ttfb.requestTime"] = { value: (responseStartTimestamp - requestStartTimestamp) * 1e3 };
          }
        }
        ["fcp", "fp", "lcp"].forEach(function(name) {
          if (!_this._measurements[name] || timeOrigin_1 >= transaction.startTimestamp) {
            return;
          }
          var oldValue = _this._measurements[name].value;
          var measurementTimestamp = timeOrigin_1 + msToSec(oldValue);
          var normalizedValue = Math.abs((measurementTimestamp - transaction.startTimestamp) * 1e3);
          var delta = normalizedValue - oldValue;
          IS_DEBUG_BUILD5 && logger.log("[Measurements] Normalized " + name + " from " + oldValue + " to " + normalizedValue + " (" + delta + ")");
          _this._measurements[name].value = normalizedValue;
        });
        if (this._measurements["mark.fid"] && this._measurements["fid"]) {
          _startChild(transaction, {
            description: "first input delay",
            endTimestamp: this._measurements["mark.fid"].value + msToSec(this._measurements["fid"].value),
            op: "web.vitals",
            startTimestamp: this._measurements["mark.fid"].value
          });
        }
        if (!("fcp" in this._measurements)) {
          delete this._measurements.cls;
        }
        transaction.setMeasurements(this._measurements);
        tagMetricInfo(transaction, this._lcpEntry, this._clsEntry);
        transaction.setTag("sentry_reportAllChanges", this._reportAllChanges);
      }
    };
    MetricsInstrumentation2.prototype._trackNavigator = function(transaction) {
      var navigator = global9.navigator;
      if (!navigator) {
        return;
      }
      var connection = navigator.connection;
      if (connection) {
        if (connection.effectiveType) {
          transaction.setTag("effectiveConnectionType", connection.effectiveType);
        }
        if (connection.type) {
          transaction.setTag("connectionType", connection.type);
        }
        if (isMeasurementValue(connection.rtt)) {
          this._measurements["connection.rtt"] = { value: connection.rtt };
        }
        if (isMeasurementValue(connection.downlink)) {
          this._measurements["connection.downlink"] = { value: connection.downlink };
        }
      }
      if (isMeasurementValue(navigator.deviceMemory)) {
        transaction.setTag("deviceMemory", String(navigator.deviceMemory));
      }
      if (isMeasurementValue(navigator.hardwareConcurrency)) {
        transaction.setTag("hardwareConcurrency", String(navigator.hardwareConcurrency));
      }
    };
    MetricsInstrumentation2.prototype._trackCLS = function() {
      var _this = this;
      getCLS(function(metric) {
        var entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding CLS");
        _this._measurements["cls"] = { value: metric.value };
        _this._clsEntry = entry;
      });
    };
    MetricsInstrumentation2.prototype._trackLCP = function() {
      var _this = this;
      getLCP(function(metric) {
        var entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        var timeOrigin = msToSec(browserPerformanceTimeOrigin);
        var startTime = msToSec(entry.startTime);
        IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding LCP");
        _this._measurements["lcp"] = { value: metric.value };
        _this._measurements["mark.lcp"] = { value: timeOrigin + startTime };
        _this._lcpEntry = entry;
      }, this._reportAllChanges);
    };
    MetricsInstrumentation2.prototype._trackFID = function() {
      var _this = this;
      getFID(function(metric) {
        var entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        var timeOrigin = msToSec(browserPerformanceTimeOrigin);
        var startTime = msToSec(entry.startTime);
        IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding FID");
        _this._measurements["fid"] = { value: metric.value };
        _this._measurements["mark.fid"] = { value: timeOrigin + startTime };
      });
    };
    return MetricsInstrumentation2;
  }();
  function addNavigationSpans(transaction, entry, timeOrigin) {
    ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach(function(event) {
      addPerformanceNavigationTiming(transaction, entry, event, timeOrigin);
    });
    addPerformanceNavigationTiming(transaction, entry, "secureConnection", timeOrigin, "TLS/SSL", "connectEnd");
    addPerformanceNavigationTiming(transaction, entry, "fetch", timeOrigin, "cache", "domainLookupStart");
    addPerformanceNavigationTiming(transaction, entry, "domainLookup", timeOrigin, "DNS");
    addRequest(transaction, entry, timeOrigin);
  }
  function addMeasureSpans(transaction, entry, startTime, duration, timeOrigin) {
    var measureStartTimestamp = timeOrigin + startTime;
    var measureEndTimestamp = measureStartTimestamp + duration;
    _startChild(transaction, {
      description: entry.name,
      endTimestamp: measureEndTimestamp,
      op: entry.entryType,
      startTimestamp: measureStartTimestamp
    });
    return measureStartTimestamp;
  }
  function addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin) {
    if (entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch") {
      return;
    }
    var data = {};
    if ("transferSize" in entry) {
      data["Transfer Size"] = entry.transferSize;
    }
    if ("encodedBodySize" in entry) {
      data["Encoded Body Size"] = entry.encodedBodySize;
    }
    if ("decodedBodySize" in entry) {
      data["Decoded Body Size"] = entry.decodedBodySize;
    }
    var startTimestamp = timeOrigin + startTime;
    var endTimestamp = startTimestamp + duration;
    _startChild(transaction, {
      description: resourceName,
      endTimestamp,
      op: entry.initiatorType ? "resource." + entry.initiatorType : "resource",
      startTimestamp,
      data
    });
  }
  function addPerformanceNavigationTiming(transaction, entry, event, timeOrigin, description, eventEnd) {
    var end = eventEnd ? entry[eventEnd] : entry[event + "End"];
    var start = entry[event + "Start"];
    if (!start || !end) {
      return;
    }
    _startChild(transaction, {
      op: "browser",
      description: description !== null && description !== void 0 ? description : event,
      startTimestamp: timeOrigin + msToSec(start),
      endTimestamp: timeOrigin + msToSec(end)
    });
  }
  function addRequest(transaction, entry, timeOrigin) {
    _startChild(transaction, {
      op: "browser",
      description: "request",
      startTimestamp: timeOrigin + msToSec(entry.requestStart),
      endTimestamp: timeOrigin + msToSec(entry.responseEnd)
    });
    _startChild(transaction, {
      op: "browser",
      description: "response",
      startTimestamp: timeOrigin + msToSec(entry.responseStart),
      endTimestamp: timeOrigin + msToSec(entry.responseEnd)
    });
  }
  function _startChild(transaction, _a) {
    var startTimestamp = _a.startTimestamp, ctx = __rest6(_a, ["startTimestamp"]);
    if (startTimestamp && transaction.startTimestamp > startTimestamp) {
      transaction.startTimestamp = startTimestamp;
    }
    return transaction.startChild(__assign6({ startTimestamp }, ctx));
  }
  function isMeasurementValue(value) {
    return typeof value === "number" && isFinite(value);
  }
  function tagMetricInfo(transaction, lcpEntry, clsEntry) {
    if (lcpEntry) {
      IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding LCP Data");
      if (lcpEntry.element) {
        transaction.setTag("lcp.element", htmlTreeAsString(lcpEntry.element));
      }
      if (lcpEntry.id) {
        transaction.setTag("lcp.id", lcpEntry.id);
      }
      if (lcpEntry.url) {
        transaction.setTag("lcp.url", lcpEntry.url.trim().slice(0, 200));
      }
      transaction.setTag("lcp.size", lcpEntry.size);
    }
    if (clsEntry && clsEntry.sources) {
      IS_DEBUG_BUILD5 && logger.log("[Measurements] Adding CLS Data");
      clsEntry.sources.forEach(function(source, index) {
        return transaction.setTag("cls.source." + (index + 1), htmlTreeAsString(source.node));
      });
    }
  }

  // ../node_modules/@sentry/tracing/esm/browser/request.js
  var DEFAULT_TRACING_ORIGINS = ["localhost", /^\//];
  var defaultRequestInstrumentationOptions = {
    traceFetch: true,
    traceXHR: true,
    tracingOrigins: DEFAULT_TRACING_ORIGINS
  };
  function instrumentOutgoingRequests(_options) {
    var _a = __assign6(__assign6({}, defaultRequestInstrumentationOptions), _options), traceFetch = _a.traceFetch, traceXHR = _a.traceXHR, tracingOrigins = _a.tracingOrigins, shouldCreateSpanForRequest = _a.shouldCreateSpanForRequest;
    var urlMap = {};
    var defaultShouldCreateSpan = function(url) {
      if (urlMap[url]) {
        return urlMap[url];
      }
      var origins = tracingOrigins;
      urlMap[url] = origins.some(function(origin) {
        return isMatchingPattern(url, origin);
      }) && !isMatchingPattern(url, "sentry_key");
      return urlMap[url];
    };
    var shouldCreateSpan = defaultShouldCreateSpan;
    if (typeof shouldCreateSpanForRequest === "function") {
      shouldCreateSpan = function(url) {
        return defaultShouldCreateSpan(url) && shouldCreateSpanForRequest(url);
      };
    }
    var spans = {};
    if (traceFetch) {
      addInstrumentationHandler("fetch", function(handlerData) {
        fetchCallback(handlerData, shouldCreateSpan, spans);
      });
    }
    if (traceXHR) {
      addInstrumentationHandler("xhr", function(handlerData) {
        xhrCallback(handlerData, shouldCreateSpan, spans);
      });
    }
  }
  function fetchCallback(handlerData, shouldCreateSpan, spans) {
    if (!hasTracingEnabled() || !(handlerData.fetchData && shouldCreateSpan(handlerData.fetchData.url))) {
      return;
    }
    if (handlerData.endTimestamp) {
      var spanId = handlerData.fetchData.__span;
      if (!spanId)
        return;
      var span = spans[spanId];
      if (span) {
        if (handlerData.response) {
          span.setHttpStatus(handlerData.response.status);
        } else if (handlerData.error) {
          span.setStatus("internal_error");
        }
        span.finish();
        delete spans[spanId];
      }
      return;
    }
    var activeTransaction = getActiveTransaction();
    if (activeTransaction) {
      var span = activeTransaction.startChild({
        data: __assign6(__assign6({}, handlerData.fetchData), { type: "fetch" }),
        description: handlerData.fetchData.method + " " + handlerData.fetchData.url,
        op: "http.client"
      });
      handlerData.fetchData.__span = span.spanId;
      spans[span.spanId] = span;
      var request = handlerData.args[0] = handlerData.args[0];
      var options = handlerData.args[1] = handlerData.args[1] || {};
      var headers = options.headers;
      if (isInstanceOf(request, Request)) {
        headers = request.headers;
      }
      if (headers) {
        if (typeof headers.append === "function") {
          headers.append("sentry-trace", span.toTraceparent());
        } else if (Array.isArray(headers)) {
          headers = __spread6(headers, [["sentry-trace", span.toTraceparent()]]);
        } else {
          headers = __assign6(__assign6({}, headers), { "sentry-trace": span.toTraceparent() });
        }
      } else {
        headers = { "sentry-trace": span.toTraceparent() };
      }
      options.headers = headers;
    }
  }
  function xhrCallback(handlerData, shouldCreateSpan, spans) {
    if (!hasTracingEnabled() || handlerData.xhr && handlerData.xhr.__sentry_own_request__ || !(handlerData.xhr && handlerData.xhr.__sentry_xhr__ && shouldCreateSpan(handlerData.xhr.__sentry_xhr__.url))) {
      return;
    }
    var xhr = handlerData.xhr.__sentry_xhr__;
    if (handlerData.endTimestamp) {
      var spanId = handlerData.xhr.__sentry_xhr_span_id__;
      if (!spanId)
        return;
      var span = spans[spanId];
      if (span) {
        span.setHttpStatus(xhr.status_code);
        span.finish();
        delete spans[spanId];
      }
      return;
    }
    var activeTransaction = getActiveTransaction();
    if (activeTransaction) {
      var span = activeTransaction.startChild({
        data: __assign6(__assign6({}, xhr.data), { type: "xhr", method: xhr.method, url: xhr.url }),
        description: xhr.method + " " + xhr.url,
        op: "http.client"
      });
      handlerData.xhr.__sentry_xhr_span_id__ = span.spanId;
      spans[handlerData.xhr.__sentry_xhr_span_id__] = span;
      if (handlerData.xhr.setRequestHeader) {
        try {
          handlerData.xhr.setRequestHeader("sentry-trace", span.toTraceparent());
        } catch (_) {
        }
      }
    }
  }

  // ../node_modules/@sentry/tracing/esm/browser/router.js
  var global10 = getGlobalObject();
  function instrumentRoutingWithDefaults(customStartTransaction, startTransactionOnPageLoad, startTransactionOnLocationChange) {
    if (startTransactionOnPageLoad === void 0) {
      startTransactionOnPageLoad = true;
    }
    if (startTransactionOnLocationChange === void 0) {
      startTransactionOnLocationChange = true;
    }
    if (!global10 || !global10.location) {
      IS_DEBUG_BUILD5 && logger.warn("Could not initialize routing instrumentation due to invalid location");
      return;
    }
    var startingUrl = global10.location.href;
    var activeTransaction;
    if (startTransactionOnPageLoad) {
      activeTransaction = customStartTransaction({ name: global10.location.pathname, op: "pageload" });
    }
    if (startTransactionOnLocationChange) {
      addInstrumentationHandler("history", function(_a) {
        var to = _a.to, from = _a.from;
        if (from === void 0 && startingUrl && startingUrl.indexOf(to) !== -1) {
          startingUrl = void 0;
          return;
        }
        if (from !== to) {
          startingUrl = void 0;
          if (activeTransaction) {
            IS_DEBUG_BUILD5 && logger.log("[Tracing] Finishing current transaction with op: " + activeTransaction.op);
            activeTransaction.finish();
          }
          activeTransaction = customStartTransaction({ name: global10.location.pathname, op: "navigation" });
        }
      });
    }
  }

  // ../node_modules/@sentry/tracing/esm/browser/browsertracing.js
  var DEFAULT_MAX_TRANSACTION_DURATION_SECONDS = 600;
  var DEFAULT_BROWSER_TRACING_OPTIONS = __assign6({ idleTimeout: DEFAULT_IDLE_TIMEOUT, markBackgroundTransactions: true, maxTransactionDuration: DEFAULT_MAX_TRANSACTION_DURATION_SECONDS, routingInstrumentation: instrumentRoutingWithDefaults, startTransactionOnLocationChange: true, startTransactionOnPageLoad: true }, defaultRequestInstrumentationOptions);
  var BrowserTracing = function() {
    function BrowserTracing2(_options) {
      this.name = BrowserTracing2.id;
      this._configuredIdleTimeout = void 0;
      var tracingOrigins = defaultRequestInstrumentationOptions.tracingOrigins;
      if (_options) {
        this._configuredIdleTimeout = _options.idleTimeout;
        if (_options.tracingOrigins && Array.isArray(_options.tracingOrigins) && _options.tracingOrigins.length !== 0) {
          tracingOrigins = _options.tracingOrigins;
        } else {
          IS_DEBUG_BUILD5 && (this._emitOptionsWarning = true);
        }
      }
      this.options = __assign6(__assign6(__assign6({}, DEFAULT_BROWSER_TRACING_OPTIONS), _options), { tracingOrigins });
      var _metricOptions = this.options._metricOptions;
      this._metrics = new MetricsInstrumentation(_metricOptions && _metricOptions._reportAllChanges);
    }
    BrowserTracing2.prototype.setupOnce = function(_, getCurrentHub2) {
      var _this = this;
      this._getCurrentHub = getCurrentHub2;
      if (this._emitOptionsWarning) {
        IS_DEBUG_BUILD5 && logger.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace.");
        IS_DEBUG_BUILD5 && logger.warn("[Tracing] We added a reasonable default for you: " + defaultRequestInstrumentationOptions.tracingOrigins);
      }
      var _a = this.options, instrumentRouting = _a.routingInstrumentation, startTransactionOnLocationChange = _a.startTransactionOnLocationChange, startTransactionOnPageLoad = _a.startTransactionOnPageLoad, markBackgroundTransactions = _a.markBackgroundTransactions, traceFetch = _a.traceFetch, traceXHR = _a.traceXHR, tracingOrigins = _a.tracingOrigins, shouldCreateSpanForRequest = _a.shouldCreateSpanForRequest;
      instrumentRouting(function(context) {
        return _this._createRouteTransaction(context);
      }, startTransactionOnPageLoad, startTransactionOnLocationChange);
      if (markBackgroundTransactions) {
        registerBackgroundTabDetection();
      }
      instrumentOutgoingRequests({ traceFetch, traceXHR, tracingOrigins, shouldCreateSpanForRequest });
    };
    BrowserTracing2.prototype._createRouteTransaction = function(context) {
      var _this = this;
      if (!this._getCurrentHub) {
        IS_DEBUG_BUILD5 && logger.warn("[Tracing] Did not create " + context.op + " transaction because _getCurrentHub is invalid.");
        return void 0;
      }
      var _a = this.options, beforeNavigate = _a.beforeNavigate, idleTimeout = _a.idleTimeout, maxTransactionDuration = _a.maxTransactionDuration;
      var parentContextFromHeader = context.op === "pageload" ? getHeaderContext() : void 0;
      var expandedContext = __assign6(__assign6(__assign6({}, context), parentContextFromHeader), { trimEnd: true });
      var modifiedContext = typeof beforeNavigate === "function" ? beforeNavigate(expandedContext) : expandedContext;
      var finalContext = modifiedContext === void 0 ? __assign6(__assign6({}, expandedContext), { sampled: false }) : modifiedContext;
      if (finalContext.sampled === false) {
        IS_DEBUG_BUILD5 && logger.log("[Tracing] Will not send " + finalContext.op + " transaction because of beforeNavigate.");
      }
      IS_DEBUG_BUILD5 && logger.log("[Tracing] Starting " + finalContext.op + " transaction on scope");
      var hub = this._getCurrentHub();
      var location = getGlobalObject().location;
      var idleTransaction = startIdleTransaction(hub, finalContext, idleTimeout, true, { location });
      idleTransaction.registerBeforeFinishCallback(function(transaction, endTimestamp) {
        _this._metrics.addPerformanceEntries(transaction);
        adjustTransactionDuration(secToMs(maxTransactionDuration), transaction, endTimestamp);
      });
      idleTransaction.setTag("idleTimeout", this._configuredIdleTimeout);
      return idleTransaction;
    };
    BrowserTracing2.id = "BrowserTracing";
    return BrowserTracing2;
  }();
  function getHeaderContext() {
    var header = getMetaContent("sentry-trace");
    if (header) {
      return extractTraceparentData(header);
    }
    return void 0;
  }
  function getMetaContent(metaName) {
    var el = getGlobalObject().document.querySelector("meta[name=" + metaName + "]");
    return el ? el.getAttribute("content") : null;
  }
  function adjustTransactionDuration(maxDuration, transaction, endTimestamp) {
    var diff = endTimestamp - transaction.startTimestamp;
    var isOutdatedTransaction = endTimestamp && (diff > maxDuration || diff < 0);
    if (isOutdatedTransaction) {
      transaction.setStatus("deadline_exceeded");
      transaction.setTag("maxTransactionDurationExceeded", "true");
    }
  }

  // ../node_modules/@sentry/tracing/esm/index.js
  addExtensionMethods();

  // ../node_modules/@sentry/integrations/esm/captureconsole.js
  var global11 = getGlobalObject();
  var CaptureConsole = function() {
    function CaptureConsole2(options) {
      if (options === void 0) {
        options = {};
      }
      this.name = CaptureConsole2.id;
      this._levels = CONSOLE_LEVELS;
      if (options.levels) {
        this._levels = options.levels;
      }
    }
    CaptureConsole2.prototype.setupOnce = function(_, getCurrentHub2) {
      if (!("console" in global11)) {
        return;
      }
      this._levels.forEach(function(level) {
        if (!(level in global11.console)) {
          return;
        }
        fill(global11.console, level, function(originalConsoleMethod) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var hub = getCurrentHub2();
            if (hub.getIntegration(CaptureConsole2)) {
              hub.withScope(function(scope) {
                scope.setLevel(severityFromString(level));
                scope.setExtra("arguments", args);
                scope.addEventProcessor(function(event) {
                  event.logger = "console";
                  return event;
                });
                var message = safeJoin(args, " ");
                if (level === "assert") {
                  if (args[0] === false) {
                    message = "Assertion failed: " + (safeJoin(args.slice(1), " ") || "console.assert");
                    scope.setExtra("arguments", args.slice(1));
                    hub.captureMessage(message);
                  }
                } else if (level === "error" && args[0] instanceof Error) {
                  hub.captureException(args[0]);
                } else {
                  hub.captureMessage(message);
                }
              });
            }
            if (originalConsoleMethod) {
              originalConsoleMethod.apply(global11.console, args);
            }
          };
        });
      });
    };
    CaptureConsole2.id = "CaptureConsole";
    return CaptureConsole2;
  }();

  // src/systems/sentry-client/src/FbwAircraftSentryClient.ts
  var SENTRY_CONSENT_KEY = "SENTRY_CONSENT";
  var FbwAircraftSentryClient = class {
    onInstrumentLoaded(config) {
      if (!config.dsn) {
        console.log("[SentryClient] No DSN defined. Will not try to initialize");
        return Promise.resolve(false);
      }
      this.runClientSubscription(config);
      if (config.root) {
        console.log("[SentryClient] Starting as root client");
        return this.runRootClientFlow(config);
      }
      return Promise.resolve(false);
    }
    async runClientSubscription(config) {
      NXDataStore.getAndSubscribe(SENTRY_CONSENT_KEY, (key, value) => {
        if (value === "Given" /* Given */) {
          console.log("[SentryClient] Synchronised consent state is Given. Initializing sentry");
          FbwAircraftSentryClient.attemptInitializeSentry(config);
        }
        if (value === "Refused" /* Refused */) {
          console.log("[SentryClient] Synchronised consent state is Refused. Shutting down the client");
          FbwAircraftSentryClient.closeSentry();
        }
      });
    }
    async runRootClientFlow(config) {
      const consentValue = NXDataStore.get(SENTRY_CONSENT_KEY, "Unknown" /* Unknown */);
      switch (consentValue) {
        case "Given" /* Given */:
          console.log("[SentryClient] Consent state is Given. Initializing sentry");
          return FbwAircraftSentryClient.attemptInitializeSentry(config);
        case "Unknown" /* Unknown */:
          console.log("[SentryClient] Consent state is Unknown. Asking for consent");
          return new Promise((resolve, reject) => {
            const instrument2 = document.querySelector("vcockpit-panel > *");
            if (instrument2) {
              instrument2.addEventListener("FlightStart", () => {
                setTimeout(() => {
                  resolve(FbwAircraftSentryClient.requestConsent().then((didConsent) => {
                    if (didConsent) {
                      NXDataStore.set(SENTRY_CONSENT_KEY, "Given" /* Given */);
                      console.log("[SentryClient] User requested consent state Given. Initializing sentry");
                      return FbwAircraftSentryClient.attemptInitializeSentry(config);
                    }
                    NXDataStore.set(SENTRY_CONSENT_KEY, "Refused" /* Refused */);
                    console.log("[SentryClient] User requested consent state Refused. Doing nothing");
                    return false;
                  }).catch(() => false));
                }, 1e3);
              });
            } else {
              reject(new Error("[SentryClient] Could not find an instrument element to hook onto"));
            }
          });
        case "Refused" /* Refused */:
          console.log("[SentryClient] Consent state is Refused. Doing nothing");
          break;
        default:
          console.log("[SentryClient] Consent state is corrupted. Doing nothing");
          break;
      }
      return false;
    }
    static async requestConsent() {
      const popup = new PopUpDialog();
      return new Promise((resolve) => {
        popup.showPopUp(
          "A32NX - ERROR REPORTING",
          "Are you willing to help FlyByWire Simulations by enabling anonymous reporting of errors that may occur in the future? This is 100% optional and we will never collect your personal data, but it will help us diagnose issues quickly.",
          "normal",
          () => resolve(true),
          () => resolve(false)
        );
      });
    }
    static async attemptInitializeSentry(config) {
      return FbwAircraftSentryClient.initializeSentry(config).then(() => true).catch((e) => {
        console.error("[SentryClient] Error while initializing sentry");
        console.error(e);
        return false;
      });
    }
    static closeSentry() {
      close();
      console.log("[SentryClient] Sentry closed");
    }
    static async initializeSentry(config) {
      let release = "unknown";
      try {
        const manifest = await (await fetch(`/VFS/${config.buildInfoFilePrefix}_build_info.json`)).json();
        release = manifest.pretty_release_name;
      } catch (e) {
        console.warn(`[SentryClient] Could not load ${config.buildInfoFilePrefix}_build_info.json. Using 'unknown' as release name`);
      }
      const integrations = [new CaptureConsole({ levels: ["error"] })];
      if (config.enableTracing) {
        integrations.push(new BrowserTracing());
      }
      init({
        dsn: config.dsn,
        release,
        integrations,
        sampleRate: 0.1
      });
      console.log("[SentryClient] Sentry initialized");
      NXDataStore.getAndSubscribe("A32NX_SENTRY_SESSION_ID", (_, value) => {
        if (value) {
          setTag("session_id", value);
          console.log('[SentryClient] Sentry tag "session_id" set to', value);
        }
      });
    }
  };

  // src/systems/instruments/src/Common/defaults.ts
  var reactMount = document.getElementById("MSFS_REACT_MOUNT");
  var getRenderTarget = () => reactMount;
  var getRootElement = () => {
    if (reactMount == null ? void 0 : reactMount.parentElement) {
      return reactMount.parentElement;
    }
    throw new Error("Could not find rootElement");
  };

  // src/systems/instruments/src/Common/index.tsx
  var render = (Slot, enableSentryTracing = false, sentryRootClient = false) => {
    const doRender = () => {
      new FbwAircraftSentryClient().onInstrumentLoaded({
        dsn: "https://abd67c4440a644b3aaaf44838e565bea@o1135700.ingest.sentry.io/6185355",
        buildInfoFilePrefix: "a32nx",
        enableTracing: enableSentryTracing,
        root: sentryRootClient
      });
      import_react_dom.default.render(Slot, getRenderTarget());
    };
    if (false) {
      window.addEventListener("AceInitialized", () => doRender());
    } else {
      doRender();
    }
  };

  // src/systems/instruments/src/Common/simVars.tsx
  var import_react2 = __toESM(require_react());

  // src/systems/instruments/src/Common/hooks.tsx
  var import_react = __toESM(require_react());
  var useUpdate = (handler) => {
    const savedHandler = import_react.default.useRef(handler);
    import_react.default.useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
    import_react.default.useEffect(() => {
      const wrappedHandler = (event) => {
        savedHandler.current(event.detail);
      };
      getRootElement().addEventListener("update", wrappedHandler);
      return () => {
        getRootElement().removeEventListener("update", wrappedHandler);
      };
    }, []);
  };

  // src/systems/instruments/src/Common/simVars.tsx
  var useSimVar = (name, unit, refreshInterval = 0) => {
    const lastUpdate = (0, import_react2.useRef)(Date.now() - refreshInterval - 1);
    const [stateValue, setStateValue] = (0, import_react2.useState)(() => SimVar.GetSimVarValue(name, unit));
    const updateCallback = (0, import_react2.useCallback)(() => {
      const delta = Date.now() - lastUpdate.current;
      if (delta >= refreshInterval) {
        lastUpdate.current = Date.now();
        const newValue = SimVar.GetSimVarValue(name, unit);
        setStateValue(newValue);
      }
    }, [name, unit, refreshInterval]);
    useUpdate(updateCallback);
    const setter = (0, import_react2.useCallback)((valueOrSetter) => {
      const executedValue = typeof valueOrSetter === "function" ? valueOrSetter(stateValue) : valueOrSetter;
      SimVar.SetSimVarValue(name, unit, executedValue);
      setStateValue(executedValue);
      return stateValue;
    }, [name, unit, stateValue]);
    return [stateValue, setter];
  };

  // src/systems/instruments/src/BAT/index.tsx
  var BASE_DELAY_MS = 1e3;
  var DIGIT_REFRESH_INTERVAL_MS = 130;
  var FULL_DISPLAY_REFRESH_INTERVAL_MS = BASE_DELAY_MS + 2 * DIGIT_REFRESH_INTERVAL_MS;
  var BatDisplay = ({ batteryNumber, x, y }) => {
    const [ltsTest] = useSimVar("L:A32NX_OVHD_INTLT_ANN", "Bool", 100);
    const [dc2IsPowered] = useSimVar("L:A32NX_ELEC_DC_2_BUS_IS_POWERED", "Bool", 100);
    const [voltage] = useSimVar(`L:A32NX_ELEC_BAT_${batteryNumber}_POTENTIAL`, "Volts", 100);
    const [digits, setDigits] = (0, import_react3.useState)("   ");
    const updated = (0, import_react3.useRef)(0);
    const timer = (0, import_react3.useRef)(batteryNumber === 1 ? 0 : 200);
    const setDigit = (0, import_react3.useCallback)((indexOfDigitToSet, digit) => {
      setDigits((oldDigits) => `${oldDigits.slice(0, indexOfDigitToSet)}${digit}${oldDigits.slice(indexOfDigitToSet + 1)}`);
    }, []);
    const voltageValue = voltage.toFixed(1);
    const getDisplayValue = (0, import_react3.useCallback)(() => {
      if (ltsTest === 0 && dc2IsPowered) {
        return "888";
      }
      const int = Math.floor(voltageValue);
      const decimal = (voltageValue - int).toFixed(1).substring(2);
      let intDigits = int.toString();
      while (intDigits.length < 2) {
        intDigits = `0${intDigits}`;
      }
      return `${intDigits}${decimal}`;
    }, [ltsTest, voltageValue]);
    useUpdate((deltaTime) => {
      const displayValue = getDisplayValue();
      timer.current += deltaTime;
      if (timer.current >= BASE_DELAY_MS && updated.current < 1) {
        setDigit(0, displayValue[0]);
        updated.current = 1;
      }
      if (timer.current >= BASE_DELAY_MS + DIGIT_REFRESH_INTERVAL_MS && updated.current < 2) {
        setDigit(1, displayValue[1]);
        updated.current = 2;
      }
      if (timer.current >= BASE_DELAY_MS + 2 * DIGIT_REFRESH_INTERVAL_MS && updated.current < 3) {
        setDigit(2, displayValue[2]);
        updated.current = 3;
      }
      while (timer.current >= FULL_DISPLAY_REFRESH_INTERVAL_MS) {
        timer.current -= FULL_DISPLAY_REFRESH_INTERVAL_MS;
        updated.current = 0;
      }
    });
    return /* @__PURE__ */ import_react3.default.createElement("text", { x, y }, digits[0], digits[1], ".", digits[2], "V");
  };
  var BatRoot = () => /* @__PURE__ */ import_react3.default.createElement("svg", { className: "bat-svg", viewBox: "0 0 200 100" }, /* @__PURE__ */ import_react3.default.createElement(BatDisplay, { batteryNumber: 1, x: "184", y: "45" }), /* @__PURE__ */ import_react3.default.createElement(BatDisplay, { batteryNumber: 2, x: "184", y: "95" }));
  render(/* @__PURE__ */ import_react3.default.createElement(BatRoot, null));
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

    }

    Update() {
        super.Update();
        this.dispatchEvent(new CustomEvent('update', { detail: this.getDeltaTime() }));
    }

    onInteractionEvent(event) {
        const eventName = String(event);
        this.dispatchEvent(new CustomEvent(eventName));
        this.dispatchEvent(new CustomEvent('*', { detail: eventName }));
    }
}

registerInstrument('a32nx-bat', InstrumentLogic);
