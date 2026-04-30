import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> generateYogaPlan({
  required String gender,
  required String lifestyle,
  required String dietPreference,
  required List<String> allergies,
  required int age,
  required double weight,
  required double height,
  required double bmi,
  required String goal,
  required String goalDuration,
}) async {
  final String systemPrompt = """
You are an expert Yoga Therapist, Fitness Coach, and Wellness Planner with deep knowledge of
Hatha Yoga, Ashtanga Yoga, Pranayama, Mobility Training, and Lifestyle Optimization.

Your task is to generate a fully personalized yoga plan based on the user profile provided.

Follow this structure strictly:
1. User Profile Summary
2. Yoga Plan Overview
3. Weekly Yoga Schedule (Day 1–Day 7)
4. Pose Details
5. Pranayama & Breathing
6. Meditation / Mindfulness
7. Diet & Nutrition Alignment (light guidance)
8. Progression Strategy
9. Safety & Disclaimer

Tone: supportive, simple, safe, non-medical.
""";

const String GEMINI_API_KEY = "AIzaSyDuPJ7b2hNSnBK-FQrvfYaaZNoG8l5S4ig";
const String GEMINI_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

  final Map<String, dynamic> userData = {
    "gender": gender,
    "lifestyle": lifestyle,
    "dietPreference": dietPreference,
    "allergies": allergies,
    "age": age,
    "weight": weight,
    "height": height,
    "bmi": bmi,
    "goal": goal,
    "goalDuration": goalDuration,
  };

  final response = await http.post(
    Uri.parse("$GEMINI_ENDPOINT?key=$GEMINI_API_KEY"),
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonEncode({
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text":
                  "$systemPrompt\n\nUser Profile:\n${jsonEncode(userData)}"
            }
          ]
        }
      ],
      "generationConfig": {
        "temperature": 0.7,
        "topK": 40,
        "topP": 0.9,
        "maxOutputTokens": 2048
      }
    }),
  );

  if (response.statusCode != 200) {
    throw Exception("Failed to generate yoga plan: ${response.body}");
  }

  final data = jsonDecode(response.body);

  return data["candidates"][0]["content"]["parts"][0]["text"];
}