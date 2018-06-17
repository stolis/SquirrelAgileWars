var GameObject = Class.extend({
    transform: {
        x: 0,
        y: 0,
        rotation: 0
    },
    init: function(transform) {
        this.transform = transform;
    },
    getTransform: function() {
        return this.transform;
    },
    setTransform: function(transform) {
        this.transform = transform;
    }
});