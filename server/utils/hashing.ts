import bcrypt from "bcrypt";

const saltRounds: number = 10; // Number of salt rounds for hashing

export async function hashPassword(
	plainPassword: string
): Promise<string | undefined> {
	try {
		return await bcrypt.hash(plainPassword, saltRounds);
	} catch (error) {
		console.error("something went wrong in hashPassword function");
		return undefined;
	}
}

/**
 * Compare entered password with stored hashed password during login
 * @returns boolean or undefined
 * @param enteredPassword plaintext password
 * @param hashedPassword
 */
export async function isPassword(
	enteredPassword: string,
	hashedPassword: string | undefined
): Promise<boolean | undefined> {
	try {
		return await bcrypt.compare(enteredPassword, hashedPassword!);
	} catch (error) {
		console.error("something went wrong in comparePasswords function");
		return undefined;
	}
}
