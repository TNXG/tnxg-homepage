import { jwtVerify, SignJWT } from "jose";

// eslint-disable-next-line node/prefer-global/process
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function signToken(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secret);
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch {
		return null;
	}
}
