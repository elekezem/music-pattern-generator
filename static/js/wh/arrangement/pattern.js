/**
 * Pattern contains tracks.
 *
 * @namespace WH
 */
window.WH = window.WH || {};

(function (WH) {
    
    function createPattern(specs) {
        var that,
            trackCount = specs.trackCount || 0,
            tracks = [],
            lengthInTicks = Number.MAX_SAFE_INTEGER; // WH.conf.getPPQN() * WH.conf.getPatternDurationInBeats(),
            
            /**
             * Scan events within time range.
             * @param {Number} absoluteStart Absolute start tick in Transport playback time.
             * @param {Number} start Start of time range in ticks.
             * @param {Number} end End of time range in ticks.
             * @param {Array} playbackQueue Events that happen within the time range.
             */
            scanEvents = function (start, end, playbackQueue) {

                // convert transport time to song time
                var localStart = start % lengthInTicks;
                var localEnd = localStart + (end - start);

                // scan for events
                for (var i = 0; i < tracks.length; i++) {
                    var events = tracks[i].scanEventsInTimeSpan(start, localStart, localEnd, playbackQueue);
                }
            },

            /**
             * Get steps of the track at index.
             * @param  {Number} index Track index.
             * @return {Array}  Array of Step objects.
             */
            getTrackSteps = function(index) {
                return tracks[index].getSteps();
            },

            /**
             * Get the duration of this pattern.
             * @return {Number}  Duration of this pattern in ticks.
             */
            getDuration = function() {
                return lengthInTicks;
            },

            /**
             * Get all settings that should be saved with a project.
             * @return {Array} Array of objects with all data per track and rack.
             */
            getData = function() {
                var patternData = {
                        tracks: []
                    },
                    i = 0;

                for (i; i < trackCount; i++) {
                    patternData.tracks.push(tracks[i].getData());
                }

                return patternData;
            },
            
            /**
             * Only the patterns.createPattern uses it now.
             */
            getTrackCount = function() {
                return trackCount;
            },
            
            /**
             * Add an new track.
             */
            createTrack = function(steps) {
                tracks.push(WH.createTrack({
                    steps: steps, 
                    trackIndex: tracks.length
                }));
                trackCount = tracks.length;
            }, 
            
            /**
             * Update all the steps of the track and the length of the track.
             */
            updateTrack = function(trackIndex, steps) {
                tracks[trackIndex].setSteps(steps, trackIndex);
            };
        
        that = {};
        
        // create track objects
        for (var i = 0; i < trackCount; i++) {
            createTrack(specs.tracks[i].steps);
        }
        
        that.scanEvents = scanEvents;
        that.getTrackSteps = getTrackSteps;
        that.getDuration = getDuration;
        that.getData = getData;
        that.getTrackCount = getTrackCount;
        that.createTrack = createTrack;
        that.updateTrack = updateTrack;
        return that;
    }
    
    WH.createPattern = createPattern;

})(WH);