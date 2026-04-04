import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      university,
      major,
      graduationYear,
      experience,
      teamSize,
      track,
      dietary,
      tshirt,
      howHeard,
    } = body;

    // Validate required fields
    if (!fullName || !email || !university || !major || !graduationYear || !experience || !teamSize || !track || !tshirt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If Google Sheets credentials are configured, save to sheet
    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (serviceEmail && privateKey && sheetId) {
      const auth = new google.auth.JWT({
        email: serviceEmail,
        key: privateKey.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:M",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toISOString(),
              fullName,
              email,
              phone || "",
              university,
              major,
              graduationYear,
              experience,
              teamSize,
              track,
              dietary || "",
              tshirt,
              howHeard || "",
            ],
          ],
        },
      });
    } else {
      // Log to console if no Google Sheets configured
      console.log("Registration (no Google Sheets configured):", {
        timestamp: new Date().toISOString(),
        fullName,
        email,
        university,
        major,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
