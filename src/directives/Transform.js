export default {
    bind(el, binding, vnode) {

        let current = 0;

        el.addEventListener('dblclick', function() {

            let incremento = binding.value || 90;
            let efeito;

            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= incremento;
                }
                if (!binding.modifiers.reverse) {
                    current += incremento;
                }
                efeito = `rotate(${current}deg)`;
            }
            if (binding.arg == 'scale') {
                efeito = `scale(${incremento})`;
            }

            el.style.transform = efeito;

            if (binding.modifiers.animate) el.style.transition = "transform 0.5s";

        });

    }
}

/*
  its necessary to import the global view object (Vue)
  Vue.directive() => create the directive
  On the () you need to pass to parameters
  - directive name: 'my-directive'
  - Javascript Object: the settings of the directive

  To use the directive you'll need to start with a 'v-', so:
  v-my-directive

  The Directive settings:
  bind: three parameters, its called when the directive chain it self on the DOM
  element
  el: refers to the DOM element that the directive is associated
  binding: to use a value passed on the directive when you call it



*/