import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";

// Change it to something like this:
const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const credentials = serviceAccountKey ? JSON.parse(serviceAccountKey) : null;

// OR, if this is a private key string that needs parsing:
if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  console.warn("Warning: GOOGLE_SERVICE_ACCOUNT_JSON is not defined");
}

const client = new TextToSpeechClient({
  credentials: credentials,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const request = {
    input: { text },
    // Select the language and voice (e.g., en-IN-Wavenet-D for a natural Indian English accent)
    voice: { languageCode: "en-IN", ssmlGender: "FEMALE" as const },
    audioConfig: { audioEncoding: "MP3" as const },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    return NextResponse.json({ audioContent: response.audioContent });
  } catch (error) {
    return NextResponse.json({ error: "TTS synthesis failed" }, { status: 500 });
  }
}