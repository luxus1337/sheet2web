import { GaxiosResponse } from "gaxios"
import { sheets_v4 } from "googleapis"

export async function getValuesForRange(sheets: sheets_v4.Sheets, spreadsheetId: string, range: string): Promise<string[][]>
{
	const result: GaxiosResponse<sheets_v4.Schema$ValueRange> = await sheets.spreadsheets.values.get({
		range,
		spreadsheetId,
	})

	if (!result || !result.data || !result.data.values)
	{
		throw new Error("Unexpected shape of result. Data missing or misformed")
	}

	return result.data.values
}

export function findSheetByName(sheets: sheets_v4.Schema$Sheet[], name: string): sheets_v4.Schema$Sheet | undefined
{
	for (let i: number = 0; i < sheets.length; i++)
	{
		let sheet: sheets_v4.Schema$Sheet = sheets[i]

		if (sheet.properties?.title === name)
		{
			return sheet
		}
	}
}
