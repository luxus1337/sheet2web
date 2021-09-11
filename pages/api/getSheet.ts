// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getSheetsAPIClient } from "../../src/utility/getSheetsAPIClient"
import { sheets_v4 } from "googleapis/build/src/apis/sheets/v4"
import { findSheetByName } from "../../src/utility/sheetFunctions"

type POCSheetData = {
	cellData2D: sheets_v4.Schema$CellData[][];
	mergeData: sheets_v4.Schema$GridRange[];
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<POCSheetData>
): Promise<void>
{
	const sheets: sheets_v4.Sheets = await getSheetsAPIClient()

	const spreadsheetId: string|undefined = process.env.GOOGLE_SHEETS_ID
	if (!spreadsheetId)
	{
		throw new Error("Sheet key not defined correctly in .env file.")
	}

	let spreadSheet: sheets_v4.Schema$Spreadsheet = (await sheets.spreadsheets.get({
		includeGridData: true,
		spreadsheetId,
	})).data

	if (!spreadSheet.sheets)
	{
		throw new Error("No Sheets")

	}
	const pocSheet: sheets_v4.Schema$Sheet | undefined = findSheetByName(spreadSheet.sheets, "POC")

	if (!pocSheet || !pocSheet.data)
	{
		throw new Error("No POC")
	}

	let cellData: sheets_v4.Schema$CellData[] = []

	pocSheet.data.forEach(rowDataObject=>
	{
		if (!rowDataObject.rowData)
		{
			return
		}

		rowDataObject.rowData.forEach(valueObject=>
		{
			if (valueObject.values == null)
			{
				return
			}

			valueObject.values.forEach(value=>
			{
				cellData.push(value)
			})
		})
	})

	let cellData2D: sheets_v4.Schema$CellData[][] = []

	for (let i: number = 0; i < cellData.length; i++)
	{
		let row: number = Math.floor( i / 12)
		const data: sheets_v4.Schema$CellData = cellData[i]

		if (!cellData2D[row])
		{
			cellData2D[row] = []
		}
		cellData2D[row].push(data)
	}

	const mergeData: sheets_v4.Schema$GridRange[] = []
	pocSheet.merges?.forEach(mergeDataObject=>
	{
		mergeData.push(mergeDataObject)
	})

	res.status(200).json({ cellData2D, mergeData, })
}
