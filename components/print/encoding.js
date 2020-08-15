(function(global){if(typeof module!=="undefined"&&module.exports&&!global["encoding-indexes"]){global["encoding-indexes"]=require("./encoding-indexes.js")["encoding-indexes"]}function inRange(a,min,max){return min<=a&&a<=max}function includes(array,item){return array.indexOf(item)!==-1}var floor=Math.floor;function ToDictionary(o){if(o===undefined){return{}}if(o===Object(o)){return o}throw TypeError("Could not convert argument to dictionary")}function stringToCodePoints(string){var s=String(string);var n=s.length;var i=0;var u=[];while(i<n){var c=s.charCodeAt(i);if(c<55296||c>57343){u.push(c)}else{if(56320<=c&&c<=57343){u.push(65533)}else{if(55296<=c&&c<=56319){if(i===n-1){u.push(65533)}else{var d=s.charCodeAt(i+1);if(56320<=d&&d<=57343){var a=c&1023;var b=d&1023;u.push(65536+(a<<10)+b);i+=1}else{u.push(65533)}}}}}i+=1}return u}function codePointsToString(code_points){var s="";for(var i=0;i<code_points.length;++i){var cp=code_points[i];if(cp<=65535){s+=String.fromCharCode(cp)}else{cp-=65536;s+=String.fromCharCode((cp>>10)+55296,(cp&1023)+56320)}}return s}function isASCIIByte(a){return 0<=a&&a<=127}var isASCIICodePoint=isASCIIByte;var end_of_stream=-1;function Stream(tokens){this.tokens=[].slice.call(tokens);this.tokens.reverse()}Stream.prototype={endOfStream:function(){return !this.tokens.length},read:function(){if(!this.tokens.length){return end_of_stream}return this.tokens.pop()},prepend:function(token){if(Array.isArray(token)){var tokens=(token);while(tokens.length){this.tokens.push(tokens.pop())}}else{this.tokens.push(token)}},push:function(token){if(Array.isArray(token)){var tokens=(token);while(tokens.length){this.tokens.unshift(tokens.shift())}}else{this.tokens.unshift(token)}}};var finished=-1;function decoderError(fatal,opt_code_point){if(fatal){throw TypeError("Decoder error")}return opt_code_point||65533}function encoderError(code_point){throw TypeError("The code point "+code_point+" could not be encoded.")}function Decoder(){}Decoder.prototype={handler:function(stream,bite){}};function Encoder(){}Encoder.prototype={handler:function(stream,code_point){}};function getEncoding(label){label=String(label).trim().toLowerCase();if(Object.prototype.hasOwnProperty.call(label_to_encoding,label)){return label_to_encoding[label]}return null}var encodings=[{"encodings":[{"labels":["unicode-1-1-utf-8","utf-8","utf8"],"name":"UTF-8"}],"heading":"The Encoding"},{"encodings":[{"labels":["866","cp866","csibm866","ibm866"],"name":"IBM866"},{"labels":["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],"name":"ISO-8859-2"},{"labels":["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],"name":"ISO-8859-3"},{"labels":["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],"name":"ISO-8859-4"},{"labels":["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],"name":"ISO-8859-5"},{"labels":["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],"name":"ISO-8859-6"},{"labels":["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],"name":"ISO-8859-7"},{"labels":["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],"name":"ISO-8859-8"},{"labels":["csiso88598i","iso-8859-8-i","logical"],"name":"ISO-8859-8-I"},{"labels":["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],"name":"ISO-8859-10"},{"labels":["iso-8859-13","iso8859-13","iso885913"],"name":"ISO-8859-13"},{"labels":["iso-8859-14","iso8859-14","iso885914"],"name":"ISO-8859-14"},{"labels":["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],"name":"ISO-8859-15"},{"labels":["iso-8859-16"],"name":"ISO-8859-16"},{"labels":["cskoi8r","koi","koi8","koi8-r","koi8_r"],"name":"KOI8-R"},{"labels":["koi8-ru","koi8-u"],"name":"KOI8-U"},{"labels":["csmacintosh","mac","macintosh","x-mac-roman"],"name":"macintosh"},{"labels":["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],"name":"windows-874"},{"labels":["cp1250","windows-1250","x-cp1250"],"name":"windows-1250"},{"labels":["cp1251","windows-1251","x-cp1251"],"name":"windows-1251"},{"labels":["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],"name":"windows-1252"},{"labels":["cp1253","windows-1253","x-cp1253"],"name":"windows-1253"},{"labels":["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],"name":"windows-1254"},{"labels":["cp1255","windows-1255","x-cp1255"],"name":"windows-1255"},{"labels":["cp1256","windows-1256","x-cp1256"],"name":"windows-1256"},{"labels":["cp1257","windows-1257","x-cp1257"],"name":"windows-1257"},{"labels":["cp1258","windows-1258","x-cp1258"],"name":"windows-1258"},{"labels":["x-mac-cyrillic","x-mac-ukrainian"],"name":"x-mac-cyrillic"}],"heading":"Legacy single-byte encodings"},{"encodings":[{"labels":["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],"name":"GBK"},{"labels":["gb18030"],"name":"gb18030"}],"heading":"Legacy multi-byte Chinese (simplified) encodings"},{"encodings":[{"labels":["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],"name":"Big5"}],"heading":"Legacy multi-byte Chinese (traditional) encodings"},{"encodings":[{"labels":["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],"name":"EUC-JP"},{"labels":["csiso2022jp","iso-2022-jp"],"name":"ISO-2022-JP"},{"labels":["csshiftjis","ms932","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],"name":"Shift_JIS"}],"heading":"Legacy multi-byte Japanese encodings"},{"encodings":[{"labels":["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],"name":"EUC-KR"}],"heading":"Legacy multi-byte Korean encodings"},{"encodings":[{"labels":["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr"],"name":"replacement"},{"labels":["utf-16be"],"name":"UTF-16BE"},{"labels":["utf-16","utf-16le"],"name":"UTF-16LE"},{"labels":["x-user-defined"],"name":"x-user-defined"}],"heading":"Legacy miscellaneous encodings"}];
var label_to_encoding={};encodings.forEach(function(category){category.encodings.forEach(function(encoding){encoding.labels.forEach(function(label){label_to_encoding[label]=encoding})})});var encoders={};var decoders={};function indexCodePointFor(pointer,index){if(!index){return null}return index[pointer]||null}function indexPointerFor(code_point,index){var pointer=index.indexOf(code_point);return pointer===-1?null:pointer}function index(name){if(!("encoding-indexes" in global)){throw Error("Indexes missing."+" Did you forget to include encoding-indexes.js first?")}return global["encoding-indexes"][name]}function indexGB18030RangesCodePointFor(pointer){if((pointer>39419&&pointer<189000)||(pointer>1237575)){return null}if(pointer===7457){return 59335}var offset=0;var code_point_offset=0;var idx=index("gb18030-ranges");var i;for(i=0;i<idx.length;++i){var entry=idx[i];if(entry[0]<=pointer){offset=entry[0];code_point_offset=entry[1]}else{break}}return code_point_offset+pointer-offset}function indexGB18030RangesPointerFor(code_point){if(code_point===59335){return 7457}var offset=0;var pointer_offset=0;var idx=index("gb18030-ranges");var i;for(i=0;i<idx.length;++i){var entry=idx[i];if(entry[1]<=code_point){offset=entry[1];pointer_offset=entry[0]}else{break}}return pointer_offset+code_point-offset}function indexShiftJISPointerFor(code_point){shift_jis_index=shift_jis_index||index("jis0208").map(function(code_point,pointer){return inRange(pointer,8272,8835)?null:code_point});var index_=shift_jis_index;return index_.indexOf(code_point)}var shift_jis_index;function indexBig5PointerFor(code_point){big5_index_no_hkscs=big5_index_no_hkscs||index("big5").map(function(code_point,pointer){return(pointer<(161-129)*157)?null:code_point});var index_=big5_index_no_hkscs;if(code_point===9552||code_point===9566||code_point===9569||code_point===9578||code_point===21313||code_point===21317){return index_.lastIndexOf(code_point)}return indexPointerFor(code_point,index_)}var big5_index_no_hkscs;var DEFAULT_ENCODING="utf-8";function TextDecoder(label,options){if(!(this instanceof TextDecoder)){throw TypeError("Called as a function. Did you forget 'new'?")}label=label!==undefined?String(label):DEFAULT_ENCODING;options=ToDictionary(options);this._encoding=null;this._decoder=null;this._ignoreBOM=false;this._BOMseen=false;this._error_mode="replacement";this._do_not_flush=false;var encoding=getEncoding(label);if(encoding===null||encoding.name==="replacement"){throw RangeError("Unknown encoding: "+label)}if(!decoders[encoding.name]){throw Error("Decoder not present."+" Did you forget to include encoding-indexes.js first?")}var dec=this;dec._encoding=encoding;if(Boolean(options["fatal"])){dec._error_mode="fatal"}if(Boolean(options["ignoreBOM"])){dec._ignoreBOM=true}if(!Object.defineProperty){this.encoding=dec._encoding.name.toLowerCase();this.fatal=dec._error_mode==="fatal";this.ignoreBOM=dec._ignoreBOM}return dec}if(Object.defineProperty){Object.defineProperty(TextDecoder.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}});Object.defineProperty(TextDecoder.prototype,"fatal",{get:function(){return this._error_mode==="fatal"}});Object.defineProperty(TextDecoder.prototype,"ignoreBOM",{get:function(){return this._ignoreBOM}})}TextDecoder.prototype.decode=function decode(input,options){var bytes;if(typeof input==="object"&&input instanceof ArrayBuffer){bytes=new Uint8Array(input)}else{if(typeof input==="object"&&"buffer" in input&&input.buffer instanceof ArrayBuffer){bytes=new Uint8Array(input.buffer,input.byteOffset,input.byteLength)}else{bytes=new Uint8Array(0)}}options=ToDictionary(options);if(!this._do_not_flush){this._decoder=decoders[this._encoding.name]({fatal:this._error_mode==="fatal"});this._BOMseen=false}this._do_not_flush=Boolean(options["stream"]);var input_stream=new Stream(bytes);var output=[];var result;while(true){var token=input_stream.read();if(token===end_of_stream){break}result=this._decoder.handler(input_stream,token);if(result===finished){break}if(result!==null){if(Array.isArray(result)){output.push.apply(output,(result))}else{output.push(result)}}}if(!this._do_not_flush){do{result=this._decoder.handler(input_stream,input_stream.read());if(result===finished){break}if(result===null){continue}if(Array.isArray(result)){output.push.apply(output,(result))}else{output.push(result)}}while(!input_stream.endOfStream());this._decoder=null}function serializeStream(stream){if(includes(["UTF-8","UTF-16LE","UTF-16BE"],this._encoding.name)&&!this._ignoreBOM&&!this._BOMseen){if(stream.length>0&&stream[0]===65279){this._BOMseen=true;stream.shift()}else{if(stream.length>0){this._BOMseen=true}else{}}}return codePointsToString(stream)}return serializeStream.call(this,output)};function TextEncoder(label,options){if(!(this instanceof TextEncoder)){throw TypeError("Called as a function. Did you forget 'new'?")}options=ToDictionary(options);this._encoding=null;this._encoder=null;this._do_not_flush=false;this._fatal=Boolean(options["fatal"])?"fatal":"replacement";
var enc=this;if(Boolean(options["NONSTANDARD_allowLegacyEncoding"])){label=label!==undefined?String(label):DEFAULT_ENCODING;var encoding=getEncoding(label);if(encoding===null||encoding.name==="replacement"){throw RangeError("Unknown encoding: "+label)}if(!encoders[encoding.name]){throw Error("Encoder not present."+" Did you forget to include encoding-indexes.js first?")}enc._encoding=encoding}else{enc._encoding=getEncoding("utf-8");if(label!==undefined&&"console" in global){console.warn("TextEncoder constructor called with encoding label, "+"which is ignored.")}}if(!Object.defineProperty){this.encoding=enc._encoding.name.toLowerCase()}return enc}if(Object.defineProperty){Object.defineProperty(TextEncoder.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}})}TextEncoder.prototype.encode=function encode(opt_string,options){opt_string=opt_string===undefined?"":String(opt_string);options=ToDictionary(options);if(!this._do_not_flush){this._encoder=encoders[this._encoding.name]({fatal:this._fatal==="fatal"})}this._do_not_flush=Boolean(options["stream"]);var input=new Stream(stringToCodePoints(opt_string));var output=[];var result;while(true){var token=input.read();if(token===end_of_stream){break}result=this._encoder.handler(input,token);if(result===finished){break}if(Array.isArray(result)){output.push.apply(output,(result))}else{output.push(result)}}if(!this._do_not_flush){while(true){result=this._encoder.handler(input,input.read());if(result===finished){break}if(Array.isArray(result)){output.push.apply(output,(result))}else{output.push(result)}}this._encoder=null}return new Uint8Array(output)};function UTF8Decoder(options){var fatal=options.fatal;var utf8_code_point=0,utf8_bytes_seen=0,utf8_bytes_needed=0,utf8_lower_boundary=128,utf8_upper_boundary=191;this.handler=function(stream,bite){if(bite===end_of_stream&&utf8_bytes_needed!==0){utf8_bytes_needed=0;return decoderError(fatal)}if(bite===end_of_stream){return finished}if(utf8_bytes_needed===0){if(inRange(bite,0,127)){return bite}else{if(inRange(bite,194,223)){utf8_bytes_needed=1;utf8_code_point=bite&31}else{if(inRange(bite,224,239)){if(bite===224){utf8_lower_boundary=160}if(bite===237){utf8_upper_boundary=159}utf8_bytes_needed=2;utf8_code_point=bite&15}else{if(inRange(bite,240,244)){if(bite===240){utf8_lower_boundary=144}if(bite===244){utf8_upper_boundary=143}utf8_bytes_needed=3;utf8_code_point=bite&7}else{return decoderError(fatal)}}}}return null}if(!inRange(bite,utf8_lower_boundary,utf8_upper_boundary)){utf8_code_point=utf8_bytes_needed=utf8_bytes_seen=0;utf8_lower_boundary=128;utf8_upper_boundary=191;stream.prepend(bite);return decoderError(fatal)}utf8_lower_boundary=128;utf8_upper_boundary=191;utf8_code_point=(utf8_code_point<<6)|(bite&63);utf8_bytes_seen+=1;if(utf8_bytes_seen!==utf8_bytes_needed){return null}var code_point=utf8_code_point;utf8_code_point=utf8_bytes_needed=utf8_bytes_seen=0;return code_point}}function UTF8Encoder(options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point}var count,offset;if(inRange(code_point,128,2047)){count=1;offset=192}else{if(inRange(code_point,2048,65535)){count=2;offset=224}else{if(inRange(code_point,65536,1114111)){count=3;offset=240}}}var bytes=[(code_point>>(6*count))+offset];while(count>0){var temp=code_point>>(6*(count-1));bytes.push(128|(temp&63));count-=1}return bytes}}encoders["UTF-8"]=function(options){return new UTF8Encoder(options)};decoders["UTF-8"]=function(options){return new UTF8Decoder(options)};function SingleByteDecoder(index,options){var fatal=options.fatal;this.handler=function(stream,bite){if(bite===end_of_stream){return finished}if(isASCIIByte(bite)){return bite}var code_point=index[bite-128];if(code_point===null){return decoderError(fatal)}return code_point}}function SingleByteEncoder(index,options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point}var pointer=indexPointerFor(code_point,index);if(pointer===null){encoderError(code_point)}return pointer+128}}(function(){if(!("encoding-indexes" in global)){return}encodings.forEach(function(category){if(category.heading!=="Legacy single-byte encodings"){return}category.encodings.forEach(function(encoding){var name=encoding.name;var idx=index(name.toLowerCase());decoders[name]=function(options){return new SingleByteDecoder(idx,options)};encoders[name]=function(options){return new SingleByteEncoder(idx,options)}})})}());decoders["GBK"]=function(options){return new GB18030Decoder(options)};encoders["GBK"]=function(options){return new GB18030Encoder(options,true)};function GB18030Decoder(options){var fatal=options.fatal;var gb18030_first=0,gb18030_second=0,gb18030_third=0;this.handler=function(stream,bite){if(bite===end_of_stream&&gb18030_first===0&&gb18030_second===0&&gb18030_third===0){return finished}if(bite===end_of_stream&&(gb18030_first!==0||gb18030_second!==0||gb18030_third!==0)){gb18030_first=0;
gb18030_second=0;gb18030_third=0;decoderError(fatal)}var code_point;if(gb18030_third!==0){code_point=null;if(inRange(bite,48,57)){code_point=indexGB18030RangesCodePointFor((((gb18030_first-129)*10+gb18030_second-48)*126+gb18030_third-129)*10+bite-48)}var buffer=[gb18030_second,gb18030_third,bite];gb18030_first=0;gb18030_second=0;gb18030_third=0;if(code_point===null){stream.prepend(buffer);return decoderError(fatal)}return code_point}if(gb18030_second!==0){if(inRange(bite,129,254)){gb18030_third=bite;return null}stream.prepend([gb18030_second,bite]);gb18030_first=0;gb18030_second=0;return decoderError(fatal)}if(gb18030_first!==0){if(inRange(bite,48,57)){gb18030_second=bite;return null}var lead=gb18030_first;var pointer=null;gb18030_first=0;var offset=bite<127?64:65;if(inRange(bite,64,126)||inRange(bite,128,254)){pointer=(lead-129)*190+(bite-offset)}code_point=pointer===null?null:indexCodePointFor(pointer,index("gb18030"));if(code_point===null&&isASCIIByte(bite)){stream.prepend(bite)}if(code_point===null){return decoderError(fatal)}return code_point}if(isASCIIByte(bite)){return bite}if(bite===128){return 8364}if(inRange(bite,129,254)){gb18030_first=bite;return null}return decoderError(fatal)}}function GB18030Encoder(options,gbk_flag){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point}if(code_point===58853){return encoderError(code_point)}if(gbk_flag&&code_point===8364){return 128}var pointer=indexPointerFor(code_point,index("gb18030"));if(pointer!==null){var lead=floor(pointer/190)+129;var trail=pointer%190;var offset=trail<63?64:65;return[lead,trail+offset]}if(gbk_flag){return encoderError(code_point)}pointer=indexGB18030RangesPointerFor(code_point);var byte1=floor(pointer/10/126/10);pointer=pointer-byte1*10*126*10;var byte2=floor(pointer/10/126);pointer=pointer-byte2*10*126;var byte3=floor(pointer/10);var byte4=pointer-byte3*10;return[byte1+129,byte2+48,byte3+129,byte4+48]}}encoders["gb18030"]=function(options){return new GB18030Encoder(options)};decoders["gb18030"]=function(options){return new GB18030Decoder(options)};function Big5Decoder(options){var fatal=options.fatal;var Big5_lead=0;this.handler=function(stream,bite){if(bite===end_of_stream&&Big5_lead!==0){Big5_lead=0;return decoderError(fatal)}if(bite===end_of_stream&&Big5_lead===0){return finished}if(Big5_lead!==0){var lead=Big5_lead;var pointer=null;Big5_lead=0;var offset=bite<127?64:98;if(inRange(bite,64,126)||inRange(bite,161,254)){pointer=(lead-129)*157+(bite-offset)}switch(pointer){case 1133:return[202,772];case 1135:return[202,780];case 1164:return[234,772];case 1166:return[234,780]}var code_point=(pointer===null)?null:indexCodePointFor(pointer,index("big5"));if(code_point===null&&isASCIIByte(bite)){stream.prepend(bite)}if(code_point===null){return decoderError(fatal)}return code_point}if(isASCIIByte(bite)){return bite}if(inRange(bite,129,254)){Big5_lead=bite;return null}return decoderError(fatal)}}function Big5Encoder(options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point}var pointer=indexBig5PointerFor(code_point);if(pointer===null){return encoderError(code_point)}var lead=floor(pointer/157)+129;if(lead<161){return encoderError(code_point)}var trail=pointer%157;var offset=trail<63?64:98;return[lead,trail+offset]}}encoders["Big5"]=function(options){return new Big5Encoder(options)};decoders["Big5"]=function(options){return new Big5Decoder(options)};function EUCJPDecoder(options){var fatal=options.fatal;var eucjp_jis0212_flag=false,eucjp_lead=0;this.handler=function(stream,bite){if(bite===end_of_stream&&eucjp_lead!==0){eucjp_lead=0;return decoderError(fatal)}if(bite===end_of_stream&&eucjp_lead===0){return finished}if(eucjp_lead===142&&inRange(bite,161,223)){eucjp_lead=0;return 65377-161+bite}if(eucjp_lead===143&&inRange(bite,161,254)){eucjp_jis0212_flag=true;eucjp_lead=bite;return null}if(eucjp_lead!==0){var lead=eucjp_lead;eucjp_lead=0;var code_point=null;if(inRange(lead,161,254)&&inRange(bite,161,254)){code_point=indexCodePointFor((lead-161)*94+(bite-161),index(!eucjp_jis0212_flag?"jis0208":"jis0212"))}eucjp_jis0212_flag=false;if(!inRange(bite,161,254)){stream.prepend(bite)}if(code_point===null){return decoderError(fatal)}return code_point}if(isASCIIByte(bite)){return bite}if(bite===142||bite===143||inRange(bite,161,254)){eucjp_lead=bite;return null}return decoderError(fatal)}}function EUCJPEncoder(options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point}if(code_point===165){return 92}if(code_point===8254){return 126}if(inRange(code_point,65377,65439)){return[142,code_point-65377+161]}if(code_point===8722){code_point=65293}var pointer=indexPointerFor(code_point,index("jis0208"));if(pointer===null){return encoderError(code_point)
}var lead=floor(pointer/94)+161;var trail=pointer%94+161;return[lead,trail]}}encoders["EUC-JP"]=function(options){return new EUCJPEncoder(options)};decoders["EUC-JP"]=function(options){return new EUCJPDecoder(options)};function ISO2022JPDecoder(options){var fatal=options.fatal;var states={ASCII:0,Roman:1,Katakana:2,LeadByte:3,TrailByte:4,EscapeStart:5,Escape:6};var iso2022jp_decoder_state=states.ASCII,iso2022jp_decoder_output_state=states.ASCII,iso2022jp_lead=0,iso2022jp_output_flag=false;this.handler=function(stream,bite){switch(iso2022jp_decoder_state){default:case states.ASCII:if(bite===27){iso2022jp_decoder_state=states.EscapeStart;return null}if(inRange(bite,0,127)&&bite!==14&&bite!==15&&bite!==27){iso2022jp_output_flag=false;return bite}if(bite===end_of_stream){return finished}iso2022jp_output_flag=false;return decoderError(fatal);case states.Roman:if(bite===27){iso2022jp_decoder_state=states.EscapeStart;return null}if(bite===92){iso2022jp_output_flag=false;return 165}if(bite===126){iso2022jp_output_flag=false;return 8254}if(inRange(bite,0,127)&&bite!==14&&bite!==15&&bite!==27&&bite!==92&&bite!==126){iso2022jp_output_flag=false;return bite}if(bite===end_of_stream){return finished}iso2022jp_output_flag=false;return decoderError(fatal);case states.Katakana:if(bite===27){iso2022jp_decoder_state=states.EscapeStart;return null}if(inRange(bite,33,95)){iso2022jp_output_flag=false;return 65377-33+bite}if(bite===end_of_stream){return finished}iso2022jp_output_flag=false;return decoderError(fatal);case states.LeadByte:if(bite===27){iso2022jp_decoder_state=states.EscapeStart;return null}if(inRange(bite,33,126)){iso2022jp_output_flag=false;iso2022jp_lead=bite;iso2022jp_decoder_state=states.TrailByte;return null}if(bite===end_of_stream){return finished}iso2022jp_output_flag=false;return decoderError(fatal);case states.TrailByte:if(bite===27){iso2022jp_decoder_state=states.EscapeStart;return decoderError(fatal)}if(inRange(bite,33,126)){iso2022jp_decoder_state=states.LeadByte;var pointer=(iso2022jp_lead-33)*94+bite-33;var code_point=indexCodePointFor(pointer,index("jis0208"));if(code_point===null){return decoderError(fatal)}return code_point}if(bite===end_of_stream){iso2022jp_decoder_state=states.LeadByte;stream.prepend(bite);return decoderError(fatal)}iso2022jp_decoder_state=states.LeadByte;return decoderError(fatal);case states.EscapeStart:if(bite===36||bite===40){iso2022jp_lead=bite;iso2022jp_decoder_state=states.Escape;return null}stream.prepend(bite);iso2022jp_output_flag=false;iso2022jp_decoder_state=iso2022jp_decoder_output_state;return decoderError(fatal);case states.Escape:var lead=iso2022jp_lead;iso2022jp_lead=0;var state=null;if(lead===40&&bite===66){state=states.ASCII}if(lead===40&&bite===74){state=states.Roman}if(lead===40&&bite===73){state=states.Katakana}if(lead===36&&(bite===64||bite===66)){state=states.LeadByte}if(state!==null){iso2022jp_decoder_state=iso2022jp_decoder_state=state;var output_flag=iso2022jp_output_flag;iso2022jp_output_flag=true;return !output_flag?null:decoderError(fatal)}stream.prepend([lead,bite]);iso2022jp_output_flag=false;iso2022jp_decoder_state=iso2022jp_decoder_output_state;return decoderError(fatal)}}}function ISO2022JPEncoder(options){var fatal=options.fatal;var states={ASCII:0,Roman:1,jis0208:2};var iso2022jp_state=states.ASCII;this.handler=function(stream,code_point){if(code_point===end_of_stream&&iso2022jp_state!==states.ASCII){stream.prepend(code_point);iso2022jp_state=states.ASCII;return[27,40,66]}if(code_point===end_of_stream&&iso2022jp_state===states.ASCII){return finished}if((iso2022jp_state===states.ASCII||iso2022jp_state===states.Roman)&&(code_point===14||code_point===15||code_point===27)){return encoderError(65533)}if(iso2022jp_state===states.ASCII&&isASCIICodePoint(code_point)){return code_point}if(iso2022jp_state===states.Roman&&((isASCIICodePoint(code_point)&&code_point!==92&&code_point!==126)||(code_point==165||code_point==8254))){if(isASCIICodePoint(code_point)){return code_point}if(code_point===165){return 92}if(code_point===8254){return 126}}if(isASCIICodePoint(code_point)&&iso2022jp_state!==states.ASCII){stream.prepend(code_point);iso2022jp_state=states.ASCII;return[27,40,66]}if((code_point===165||code_point===8254)&&iso2022jp_state!==states.Roman){stream.prepend(code_point);iso2022jp_state=states.Roman;return[27,40,74]}if(code_point===8722){code_point=65293}var pointer=indexPointerFor(code_point,index("jis0208"));if(pointer===null){return encoderError(code_point)}if(iso2022jp_state!==states.jis0208){stream.prepend(code_point);iso2022jp_state=states.jis0208;return[27,36,66]}var lead=floor(pointer/94)+33;var trail=pointer%94+33;return[lead,trail]}}encoders["ISO-2022-JP"]=function(options){return new ISO2022JPEncoder(options)};decoders["ISO-2022-JP"]=function(options){return new ISO2022JPDecoder(options)};function ShiftJISDecoder(options){var fatal=options.fatal;var Shift_JIS_lead=0;this.handler=function(stream,bite){if(bite===end_of_stream&&Shift_JIS_lead!==0){Shift_JIS_lead=0;
return decoderError(fatal)}if(bite===end_of_stream&&Shift_JIS_lead===0){return finished}if(Shift_JIS_lead!==0){var lead=Shift_JIS_lead;var pointer=null;Shift_JIS_lead=0;var offset=(bite<127)?64:65;var lead_offset=(lead<160)?129:193;if(inRange(bite,64,126)||inRange(bite,128,252)){pointer=(lead-lead_offset)*188+bite-offset}if(inRange(pointer,8836,10715)){return 57344-8836+pointer}var code_point=(pointer===null)?null:indexCodePointFor(pointer,index("jis0208"));if(code_point===null&&isASCIIByte(bite)){stream.prepend(bite)}if(code_point===null){return decoderError(fatal)}return code_point}if(isASCIIByte(bite)||bite===128){return bite}if(inRange(bite,161,223)){return 65377-161+bite}if(inRange(bite,129,159)||inRange(bite,224,252)){Shift_JIS_lead=bite;return null}return decoderError(fatal)}}function ShiftJISEncoder(options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)||code_point===128){return code_point}if(code_point===165){return 92}if(code_point===8254){return 126}if(inRange(code_point,65377,65439)){return code_point-65377+161}if(code_point===8722){code_point=65293}var pointer=indexShiftJISPointerFor(code_point);if(pointer===null){return encoderError(code_point)}var lead=floor(pointer/188);var lead_offset=(lead<31)?129:193;var trail=pointer%188;var offset=(trail<63)?64:65;return[lead+lead_offset,trail+offset]}}encoders["Shift_JIS"]=function(options){return new ShiftJISEncoder(options)};decoders["Shift_JIS"]=function(options){return new ShiftJISDecoder(options)};function EUCKRDecoder(options){var fatal=options.fatal;var euckr_lead=0;this.handler=function(stream,bite){if(bite===end_of_stream&&euckr_lead!==0){euckr_lead=0;return decoderError(fatal)}if(bite===end_of_stream&&euckr_lead===0){return finished}if(euckr_lead!==0){var lead=euckr_lead;var pointer=null;euckr_lead=0;if(inRange(bite,65,254)){pointer=(lead-129)*190+(bite-65)}var code_point=(pointer===null)?null:indexCodePointFor(pointer,index("euc-kr"));if(pointer===null&&isASCIIByte(bite)){stream.prepend(bite)}if(code_point===null){return decoderError(fatal)}return code_point}if(isASCIIByte(bite)){return bite}if(inRange(bite,129,254)){euckr_lead=bite;return null}return decoderError(fatal)}}function EUCKREncoder(options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point}var pointer=indexPointerFor(code_point,index("euc-kr"));if(pointer===null){return encoderError(code_point)}var lead=floor(pointer/190)+129;var trail=(pointer%190)+65;return[lead,trail]}}encoders["EUC-KR"]=function(options){return new EUCKREncoder(options)};decoders["EUC-KR"]=function(options){return new EUCKRDecoder(options)};function convertCodeUnitToBytes(code_unit,utf16be){var byte1=code_unit>>8;var byte2=code_unit&255;if(utf16be){return[byte1,byte2]}return[byte2,byte1]}function UTF16Decoder(utf16_be,options){var fatal=options.fatal;var utf16_lead_byte=null,utf16_lead_surrogate=null;this.handler=function(stream,bite){if(bite===end_of_stream&&(utf16_lead_byte!==null||utf16_lead_surrogate!==null)){return decoderError(fatal)}if(bite===end_of_stream&&utf16_lead_byte===null&&utf16_lead_surrogate===null){return finished}if(utf16_lead_byte===null){utf16_lead_byte=bite;return null}var code_unit;if(utf16_be){code_unit=(utf16_lead_byte<<8)+bite}else{code_unit=(bite<<8)+utf16_lead_byte}utf16_lead_byte=null;if(utf16_lead_surrogate!==null){var lead_surrogate=utf16_lead_surrogate;utf16_lead_surrogate=null;if(inRange(code_unit,56320,57343)){return 65536+(lead_surrogate-55296)*1024+(code_unit-56320)}stream.prepend(convertCodeUnitToBytes(code_unit,utf16_be));return decoderError(fatal)}if(inRange(code_unit,55296,56319)){utf16_lead_surrogate=code_unit;return null}if(inRange(code_unit,56320,57343)){return decoderError(fatal)}return code_unit}}function UTF16Encoder(utf16_be,options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(inRange(code_point,0,65535)){return convertCodeUnitToBytes(code_point,utf16_be)}var lead=convertCodeUnitToBytes(((code_point-65536)>>10)+55296,utf16_be);var trail=convertCodeUnitToBytes(((code_point-65536)&1023)+56320,utf16_be);return lead.concat(trail)}}encoders["UTF-16BE"]=function(options){return new UTF16Encoder(true,options)};decoders["UTF-16BE"]=function(options){return new UTF16Decoder(true,options)};encoders["UTF-16LE"]=function(options){return new UTF16Encoder(false,options)};decoders["UTF-16LE"]=function(options){return new UTF16Decoder(false,options)};function XUserDefinedDecoder(options){var fatal=options.fatal;this.handler=function(stream,bite){if(bite===end_of_stream){return finished}if(isASCIIByte(bite)){return bite}return 63360+bite-128}}function XUserDefinedEncoder(options){var fatal=options.fatal;this.handler=function(stream,code_point){if(code_point===end_of_stream){return finished}if(isASCIICodePoint(code_point)){return code_point
}if(inRange(code_point,63360,63487)){return code_point-63360+128}return encoderError(code_point)}}encoders["x-user-defined"]=function(options){return new XUserDefinedEncoder(options)};decoders["x-user-defined"]=function(options){return new XUserDefinedDecoder(options)};if(!global["TextEncoder"]){global["TextEncoder"]=TextEncoder}if(!global["TextDecoder"]){global["TextDecoder"]=TextDecoder}if(typeof module!=="undefined"&&module.exports){module.exports={TextEncoder:global["TextEncoder"],TextDecoder:global["TextDecoder"],EncodingIndexes:global["encoding-indexes"]}}}(this||{}));