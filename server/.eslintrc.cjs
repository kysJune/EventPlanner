/* eslint-env node */
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"standard",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true,
	overrides: [
		{
			files: ["*.ts"], // Add the file patterns here
			rules: {
				semi: [1, "always"],
				quotes: ["error", "double"],
				"no-console": ["warn", { allow: ["info", "error"] }],
				indent: ["error", "tab"],
				"comma-dangle": "off"
			}
		}
	]
};
