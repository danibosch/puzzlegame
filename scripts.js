$(document).ready(function() {
	var img = new Image();
	img.src = 'fondo-11.jpg';
	var imgsrc = 'fondo-11.jpg';

	var board_width = 1900;
	var board_height = 800;

	img.onload = function() {
		var imgw = img.width;
		var imgh = img.height;

		const piezasw = 7;
		const piezash = 5;
		const totalpiezas = piezash * piezasw;
		const tamAncho = imgw / piezasw;
		const tamAlto = imgh / piezash;

		for (var x = 0; x < piezasw; x++) {
			for (var y = 0; y < piezash; y++) {
				var pieza = $("<div>").attr("class", 'pieza').attr("id", x * piezash + y).css({
					"width": tamAncho + "px",
					"height": tamAlto + "px",
					"background-image": "url(" + imgsrc + ")",
					"background-position": -x * tamAncho + "px " + -y * tamAlto + "px",
					"position": "absolute",
					"top": Math.random() * (board_height - tamAlto) + 50 + "px",
					"left": Math.random() * (board_width - tamAncho) + "px"
				}).text("pieza" + x + "-" + y + " - id: " + (x * piezash + y));

				$("#puzzle").append(pieza);
			}
		}
		$("#puzzle .pieza").on("mousedown", function(e) {
			if (e.buttons != 1) {
				return;
			}
			var position_left  = parseInt($(this).css("left"));
			var position_top = parseInt($(this).css("top"));
			$(this).addClass("shadow");
			$(this).detach();
			$("#puzzle").append(this);
			var that = this;
			$(document).on("mousemove", function(ev) {
				var left = position_left + ev.pageX - e.pageX;
				var top = position_top + ev.pageY - e.pageY;
				left = Math.max(50, Math.min(left, board_width - tamAncho));
				top = Math.max(50, Math.min(top, board_height - tamAlto));

				$(that).css({
					"left": left,
					"top": top
				});
				
				ev.preventDefault();
			});
			//console.log("#" + (parseInt($(that).attr("id")) + 1));
			$(document).on("mouseup", function(ev) {
				$(that).removeClass("shadow");
				var presicion = 50;
				var position_top_arriba = parseInt($("#" + (parseInt($(that).attr("id")) - 1)).css("top"));
				var position_left_arriba = parseInt($("#" + (parseInt($(that).attr("id")) - 1)).css("left"));
				var position_top_abajo = parseInt($("#" + (parseInt($(that).attr("id")) + 1)).css("top"));
				var position_left_abajo = parseInt($("#" + (parseInt($(that).attr("id")) + 1)).css("left"));
				var position_top_izquierda = parseInt($("#" + (parseInt($(that).attr("id")) - piezash)).css("top"));
				var position_left_izquierda = parseInt($("#" + (parseInt($(that).attr("id")) - piezash)).css("left"));
				var position_top_derecha = parseInt($("#" + (parseInt($(that).attr("id")) + piezash)).css("top"));
				var position_left_derecha = parseInt($("#" + (parseInt($(that).attr("id")) + piezash)).css("left"));
				if (Math.abs(position_top_arriba - position_top + tamAlto) < presicion
					&& Math.abs(position_left_arriba - position_left) < presicion 
					&& parseInt($(that).attr("id")) % piezash != 0) {
					$(that).css({
						"left": position_left_arriba,
						"top": position_top_arriba + tamAlto
					});
				}
				if (Math.abs(position_top - position_top_abajo + tamAlto) < presicion
					&& Math.abs(position_left_abajo - position_left) < presicion 
					&& parseInt($(that).attr("id")) % piezash != piezash - 1) {
					$(that).css({
						"left": position_left_abajo,
						"top": position_top_abajo - tamAlto
					});
				}
				if (Math.abs(position_left_izquierda - position_left + tamAncho) < presicion
					&& Math.abs(position_top_izquierda - position_top) < presicion 
					&& parseInt($(that).attr("id")) >= piezash) {
					$(that).css({
						"left": position_left_izquierda + tamAncho,
						"top": position_top_izquierda
					});
				}
				if (Math.abs(position_left - position_left_derecha + tamAncho) < 20
					&& Math.abs(position_top_derecha - position_top) < 20 
					&& parseInt($(that).attr("id")) <= piezash * (piezasw - 1) - 1) {
					$(that).css({
						"left": position_left_derecha - tamAncho,
						"top": position_top_derecha
					});
				}
				$(this).off("mousemove");
				$(this).off("mouseup");
				e.preventDefault();
			});
			e.preventDefault();
		});
	}
});


