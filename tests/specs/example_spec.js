(function ($, Jasmine) {

	describe('Example module', function () {

		it('defines an adder function on "window"', function () {
			expect(window.adder).toBeDefined();
		});

		it('adds x and y together', function () {

			expect(adder(34, 5)).toEqual(39);

		});

	});

})(window.jQuery, window.Jasmine);