import 'js/dom.jsx';
import 'js/dom/webgl.jsx';
import 'typedarray.jsx';

class Hello {

	static function main() : void {
		var canvas = dom.id('webgl-canvas') as HTMLCanvasElement;
		var gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext;

		// points of vertices
		var vertices = [
			0.0, 0.5, 0.0,
			0.5, -0.5, 0.0,
			-0.5, -0.5, 0.0
		];

		var vbuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		// colors of verteces
		var colors = [
			1.0, 0.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.0, 0.0, 1.0, 1.0
		];
		var cbuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cbuf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		var indices = [ 0, 1, 2 ];
		var ibuf = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

		// shader of verteces
		var vshader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vshader, dom.id('vshader').innerHTML);
		gl.compileShader(vshader);
		var shederp = gl.getShaderParameter(vshader, gl.COMPILE_STATUS);
		if (!(gl.getShaderParameter(vshader, gl.COMPILE_STATUS) as boolean)) {
			dom.window.alert(gl.getShaderInfoLog(vshader));
			return;
		}

		// shader of fragments
		var fshader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fshader, dom.id('fshader').innerHTML);
		gl.compileShader(fshader);
		if (!(gl.getShaderParameter(fshader, gl.COMPILE_STATUS) as boolean)) {
			dom.window.alert(gl.getShaderInfoLog(fshader));
			return;
		}


		var program = gl.createProgram();
		gl.attachShader(program, vshader);
		gl.attachShader(program, fshader);
		gl.bindAttribLocation(program, 0, 'position');
		gl.bindAttribLocation(program, 1, 'color');
		gl.linkProgram(program);
		if (!(gl.getProgramParameter(program, gl.LINK_STATUS) as boolean)) {
			dom.window.alert(gl.getProgramInfoLog(program));
			return;
		}

		// draw
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);
		gl.bindBuffer(gl.ARRAY_BUFFER, cbuf);
		gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(1);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf);
		gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
		gl.flush();
	}

}

