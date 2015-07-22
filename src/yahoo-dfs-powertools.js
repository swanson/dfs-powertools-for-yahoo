$(document).ready(function () {
	// wait for React to do its thing
	setTimeout(function() {
		jQuery('.ys-subNav').next().prepend(
			'<a href="#" id="ydp-export" class="Btn Cur-p Fz-s">Export Salaries</a>'
		).click(function(e) {
			var parser = document.createElement('a'),
				regex = new RegExp("\\d+"),
				contestId,
				priceUrl;
				
			e.preventDefault();
			
			parser.href = window.location.href;
			contestId = parser.pathname.match(regex)[0];
			priceUrl = "https://sports.yahoo.com/dailyfantasy" + 
				"/api/resource/dailyfantasy.players" +
				";contestId=" + contestId;
			
			jQuery.ajax({
				url: priceUrl,
				dataType: 'json',
				success: function (data) {
					var link = document.createElement("a"),
						filename = "yahoo-salaries-" + new Date().toISOString().slice(0, 10),
						csvHeader = "data:text/csv;charset=utf-8,",
						rows = _.map(data.players.result, function (p) { 
						return "\"" + p.firstName + " " + p.lastName + "\"" +
							", " + p.primaryPosition + 
							", " + p.salary 
						}
					).join("\n");

					link.setAttribute("href", encodeURI(csvHeader + rows));
					link.setAttribute("download", filename + ".csv");
					link.click();
				},
				error: function () {
					console.error("Something went wrong.");
				}
			});	
		});
	}, 1000);
});
