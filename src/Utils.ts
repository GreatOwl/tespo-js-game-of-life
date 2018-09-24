export module Utils{
    export var strings = {
        padLeft: function(padding, padWith, value): string {
            var length = value.length;
            var padToAdd = padding - length;
            if (padToAdd > 0) {
                return strings.padLeft(padding, padWith, padWith + value);
            }
            return value;
        }
    }
}
export default Utils;