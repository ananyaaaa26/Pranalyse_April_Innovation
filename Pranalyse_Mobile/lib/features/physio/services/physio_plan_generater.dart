import 'dart:convert';
import 'package:http/http.dart' as http;

class PhysioPlanService {
  static Future<String> generatePhysioDietPlan({
    required String gender,
    required int age,
    required double weight,
    required double height,
    required double bmi,
    required String lifestyle,
    required String dietPreference,
    required String goal,
    required String goalDuration,
  }) async {
    final systemPrompt = """
You are an expert Physiotherapist and Clinical Nutritionist.
Generate a complete, personalized physiotherapy-aligned diet plan.

Follow this structure strictly:
1. User Health Summary
2. Daily Calorie & Macronutrient Breakdown
3. Meal-Wise Diet Plan
4. Weekly Food Variations
5. Recovery & Physio-Specific Nutrition Tips
6. Foods to Avoid
7. Goal Timeline Guidance

Use simple language. Avoid medical diagnosis.
""";

    final userPrompt = """
User Details:
- Gender: $gender
- Age: $age
- Weight: $weight kg
- Height: $height cm
- BMI: $bmi
- Lifestyle: $lifestyle
- Diet Preference: $dietPreference
- Goal: $goal
- Goal Duration: $goalDuration
""";

const String GEMINI_API_KEY = "AIzaSyDuPJ7b2hNSnBK-FQrvfYaaZNoG8l5S4ig";
const String GEMINI_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

    final requestBody = {
      "contents": [
        {
          "role": "user",
          "parts": [
            {"text": systemPrompt},
            {"text": userPrompt}
          ]
        }
      ],
      "generationConfig": {
        "temperature": 0.6,
        "topK": 40,
        "topP": 0.9,
        "maxOutputTokens": 2048
      }
    };

    final response = await http.post(
      Uri.parse("$GEMINI_ENDPOINT?key=$GEMINI_API_KEY"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(requestBody),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      return data["candidates"][0]["content"]["parts"][0]["text"];
    } else {
      throw Exception(
          "Failed to generate physio plan: ${response.body}");
    }
  }
}