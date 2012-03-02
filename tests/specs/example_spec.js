/*globals describe: false, it:false, expect:false, spyOn:false */
(function ($, jasmine, rt) {

	describe('Example module', function () {

		it('provides rt on window', function () {
			expect(window.rt).toBeDefined();
		});

		it('does not initialize rt if getJSON fails', function () {
			var spy = spyOn($, 'getJSON').andCallFake(function (url) {
				expect(url).toEqual('/getData');
				var d = $.Deferred();
				d.reject();
				return d.promise();
			});

			var success = jasmine.createSpy(),
				failure = jasmine.createSpy();
			var p = rt.initialize();
			p.done(success);
			p.fail(failure);
			expect(failure).wasCalled();
			expect(success).wasNotCalled();
		});

		it('makes a JSON call on load to /getData', function () {
			var spy = spyOn($, 'getJSON').andCallFake(function (url) {
				expect(url).toEqual('/getData');
				var d = $.Deferred();
				d.resolve({uid: 'myuid'});
				return d.promise();
			});
			var success = jasmine.createSpy(),
				failure = jasmine.createSpy();
			var p = rt.initialize();
			p.done(success);
			p.fail(failure);
			expect(spy).wasCalled();
			expect(success).wasCalled();
			expect(failure).wasNotCalled();
			expect(rt.uid).toEqual('myuid');
		});

		it('appends uid to data and return the data once rt has been initialized', function () {
			var spy = spyOn($, 'getJSON').andCallFake(function (url) {
				var d = $.Deferred();
				d.resolve({uid: 'myuid'});
				return d.promise();
			});
			rt.initialize();
			var p = rt.doStuff({text: 'Hello world'}),
				success = jasmine.createSpy(),
				failure = jasmine.createSpy();
			p.done(success);
			p.fail(failure);
			expect(success).wasCalled();
			expect(failure).wasNotCalled();
			p.done(function (data) {
				expect(data.uid).toEqual('myuid');
				expect(data.text).toEqual('Hello world');
			});
		});

	});

})(window.jQuery, window.jasmine, window.rt);