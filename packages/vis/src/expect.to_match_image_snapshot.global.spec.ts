it('should be available in global expect', () => {
	expect(typeof expect('something').toMatchImageSnapshot).toBe('function')
})