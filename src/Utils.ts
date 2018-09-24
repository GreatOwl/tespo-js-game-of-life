export module Utils{
    export var strings = {
        padLeft: function(padding:number , inPadWith:any, inValue:any): string {
            var value:String = strings.ensureString(inValue);
            var padWith:String = strings.ensureString(inPadWith);
            var rawValue:string = value.padStart(padding, padWith.toString());
            return rawValue.substr(rawValue.length - padding, rawValue.length);
        },
        ensureString: function(value:any): String {
            if (value instanceof Number) {
                return value.toString();
            }
            return new String(value);
        }
    }
}
export default Utils;