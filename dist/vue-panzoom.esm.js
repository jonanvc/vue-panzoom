import panZoom from 'panzoom';

var PanZoomComponent = {
    name: 'panZoom',
    props: {
        options: Object,
        selector: String,
    },
    data: function data() {
        return {
            $panZoomInstance: null,
            instanceId: null,
            defaultOptions: {
                bounds: true,
                minZoom: 0.5,
                maxZoom: 2,
            }
        }
    },
    created: function created() {
        this.instanceId = this.generateRandomId(20);
    },
    mounted: function mounted() {
        if (this.scene) {
            var _options = Object.assign({}, this.defaultOptions, this.options);
            this.$panZoomInstance = this.$panZoom(this.scene, _options);
            this.$panZoomInstanceId = this.instanceId;
            this.attachEvents();
        }
    },
    computed: {
        scene: function scene() {
            var el;
            var _wrapper = this.$el.querySelector('.vue-pan-zoom-scene');
            if (this.selector) {
                el = _wrapper.querySelector(this.selector);
            }
            else {
                el = _wrapper.querySelector('svg, object, embed');
                if (!el) {
                    el = _wrapper.firstChild;
                }
            }
            return el;
        },
    },
    methods: {
        generateRandomId: function generateRandomId(l) {
            l = l || 16;
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var charsLength = chars.length;
            var a = [];

            for(var i=0; i<l; i++) {
                a.push( chars.charAt(Math.floor(Math.random() * charsLength)) );
            }
            return a.join('');
        },
        attachEvents: function attachEvents() {
            var this$1 = this;

            this.$emit('init', this.$panZoomInstance, this.$panZoomInstanceId);

            this.$panZoomInstance.on('panstart', function (e) {
                this$1.$emit('panstart', e);
            });

            this.$panZoomInstance.on('panend', function (e) {
                this$1.$emit('panend', e);
            });

            this.$panZoomInstance.on('pan', function (e) {
                this$1.$emit('pan', e);
            });

            this.$panZoomInstance.on('zoom', function (e) {
                this$1.$emit('zoom', e);
            });

            this.$panZoomInstance.on('transform', function (e) {
                this$1.$emit('transform', e);
            });
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = PanZoomComponent;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "vue-pan-zoom-item",
      class: ["vue-pan-zoom-item-" + this.instanceId]
    },
    [_c("div", { staticClass: "vue-pan-zoom-scene" }, [_vm._t("default")], 2)]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PanZoomComponent$1 = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var PanZoomPlugin = {
    install: function install(Vue, options) {
        var _name = options && options.componentName ? options.componentName : PanZoomComponent$1.name;
        Vue.component(_name, PanZoomComponent$1);
        Vue.prototype.$panZoom = panZoom;
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PanZoomPlugin);
}

export default PanZoomPlugin;
