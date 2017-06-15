/**
 * MIDI output port.
 * @namespace WH
 */

window.WH = window.WH || {};

(function (ns) {
    
    function createMIDIPortOutput(specs, my) {
        var that,
            networkProcessorID,
            
            /**
             * Create a MIDI output processor in the network,
             * or delete it from the network.
             * @param {Boolean} isEnabled State to switch to.
             */
            toggleNetwork = function(isEnabled) {
                if (isEnabled === true || isEnabled === false) {
                    if (isEnabled === my.isNetworkEnabled) {
                        return;
                    } 
                }
                
                if (my.isNetworkEnabled) {
                    if (networkProcessorID) {
                        my.network.deleteProcessor(networkProcessorID);
                        networkProcessorID = null;
                        my.isNetworkEnabled = false;
                    }
                } else {
                    networkProcessorID = my.network.createProcessor({
                        type: 'output',
                        midiOutput: my.midiPort
                    });
                    my.isNetworkEnabled = true;
                    ns.EPGMode.selectMIDIOutPort(networkProcessorID, toggleNetwork);
                }
                my.viewCallback('network', my.isNetworkEnabled);
            };
        
        my = my || {};
        
        that = ns.createMIDIPortBase(specs, my);
        
        that.toggleNetwork = toggleNetwork;
        return that;
    }

    ns.createMIDIPortOutput = createMIDIPortOutput;

})(WH);
