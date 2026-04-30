// import 'package:firebase_auth/firebase_auth.dart';

// class AuthService {
//   final FirebaseAuth _auth = FirebaseAuth.instance;

//   // Sign Up
//   Future<User?> signUp(String email, String password) async {
//     try {
//       UserCredential result =
//           await _auth.createUserWithEmailAndPassword(
//         email: email,
//         password: password,
//       );
//       return result.user;
//     } catch (e) {
//       throw e.toString();
//     }
//   }

//   // Login
//   Future<User?> signIn(String email, String password) async {
//     try {
//       UserCredential result =
//           await _auth.signInWithEmailAndPassword(
//         email: email,
//         password: password,
//       );
//       return result.user;
//     } catch (e) {
//       throw e.toString();
//     }
//   }

//   // Logout
//   Future<void> signOut() async {
//     await _auth.signOut();
//   }

//   // Auth State
//   Stream<User?> get userStream => _auth.authStateChanges();
// }
