import 'package:flutter/material.dart';
import 'routes/app_routes.dart';

void main() {
  runApp(const YogaPhysioApp());
}

class YogaPhysioApp extends StatelessWidget {
  const YogaPhysioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pranalyse',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        fontFamily: 'Poppins',
        scaffoldBackgroundColor: const Color(
          0xFF4B3A70,
        ), // Default bg if needed
      ),
      initialRoute: AppRoutes.intro,
      onGenerateRoute: AppRoutes.generateRoute,
    );
  }
}
