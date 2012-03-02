(function ($) {
	var rt = {

		initialized: null,
		uid: null,

		initialize: function (url) {
			url = url || '/getData';
			rt.initialized = $.getJSON(url);
			rt.initialized.done(function (json) {rt.uid = json.uid;});
			return rt.initialized;
		},

		doStuff: function (data) {
			var d = $.Deferred();

			rt.initialized.done(function () {
				data.uid = rt.uid;
				d.resolve(data);
			});

			return d.promise();
		}

	};

	//rt.initialize();
	window.rt = rt;

})(window.jQuery);