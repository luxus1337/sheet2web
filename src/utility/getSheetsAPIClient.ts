import { BaseExternalAccountClient, Compute, GoogleAuth, JWT, UserRefreshClient } from "googleapis-common"
import { CredentialBody, Impersonated } from "google-auth-library"
import { google, sheets_v4 } from "googleapis"

export async function getSheetsAPIClient(): Promise<sheets_v4.Sheets>
{
	if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
	{
		throw new Error("ENV file not setup correctly. Link google service account credentials in ENV file.")
	}

	const credentials: CredentialBody = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) as CredentialBody

	const auth: GoogleAuth = new GoogleAuth({
		credentials,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"]
	})
	const authClient: Compute | JWT | UserRefreshClient | Impersonated | BaseExternalAccountClient = await auth.getClient()

	return google.sheets({
		auth: authClient,
		version: "v4"
	})
}
