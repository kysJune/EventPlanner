export function includeIfDefined<T>(
	key: string,
	value: T | undefined
): Record<string, T> {
	return value !== undefined ? { [key]: value } : {};
}
