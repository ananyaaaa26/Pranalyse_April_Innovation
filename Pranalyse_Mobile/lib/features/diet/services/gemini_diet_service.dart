import 'dart:convert';
import 'package:http/http.dart' as http;

class GeminiDietService {
  static const String _apiKey = "AIzaSyDuPJ7b2hNSnBK-FQrvfYaaZNoG8l5S4ig";
  static const String _endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=$_apiKey";

  /// Generates a personalized diet plan using Gemini
  static Future<Map<String, dynamic>> generateDietPlan({
    required String gender,
    required int age,
    required double weight,
    required double height,
    required double bmi,
    required String lifestyle,
    required String dietPreference,
    required String allergies,
    required String goal,
    required String goalDuration,
  }) async {
    final prompt = _buildDietPrompt(
      gender,
      age,
      weight,
      height,
      bmi,
      lifestyle,
      dietPreference,
      allergies,
      goal,
      goalDuration,
    );

    final response = await http.post(
      Uri.parse(_endpoint),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "contents": [
          {
            "parts": [
              {"text": prompt}
            ]
          }
        ]
      }),
    );

    if (response.statusCode != 200) {
      throw Exception("Gemini API Error: ${response.body}");
    }

    final decoded = jsonDecode(response.body);

    /// Extract text safely
    final textResponse =
        decoded["candidates"][0]["content"]["parts"][0]["text"];

    /// Expecting JSON output from prompt
    return jsonDecode(textResponse);
  }

  /// Prompt builder
  static String _buildDietPrompt(
    String gender,
    int age,
    double weight,
    double height,
    double bmi,
    String lifestyle,
    String dietPreference,
    String allergies,
    String goal,
    String goalDuration,
  ) {
    return '''
You are an expert AI nutritionist and certified diet planner.

Generate a highly personalized diet plan using the following details:

Gender: $gender
Age: $age
Weight: $weight kg
Height: $height cm
BMI: $bmi
Lifestyle: $lifestyle
Dietary Preference: $dietPreference
Allergies or Restrictions: $allergies
Goal: $goal
Goal Duration: $goalDuration

Requirements:
1. Calculate BMR and daily calorie needs.
2. Adjust calories based on goal.
3. Generate a 7-day Indian diet plan:
   - Breakfast
   - Lunch
   - Dinner
   - Snacks
4. Provide macro split (protein, carbs, fats).
5. Mention daily water intake.
6. Ensure sustainability and safety.
7. Avoid restricted foods.

Output STRICT JSON only in this format:

{
  "daily_calories": "",
  "macro_split": {
    "protein_g": "",
    "carbs_g": "",
    "fats_g": ""
  },
  "water_intake_liters": "",
  "weekly_diet_plan": {
    "Monday": {
      "breakfast": "",
      "lunch": "",
      "dinner": "",
      "snacks": ""
    }
  },
  "recommendations": []
}
''';
  }
}