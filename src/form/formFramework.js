export function createControl(configuration, validation) {
	return {
		...configuration,
		validation: validation,
		valid: !validation,
		touched: false,
		value: ''
	}
}