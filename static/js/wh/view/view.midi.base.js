/**
 * MIDI Input processor view.
 * @namespace WH
 */

window.WH = window.WH || {};

(function (ns) {
    
    function createMIDIBaseView(specs, my) {
        var that,
            parentEl = specs.parentEl,
            
            initialize = function() {
                // find template, add clone to midi ports list
                var template = document.getElementById('template-midi-' + my.processor.getType());
                my.el = template.firstElementChild.cloneNode(true);
                parentEl.appendChild(my.el);
                
                // show label
                my.el.querySelector('.midi-port__label').innerHTML = my.processor.getPort().name;
            },
            
            /**
             * Called before this view is deleted.
             */
            terminate = function() {
                if (my.el && parentEl) {
                    parentEl.removeChild(my.el);
                }
            },
            
            /**
             * Check if this view is for a certain processor.
             * @param  {Object} proc MIDI processor object.
             * @return {Boolean} True if the processors match.
             */
            hasProcessor = function(proc) {
                return proc === my.processor;
            };
            
        my = my || {};
        my.processor = specs.processor;
        my.el;
        
        that = that || {};
        
        initialize();
        
        that.terminate = terminate;
        that.hasProcessor = hasProcessor;
        return that;
    };

    ns.createMIDIBaseView = createMIDIBaseView;

})(WH);
