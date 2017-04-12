chrome.extension.sendMessage({}, function(response) {
	$('<div id="yt-scheduled-videos-calendar"></div>').insertAfter('#body-container');
	$('<a id="launch-calendar-link" href="#yt-scheduled-videos-calendar"><span class="icon-calendar">Calendar</span></a>').insertBefore('#vm-view-filter-label');
	$('#launch-calendar-link').leanModal();

	var readyStateCheckInterval = setInterval(function() {
		var ngHide = jQuery(".ng-hide").length;
		if (
			document.readyState === "complete"
			&& ngHide != null && ngHide > 0)
		{
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------
			var eventArray = createEventArray();
			generateScheduledVideoCalendar(eventArray);
		}
	}, 10);
});

