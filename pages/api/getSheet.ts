// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getSheetsAPIClient } from "../../src/utility/getSheetsAPIClient"
import { sheets_v4 } from "googleapis/build/src/apis/sheets/v4"

type Data = {
	name: boolean;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
): Promise<void>
{
	const sheet: sheets_v4.Sheets = await getSheetsAPIClient()
	sheet.spreadsheets

	res.status(200).json({ name: !!sheet })
}
