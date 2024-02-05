import bcrypt from "bcrypt";

const saltRounds: number = 10; // Number of salt rounds for hashing

// Hash a password during user registration
export async function hashPassword(
	plainPassword: string
): Promise<string | undefined> {
	try {
		const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
		console.info("password hashed");
		return hashedPassword;
	} catch (error) {
		console.error("something went wrong in hashPassword function");
		return undefined;
	}
}

/*
 * Compare entered password with stored hashed password during login
 * @param enteredPassword: string
 * @param hashedPassword: string from db
 * @returns boolean or undefined
 */
export async function isPassword(
	enteredPassword: string,
	hashedPassword: string | undefined
): Promise<boolean | undefined> {
	try {
		const passwordMatch = await bcrypt.compare(enteredPassword, hashedPassword!);
		console.info("passwords matched");
		return passwordMatch;
	} catch (error) {
		console.error("something went wrong in comparePasswords function");
		return undefined;
	}
}
