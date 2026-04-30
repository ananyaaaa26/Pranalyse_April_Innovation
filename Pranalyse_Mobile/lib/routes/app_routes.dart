import 'package:flutter/material.dart';

// Intro
import '../features/intro/intro_screen.dart';

// Auth
import '../features/auth/presentation/login_screen.dart';
import '../features/auth/presentation/register_screen.dart';
import '../features/auth/presentation/auth_wrapper.dart';

// Home
import '../features/home/presentation/home_screen.dart';
import '../core/widgets/nav_wrapper.dart';

// Diet
//import '../features/diet/presentation/diet_screen.dart';

// Yoga
import '../features/yoga/presentation/yoga_home_screen.dart';
import '../features/yoga/presentation/pose_selection_screen.dart';
//import '../features/yoga/presentation/pose_detection_screen.dart';

// Pysio
import '../features/physio/presentation/physio_home_screen.dart';
import '../features/physio/presentation/pose_selection_screen.dart';
//import '../features/yoga/presentation/pose_detection_screen.dart';

// Profile
// Profile + Leaderboard
import '../features/profile/presentation/profile_screen.dart';
// import '../features/profile/presentation/update_physical_screen.dart';
// import '../features/profile/presentation/fitness_logs_screen.dart';
// import '../features/profile/presentation/goals_screen.dart';
// import '../features/profile/presentation/report_screen.dart';

class AppRoutes {
  static const String intro = '/';
  static const String login = '/login';
  static const String register = '/register';
  static const String home = '/home';
  static const String diet = '/diet';
  static const String yogaHome = '/yoga';
  static const String poseSelection = '/yoga/pose-selection';
  static const String poseDetection = '/yoga/pose-detection';
  static const String pysioHome = '/pysio';
  static const String pysioposeSelection = '/physio/pose-selection';
  static const String pysioposeDetection = '/physio/pose-detection';
  static const String profile = '/profile';
  // static const String updatePhysical = '/profile/update';
  // static const String fitnessLogs = '/profile/logs';
  // static const String goals = '/profile/goals';
  // static const String report = '/profile/report';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case intro:
        return MaterialPageRoute(builder: (_) => const IntroScreen());

      case login:
        return MaterialPageRoute(builder: (_) => const LoginScreen());

      case register:
        return MaterialPageRoute(builder: (_) => const RegisterScreen());

      case home:
        return MaterialPageRoute(builder: (_) => const NavWrapper());

      /* case diet:
        return MaterialPageRoute(builder: (_) => const DietScreen());

      case yogaHome:
        return MaterialPageRoute(builder: (_) => const YogaHomeScreen());

      case poseSelection:
        return MaterialPageRoute(builder: (_) => const PoseSelectionScreen());

      case poseDetection:
        return MaterialPageRoute(builder: (_) => const PoseDetectionScreen());*/

      // case pysioHome:
      //   return MaterialPageRoute(builder: (_) => const PysioHomeScreen());

      // case poseSelection:
      //   return MaterialPageRoute(builder: (_) => const PoseSelectionScreen());

      // case poseDetection:
      //   return MaterialPageRoute(builder: (_) => const PoseDetectionScreen());

      case profile:
        return MaterialPageRoute(builder: (_) => const ProfileScreen());

      /*case updatePhysical:
          return MaterialPageRoute(builder: (_) => const UpdatePhysicalScreen());

        case fitnessLogs:
          return MaterialPageRoute(builder: (_) => const FitnessLogsScreen());

        case goals:
          return MaterialPageRoute(builder: (_) => const GoalsScreen());

        case report:
          return MaterialPageRoute(builder: (_) => const ReportScreen());*/

      default:
        return MaterialPageRoute(
          builder:
              (_) => Scaffold(
                body: Center(
                  child: Text('No route defined for ${settings.name}'),
                ),
              ),
        );
    }
  }
}
