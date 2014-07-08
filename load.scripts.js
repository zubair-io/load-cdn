var loadScript = function(url, hash, callback){

var md5 = function() {
	var $0 = [], // res
		$1 = new Int32Array(16), // tail
		$2 = new Int32Array(16), // blocks
		$3 = [128, 32768, 8388608, -2147483648], // c4
		$4 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], // c16
		$5 = [0, 8, 16, 24]; // cS

	function encode(s, sLen) {
		var utf = "", start = end = 0;

		for(var i = 0;i < sLen;i++) {
			var c1 = s.charCodeAt(i),
				enc = null;

			if(c1 < 128)
				end++;
			else if(c1 > 127 && c1 < 2048)
				enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
			else
				enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);

			if(enc != null) {
				if(end > start)
					utf += s.slice(start, end);
				utf += enc;
				start = end = i + 1;
			}
		}

		if(end > start)
			utf += s.slice(start, sLen);

		return utf;
	}

	function md51(s, sLen) {
		var state,
			N = sLen,
			i, I;

		s += "";

		if(sLen > 63) {
			getBlocks(s.substring(0, 64));
			state = md5cycle($2);

			for(i = 128;i <= sLen;i += 64) {
				getBlocks(s.substring(i - 64, i));
				state = md5cycleAdd(state, $2);
			}

			s = s.substring(i - 64);
			N = s.length;
		}

		for(i = ~~(N / 4);i < 16;i++) $1[i] = 0;

		for(i = 0;i < N;i++) {
			I = i % 4;
			if(I == 0)
				$1[i >> 2] = s.charCodeAt(i) << $5[I];
			else
				$1[i >> 2] |= s.charCodeAt(i) << $5[I];
		}
		$1[i >> 2] |= $3[i % 4];

		if(i > 55) {
			state = md5cycle($1);

			return md5cycleAdd(state, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, sLen * 8, 0]);
		}
		$1[14] = sLen * 8;

		return !state ? md5cycle($1) : md5cycleAdd(state, $1);
	}

	function getBlocks(s) {
		for(var i = 16;i--;) {
			var I = i << 2;
			$2[i] = s.charCodeAt(I) + (s.charCodeAt(I + 1) << 8) + (s.charCodeAt(I + 2) << 16) + (s.charCodeAt(I + 3) << 24);
		}
	}

	function md5_main(s, arr, enc) {
		var sLen = s.length;
		if(enc) {
			s = encode(s, sLen);
			sLen = s.length;
		}
		var result = md51(s, sLen);

		var tmp = result[0];$0[1] = $4[tmp & 15];
		tmp >>= 4;$0[0] = $4[tmp & 15];
		tmp >>= 4;$0[3] = $4[tmp & 15];
		tmp >>= 4;$0[2] = $4[tmp & 15];
		tmp >>= 4;$0[5] = $4[tmp & 15];
		tmp >>= 4;$0[4] = $4[tmp & 15];
		tmp >>= 4;$0[7] = $4[tmp & 15];
		tmp >>= 4;$0[6] = $4[tmp & 15];

		tmp = result[1];$0[9] = $4[tmp & 15];
		tmp >>= 4;$0[8] = $4[tmp & 15];
		tmp >>= 4;$0[11] = $4[tmp & 15];
		tmp >>= 4;$0[10] = $4[tmp & 15];
		tmp >>= 4;$0[13] = $4[tmp & 15];
		tmp >>= 4;$0[12] = $4[tmp & 15];
		tmp >>= 4;$0[15] = $4[tmp & 15];
		tmp >>= 4;$0[14] = $4[tmp & 15];

		tmp = result[2];$0[17] = $4[tmp & 15];
		tmp >>= 4;$0[16] = $4[tmp & 15];
		tmp >>= 4;$0[19] = $4[tmp & 15];
		tmp >>= 4;$0[18] = $4[tmp & 15];
		tmp >>= 4;$0[21] = $4[tmp & 15];
		tmp >>= 4;$0[20] = $4[tmp & 15];
		tmp >>= 4;$0[23] = $4[tmp & 15];
		tmp >>= 4;$0[22] = $4[tmp & 15];

		tmp = result[3];$0[25] = $4[tmp & 15];
		tmp >>= 4;$0[24] = $4[tmp & 15];
		tmp >>= 4;$0[27] = $4[tmp & 15];
		tmp >>= 4;$0[26] = $4[tmp & 15];
		tmp >>= 4;$0[29] = $4[tmp & 15];
		tmp >>= 4;$0[28] = $4[tmp & 15];
		tmp >>= 4;$0[31] = $4[tmp & 15];
		tmp >>= 4;$0[30] = $4[tmp & 15];

		return arr ? $0 : $0.join("");
	}

	var md5_asmjs = (function(std, env, buf) {
		"use asm";

		var TA = new std.Int32Array(buf);

		function R(q, a, b, x, s1, s2, t) {
			a += q + x + t;
			return ((a << s1 | a >>> s2) + b) << 0;
		}

		function md5cycle(k) {
			md5_rounds(0, 0, 0, 0, k, 1);

			TA[0] = (TA[0] + 1732584193) << 0;
			TA[1] = (TA[1] - 271733879) << 0;
			TA[2] = (TA[2] - 1732584194) << 0;
			TA[3] = (TA[3] + 271733878) << 0;

			return TA;
		}

		function md5cycleAdd(x, k) {
			md5_rounds(x[0], x[1], x[2], x[3], k, 0);

			TA[0] = (TA[0] + x[0]) << 0;
			TA[1] = (TA[1] + x[1]) << 0;
			TA[2] = (TA[2] + x[2]) << 0;
			TA[3] = (TA[3] + x[3]) << 0;

			return TA;
		}

		function md5_rounds(a, b, c, d, k, simple) {
			var bc, da;

			if(simple == 1) {
				a = k[0] - 680876937;
				a = ((a << 7 | a >>> 25) - 271733879) << 0;
				d = k[1] - 117830708 + ((2004318071 & a) ^ -1732584194);
				d = ((d << 12 | d >>> 20) + a) << 0;
				c = k[2] - 1126478375 + (((a ^ -271733879) & d) ^ -271733879);
				c = ((c << 17 | c >>> 15) + d) << 0;
				b = k[3] - 1316259209 + (((d ^ a) & c) ^ a);
				b = ((b << 22 | b >>> 10) + c) << 0;
			}else{
				a = R(((c ^ d) & b) ^ d, a, b, k[0], 7, 25, -680876936);
				d = R(((b ^ c) & a) ^ c, d, a, k[1], 12, 20, -389564586);
				c = R(((a ^ b) & d) ^ b, c, d, k[2], 17, 15, 606105819);
				b = R(((d ^ a) & c) ^ a, b, c, k[3], 22, 10, -1044525330);
			}

			a = R(((c ^ d) & b) ^ d, a, b, k[4], 7, 25, -176418897);
			d = R(((b ^ c) & a) ^ c, d, a, k[5], 12, 20, 1200080426);
			c = R(((a ^ b) & d) ^ b, c, d, k[6], 17, 15, -1473231341);
			b = R(((d ^ a) & c) ^ a, b, c, k[7], 22, 10, -45705983);
			a = R(((c ^ d) & b) ^ d, a, b, k[8], 7, 25, 1770035416);
			d = R(((b ^ c) & a) ^ c, d, a, k[9], 12, 20, -1958414417);
			c = R(((a ^ b) & d) ^ b, c, d, k[10], 17, 15, -42063);
			b = R(((d ^ a) & c) ^ a, b, c, k[11], 22, 10, -1990404162);
			a = R(((c ^ d) & b) ^ d, a, b, k[12], 7, 25, 1804603682);
			d = R(((b ^ c) & a) ^ c, d, a, k[13], 12, 20, -40341101);
			c = R(((a ^ b) & d) ^ b, c, d, k[14], 17, 15, -1502002290);
			b = R(((d ^ a) & c) ^ a, b, c, k[15], 22, 10, 1236535329);

			a = R(((b ^ c) & d) ^ c, a, b, k[1], 5, 27, -165796510);
			d = R(((a ^ b) & c) ^ b, d, a, k[6], 9, 23, -1069501632);
			c = R(((d ^ a) & b) ^ a, c, d, k[11], 14, 18, 643717713);
			b = R(((c ^ d) & a) ^ d, b, c, k[0], 20, 12, -373897302);
			a = R(((b ^ c) & d) ^ c, a, b, k[5], 5, 27, -701558691);
			d = R(((a ^ b) & c) ^ b, d, a, k[10], 9, 23, 38016083);
			c = R(((d ^ a) & b) ^ a, c, d, k[15], 14, 18, -660478335);
			b = R(((c ^ d) & a) ^ d, b, c, k[4], 20, 12, -405537848);
			a = R(((b ^ c) & d) ^ c, a, b, k[9], 5, 27, 568446438);
			d = R(((a ^ b) & c) ^ b, d, a, k[14], 9, 23, -1019803690);
			c = R(((d ^ a) & b) ^ a, c, d, k[3], 14, 18, -187363961);
			b = R(((c ^ d) & a) ^ d, b, c, k[8], 20, 12, 1163531501);
			a = R(((b ^ c) & d) ^ c, a, b, k[13], 5, 27, -1444681467);
			d = R(((a ^ b) & c) ^ b, d, a, k[2], 9, 23, -51403784);
			c = R(((d ^ a) & b) ^ a, c, d, k[7], 14, 18, 1735328473);
			b = R(((c ^ d) & a) ^ d, b, c, k[12], 20, 12, -1926607734);

			bc = b ^ c;
			a = R(bc ^ d, a, b, k[5], 4, 28, -378558);
			d = R(bc ^ a, d, a, k[8], 11, 21, -2022574463);
			da = d ^ a;
			c = R(da ^ b, c, d, k[11], 16, 16, 1839030562);
			b = R(da ^ c, b, c, k[14], 23, 9, -35309556);
			bc = b ^ c;
			a = R(bc ^ d, a, b, k[1], 4, 28, -1530992060);
			d = R(bc ^ a, d, a, k[4], 11, 21, 1272893353);
			da = d ^ a;
			c = R(da ^ b, c, d, k[7], 16, 16, -155497632);
			b = R(da ^ c, b, c, k[10], 23, 9, -1094730640);
			bc = b ^ c;
			a = R(bc ^ d, a, b, k[13], 4, 28, 681279174);
			d = R(bc ^ a, d, a, k[0], 11, 21, -358537222);
			da = d ^ a;
			c = R(da ^ b, c, d, k[3], 16, 16, -722521979);
			b = R(da ^ c, b, c, k[6], 23, 9, 76029189);
			bc = b ^ c;
			a = R(bc ^ d, a, b, k[9], 4, 28, -640364487);
			d = R(bc ^ a, d, a, k[12], 11, 21, -421815835);
			da = d ^ a;
			c = R(da ^ b, c, d, k[15], 16, 16, 530742520);
			b = R(da ^ c, b, c, k[2], 23, 9, -995338651);

			a = R(c ^ (b | ~d), a, b, k[0], 6, 26, -198630844);
			d = R(b ^ (a | ~c), d, a, k[7], 10, 22, 1126891415);
			c = R(a ^ (d | ~b), c, d, k[14], 15, 17, -1416354905);
			b = R(d ^ (c | ~a), b, c, k[5], 21, 11, -57434055);
			a = R(c ^ (b | ~d), a, b, k[12], 6, 26, 1700485571);
			d = R(b ^ (a | ~c), d, a, k[3], 10, 22, -1894986606);
			c = R(a ^ (d | ~b), c, d, k[10], 15, 17, -1051523);
			b = R(d ^ (c | ~a), b, c, k[1], 21, 11, -2054922799);
			a = R(c ^ (b | ~d), a, b, k[8], 6, 26, 1873313359);
			d = R(b ^ (a | ~c), d, a, k[15], 10, 22, -30611744);
			c = R(a ^ (d | ~b), c, d, k[6], 15, 17, -1560198380);
			b = R(d ^ (c | ~a), b, c, k[13], 21, 11, 1309151649);
			a = R(c ^ (b | ~d), a, b, k[4], 6, 26, -145523070);
			d = R(b ^ (a | ~c), d, a, k[11], 10, 22, -1120210379);
			c = R(a ^ (d | ~b), c, d, k[2], 15, 17, 718787259);
			b = R(d ^ (c | ~a), b, c, k[9], 21, 11, -343485551);

			TA[0] = a;
			TA[1] = b;
			TA[2] = c;
			TA[3] = d;
		}

		return {
			md5cycle: md5cycle,
			md5cycleAdd: md5cycleAdd
		};
	})(window, null, new ArrayBuffer(16));

	var md5cycle = md5_asmjs.md5cycle,
		md5cycleAdd = md5_asmjs.md5cycleAdd;

	return md5_main;

}();

var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState != 4 || xhr.status != 200) return;
    var responseHash = md5(r.responseText);
    if (responseHash = hash){

      eval(r.responseText);
      callback(false);
    }

};
xhr.send();

};
