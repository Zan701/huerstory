import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSIIqZOlmsDOH5FAcTl0cNvEedaa6L31UGvH5qvFKOB3M2LgVNjEC6_v5jcS7SwqJaqhJq_qftW42zz/pub?output=csv", {
      // Don't cache this aggressively on the server so it reflects changes quickly
      cache: 'no-store' 
    });
    const text = await response.text();
    
    const lines = text.split("\n");
    const booked: string[] = [];
    
    // Skip header (line 0)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        let [dateStr, status] = line.split(",");
        
        // Format handling: Convert DD/MM/YYYY (from Google Sheets Date Picker) to YYYY-MM-DD
        if (dateStr && dateStr.includes("/")) {
          const parts = dateStr.split("/");
          if (parts.length === 3) {
            dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        }
        
        if (status?.trim().toLowerCase() === "booked") {
          booked.push(dateStr.trim());
        }
      }
    }
    
    return NextResponse.json({ booked });
  } catch (error) {
    console.error("Error fetching schedule from Google Sheets:", error);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}
