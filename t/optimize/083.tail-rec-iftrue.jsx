/*EXPECTED
1
1
2
3
5
8
13
21
34
55
*/
/*JSX_OPTS
--optimize tail-rec
*/


class _Main {
	final static function fib(n : int, a : int = 1, b : int = 0) : int {
		if (!(n == 0 || n == 1)) {
			return _Main.fib(n - 1, a + b, a);
		}
		else {
			return a;
		}
	}

	static function main(args : string[]) : void {
		for (var n = 1; n < 11; ++n) {
			log _Main.fib(n);
		}
	}
}

